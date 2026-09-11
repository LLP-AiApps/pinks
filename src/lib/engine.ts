import { ANALYSTS } from "@/data/analysts";
import { PUBLIC } from "@/data/market";
import { GAMES, type Game, type Injury } from "@/data/slate";
import { americanToImplied } from "@/lib/odds";

export type Factor = {
  id: string;
  label: string;
  weight: number;
  /** 0–1 contribution toward the engine's SU pick (home-neutral: share on pick). */
  score: number;
  note: string;
};

export type Grade = "W" | "L" | "P" | "—";

export type GameEdge = {
  game: Game;
  pick: string;
  dog: string;
  suProb: number;
  marketProb: number;
  ats: { side: string; line: number; lean: "yes" | "pass"; note: string };
  total: { lean: "over" | "under" | "pass"; note: string };
  play: boolean;
  factors: Factor[];
  agree: number;
  grade?: { su: Grade; ats: Grade; ou: Grade };
};

const W = {
  market: 0.32,
  consensus: 0.18,
  injury: 0.16,
  public: 0.12,
  situation: 0.12,
  desk: 0.1,
};

function clamp(n: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, n));
}

export function homeSpread(g: Game): number {
  const homeFavored = g.mlHome < g.mlAway;
  return homeFavored ? g.spread : -g.spread;
}

export function favorite(g: Game): string {
  return g.mlHome <= g.mlAway ? g.home : g.away;
}

function injuryHit(inj: Injury): number {
  const pos = inj.pos.toUpperCase();
  const base = pos === "QB" ? 0.18 : pos === "WR" || pos === "RB" || pos === "OT" || pos === "EDGE" || pos === "TE" ? 0.07 : 0.03;
  if (inj.status === "OUT") return base;
  if (inj.status === "Q") return base * 0.45;
  if (inj.status === "Limited") return base * 0.2;
  return 0;
}

function injuryScore(g: Game, pick: string): { score: number; note: string } {
  let delta = 0.5;
  const notes: string[] = [];
  for (const inj of g.injuries) {
    const hit = injuryHit(inj);
    if (!hit) continue;
    if (inj.team === pick) {
      delta -= hit;
      notes.push(`${inj.player} ${inj.status} −${hit.toFixed(2)}`);
    } else {
      delta += hit * 0.85;
      notes.push(`${inj.player} ${inj.status} vs`);
    }
  }
  return { score: clamp(delta), note: notes.slice(0, 3).join("; ") || "No material tags." };
}

function publicScore(g: Game, pick: string): { score: number; note: string } {
  const row = PUBLIC[g.id];
  if (!row) return { score: 0.5, note: "No split posted." };
  const onPick = row.side === pick;
  if (row.betPct >= 65 && Math.abs(g.spread) <= 3.5) {
    return onPick
      ? { score: 0.32, note: `${row.betPct}% tickets on ${row.side}. Fade the short-number public.` }
      : { score: 0.72, note: `${row.betPct}% tickets on ${row.side}. Fade toward ${pick}.` };
  }
  if (row.betPct >= 65) {
    return onPick
      ? { score: 0.42, note: `${row.betPct}% on ${row.side}. Chalk is crowded.` }
      : { score: 0.62, note: `${row.betPct}% on ${row.side}. Mild fade.` };
  }
  return { score: 0.5, note: `${row.betPct}% on ${row.side}${row.note ? ` · ${row.note}` : ""}.` };
}

function consensusScore(g: Game, pick: string): { score: number; note: string } {
  const picks = ANALYSTS.map((a) => a.picks[g.id]).filter(Boolean);
  if (!picks.length) return { score: 0.5, note: "No capper card." };
  const n = picks.filter((p) => p === pick).length;
  const pct = n / picks.length;
  return { score: pct, note: `${n}/${picks.length} cappers on ${pick}.` };
}

function situationScore(g: Game, pick: string): { score: number; note: string } {
  let s = 0.5;
  const notes: string[] = [];
  if (pick === g.home) {
    s += 0.06;
    notes.push("home");
  } else {
    s -= 0.04;
    notes.push("road");
  }
  if (g.id === "sf-lar") {
    s += pick === "SF" ? 0.12 : -0.12;
    notes.push("Rams landed 28h before kick");
  }
  if (g.status === "mon") {
    s += pick === g.home ? 0.03 : 0;
    notes.push("MNF Arrowhead");
  }
  return { score: clamp(s), note: notes.join(" · ") };
}

function fairHomeProb(g: Game): number {
  const pH = americanToImplied(g.mlHome);
  const pA = americanToImplied(g.mlAway);
  return pH / (pH + pA);
}

function parseScore(g: Game): { away: number; home: number } | null {
  if (g.finalAway != null && g.finalHome != null) return { away: g.finalAway, home: g.finalHome };
  return null;
}

function gradeGame(g: Game, pick: string, atsSide: string): GameEdge["grade"] | undefined {
  const sc = parseScore(g);
  if (!sc || g.status !== "final") return undefined;
  const winner = sc.home > sc.away ? g.home : sc.away > sc.home ? g.away : "TIE";
  const su: Grade = winner === "TIE" ? "P" : winner === pick ? "W" : "L";
  const hs = homeSpread(g);
  const margin = sc.home - sc.away + hs;
  const atsCoverHome = margin > 0.01;
  const atsPush = Math.abs(margin) < 0.01;
  const homeCovered = atsPush ? "P" : atsCoverHome ? "W" : "L";
  const atsPickIsHome = atsSide === g.home;
  const ats: Grade = atsPush ? "P" : atsPickIsHome ? (homeCovered as Grade) : homeCovered === "W" ? "L" : "W";
  const tot = sc.home + sc.away;
  const ou: Grade = tot === g.total ? "P" : tot > g.total ? "W" : "L";
  return { su, ats, ou };
}

export function scoreGame(g: Game): GameEdge {
  const mktHome = fairHomeProb(g);
  const fav = favorite(g);
  const dog = fav === g.home ? g.away : g.home;

  const deskPick = g.ourPick;
  const trial = deskPick;

  const cons = consensusScore(g, trial);
  const inj = injuryScore(g, trial);
  const pub = publicScore(g, trial);
  const sit = situationScore(g, trial);
  const mkt = trial === g.home ? mktHome : 1 - mktHome;

  const factors: Factor[] = [
    { id: "market", label: "Market", weight: W.market, score: mkt, note: `Fair ${Math.round(mkt * 100)}% on ${trial}.` },
    { id: "consensus", label: "Cappers", weight: W.consensus, score: cons.score, note: cons.note },
    { id: "injury", label: "Injuries", weight: W.injury, score: inj.score, note: inj.note },
    { id: "public", label: "Public", weight: W.public, score: pub.score, note: pub.note },
    { id: "situation", label: "Spot", weight: W.situation, score: sit.score, note: sit.note },
    { id: "desk", label: "Desk prior", weight: W.desk, score: g.ourProb, note: `Printed ${g.ourPick} ${g.confidence}/5.` },
  ];

  let suProb = factors.reduce((acc, f) => acc + f.weight * f.score, 0);
  let pick = trial;
  if (suProb < 0.5) {
    pick = trial === g.home ? g.away : g.home;
    suProb = 1 - suProb;
  }

  const hs = homeSpread(g);
  const coverNeed = Math.abs(hs);
  const atsLean: GameEdge["ats"] =
    suProb >= 0.58 && coverNeed <= 3.5
      ? { side: pick, line: pick === g.home ? hs : -hs, lean: "yes", note: "Short number, play the side." }
      : suProb >= 0.7 && coverNeed <= 7
        ? { side: pick, line: pick === g.home ? hs : -hs, lean: "yes", note: "Mismatch, lay it." }
        : { side: pick, line: pick === g.home ? hs : -hs, lean: "pass", note: "No ATS edge vs the number." };

  const total: GameEdge["total"] =
    g.total <= 41
      ? { lean: "under", note: "Posted low already — still a slog profile." }
      : g.total >= 49
        ? { lean: "over", note: "Highest totals. Only if both QBs are clean." }
        : { lean: "pass", note: "No total lean." };

  const play = g.status !== "final" && suProb >= 0.6 && atsLean.lean === "yes";
  const agree = ANALYSTS.filter((a) => a.picks[g.id] === pick).length;

  return {
    game: g,
    pick,
    dog,
    suProb,
    marketProb: mkt,
    ats: atsLean,
    total,
    play,
    factors,
    agree,
    grade: gradeGame(g, pick, atsLean.side),
  };
}

export function allEdges(): GameEdge[] {
  return GAMES.map(scoreGame);
}

export function seasonRecord(edges = allEdges()) {
  const graded = edges.filter((e) => e.grade);
  const tally = (key: "su" | "ats") => {
    const w = graded.filter((e) => e.grade?.[key] === "W").length;
    const l = graded.filter((e) => e.grade?.[key] === "L").length;
    const p = graded.filter((e) => e.grade?.[key] === "P").length;
    return { w, l, p, pct: w + l ? w / (w + l) : 0 };
  };
  const deskSu = GAMES.filter((g) => g.status === "final").reduce(
    (acc, g) => {
      const sc = parseScore(g);
      if (!sc) return acc;
      const winner = sc.home > sc.away ? g.home : g.away;
      if (winner === g.ourPick) acc.w += 1;
      else acc.l += 1;
      return acc;
    },
    { w: 0, l: 0 },
  );
  return { engine: { su: tally("su"), ats: tally("ats") }, desk: deskSu, n: graded.length };
}

export const WEIGHTS = W;
