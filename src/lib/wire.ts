import { createServerFn } from "@tanstack/react-start";
import { X_HANDLES, WEB_HINT } from "@/data/sources";
import { GAMES, SNAPSHOT } from "@/data/slate";

export type WireItem = {
  kind: "injury" | "score" | "line" | "news";
  text: string;
  source: string;
};

export type WireResult = {
  ok: true;
  asOf: string;
  headline: string;
  items: WireItem[];
  deskImpact: string;
  citations: string[];
};

export type WireFail = { ok: false; error: string };

type CacheEntry = { at: number; result: WireResult };
let cache: CacheEntry | null = null;
const TTL_MS = 3 * 60 * 1000;
let lastCall = 0;
const MIN_GAP_MS = 45_000;

const FOCUS = ["slate", "injuries", "lines"] as const;
export type WireFocus = (typeof FOCUS)[number];

function isFocus(v: unknown): v is WireFocus {
  return typeof v === "string" && (FOCUS as readonly string[]).includes(v);
}

function extractText(body: Record<string, unknown>): string {
  if (typeof body.output_text === "string" && body.output_text.trim()) {
    return body.output_text;
  }
  const output = body.output;
  if (Array.isArray(output)) {
    const parts: string[] = [];
    for (const item of output) {
      if (!item || typeof item !== "object") continue;
      const rec = item as { type?: string; content?: unknown };
      if (!Array.isArray(rec.content)) continue;
      for (const c of rec.content) {
        if (c && typeof c === "object" && "text" in c && typeof (c as { text: unknown }).text === "string") {
          parts.push((c as { text: string }).text);
        }
      }
    }
    if (parts.length) return parts.join("\n");
  }
  const choices = body.choices;
  if (Array.isArray(choices) && choices[0] && typeof choices[0] === "object") {
    const msg = (choices[0] as { message?: { content?: unknown } }).message;
    if (msg && typeof msg.content === "string") return msg.content;
  }
  return "";
}

function extractCitations(body: Record<string, unknown>): string[] {
  const out: string[] = [];
  const raw = body.citations ?? body.sources;
  if (Array.isArray(raw)) {
    for (const c of raw) {
      if (typeof c === "string") out.push(c);
      else if (c && typeof c === "object") {
        const u = (c as { url?: unknown; uri?: unknown }).url ?? (c as { uri?: unknown }).uri;
        if (typeof u === "string") out.push(u);
      }
    }
  }
  return [...new Set(out)].slice(0, 12);
}

function parseWire(text: string, citations: string[]): WireResult {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      ok: true,
      asOf: new Date().toISOString(),
      headline: "Live pull",
      items: text
        .split("\n")
        .map((l) => l.replace(/^[-*]\s*/, "").trim())
        .filter(Boolean)
        .slice(0, 12)
        .map((line) => ({ kind: "news" as const, text: line, source: "Grok" })),
      deskImpact: "Could not parse structured JSON; showing raw bullets.",
      citations,
    };
  }
  let parsed: {
    asOf?: string;
    headline?: string;
    items?: WireItem[];
    deskImpact?: string;
  };
  try {
    parsed = JSON.parse(jsonMatch[0]) as typeof parsed;
  } catch {
    parsed = {};
  }
  const items = Array.isArray(parsed.items)
    ? parsed.items
        .filter((i) => i && typeof i.text === "string")
        .slice(0, 16)
        .map((i) => ({
          kind: (["injury", "score", "line", "news"] as const).includes(i.kind) ? i.kind : "news",
          text: String(i.text).slice(0, 400),
          source: String(i.source ?? "Grok").slice(0, 80),
        }))
    : [];
  return {
    ok: true,
    asOf: parsed.asOf || new Date().toISOString(),
    headline: String(parsed.headline || "Live pull").slice(0, 180),
    items,
    deskImpact: String(parsed.deskImpact || "").slice(0, 600),
    citations,
  };
}

function promptFor(focus: WireFocus): string {
  const slate = GAMES.filter((g) => g.status !== "final")
    .map((g) => `${g.away}@${g.home} desk=${g.ourPick} blot=${g.cardBlot ?? "—"}`)
    .join("; ");
  const done = GAMES.filter((g) => g.status === "final")
    .map((g) => g.final)
    .join("; ");
  const topic =
    focus === "injuries"
      ? "Injuries, practice reports, inactives, QB status only."
      : focus === "lines"
        ? "Spreads, totals, public betting splits, steam only."
        : "Scores, injuries, line moves, public splits, and anything that changes a Week 1 pick.";
  return `NFL Week 1 2026. Today is Thursday Sep 10, 2026 evening Pacific. Finals already in: ${done}. Remaining desk: ${slate}. Desk snapshot: ${SNAPSHOT.headline}. ${topic}

Search X (handles we care about) and the web (${WEB_HINT}). Prefer posts from the last 36 hours.

Return ONLY JSON:
{"asOf":"ISO time PT","headline":"one line","items":[{"kind":"injury|score|line|news","text":"fact","source":"handle or site"}],"deskImpact":"what to change on the Pinks card or parlays, or 'no change'"}
Max 12 items. Facts only. No betting advice disclaimer.`;
}

export const pullWire = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const rec = input && typeof input === "object" ? (input as { focus?: unknown }) : {};
    return { focus: isFocus(rec.focus) ? rec.focus : ("slate" as const) };
  })
  .handler(async ({ data }): Promise<WireResult | WireFail> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Grok is not available in this environment." };

    const now = Date.now();
    if (cache && now - cache.at < TTL_MS && data.focus === "slate") {
      return cache.result;
    }
    if (now - lastCall < MIN_GAP_MS && cache) return cache.result;
    lastCall = now;

    const body = {
      model: "grok-4.5",
      input: [{ role: "user", content: promptFor(data.focus) }],
      tools: [
        {
          type: "x_search",
          allowed_x_handles: [...X_HANDLES],
          from_date: "2026-09-09",
        },
        { type: "web_search" },
      ],
      max_output_tokens: 1400,
      reasoning: { effort: "low" },
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 55_000);
    let res: Response;
    try {
      res = await fetch("https://api.x.ai/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timer);
      const msg = err instanceof Error ? err.message : "network error";
      return { ok: false, error: msg.includes("abort") ? "Timed out waiting on Grok." : msg };
    }
    clearTimeout(timer);

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `xAI ${res.status}${detail ? `: ${detail.slice(0, 180)}` : ""}` };
    }

    const json = (await res.json()) as Record<string, unknown>;
    const result = parseWire(extractText(json), extractCitations(json));
    if (data.focus === "slate") cache = { at: now, result };
    return result;
  });
