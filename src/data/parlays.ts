import type { BookId } from "@/data/slate";

export type ParlayPreset = {
  legs: number;
  gameIds: string[];
  title: string;
  safe: string;
  risk: string;
  hedge: string;
  book: BookId;
  bookWhy: string;
};

export const PRESETS: ParlayPreset[] = [
  {
    legs: 3,
    gameIds: ["cle-jax", "no-det", "ari-lac"],
    title: "Three-teamer · chalk core",
    safe: "Three home (or functional home) mismatches. Combined desk win rate ~52% independent. Jags, Lions, Chargers are the only 75%+ sides on the card.",
    risk: "JAX −8.5 with Watson can still be a one-score slog. LAC laying 9.5 can look ugly if Herbert sits a series. Independence is a lie — Week 1 variance clusters.",
    hedge: "None required. If you must, a $20 ARI +400 at Bovada only if Love is upgraded to starter.",
    book: "southpoint",
    bookWhy: "South Point / Rampart same sheet. Stations (Red Rock, GVR, Durango, Palace…) is closer for most of the valley — different book, shop the card.",
  },
  {
    legs: 4,
    gameIds: ["cle-jax", "no-det", "ari-lac", "was-phi"],
    title: "Four-teamer · add the Linc",
    safe: "Eagles have owned Washington with Hurts. Model's second-strongest sim. Four of five-star / four-star desks.",
    risk: "No AJ Brown. Commanders can still hang 24. Four legs of −200-and-up juice eats the ticket if any favorite lays an egg.",
    hedge: "WAS +190 at Circa, ~30% of the parlay stake, if you only fear Philadelphia.",
    book: "southpoint",
    bookWhy: "South Point / Rampart same sheet. Stations is closer for most of the valley — different book, shop the 4-leg card.",
  },
  {
    legs: 5,
    gameIds: ["cle-jax", "no-det", "ari-lac", "was-phi", "tb-cin"],
    title: "Five-teamer · Burrow home",
    safe: "Chase and Higgins full. Lawrence in the middle. Home opener. Highest-scoring posted game, which helps a ML (not a cover).",
    risk: "Mayfield can steal a shootout. Cincy Week 1 history is slow. This is the first real 'favorite can lose outright' on the ticket.",
    hedge: "TB +164 at Circa or Pinnacle. Size: 25–30% of parlay stake. If Tua is OUT, swap CIN for PIT on the ticket instead.",
    book: "southpoint",
    bookWhy: "Five-leg juice is why South Point still beats the apps. Stations: walk in, read their card.",
  },
  {
    legs: 6,
    gameIds: ["cle-jax", "no-det", "ari-lac", "was-phi", "tb-cin", "chi-car"],
    title: "Six-teamer · Bears road",
    safe: "Still all desk leans with ≥61% win rate. No BUF/HOU, no GB/MIN, no KC/DEN, no Jets/Titans.",
    risk: "CHI is the road favorite with Odunze questionable and no DJ Moore. Six independent 70% coins is ~12–15% after juice. This is a flyer, not a mortgage.",
    hedge: "CAR +130 at Circa is the clean single-team hedge. Alternate: if Friday's report has Odunze OUT, drop CHI and stop at 5.",
    book: "southpoint",
    bookWhy: "Best posted 6-leg ML at South Point / Rampart. Bovada if you are not in Nevada. Stations is not this sheet.",
  },
];
