export type Lane = "injury" | "odds" | "public" | "picks" | "scores" | "history" | "x";

export type Source = {
  handle?: string;
  name: string;
  role: string;
  kind: "X" | "Web";
  url: string;
  lane: Lane;
  /** In the blend. False = listed, not queried every pull. */
  use: boolean;
  why: string;
};

/** Primary X handles Grok searches on a live pull (cap 20). */
export const X_HANDLES = [
  "AdamSchefter",
  "RapSheet",
  "TomPelissero",
  "MikeGarafolo",
  "JayGlazer",
  "FieldYates",
  "DiannaRussini",
  "AlbertBreer",
  "JosinaAnderson",
  "JeremyFowlerESPN",
  "ProFootballTalk",
  "NFL",
  "nflnetwork",
  "ActionNetworkHQ",
  "SportsLine",
  "VegasInsider",
  "CircaSports",
  "Covers",
  "PFF",
] as const;

export const SOURCES: Source[] = [
  { handle: "AdamSchefter", name: "Adam Schefter", role: "ESPN — breaking", kind: "X", url: "https://x.com/AdamSchefter", lane: "x", use: true, why: "First on trades and IR." },
  { handle: "RapSheet", name: "Ian Rapoport", role: "NFL Network — injuries", kind: "X", url: "https://x.com/RapSheet", lane: "x", use: true, why: "Injury timelines." },
  { handle: "TomPelissero", name: "Tom Pelissero", role: "NFL Network — roster", kind: "X", url: "https://x.com/TomPelissero", lane: "x", use: true, why: "Practice / QB2." },
  { handle: "MikeGarafolo", name: "Mike Garafolo", role: "NFL Network — injury report", kind: "X", url: "https://x.com/MikeGarafolo", lane: "x", use: true, why: "Friday inactives." },
  { handle: "JayGlazer", name: "Jay Glazer", role: "FOX — locker room", kind: "X", url: "https://x.com/JayGlazer", lane: "x", use: true, why: "Noise that sometimes is real." },
  { handle: "FieldYates", name: "Field Yates", role: "ESPN — usage", kind: "X", url: "https://x.com/FieldYates", lane: "x", use: true, why: "Snap / target clues." },
  { handle: "NFL", name: "NFL", role: "Official scores", kind: "X", url: "https://x.com/NFL", lane: "x", use: true, why: "Finals." },
  { handle: "ActionNetworkHQ", name: "Action Network", role: "Public splits", kind: "X", url: "https://x.com/ActionNetworkHQ", lane: "x", use: true, why: "Tickets vs money." },
  { handle: "CircaSports", name: "Circa Sports", role: "Vegas board", kind: "X", url: "https://x.com/CircaSports", lane: "x", use: true, why: "The number in this town." },
  {
    name: "NFL.com",
    role: "Schedule, scores, injury report",
    kind: "Web",
    url: "https://www.nfl.com/schedules/",
    lane: "scores",
    use: true,
    why: "Official. Free. This is the spine.",
  },
  {
    name: "NFL.com injuries",
    role: "Practice reports",
    kind: "Web",
    url: "https://www.nfl.com/injuries/",
    lane: "injury",
    use: true,
    why: "DNP / LP / FP is the only injury language that matters Friday.",
  },
  {
    name: "ESPN NFL",
    role: "Scores + box",
    kind: "Web",
    url: "https://www.espn.com/nfl/",
    lane: "scores",
    use: true,
    why: "Fast finals. Duplicate of NFL.com, kept as a second clock.",
  },
  {
    name: "CBS Sports NFL",
    role: "Odds, inactives, schedule",
    kind: "Web",
    url: "https://www.cbssports.com/nfl/",
    lane: "odds",
    use: true,
    why: "Free consensus board. Primary line shop input.",
  },
  {
    name: "Action Network public",
    role: "% of bets vs % of money",
    kind: "Web",
    url: "https://www.actionnetwork.com/nfl/public-betting",
    lane: "public",
    use: true,
    why: "The one public-split page worth a click. Fade 65%+ on short numbers.",
  },
  {
    name: "SportsLine",
    role: "Model + cappers",
    kind: "Web",
    url: "https://www.sportsline.com/nfl/",
    lane: "picks",
    use: true,
    why: "Free headlines only. We already store Cohen / model / Hartstein. No paywall scrape.",
  },
  {
    name: "Covers",
    role: "ATS trends, Week 1 dogs",
    kind: "Web",
    url: "https://www.covers.com/nfl",
    lane: "history",
    use: true,
    why: "Free ATS tables. Logan’s dog list is a fade check, not a card.",
  },
  {
    name: "VegasInsider",
    role: "Odds backup",
    kind: "Web",
    url: "https://www.vegasinsider.com/nfl/",
    lane: "odds",
    use: false,
    why: "Same board as CBS. Skip unless CBS is down.",
  },
  {
    name: "NBC Sports",
    role: "Recaps",
    kind: "Web",
    url: "https://www.nbcsports.com/nfl",
    lane: "scores",
    use: false,
    why: "Story, not a number. Skip.",
  },
  {
    name: "USA TODAY odds hub",
    role: "Aggregator",
    kind: "Web",
    url: "https://sportsdata.usatoday.com",
    lane: "odds",
    use: false,
    why: "Duplicate. Skip.",
  },
];

export const WEB_HINT =
  "nfl.com, espn.com, cbssports.com, actionnetwork.com, sportsline.com, covers.com";
