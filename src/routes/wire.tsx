import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Radio, RefreshCw } from "lucide-react";
import { SOURCES } from "@/data/sources";
import { pullWire, type WireFail, type WireFocus, type WireResult } from "@/lib/wire";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HelpRow } from "@/components/help-tip";

export const Route = createFileRoute("/wire")({ component: WirePage });

const CACHE_KEY = "line-shop-wire";

function WirePage() {
  const [focus, setFocus] = useState<WireFocus>("slate");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WireResult | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as WireResult;
      if (parsed?.ok && Array.isArray(parsed.items)) setResult(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  async function pull() {
    setBusy(true);
    setError(null);
    try {
      const out = (await pullWire({ data: { focus } })) as WireResult | WireFail;
      if (!out.ok) {
        setError(out.error);
        return;
      }
      setResult(out);
      localStorage.setItem(CACHE_KEY, JSON.stringify(out));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pull failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Live line</p>
        <HelpRow id="wire">
          <h1 className="font-display text-3xl tracking-tight">Grok wire</h1>
        </HelpRow>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Grok searches X and the web when you hit pull — not on load. That is the gap vs Perplexity:
          Grok has native X search on the same firehose the insiders post to. Perplexity is strong on
          indexed web pages and citations; it does not sit on X the way Grok does. Use this for
          Schefter / Rapoport / injury report speed. Use the static desk for the card math.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        {(["slate", "injuries", "lines"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={focus === f ? "default" : "outline"}
            onClick={() => setFocus(f)}
          >
            {f}
          </Button>
        ))}
        <Button id="pull-wire" onClick={pull} disabled={busy} className="ml-auto">
          <RefreshCw className={cn("size-4", busy && "animate-spin")} />
          {busy ? "Pulling" : "Pull live Grok"}
        </Button>
      </div>

      {error ? (
        <p className="rounded-xl bg-surface px-4 py-3 text-sm text-risk shadow-[var(--shadow-border)]">
          {error}
        </p>
      ) : null}

      {result ? (
        <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <div className="flex items-start gap-3">
            <Radio className="mt-1 size-4 text-muted" />
            <div>
              <p className="font-mono text-xs text-muted">{result.asOf}</p>
              <h2 className="mt-1 font-display text-2xl">{result.headline}</h2>
            </div>
          </div>
          <ul className="mt-5 flex flex-col gap-3">
            {result.items.map((item, i) => (
              <li key={`${item.text}-${i}`} className="flex gap-3 text-sm">
                <Badge
                  tone={item.kind === "injury" ? "risk" : item.kind === "score" ? "win" : "neutral"}
                  className="mt-0.5 h-fit"
                >
                  {item.kind}
                </Badge>
                <span>
                  {item.text}{" "}
                  <span className="text-muted">· {item.source}</span>
                </span>
              </li>
            ))}
          </ul>
          {result.deskImpact ? (
            <p className="mt-5 text-sm">
              <span className="text-muted">Desk · </span>
              {result.deskImpact}
            </p>
          ) : null}
          {result.citations.length ? (
            <ul className="mt-4 flex flex-col gap-1">
              {result.citations.map((c) => (
                <li key={c} className="truncate font-mono text-[0.6875rem] text-muted">
                  {c}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : (
        <p className="text-sm text-muted">No live pull yet. The printed desk stays until you ask.</p>
      )}

      <section>
        <h2 className="font-display text-xl">Who we listen to</h2>
        <p className="mt-1 text-sm text-muted">
          Grok is told to prefer these handles and sites. Official NFL injury report first, then
          Rapoport / Schefter / Pelissero, then the board.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center justify-between gap-3 rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] hover:shadow-[var(--shadow-border-hover)]"
              >
                <span>
                  <span className="block text-sm font-medium">{s.name}</span>
                  <span className="block text-xs text-muted">{s.role}</span>
                </span>
                <Badge>{s.kind}</Badge>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
