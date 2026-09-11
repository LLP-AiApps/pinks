import { createFileRoute, Link } from "@tanstack/react-router";
import { SOURCES } from "@/data/sources";
import { allEdges, seasonRecord, WEIGHTS, type GameEdge } from "@/lib/engine";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPct } from "@/lib/odds";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FactorBars, WeightStrip } from "@/components/factor-bars";
import { HelpRow } from "@/components/help-tip";

export const Route = createFileRoute("/engine")({ component: EnginePage });

function rec(w: number, l: number, p = 0) {
  const pct = w + l ? formatPct(w / (w + l)) : "—";
  return p ? `${w}–${l}–${p} · ${pct}` : `${w}–${l} · ${pct}`;
}

function EnginePage() {
  const edges = allEdges();
  const record = seasonRecord(edges);
  const [open, setOpen] = useState<string | null>(null);
  const live = edges.filter((e) => e.game.status !== "final").sort((a, b) => b.suProb - a.suProb);
  const done = edges.filter((e) => e.game.status === "final");
  const using = SOURCES.filter((s) => s.use);
  const skipped = SOURCES.filter((s) => !s.use);

  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">The climb</p>
        <HelpRow id="engine">
          <h1 className="font-display text-3xl tracking-tight">Engine</h1>
        </HelpRow>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          100% is the north star, not a claim. Every final is graded. Weights are public. This is a
          snapshot we typed — not a live odds ticker. Wire is the live pull, on demand.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <Stat label="Desk SU" value={rec(record.desk.w, record.desk.l)} hint="Printed card vs finals" />
        <Stat
          label="Engine SU"
          value={rec(record.engine.su.w, record.engine.su.l, record.engine.su.p)}
          hint="Same games, scored blend"
        />
        <Stat
          label="Engine ATS"
          value={rec(record.engine.ats.w, record.engine.ats.l, record.engine.ats.p)}
          hint="Vs the number, not the pool"
        />
      </section>

      <section>
        <h2 className="font-display text-xl">Weights</h2>
        <p className="mt-2 text-sm text-muted">How much each lane moves the blend. Bars below a game are that game.</p>
        <div className="mt-3">
          <WeightStrip weights={WEIGHTS} />
          <ul className="mt-3 flex flex-wrap gap-3 text-[0.6875rem] uppercase tracking-wide text-muted">
            {Object.entries(WEIGHTS).map(([k, v]) => (
              <li key={k}>
                {k} {Math.round(v * 100)}%
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-xl">Sunday–Monday, ranked</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/wire">Pull live Grok</Link>
          </Button>
        </div>
        <ul className="flex flex-col gap-2">
          {live.map((e) => (
            <EdgeRow key={e.game.id} edge={e} open={open} setOpen={setOpen} />
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">Graded</h2>
        <ul className="flex flex-col gap-2">
          {done.map((e) => (
            <EdgeRow key={e.game.id} edge={e} open={open} setOpen={setOpen} />
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl">Feeds we actually use</h2>
        <p className="mt-1 text-sm text-muted">
          From your list: NFL.com, ESPN, CBS, Action Network, SportsLine, Covers. VegasInsider, NBC,
          and USA TODAY are duplicates — listed, not queried.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {using.map((s) => (
            <li key={s.url} className="rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
              <div className="flex items-center justify-between gap-2">
                <a href={s.url} target="_blank" rel="noreferrer" className="text-sm font-medium">
                  {s.name}
                </a>
                <Badge>{s.lane}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted">{s.why}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs uppercase tracking-widest text-muted">Skipped</p>
        <ul className="mt-2 flex flex-col gap-1 text-sm text-muted">
          {skipped.map((s) => (
            <li key={s.url}>
              {s.name} — {s.why}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function EdgeRow({
  edge,
  open,
  setOpen,
}: {
  edge: GameEdge;
  open: string | null;
  setOpen: (id: string | null) => void;
}) {
  const g = edge.game;
  const shown = open === g.id;
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen(shown ? null : g.id)}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]",
          shown && "rounded-b-none",
        )}
      >
        <span className="w-14 shrink-0 font-mono text-[0.6875rem] uppercase text-muted">
          {g.window.split(" ")[0]}
        </span>
        <span className="min-w-0 flex-1 font-medium">
          {g.away} @ {g.home}
        </span>
        <span className="font-mono text-sm tabular-nums">{formatPct(edge.suProb)}</span>
        <Badge tone={edge.play ? "win" : edge.grade?.su === "L" ? "risk" : "neutral"}>
          {edge.grade ? `${edge.grade.su} ${edge.pick}` : edge.pick}
        </Badge>
      </button>
      {shown ? (
        <div className="rounded-b-xl border-t border-border bg-raised px-4 py-4">
          <FactorBars factors={edge.factors} />
          <p className="mt-3 text-sm">
            ATS {edge.ats.lean === "yes" ? edge.ats.side : "pass"} · Total {edge.total.lean} · {edge.agree} cappers
            agree.
          </p>
          {edge.grade ? (
            <p className="mt-1 font-mono text-xs text-muted">
              Graded SU {edge.grade.su} · ATS {edge.grade.ats} · O/U vs posted {edge.grade.ou} (O = over hit)
            </p>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </div>
  );
}
