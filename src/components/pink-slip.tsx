import type { SavedSlip } from "@/store/book";
import { planHedge } from "@/lib/hedge";
import { formatAmerican, formatAmericanFromDecimal, formatMoney, parlayDecimal, parlayPayout } from "@/lib/odds";

export function PinkSlip({ slip }: { slip: SavedSlip }) {
  const mls = slip.legs.map((l) => l.ml);
  const dec = mls.length ? parlayDecimal(mls) : 1;
  const payout = mls.length ? parlayPayout(mls, slip.stake) : 0;
  const hedge = planHedge(slip.legs, slip.stake);
  const when = new Date(slip.at);
  const stamped = Number.isNaN(when.getTime())
    ? slip.at
    : when.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });

  return (
    <article id={`slip-${slip.id}`} className="pink-slip break-inside-avoid">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-sm bg-leather-deep font-display text-sm text-lace">
            P
          </span>
          <div>
            <p className="font-display text-xl leading-none text-leather-deep">Pinks</p>
            <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-widest text-leather-deep/70">
              The pink ticket
            </p>
          </div>
        </div>
        <p className="font-mono text-sm tabular-nums text-leather-deep">#{slip.rot}</p>
      </header>
      <ol className="mt-4 flex flex-col gap-1.5 border-y border-dashed border-leather-deep/30 py-3">
        {slip.legs.map((leg) => (
          <li key={leg.gameId} className="flex items-baseline justify-between gap-3 font-mono text-sm text-leather-deep">
            <span>
              {leg.pick}
              {hedge?.weakPick === leg.pick ? (
                <span className="ml-2 text-[0.625rem] uppercase tracking-wide opacity-80">weak</span>
              ) : null}
              <span className="ml-2 text-[0.6875rem] opacity-70">· {leg.line}</span>
            </span>
            <span className="tabular-nums">{formatAmerican(leg.ml)}</span>
          </li>
        ))}
      </ol>
      <dl className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs text-leather-deep">
        <div>
          <dt className="opacity-60">Stake</dt>
          <dd className="text-base tabular-nums">{formatMoney(slip.stake)}</dd>
        </div>
        <div className="text-right">
          <dt className="opacity-60">To collect</dt>
          <dd className="text-base tabular-nums">{formatMoney(payout)}</dd>
        </div>
        <div>
          <dt className="opacity-60">Price</dt>
          <dd>{formatAmericanFromDecimal(dec)}</dd>
        </div>
        <div className="text-right">
          <dt className="opacity-60">Stamp</dt>
          <dd>{slip.bookName}</dd>
        </div>
      </dl>
      {hedge ? (
        <div className="mt-4 border-t border-dashed border-leather-deep/30 pt-3 text-leather-deep">
          <p className="font-mono text-[0.625rem] uppercase tracking-widest opacity-70">Hedge the weak leg</p>
          <p className="mt-1 font-display text-base">
            {hedge.against} {formatAmerican(hedge.againstMl)} · {formatMoney(hedge.stake)}
          </p>
          <p className="mt-1 font-mono text-xs">
            If parlay hits: {hedge.ifParlayHits >= 0 ? "+" : ""}
            {formatMoney(hedge.ifParlayHits)} after the hedge. If {hedge.against} wins:{" "}
            {Math.abs(hedge.ifHedgeHits) < 2 ? "about even" : formatMoney(hedge.ifHedgeHits)}.
          </p>
          <p className="mt-2 text-sm leading-snug">{hedge.note}</p>
        </div>
      ) : null}
      <p className="mt-4 font-display text-sm text-leather-deep">Tickets go as written.</p>
      <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-widest text-leather-deep/60">
        {stamped} · {slip.bookPlace} · 21+
      </p>
    </article>
  );
}
