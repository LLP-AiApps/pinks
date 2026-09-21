import { GAMES, WEEK1_GAMES, type Game } from "@/data/slate";
import { homeSpread, type Grade } from "@/lib/engine";

export type TapeRow = {
  id: string;
  away: string;
  home: string;
  ourPick: string;
  /** Spread quoted on ourPick (negative = favored). */
  pickSpread: number;
  ourScore: string;
  final: string;
  finalAway: number | null;
  finalHome: number | null;
  predictedTotal: number | null;
  actualTotal: number | null;
  /** predicted − actual; null if either side missing. */
  totalDiff: number | null;
  ml: Grade;
  ats: Grade;
  week: 1 | 2;
};

/** First two numbers in ourScore (e.g. "27-17" or "SF 24 – LAR 17"). */
export function parseOurScoreTotal(ourScore: string): number | null {
  const nums = ourScore.match(/\d+/g);
  if (!nums || nums.length < 2) return null;
  return Number(nums[0]) + Number(nums[1]);
}

function gradeFollowUs(g: Game): { ml: Grade; ats: Grade } {
  if (g.status !== "final" || g.finalAway == null || g.finalHome == null) {
    return { ml: "—", ats: "—" };
  }
  const winner =
    g.finalHome > g.finalAway ? g.home : g.finalAway > g.finalHome ? g.away : "TIE";
  const ml: Grade = winner === "TIE" ? "P" : winner === g.ourPick ? "W" : "L";

  const hs = homeSpread(g);
  const margin = g.finalHome - g.finalAway + hs;
  const atsPush = Math.abs(margin) < 0.01;
  const atsCoverHome = margin > 0.01;
  const homeCovered: Grade = atsPush ? "P" : atsCoverHome ? "W" : "L";
  const pickIsHome = g.ourPick === g.home;
  const ats: Grade = atsPush ? "P" : pickIsHome ? homeCovered : homeCovered === "W" ? "L" : "W";

  return { ml, ats };
}

function toRow(g: Game, week: 1 | 2): TapeRow {
  const hs = homeSpread(g);
  const pickSpread = g.ourPick === g.home ? hs : -hs;
  const predictedTotal = parseOurScoreTotal(g.ourScore);
  const actualTotal =
    g.finalAway != null && g.finalHome != null ? g.finalAway + g.finalHome : null;
  const totalDiff =
    predictedTotal != null && actualTotal != null ? predictedTotal - actualTotal : null;
  const { ml, ats } = gradeFollowUs(g);
  return {
    id: g.id,
    away: g.away,
    home: g.home,
    ourPick: g.ourPick,
    pickSpread,
    ourScore: g.ourScore,
    final: g.final ?? "—",
    finalAway: g.finalAway ?? null,
    finalHome: g.finalHome ?? null,
    predictedTotal,
    actualTotal,
    totalDiff,
    ml,
    ats,
    week,
  };
}

export function week1Tape(): TapeRow[] {
  return WEEK1_GAMES.map((g) => toRow(g, 1));
}

/** Graded Week 2 games only (MNF left open until final). */
export function week2Tape(): TapeRow[] {
  return GAMES.filter((g) => g.status === "final").map((g) => toRow(g, 2));
}

/** Season tape: Week 2 finals first, then Week 1. */
export function seasonTape(): TapeRow[] {
  return [...week2Tape(), ...week1Tape()];
}

export function formatSpread(n: number): string {
  if (n > 0) return `+${n}`;
  return String(n);
}

export function formatTotalDiff(diff: number | null): string {
  if (diff == null) return "—";
  const abs = Math.abs(diff);
  if (abs < 0.01) return "exact";
  return `off by ${abs}`;
}

export function gradeWord(g: Grade, kind: "ml" | "ats"): string {
  if (g === "—") return "—";
  if (g === "W") return "Won";
  if (g === "L") return "Lost";
  if (g === "P") return kind === "ats" ? "Push" : "Tie";
  return g;
}
