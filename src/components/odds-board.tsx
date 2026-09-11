import { useEffect, useState } from "react";
import { GAMES } from "@/data/slate";
import { homeSpread } from "@/lib/engine";
import { pullOdds, type OddsPull, type PulledLine } from "@/lib/odds-pull";
import { formatAmerican } from "@/lib/odds";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const KEY = "pinks-odds-pull-v1";

function spreadLabel(home: string, n: number | null) {
  if (n == null) return "—";
  return n > 0 ? `${home} +${n}` : `${home} ${n}`;
}

function moved(snap: number, live: number | null) {
  if (live == null) return false;
  return Math.abs(live - snap) >= 0.5;
}

function LineCell({
  snap,
  live,
  kind,
  home,
}: {
  snap: number;
  live: number | null;
  kind: "spread" | "total" | "ml";
  home: string;
}) {
  const hot = moved(snap, live);
  const text =
    kind === "spread" ? spreadLabel(home, live) : kind === "total" ? (live == null ? "—" : String(live)) : live == null ? "—" : formatAmerican(live);
  return (
    <span className={cn("font-mono tabular-nums", hot && "text-accent")}>
      {text}
      {hot ? <span className="ml-1 text-[0.625rem] uppercase">moved</span> : null}
    </span>
  );
}

export function OddsBoard() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OddsPull | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as OddsPull;
      if (parsed?.ok && Array.isArray(parsed.games)) setResult(parsed);
    } catch {
      /* */
    }
  }, []);

  async function pull() {
    setBusy(true);
    setError(null);
    try {
      const out = (await pullOdds()) as OddsPull | { ok: false; error: string };
      if (!out.ok) {
        setError(out.error);
        return;
      }
      setResult(out);
      localStorage.setItem(KEY, JSON.stringify(out));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pull failed");
    } finally {
      setBusy(false);
    }
  }

  const live = GAMES.filter((g) => g.status !== "final");

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl">CBS / Circa</h2>
          <p className="mt-1 text-sm text-muted">
            Tap to pull. Not on load. Snapshot stays printed until you ask.
          </p>
        </div>
        <Button id="pull-odds" onClick={pull} disabled={busy}>
          {busy ? "Pulling" : "Pull CBS / Circa"}
        </Button>
      </div>
      {error ? (
        <p className="rounded-xl bg-surface px-4 py-3 text-sm text-risk shadow-[var(--shadow-border)]">
          {error}
        </p>
      ) : null}
      {result ? (
        <div className="overflow-x-auto rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[0.6875rem] text-muted">{result.asOf}</p>
          <p className="mt-1 font-display text-lg">{result.headline}</p>
          <table className="mt-3 w-full min-w-[36rem] text-left text-xs">
            <thead className="text-muted">
              <tr>
                <th className="pb-2 font-medium">Game</th>
                <th className="pb-2 font-medium">Snap</th>
                <th className="pb-2 font-medium">CBS</th>
                <th className="pb-2 font-medium">Circa</th>
                <th className="pb-2 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {live.map((g) => {
                const row = result.games.find((x) => x.gameId === g.id);
                const cbs: PulledLine = row?.cbs ?? { spread: null, total: null, mlHome: null, mlAway: null };
                const snapSp = homeSpread(g);
                return (
                  <tr key={g.id} className="border-t border-border">
                    <td className="py-2 pr-3 font-sans">
                      {g.away} @ {g.home}
                    </td>
                    <td className="py-2 pr-3 font-mono tabular-nums text-muted">
                      {spreadLabel(g.home, snapSp)} · {g.total}
                    </td>
                    <td className="py-2 pr-3">
                      <LineCell snap={snapSp} live={cbs.spread} kind="spread" home={g.home} />
                      <span className="text-muted"> · </span>
                      <LineCell snap={g.total} live={cbs.total} kind="total" home={g.home} />
                    </td>
                    <td className="py-2 pr-3">
                      <LineCell snap={snapSp} live={row?.circa.spread ?? null} kind="spread" home={g.home} />
                      <span className="text-muted"> · </span>
                      <LineCell snap={g.total} live={row?.circa.total ?? null} kind="total" home={g.home} />
                    </td>
                    <td className="py-2 text-muted">{row?.note || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {result.games.some((g) => {
            const snap = GAMES.find((x) => x.id === g.gameId);
            if (!snap) return false;
            const hs = homeSpread(snap);
            return moved(hs, g.cbs.spread) || moved(hs, g.circa.spread);
          }) ? (
            <p className="mt-3">
              <Badge tone="accent">moved</Badge>
              <span className="ml-2 text-sm text-muted">Half-point or more off our snapshot.</span>
            </p>
          ) : null}
          {result.citations.length ? (
            <ul className="mt-3 flex flex-col gap-1">
              {result.citations.map((c) => (
                <li key={c} className="truncate font-mono text-[0.6875rem] text-muted">
                  <a href={c} target="_blank" rel="noreferrer" className="hover:text-accent">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-muted">No pull yet. CBS Sports odds and Circa — those two, when you ask.</p>
      )}
    </section>
  );
}
