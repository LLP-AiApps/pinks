import { createServerFn } from "@tanstack/react-start";
import { GAMES } from "@/data/slate";
import { homeSpread } from "@/lib/engine";

export type PulledLine = {
  spread: number | null;
  total: number | null;
  mlHome: number | null;
  mlAway: number | null;
};

export type PulledGame = {
  gameId: string;
  cbs: PulledLine;
  circa: PulledLine;
  note: string;
};

export type OddsPull = {
  ok: true;
  asOf: string;
  headline: string;
  games: PulledGame[];
  citations: string[];
};

export type OddsFail = { ok: false; error: string };

type CacheEntry = { at: number; result: OddsPull };
let cache: CacheEntry | null = null;
const TTL_MS = 3 * 60 * 1000;
let lastCall = 0;
const MIN_GAP_MS = 45_000;

const EMPTY: PulledLine = { spread: null, total: null, mlHome: null, mlAway: null };

function extractText(body: Record<string, unknown>): string {
  if (typeof body.output_text === "string" && body.output_text.trim()) {
    return body.output_text;
  }
  const output = body.output;
  if (Array.isArray(output)) {
    const parts: string[] = [];
    for (const item of output) {
      if (item && typeof item === "object") {
        const rec = item as { content?: unknown };
        if (!Array.isArray(rec.content)) continue;
        for (const c of rec.content) {
          if (c && typeof c === "object" && "text" in c && typeof (c as { text: unknown }).text === "string") {
            parts.push((c as { text: string }).text);
          }
        }
      }
    }
    if (parts.length) return parts.join("\n");
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
        const u = (c as { url?: unknown }).url;
        if (typeof u === "string") out.push(u);
      }
    }
  }
  return [...new Set(out)].slice(0, 8);
}

function num(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() && Number.isFinite(Number(v))) return Number(v);
  return null;
}

function lineOf(raw: unknown): PulledLine {
  if (!raw || typeof raw !== "object") return EMPTY;
  const r = raw as Record<string, unknown>;
  return {
    spread: num(r.spread),
    total: num(r.total),
    mlHome: num(r.mlHome),
    mlAway: num(r.mlAway),
  };
}

function parseOdds(text: string, citations: string[]): OddsPull {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const ids = new Set(GAMES.filter((g) => g.status !== "final").map((g) => g.id));
  let games: PulledGame[] = [];
  let headline = "CBS / Circa pull";
  let asOf = new Date().toISOString();
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as {
        asOf?: string;
        headline?: string;
        games?: PulledGame[];
      };
      if (parsed.asOf) asOf = String(parsed.asOf);
      if (parsed.headline) headline = String(parsed.headline).slice(0, 180);
      if (Array.isArray(parsed.games)) {
        games = parsed.games
          .filter((g) => g && ids.has(String(g.gameId)))
          .map((g) => ({
            gameId: String(g.gameId),
            cbs: lineOf(g.cbs),
            circa: lineOf(g.circa),
            note: String(g.note ?? "").slice(0, 200),
          }));
      }
    } catch {
      /* fall through */
    }
  }
  return { ok: true, asOf, headline, games, citations };
}

function prompt(): string {
  const live = GAMES.filter((g) => g.status !== "final")
    .map(
      (g) =>
        `${g.id} ${g.away}@${g.home} snap homeSpread=${homeSpread(g)} total=${g.total} mlHome=${g.mlHome} mlAway=${g.mlAway}`,
    )
    .join("\n");
  return `NFL Week 1 2026. It is Friday September 11, 2026, just after midnight Pacific. Remaining games:

${live}

Look up CURRENT numbers from ONLY:
- CBS Sports NFL odds (https://www.cbssports.com/nfl/odds/)
- Circa Sports NFL if posted (https://www.circasports.com/)

Spread is the HOME team's number (negative = home favored), same convention as snap.

Return ONLY JSON:
{"asOf":"ISO PT","headline":"one line on what moved","games":[{"gameId":"cle-jax","cbs":{"spread":-8.5,"total":40.5,"mlHome":-450,"mlAway":350},"circa":{"spread":-8.5,"total":40.5,"mlHome":-440,"mlAway":340},"note":"held or moved off snap"}]}

Use our gameId values. Null if a book is missing. Facts only. Do not invent a number that is not on those pages.`;
}

export const pullOdds = createServerFn({ method: "POST" }).handler(
  async (): Promise<OddsPull | OddsFail> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Grok is not available in this environment." };

    const now = Date.now();
    if (cache && now - cache.at < TTL_MS) return cache.result;
    if (now - lastCall < MIN_GAP_MS && cache) return cache.result;
    lastCall = now;

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
        body: JSON.stringify({
          model: "grok-4.5",
          input: [{ role: "user", content: prompt() }],
          tools: [{ type: "web_search" }],
          max_output_tokens: 1600,
          reasoning: { effort: "low" },
        }),
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
    const result = parseOdds(extractText(json), extractCitations(json));
    cache = { at: now, result };
    return result;
  },
);
