/** Action Network / CBS public tickets as of Thu Sep 10 2026 evening. Missing = unknown, no fade. */
export type PublicSplit = {
  side: string;
  betPct: number;
  moneyPct?: number;
  note?: string;
};

export const PUBLIC: Record<string, PublicSplit> = {
  "chi-car": { side: "CHI", betPct: 69, note: "Public on the road favorite." },
  "tb-cin": { side: "TB", betPct: 55, moneyPct: 66, note: "Tickets mixed, money on Tampa." },
  "bal-ind": { side: "BAL", betPct: 65 },
  "gb-min": { side: "MIN", betPct: 58, note: "Public on Kyler home." },
  "den-kc": { side: "DEN", betPct: 69, note: "69% of tickets on Denver +2.5." },
  "nyj-ten": { side: "TEN", betPct: 52, moneyPct: 62, note: "Money on Titans, tickets closer." },
};
