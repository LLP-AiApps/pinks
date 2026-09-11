export type LogKind = "ship" | "result" | "miss" | "record" | "feed";

export type LogEntry = {
  id: string;
  /** Sort key, newest first. */
  at: string;
  day: string;
  time: string;
  kind: LogKind;
  title: string;
  body: string;
  record?: { desk: string; engineSu: string; engineAts: string };
};

export const CHANGELOG: LogEntry[] = [
  {
    id: "2026-09-11-algos",
    at: "2026-09-11T00:55:00-07:00",
    day: "Fri Sep 11",
    time: "12:55 AM PT",
    kind: "ship",
    title: "Algorithms, without the cologne",
    body: "Learn and Engine now name Elo, Massey, Pythagorean, Kelly, CLV — and mark which six weights are actually on the desk. Week 1 is a market prior. Power ratings wait for Sunday.",
  },
  {
    id: "2026-09-11-odds",
    at: "2026-09-11T00:49:00-07:00",
    day: "Fri Sep 11",
    time: "12:49 AM PT",
    kind: "ship",
    title: "Pull CBS / Circa — not a ticker",
    body: "Games has a Pull CBS / Circa button. Grok looks those two up when you tap. Snapshot stays printed. Half-point moves get marked. Cached three minutes so we do not burn the key.",
  },
  {
    id: "2026-09-11-nav",
    at: "2026-09-11T00:31:00-07:00",
    day: "Fri Sep 11",
    time: "12:31 AM PT",
    kind: "ship",
    title: "Nav grouped — Board, Letter, Join",
    body: "Top row is Desk, Yours, Games, Parlays, then three menus. Letter holds the letter, Learn, How to use, What’s new, Sources, Studio. Join holds Join and Legal. Board is analysts, engine, wire, books, pool card. No more sideways hunt on a phone.",
  },
  {
    id: "2026-09-11-yours",
    at: "2026-09-11T00:22:00-07:00",
    day: "Fri Sep 11",
    time: "12:22 AM PT",
    kind: "ship",
    title: "Personalized Pink Ticket + factor bars",
    body: "Yours rebuilds the ladder from the engine with your style, legs, window, and a public haircut. Engine rows now show bars, not just numbers. Still a typed snapshot — Wire is the live pull. Not a 12-site ticker.",
  },
  {
    id: "2026-09-10-learn",
    at: "2026-09-10T23:08:00-07:00",
    day: "Thu Sep 10",
    time: "11:08 PM PT",
    kind: "ship",
    title: "Learn — members, sources, Grok vs humans",
    body: "Education hub: parlay ladder, weak-leg hedge, bankroll, Grok vs humans. Locked until Join (free, 21+, every disclaimer). Sources listed and linked. Tuition $0 — if we ever charge it is only APIs, posted first. Not a get-rich system.",
  },
  {
    id: "2026-09-10-letter",
    at: "2026-09-10T22:54:00-07:00",
    day: "Thu Sep 10",
    time: "10:54 PM PT",
    kind: "ship",
    title: "The letter, Join, and drafted Legal",
    body: "Daily desk writing is live on the site. Join requires every disclaimer box. Email and SMS are drafted and dark — nothing goes out until Join says the mailer is live. We will not rush a blast.",
  },
  {
    id: "2026-09-10-help",
    at: "2026-09-10T22:46:00-07:00",
    day: "Thu Sep 10",
    time: "10:46 PM PT",
    kind: "ship",
    title: "How to use — tap the ?",
    body: "A ? sits next to each heading. Tap it for what that section is and the buttons to press. Full walkthrough is How to use in the top row.",
  },
  {
    id: "2026-09-10-stations-hedge",
    at: "2026-09-10T22:40:00-07:00",
    day: "Thu Sep 10",
    time: "10:40 PM PT",
    kind: "ship",
    title: "Stations windows + hedge on every slip",
    body: "STN Sports listed with the neighborhood books (Red Rock, GVR, Durango, Palace, Sunset, Boulder, Santa Fe, Fiesta). South Point and Rampart share a sheet — Stations does not. Save now jumps you to the ticket. Each parlay prints a hedge on the weakest leg: cover the stake if it dies, stay green if the parlay hits.",
  },
  {
    id: "2026-09-10-tickets",
    at: "2026-09-10T22:23:00-07:00",
    day: "Thu Sep 10",
    time: "10:23 PM PT",
    kind: "ship",
    title: "Pinks mark + print the pink tickets",
    body: "Wordmark is PINKS with the salmon stub. Ford Field night stays. Parlays now saves more than one ticket on this phone. Print tickets sends paper or a PDF for the window — phones fail in books more than they should.",
  },
  {
    id: "2026-09-10-studio",
    at: "2026-09-10T22:04:00-07:00",
    day: "Thu Sep 10",
    time: "10:04 PM PT",
    kind: "ship",
    title: "Studio — palettes and materials",
    body: "Grass and pigskin were never out of reach. Studio shows Ford Field night (live), Pink Ticket, black/crimson, and navy/maize as a no. Turf, pebble laces, leather, and ticket stock as samples — a strip or a panel, never wallpaper.",
  },
  {
    id: "2026-09-10-pinks",
    at: "2026-09-10T21:44:00-07:00",
    day: "Thu Sep 10",
    time: "9:44 PM PT",
    kind: "ship",
    title: "This is Pinks",
    body: "Not a Bogey’s sheet. House is Pinkerton — Jerime, Michigan-born, Vegas since 1996. Live odds links on Circa, Westgate/Caesars, South Point, DraftKings, FanDuel, BetMGM, Pinnacle, Bovada. Hockey desk is next. Then we marry parlays. Baseball after that.",
  },
  {
    id: "2026-09-10-night",
    at: "2026-09-10T21:26:00-07:00",
    day: "Thu Sep 10",
    time: "9:26 PM PT",
    kind: "ship",
    title: "Ford Field night",
    body: "Green-black Seahawks desk is gone. Night field, Honolulu only on accent and active nav, silver type, turf hits, crimson misses. Leather lives on the Bogey card. One yard hash. No grass wallpaper.",
  },
  {
    id: "2026-09-10-log",
    at: "2026-09-10T21:15:00-07:00",
    day: "Thu Sep 10",
    time: "9:15 PM PT",
    kind: "ship",
    title: "What’s new, dated",
    body: "This log is now the memory. Ships, finals, and misses stay in order so we can see if a weight or a feed stopped earning its keep.",
  },
  {
    id: "2026-09-10-engine",
    at: "2026-09-10T21:08:00-07:00",
    day: "Thu Sep 10",
    time: "9:08 PM PT",
    kind: "ship",
    title: "Engine live — public weights",
    body: "Market 32, cappers 18, injuries 16, public fade 12, spot 12, desk prior 10. Feeds in: NFL.com, ESPN, CBS, Action Network, SportsLine, Covers. VegasInsider / NBC / USA TODAY skipped as duplicates. Travel penalty on Melbourne was not enough to flip LAR off the chalk — logged as a miss, not patched after the fact.",
    record: { desk: "1–1", engineSu: "1–1", engineAts: "0–2" },
  },
  {
    id: "2026-09-10-wire",
    at: "2026-09-10T21:00:00-07:00",
    day: "Thu Sep 10",
    time: "9:00 PM PT",
    kind: "feed",
    title: "Grok wire — pull, don’t poll",
    body: "Native X search on Schefter, Rapoport, Pelissero, Garafolo plus NFL.com / CBS / Action Network. Not on page load. First pull confirmed AJ Brown (NE) high-ankle ~4 weeks, Darnold hip (miss Week 2), Odunze still Q, 69% public on DEN +.",
  },
  {
    id: "2026-09-10-tnf",
    at: "2026-09-10T20:56:00-07:00",
    day: "Thu Sep 10",
    time: "8:56 PM PT",
    kind: "miss",
    title: "Miss — Rams −3.5 in Melbourne",
    body: "Desk and engine both on LAR. Final SF 27–7. Purdy 3 TDs. Rams landed 28 hours before kickoff; 49ers had a week. Under 48.5 cashed (34). Super Bowl chalk and Garrett debut did not show up. Spot/travel weight stays — it was too small to beat market + consensus. Do not chase Rams on Sunday tickets.",
    record: { desk: "1–1", engineSu: "1–1", engineAts: "0–2" },
  },
  {
    id: "2026-09-10-card",
    at: "2026-09-10T20:40:00-07:00",
    day: "Thu Sep 10",
    time: "8:40 PM PT",
    kind: "ship",
    title: "Bogey card + parlay ladder posted",
    body: "Week 1 blot: CHI, CIN, DET, BUF, BAL, JAX, PIT, TEN, LAC, LV, MIN, PHI, DAL, KC. Overs 37½ both windows. MNF write 41. 3–6 teamers: JAX / DET / LAC then PHI, CIN, CHI. South Point. BUF/HOU, GB/MIN, NYJ/TEN, DEN/KC off parlays.",
  },
  {
    id: "2026-09-09-opener",
    at: "2026-09-09T23:30:00-07:00",
    day: "Wed Sep 9",
    time: "11:30 PM PT",
    kind: "result",
    title: "Hit SU, miss ATS — Seahawks 13, Patriots 10",
    body: "Desk on SEA. SU cashes. SEA −3.5 does not cover (won by 3). Total 23, under 44.5 cashes. Darnold leaves with a hip; later ruled miss Week 2. AJ Brown (Patriots debut) high-ankle, ~4 weeks. Three Maye INTs closed it. Lesson: the opener was a slog — totals were the cleaner ticket than the spread.",
    record: { desk: "1–0", engineSu: "1–0", engineAts: "0–1" },
  },
];

export function logByDay(entries = CHANGELOG) {
  const days: { day: string; items: LogEntry[] }[] = [];
  for (const e of entries) {
    const last = days[days.length - 1];
    if (last && last.day === e.day) last.items.push(e);
    else days.push({ day: e.day, items: [e] });
  }
  return days;
}

export const LATEST = CHANGELOG[0];
