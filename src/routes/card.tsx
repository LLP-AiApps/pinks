import { createFileRoute } from "@tanstack/react-router";
import { CARD_OVERS, GAMES, SNAPSHOT } from "@/data/slate";
import { cn } from "@/lib/utils";
import { HelpRow } from "@/components/help-tip";

export const Route = createFileRoute("/card")({ component: CardPage });

const SQUARES = Array.from({ length: 32 }, (_, i) => i + 1);

const LABELS: Record<number, string> = {};
for (const g of GAMES) {
  if (g.cardAway) LABELS[g.cardAway] = `${g.away} ${g.awayCity}`;
  if (g.cardHome) LABELS[g.cardHome] = `${g.home} ${g.homeCity}`;
}
LABELS[27] = "Sun Over 37½";
LABELS[28] = "Sun Under 37½";
LABELS[31] = "Mon Over 37½";
LABELS[32] = "Mon Under 37½";

function CardPage() {
  const blots = new Set(SNAPSHOT.cardBlots);
  return (
    <main className="flex flex-col gap-6">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Pool card · 32 squares</p>
        <HelpRow id="card">
          <h1 className="mt-1 font-display text-3xl tracking-tight">Ink the sheet</h1>
        </HelpRow>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Every lounge in town runs this same 32-square. Started on a Bogey’s Ann Rd copy. The blot
          is Pinks. Ties count as wins. Closest to Monday night total takes a split. Desk write{" "}
          {SNAPSHOT.mnfTotal}.
        </p>
      </header>
      <div className="card-leather card-lace rounded-xl p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="h-px flex-1 bg-lace/30" />
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-lace/70">
            ink the squares
          </span>
          <span className="h-px flex-1 bg-lace/30" />
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {SQUARES.map((n) => {
            const on = blots.has(n);
            return (
              <div
                key={n}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center rounded-md px-1 py-2 text-center",
                  on
                    ? "bg-lace text-leather-deep"
                    : "bg-black/20 text-lace/70 shadow-[inset_0_0_0_1px_rgba(243,239,230,0.12)]",
                )}
              >
                <span className="font-mono text-sm tabular-nums">{n}</span>
                <span className="mt-0.5 line-clamp-2 text-[0.625rem] leading-tight">
                  {LABELS[n] ?? ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <section className="rounded-xl bg-surface p-5 text-sm shadow-[var(--shadow-border)]">
        <p>
          Sunday total: {CARD_OVERS.sunday.pick.toUpperCase()} {CARD_OVERS.sunday.line}.{" "}
          {CARD_OVERS.sunday.note}
        </p>
        <p className="mt-2">
          Monday total: {CARD_OVERS.monday.pick.toUpperCase()} {CARD_OVERS.monday.line}, project{" "}
          {CARD_OVERS.monday.projected}. {CARD_OVERS.monday.note}
        </p>
      </section>
    </main>
  );
}
