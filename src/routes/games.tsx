import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BOOKS, GAMES, type Game } from "@/data/slate";
import { Badge } from "@/components/ui/badge";
import { formatAmerican, formatPct } from "@/lib/odds";
import { cn } from "@/lib/utils";
import { HelpRow } from "@/components/help-tip";

export const Route = createFileRoute("/games")({ component: GamesPage });

function GamesPage() {
  const [open, setOpen] = useState<string | null>(GAMES.find((g) => g.status === "sun")?.id ?? null);
  return (
    <main className="flex flex-col gap-6">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Slate</p>
        <HelpRow id="games">
          <h1 className="mt-1 font-display text-3xl tracking-tight">Every number, every book</h1>
        </HelpRow>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Consensus from DraftKings, FanDuel, Circa, Westgate, South Point, BetMGM, Pinnacle, Bovada.
          Click a row for injuries, history, and the hedge.
        </p>
      </header>
      <ul className="flex flex-col gap-2">
        {GAMES.map((g) => (
          <li key={g.id}>
            <button
              type="button"
              onClick={() => setOpen(open === g.id ? null : g.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]",
                open === g.id && "rounded-b-none",
              )}
            >
              <span className="w-16 shrink-0 font-mono text-[0.6875rem] uppercase text-muted">
                {g.window.split(" ")[0]}
              </span>
              <span className="min-w-0 flex-1 font-medium">
                {g.away} @ {g.home}
                {g.final ? <span className="ml-2 text-muted">{g.final}</span> : null}
              </span>
              <span className="hidden font-mono text-sm tabular-nums text-muted sm:inline">
                {g.spread > 0 ? `${g.home} +${g.spread}` : `${g.home} ${g.spread}`}
              </span>
              <Badge tone={g.parlaySafe ? "win" : "neutral"}>{g.ourPick}</Badge>
            </button>
            {open === g.id ? <GameDetail game={g} /> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}

function GameDetail({ game }: { game: Game }) {
  const ml = game.ourPick === game.home ? game.mlHome : game.mlAway;
  return (
    <div className="rounded-b-xl border-t border-border bg-raised px-4 py-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">{formatPct(game.ourProb)} desk</Badge>
        <Badge>{formatAmerican(ml)}</Badge>
        <Badge>O/U {game.total}</Badge>
        <Badge>Conf {game.confidence}/5</Badge>
        {game.cardBlot ? <Badge tone="win">Blot {game.cardBlot}</Badge> : null}
      </div>
      <p className="mt-4 text-sm leading-relaxed">{game.why}</p>
      <p className="mt-2 text-sm text-muted">{game.history}</p>
      <p className="mt-1 text-sm text-muted">{game.form}</p>
      {game.hedge ? (
        <p className="mt-3 text-sm">
          <span className="text-muted">Hedge · </span>
          {game.hedge}
        </p>
      ) : null}
      {game.injuries.length ? (
        <ul className="mt-4 flex flex-col gap-1">
          {game.injuries.map((inj) => (
            <li key={inj.player} className="flex gap-2 text-sm">
              <span className="font-mono text-xs text-risk">{inj.status}</span>
              <span>
                {inj.player}{" "}
                <span className="text-muted">
                  {inj.pos} · {inj.team} · {inj.note}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-xs">
          <thead className="text-muted">
            <tr>
              <th className="pb-2 font-medium">Book</th>
              <th className="pb-2 font-medium">Spread</th>
              <th className="pb-2 font-medium">ML fav</th>
              <th className="pb-2 font-medium">ML dog</th>
              <th className="pb-2 font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {BOOKS.map((b) => {
              const row = game.books[b.id];
              return (
                <tr key={b.id} className="border-t border-border">
                  <td className="py-2 pr-3 font-sans">{b.name}</td>
                  <td>{row.spread}</td>
                  <td>{formatAmerican(row.mlFav)}</td>
                  <td>{formatAmerican(row.mlDog)}</td>
                  <td>{row.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
