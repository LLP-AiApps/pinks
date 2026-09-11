import { timingSafeEqual } from "node:crypto";

/** Family door. Server only — still in the repo if GitHub is public. Not encryption. */
const HOUSE = "Cletus";

export function houseOk(code: string): boolean {
  const a = Buffer.from(String(code ?? "").trim());
  const b = Buffer.from(HOUSE);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
