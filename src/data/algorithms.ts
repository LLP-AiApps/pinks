export type AlgoFamily = {
  id: string;
  name: string;
  family: string;
  what: string;
  pinks: string;
  onDesk: boolean;
};

export const ALGORITHMS: AlgoFamily[] = [
  {
    id: "market",
    name: "Market / vig-stripped line",
    family: "Price",
    what: "Turn the moneyline into a fair probability. The number is everyone else's model, plus the house cut.",
    pinks: "32% of the blend. Biggest weight because the close is the hardest thing to beat.",
    onDesk: true,
  },
  {
    id: "consensus",
    name: "Capper consensus",
    family: "Crowd of experts",
    what: "Count how many public cappers are on a side. Not wisdom of crowds — a check against our own stubbornness.",
    pinks: "18%. Humans, side by side, in Analysts.",
    onDesk: true,
  },
  {
    id: "injury",
    name: "Injury / availability",
    family: "State",
    what: "QB out is a different team. Skill players and edge are next. Practice reports (DNP/LP/FP) beat rumor.",
    pinks: "16%. Tags on the slate, then Wire when you pull.",
    onDesk: true,
  },
  {
    id: "public",
    name: "Public fade",
    family: "Market microstructure",
    what: "When 65%+ of tickets sit on a short number, the money is often the other way. Not a religion.",
    pinks: "12%. Haircut on Yours if you leave that box on.",
    onDesk: true,
  },
  {
    id: "spot",
    name: "Situation",
    family: "Context",
    what: "Home, rest, travel, openers. FiveThirtyEight paid ~48 Elo for home. We use a small bump, not a cult.",
    pinks: "12%. Home / road / MNF / travel notes.",
    onDesk: true,
  },
  {
    id: "desk",
    name: "Desk prior",
    family: "Human overlay",
    what: "Jerime's printed card. The feelings we said we would distrust — still in the blend at 10% so a miss is ours.",
    pinks: "10%. Graded every final.",
    onDesk: true,
  },
  {
    id: "elo",
    name: "Elo",
    family: "Power rating",
    what: "Chess math. Each team a number (~1500). Win probability from the gap. Update after every game. FiveThirtyEight: divide EloDiff by 25 ≈ spread. Nate Silver's ELWAY is Elo's grandchild with offense/defense and QB.",
    pinks: "Not running. Week 1 has almost no 2026 games to update. Market is the prior.",
    onDesk: false,
  },
  {
    id: "massey",
    name: "Massey / Colley",
    family: "Least squares ranking",
    what: "Solve all games at once. Massey ratings are in points — r_i − r_j ≈ margin. Colley is wins only, no margin, good when blowouts lie.",
    pinks: "Not running. Needs a season of results. After Sunday 1 we can start a toy Massey. Not this week.",
    onDesk: false,
  },
  {
    id: "pythag",
    name: "Pythagorean wins",
    family: "Scoring profile",
    what: "PF^x / (PF^x + PA^x). NFL x ≈ 2.37. Record lies; point differential regresses. Next-year predictor more than this-week spread.",
    pinks: "Not running. Zero 2026 regular-season points until Sunday finishes.",
    onDesk: false,
  },
  {
    id: "poisson",
    name: "Poisson / scoring distribution",
    family: "Totals",
    what: "Treat scores as a distribution, not a single number. Powers totals and cover probabilities, not just SU.",
    pinks: "Totals are a lean, not a sim. Pass unless the number is extreme.",
    onDesk: false,
  },
  {
    id: "kelly",
    name: "Kelly criterion",
    family: "Stake",
    what: "f* = (bp − q) / b. How much of bankroll if you have a real edge. Half-Kelly is what people who like sleeping use. Recreational juice means the house has Kelly on you.",
    pinks: "Taught in Learn. Not a bet-sizer on the ticket. Don't bet rent.",
    onDesk: false,
  },
  {
    id: "clv",
    name: "Closing line value",
    family: "Process score",
    what: "Did you beat the close? Best leading indicator of a real edge. You can go 0–3 on a weekend and still have +CLV.",
    pinks: "Pull CBS / Circa vs snapshot is the seed of CLV. We do not yet grade tickets against the close. That is the next math after Sunday.",
    onDesk: false,
  },
];
