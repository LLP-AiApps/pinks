import { createFileRoute } from "@tanstack/react-router";
import { ANALYSTS } from "@/data/analysts";
import { GAMES } from "@/data/slate";
import { cn } from "@/lib/utils";
import { HelpRow } from "@/components/help-tip";

export const Route = createFileRoute("/analysts")({ component: AnalystsPage });

const LIVE = GAMES.filter((g) => g.status === "sun" || g.status === "mon" || g.status === "tonight");

function AnalystsPage() {
  return (
    <main className="flex flex-col gap-6">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Public cappers</p>
        <HelpRow id="analysts">
          <h1 className="mt-1 font-display text-3xl tracking-tight">Side by side</h1>
        </HelpRow>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Ranked by verified SU / unit claims we could source this week. Desk is the consensus after
          weighting Cohen, the SportsLine model, and Cote over Covers dogs.
        </p>
      </header>

      <ol className="grid gap-3 md:grid-cols-2">
        {ANALYSTS.map((a) => (
          <li key={a.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-xl">
                {a.rank}. {a.name}
              </h2>
              <span className="font-mono text-xs text-muted">{a.shop}</span>
            </div>
            <p className="mt-2 font-mono text-xs text-win">{a.record}</p>
            <p className="mt-1 text-sm text-muted">{a.roi}</p>
            <p className="mt-3 text-sm">{a.note}</p>
          </li>
        ))}
      </ol>

      <div className="overflow-x-auto rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[52rem] text-left text-xs">
          <thead>
            <tr className="text-muted">
              <th className="px-2 py-2 font-medium">Game</th>
              <th className="px-2 py-2 font-medium">Desk</th>
              {ANALYSTS.map((a) => (
                <th key={a.id} className="px-2 py-2 font-medium">
                  {a.name.split(" ")[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LIVE.map((g) => (
              <tr key={g.id} className="border-t border-border">
                <td className="px-2 py-2 font-mono">
                  {g.away}@{g.home}
                </td>
                <td className="px-2 py-2 font-medium">{g.ourPick}</td>
                {ANALYSTS.map((a) => {
                  const pick = a.picks[g.id];
                  const agree = pick === g.ourPick;
                  return (
                    <td
                      key={a.id}
                      className={cn("px-2 py-2 font-mono", agree ? "text-fg" : "text-risk")}
                    >
                      {pick ?? "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted">
        Disagreements in rust: Cohen on Houston, Cote on Miami, Iyer on the Giants, Logan on the
        three Week 1 dogs. Desk faded those for the card; none of them belong on a 3–6 teamer.
      </p>
    </main>
  );
}
