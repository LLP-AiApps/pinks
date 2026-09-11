import { BOOKS, GAMES, type BookId } from "@/data/slate";
import { PUBLIC } from "@/data/market";
import { allEdges, type GameEdge } from "@/lib/engine";
import { formatAmerican } from "@/lib/odds";

export type Style = "lock" | "blend" | "flyer";
export type BookPref = Extract<BookId, "southpoint" | "stations" | "circa">;

export type Profile = {
  maxLegs: 3 | 4 | 5 | 6;
  style: Style;
  book: BookPref;
  hedge: boolean;
  fadePublic: boolean;
  stake: number;
};

export const DEFAULT_PROFILE: Profile = {
  maxLegs: 3,
  style: "blend",
  book: "southpoint",
  hedge: true,
  fadePublic: true,
  stake: 50,
};

export type PinkLeg = {
  gameId: string;
  pick: string;
  ml: number;
  line: string;
  matchup: string;
  personal: number;
  why: string;
};

export type PinkTicket = {
  title: string;
  legs: PinkLeg[];
  book: BookPref;
  bookName: string;
  bookPlace: string;
  bookWhy: string;
  stake: number;
  floor: string;
  vsHouse: string;
};

const FLOOR: Record<Style, { minProb: number; minConf: number; label: string }> = {
  lock: { minProb: 0.7, minConf: 4, label: "Locks only — 70%+ blend, 4-star desk" },
  blend: { minProb: 0.62, minConf: 3, label: "Desk + engine. 62% floor. Extra rungs are marked." },
  flyer: { minProb: 0.58, minConf: 3, label: "Will take a 58% side to fill the extra rungs." },
};

function personalScore(edge: GameEdge, profile: Profile): { score: number; why: string } {
  let score = edge.suProb;
  const bits: string[] = [`Engine ${Math.round(edge.suProb * 100)}%`];
  const pub = PUBLIC[edge.game.id];
  if (profile.fadePublic && pub && pub.betPct >= 65) {
    if (pub.side === edge.pick) {
      score -= 0.04;
      bits.push(`public ${pub.betPct}% on this side — haircut`);
    } else {
      score += 0.03;
      bits.push(`public piled on ${pub.side} — mild fade`);
    }
  }
  if (profile.style === "lock" && edge.game.confidence >= 5) {
    score += 0.02;
    bits.push("five-star desk");
  }
  if (profile.style === "flyer" && edge.suProb < 0.65) {
    bits.push("flyer rung");
  }
  return { score, why: bits.join(" · ") };
}

export function buildPinkTicket(profile: Profile, edges = allEdges()): PinkTicket {
  const { minProb, minConf, label } = FLOOR[profile.style];
  const live = edges.filter((e) => e.game.status !== "final");
  const scored = live
    .map((e) => {
      const p = personalScore(e, profile);
      return { e, ...p };
    })
    .sort((a, b) => b.score - a.score || b.e.game.confidence - a.e.game.confidence);

  const above = scored.filter(({ e, score }) => score >= minProb && e.game.confidence >= minConf);
  const below = scored.filter((row) => !above.includes(row));
  const preferred = below.filter(({ e }) => e.game.parlaySafe);
  const rest = below.filter(({ e }) => !e.game.parlaySafe);
  const take = [...above, ...preferred, ...rest].slice(0, profile.maxLegs);
  const book = BOOKS.find((b) => b.id === profile.book) ?? BOOKS[2]!;

  const legs: PinkLeg[] = take.map(({ e, score, why }, i) => {
    const g = e.game;
    const ml = e.pick === g.home ? g.mlHome : g.mlAway;
    const overFloor = score >= minProb && g.confidence >= minConf;
    return {
      gameId: g.id,
      pick: e.pick,
      ml,
      line: `${g.away} @ ${g.home}`,
      matchup: `${g.away} @ ${g.home}`,
      personal: score,
      why: overFloor ? why : `Rung ${i + 1} — below the floor. ${why}`,
    };
  });

  const house3 = ["cle-jax", "no-det", "ari-lac"];
  const overlap = legs.filter((l) => house3.includes(l.gameId)).length;
  const extra = Math.max(0, legs.length - above.length);
  const vsHouse =
    legs.length === 0
      ? "Nothing left on the board."
      : extra > 0
        ? `${above.length} cleared the floor. ${extra} extra rung${extra === 1 ? "" : "s"} filled so this is a ${legs.length}-teamer.`
        : overlap === legs.length
          ? "Same sides as the house 3-teamer. Your settings did not change the core."
          : `You overlap the house 3-teamer on ${overlap} of ${legs.length}. The rest is you.`;

  const bookWhy =
    profile.book === "stations"
      ? "Neighborhood window. Read their card — not South Point’s sheet."
      : profile.book === "circa"
        ? "Circa is for the hedge and singles. Their parlay juice is not the 3–6 play."
        : "South Point / Rampart same sheet. Best 3–6 moneyline parlay in town.";

  return {
    title: `Your ${legs.length}-teamer`,
    legs,
    book: profile.book,
    bookName: book.name,
    bookPlace: book.place,
    bookWhy,
    stake: profile.stake,
    floor: label,
    vsHouse,
  };
}

export function legLine(leg: PinkLeg) {
  const g = GAMES.find((x) => x.id === leg.gameId);
  if (!g) return formatAmerican(leg.ml);
  return `${leg.pick} ML ${formatAmerican(leg.ml)}`;
}
