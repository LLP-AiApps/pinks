export function americanToDecimal(ml: number): number {
  return ml > 0 ? ml / 100 + 1 : 100 / Math.abs(ml) + 1;
}

export function americanToImplied(ml: number): number {
  return ml < 0 ? Math.abs(ml) / (Math.abs(ml) + 100) : 100 / (ml + 100);
}

export function formatAmerican(ml: number): string {
  return ml > 0 ? `+${ml}` : String(ml);
}

export function parlayDecimal(mls: number[]): number {
  return mls.reduce((acc, ml) => acc * americanToDecimal(ml), 1);
}

export function parlayPayout(mls: number[], stake: number): number {
  return stake * parlayDecimal(mls);
}

export function formatMoney(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Math.abs(n) < 10 ? 2 : 0,
  });
}

export function formatPct(p: number): string {
  return `${Math.round(p * 1000) / 10}%`;
}

export function formatAmericanFromDecimal(dec: number): string {
  if (dec <= 1) return "even";
  if (dec >= 2) return `+${Math.round((dec - 1) * 100)}`;
  return `${Math.round(-100 / (dec - 1))}`;
}
