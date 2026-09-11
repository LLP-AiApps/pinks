export type Reading = { title: string; url: string; why: string };

export type Lesson = {
  slug: string;
  title: string;
  kicker: string;
  teaser: string;
  member: boolean;
  body: string[];
  reading: Reading[];
};

export const LESSONS: Lesson[] = [
  {
    slug: "study",
    title: "What this desk is actually doing",
    kicker: "Open",
    teaser:
      "Research + a public blend + Grok on a wire. Compared to humans. Misses stay posted. Join is free. Nobody is selling a lock.",
    member: false,
    body: [
      "We pull schedules, injuries, history, splits, and posted lines from places anyone can read. We score them in the Engine. We put that next to human cappers. The Wire is Grok searching X when you tap pull — not a mystic.",
      "The honest line: so far, a cold prompt and less feeling would get most of this. If we ever have something worth hiding, Learn will mark it house. We are not there.",
      "Tuition is $0. If APIs ever cost real money, the fee shows on Join first and only covers the study — not a promise you get paid.",
    ],
    reading: [
      { title: "Engine (this app)", url: "/engine", why: "Weights in the open." },
      { title: "Sources (this app)", url: "/sources", why: "Everything we query, linked." },
    ],
  },
  {
    slug: "ladder",
    title: "The parlay ladder",
    kicker: "Members",
    teaser: "Four nested tickets. Same three sides. Each rung adds one team. Juice eats chalk.",
    member: true,
    body: [
      "A ladder is not four different parlays from scratch. It is one core, then the next-least-ugly favorite. This week: Jacksonville, Detroit, Chargers. Then Eagles. Then Burrow at home. Then Chicago on the road. Coin flips (Bills/Texans, Packers/Vikings, Jets, Monday night) stay off.",
      "All-or-nothing. Moneylines multiply. Three huge favorites on a $50 ticket might only collect about $95 because juice compounds. That is true-odds. A lounge 6-to-1 three-team card is a different product.",
      "Each extra leg raises the payout and cuts the hit rate. If CIN or CHI makes you nervous, you do not rebuild. You step down a rung.",
      "Independence is a lie. Week 1 variance clusters. The desk percent on the ticket is a product of opinions, not a promise.",
    ],
    reading: [
      {
        title: "Wizard of Odds — parlays vs singles",
        url: "https://wizardofodds.com/ask-the-wizard/242/",
        why: "Math on when a parlay even has a theory. Recreational bets usually lose less as singles.",
      },
      {
        title: "Wizard of Odds — same-game parlays",
        url: "https://wizardofodds.com/article/same-game-parlays-the-mathematics-of-correlation/",
        why: "Why correlation is how the house gets paid. We do not teach SGPs as a skill.",
      },
      { title: "Parlays (this app)", url: "/parlays", why: "Build, save, print." },
    ],
  },
  {
    slug: "hedge",
    title: "Hedge the weak leg",
    kicker: "Members",
    teaser: "Bet the other team on the riskiest leg. Cover the stake if it dies. Stay green if the parlay hits.",
    member: true,
    body: [
      "The weak tag is the team most likely to kill the ticket (lowest desk %). The hedge is a single moneyline on the opponent, sized so if that team loses you get about even on the original stake, and if the parlay hits you are still up after losing the hedge.",
      "Stamp the parlay at South Point or Rampart (same sheet). Stamp the hedge at Circa or Pinnacle. Stations is a different book — walk in, read their card.",
      "If the hedge would eat the parlay, do not hedge. Drop the leg and climb down the ladder.",
      "This is insurance math, not a money printer. You are paying to sleep.",
    ],
    reading: [
      { title: "Books (this app)", url: "/books", why: "Where the parlay window is vs the hedge window." },
      {
        title: "Wizard of Odds — sports betting",
        url: "https://wizardofodds.com/games/sports-betting/",
        why: "House edge, vig, why −110 is not even.",
      },
    ],
  },
  {
    slug: "bankroll",
    title: "Don’t bet rent",
    kicker: "Members",
    teaser: "Kelly is a formula. It is not a command to parlay your paycheck.",
    member: true,
    body: [
      "If you cannot lose the ticket without changing your week, you are too heavy. A 6-teamer is a flyer. The 3-teamer is the one you can live with.",
      "Kelly Criterion tells you a fraction of bankroll when you think you have an edge. Most people do not have an edge. Recreational juice means the house is the one with Kelly on you.",
      "1-800-GAMBLER. Nevada Council on Problem Gambling. Stop is a valid method.",
    ],
    reading: [
      {
        title: "1-800-GAMBLER",
        url: "https://www.1800gambler.net/",
        why: "If betting is a problem.",
      },
      {
        title: "Nevada Council on Problem Gambling",
        url: "https://www.nevadacouncil.org/",
        why: "Local help.",
      },
      {
        title: "Wizard of Odds — Kelly",
        url: "https://wizardofodds.com/games/blackjack/kelly-criterion/",
        why: "The formula, in a different game. Same warning: you need a real edge first.",
      },
    ],
  },
  {
    slug: "humans",
    title: "Grok vs humans vs other prompts",
    kicker: "Members",
    teaser: "Analysts are ranked. The engine is scored. Grok is a pull, not a priest. The log keeps the bodies.",
    member: true,
    body: [
      "Analysts: public cappers, side by side, weighted. We do not copy the loudest account.",
      "Engine: market, consensus, injury, public fade, situation, desk. Every final graded SU and ATS.",
      "Wire: you tap Pull live Grok. Native X search. That is the gap vs a web-only researcher.",
      "Over a season we will see who was right more. If a human beats the blend, the log will say so. If Grok’s last-hour injury is the only reason a ticket lives, that will be in the letter.",
    ],
    reading: [
      { title: "Analysts (this app)", url: "/analysts", why: "The humans." },
      { title: "Engine (this app)", url: "/engine", why: "The blend." },
      { title: "Wire (this app)", url: "/wire", why: "The pull." },
    ],
  },
];

export function lessonBySlug(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}
