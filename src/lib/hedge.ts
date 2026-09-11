import { GAMES } from "@/data/slate";
import type { SlipLeg } from "@/store/book";
import { americanToDecimal, parlayPayout } from "@/lib/odds";

export type HedgePlan = {
  weakPick: string;
  against: string;
  againstMl: number;
  matchup: string;
  stake: number;
  ifParlayHits: number;
  ifHedgeHits: number;
  worth: boolean;
  note: string;
};

export function planHedge(legs: SlipLeg[], parlayStake: number): HedgePlan | null {
  if (legs.length < 2 || parlayStake <= 0) return null;
  const rows = legs
    .map((leg) => {
      const g = GAMES.find((x) => x.id === leg.gameId);
      if (!g) return null;
      const against = leg.pick === g.home ? g.away : g.home;
      const againstMl = leg.pick === g.home ? g.mlAway : g.mlHome;
      return { leg, against, againstMl, matchup: `${g.away} @ ${g.home}`, risk: g.ourProb };
    })
    .filter((r): r is NonNullable<typeof r> => r != null);
  if (!rows.length) return null;

  const weak = rows.slice().sort((a, b) => a.risk - b.risk || b.leg.ml - a.leg.ml)[0]!;
  const d = americanToDecimal(weak.againstMl);
  if (d <= 1) return null;
  const hedgeStake = Math.max(1, Math.round(parlayStake / (d - 1)));
  const collect = parlayPayout(
    legs.map((l) => l.ml),
    parlayStake,
  );
  const ifParlayHits = Math.round(collect - parlayStake - hedgeStake);
  const ifHedgeHits = Math.round(hedgeStake * (d - 1) - parlayStake);
  const worth = ifParlayHits > 0;
  const note = worth
    ? `Bet ${weak.against} moneyline to cover the pink ticket if ${weak.leg.pick} is the one that dies. Circa or Pinnacle for the single — not the parlay window.`
    : `Hedge on ${weak.against} eats the parlay. Drop ${weak.leg.pick} instead of hedging.`;

  return {
    weakPick: weak.leg.pick,
    against: weak.against,
    againstMl: weak.againstMl,
    matchup: weak.matchup,
    stake: hedgeStake,
    ifParlayHits,
    ifHedgeHits,
    worth,
    note,
  };
}
