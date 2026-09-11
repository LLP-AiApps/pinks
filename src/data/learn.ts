export type Reading = { title: string; url: string; why: string };

export type LessonSection = {
  heading: string;
  body: string[];
};

export type Lesson = {
  slug: string;
  title: string;
  kicker: string;
  teaser: string;
  member: boolean;
  body: string[];
  sections: LessonSection[];
  reading: Reading[];
};

export const LESSONS: Lesson[] = [
  {
    slug: "board",
    title: "The board in English",
    kicker: "Start here",
    teaser:
      "Moneyline, spread, total, favorite, dog, juice. If you can watch a game, you can read a ticket. This is the alphabet.",
    member: false,
    body: [
      "You already know football. The window is a different language for the same game. Three bets cover almost everything this desk talks about. Learn those three and the rest of Learn will make sense.",
    ],
    sections: [
      {
        heading: "The three bets",
        body: [
          "Moneyline: who wins the game, period. Seahawks 13, Patriots 10 — Seattle cashed the moneyline. No points, no total. Just the winner.",
          "Spread (also called the line, or ATS — against the spread): one team is given points so the bet is not “who is better,” it is “did they win by enough.” Seattle −3.5 means Seattle must win by 4 or more. They won by 3. Moneyline hit. Spread missed. Both can be true in the same game.",
          "Total (over/under): add both scores. Ignore who won. SEA 13 + NE 10 = 23. If the number was 44.5, the under cashed. The desk lives on totals more than people think — slugs pay the under.",
        ],
      },
      {
        heading: "Favorite and dog",
        body: [
          "The favorite is the team the book thinks wins. You see a minus on the moneyline: Lions −310. That means you risk $310 to win $100. You are paying for the safer side.",
          "The underdog (the dog) is the other team. Plus money: Saints +250 means $100 wins $250. Longer shot, bigger payout.",
          "On the spread, the favorite lays points (Lions −7) and the dog gets points (Saints +7). A 24–20 Lions win cashes the moneyline for Detroit and the spread for New Orleans. That is why “they won the game” and “they covered” are different sentences.",
        ],
      },
      {
        heading: "Juice — the tax on the window",
        body: [
          "A fair coin would be +100 both sides. Books do not post that. Standard juice is −110: risk $110 to win $100. That extra $10 is how the house eats if the public splits 50/50.",
          "Stack three −110 sides and the tax compounds. That is why a “lock” three-teamer does not pay like a lottery ticket. You are buying three small favorites and paying the vig three times.",
          "Circa and Pinnacle cut that tax on singles. South Point is friendlier on 3–6 team moneyline parlays. Stations is a different book — walk in, read their card, do not assume Gaughan numbers.",
        ],
      },
      {
        heading: "How to read one row",
        body: [
          "JAX −8.5 (−455) / CLE +8.5 (+350), total 40.5. Translation: Jacksonville is a big favorite. The book thinks they win by more than a touchdown. −455 moneyline means you are laying serious juice to pick them straight up. The total is low — both offenses are expected to slog.",
          "If you just like the Jags to win, that is the moneyline. If you think they win but it might be 20–17, take the dog +8.5 or stay off the spread. If you think nobody can score, take the under.",
          "This desk prints a pick and a score. The pick is usually the moneyline side. The spread is graded separately in the log. SU is straight up (who won). ATS is against the spread.",
        ],
      },
    ],
    reading: [
      { title: "Games (this app)", url: "/games", why: "Every Sunday row with spread, total, and moneyline." },
      { title: "Books (this app)", url: "/books", why: "Where to walk after you can read the number." },
      {
        title: "Wizard of Odds — sports betting",
        url: "https://wizardofodds.com/games/sports-betting/",
        why: "Vig, −110, why the house is the one with an edge.",
      },
    ],
  },
  {
    slug: "ladder",
    title: "The parlay ladder",
    kicker: "Core",
    teaser:
      "One ticket that needs every team to win. Four nested sizes. Same core. Each rung adds one team. Juice eats chalk.",
    member: false,
    body: [
      "If you have ever said “I like the Lions, the Jags, and the Chargers this week,” a parlay is the window’s version of that sentence. All of them have to win. Miss one and the whole slip is trash. That is the whole product.",
    ],
    sections: [
      {
        heading: "What a parlay is",
        body: [
          "A single is one game. You are right or wrong on that game only.",
          "A parlay ties two or more games to the same ticket. Every leg must hit. There is no “almost.” Jags win, Lions win, Chargers lose — you get nothing. That is the deal you signed.",
          "Why would anyone do that? Payout. One favorite at −310 returns pocket change. Three favorites multiplied together returns more. The book loves this because one upset wipes the slip, and upsets happen every Sunday.",
        ],
      },
      {
        heading: "True odds vs the lounge card",
        body: [
          "A lot of bars post “3 teams for 6-to-1.” That is a posted price, not math. Easy to read. Usually worse than the real moneylines multiplied together.",
          "This desk uses true-odds moneylines. JAX −455 × DET −310 × LAC −550 looks like a lock and pays like a small favorite — because it is three huge favorites stacked, juice and all. A $50 ticket that “can’t lose” might only collect about $90–$100. That is not a ripoff of the desk. That is the price of stacking chalk.",
          "If you wanted lottery numbers you picked the wrong slip. Lottery is 6-team dogs. This ladder is the opposite: the sides we already like, nested so you can step down instead of panicking.",
        ],
      },
      {
        heading: "What a ladder is",
        body: [
          "A ladder is not four different ideas. It is one core, then the next-least-ugly favorite.",
          "Rung 3 — the core: Jacksonville, Detroit, Chargers. Three mismatches. If you only stamp one ticket, stamp this.",
          "Rung 4 — add Philadelphia. Same three, plus the Eagles at home.",
          "Rung 5 — add Cincinnati. Burrow at home. First real “favorite can lose outright.”",
          "Rung 6 — add Chicago on the road. Flyer. Not rent.",
          "You do not rebuild when you get nervous. You put less on the higher rungs, or you stop climbing.",
        ],
      },
      {
        heading: "What stays off",
        body: [
          "Coin flips do not belong on a parlay. Bills at Houston, Packers at Minnesota, Jets at Tennessee, Monday night in Kansas City — the desk may have a lean. A lean is not a leg.",
          "If a game is 54% on the engine, that is a coin with a logo on it. Put it on a single if you must. Do not let it kill four other sides.",
        ],
      },
      {
        heading: "A $50 picture",
        body: [
          "Say you have $50 you can lose without changing grocery day.",
          "Put $25 on the 3-teamer. That is the ticket you can live with.",
          "Put $15 on the 4. Put $7 on the 5. Put $3 on the 6. Same sides, smaller size as the hit rate dies.",
          "If Cincinnati makes you itch Friday night, you do not invent a new parlay. You skip the 5 and the 6. The 3 and 4 are still the same Jags, Lions, Chargers, Eagles.",
        ],
      },
      {
        heading: "Independence is a lie",
        body: [
          "Books price each game as if the others do not exist. Week 1 does not work like that. Weather clusters. Officiating crews have tells. A sloppy slate goes sloppy together.",
          "The percent printed on a Pink Ticket is opinions multiplied. It is not a promise. Treat a 6-teamer like a poster, not a plan.",
        ],
      },
    ],
    reading: [
      { title: "Parlays (this app)", url: "/parlays", why: "The four rungs, ready to save and print." },
      { title: "The board in English", url: "/learn/board", why: "Moneyline vs spread vs total, first." },
      {
        title: "Wizard of Odds — parlays vs singles",
        url: "https://wizardofodds.com/ask-the-wizard/242/",
        why: "When a parlay even has a theory. Most people lose less betting singles.",
      },
      {
        title: "Wizard of Odds — same-game parlays",
        url: "https://wizardofodds.com/article/same-game-parlays-the-mathematics-of-correlation/",
        why: "Why we do not teach SGPs as a skill. Correlation is how the house gets paid.",
      },
    ],
  },
  {
    slug: "hedge",
    title: "Hedge the weak leg",
    kicker: "Core",
    teaser:
      "Insurance on the team most likely to kill the slip. Cover the stake if it dies. Stay green if the parlay hits.",
    member: false,
    body: [
      "A hedge is not a second opinion. It is a small bet the other way on the one team that scares you, so one upset does not zero the week.",
    ],
    sections: [
      {
        heading: "The weak leg",
        body: [
          "On a 5-teamer of Jags, Lions, Chargers, Eagles, Bengals — four of those are mismatches. Cincinnati is the one a good Bucs team can steal. That is the weak leg: lowest desk percent, first team that can punch a hole in the ticket.",
          "You do not hedge every team. That would just be betting both sides and paying juice twice. You hedge the one that would ruin your Sunday.",
        ],
      },
      {
        heading: "How the math feels",
        body: [
          "Say the 5-teamer cost $50 and would pay $180 if it hits. You are afraid of Cincinnati. Tampa Bay moneyline is +164.",
          "You bet a smaller amount on Tampa to win the game. If Cincinnati loses, Tampa pays you about what the $50 slip cost — you walk to even, minus a little juice. If Cincinnati wins and the rest hit, you lose the Tampa bet and still keep most of the $180.",
          "You paid to sleep. That is the whole point. It is not a money printer.",
        ],
      },
      {
        heading: "Two windows",
        body: [
          "Stamp the parlay at South Point or Rampart — same sheet, friendliest 3–6 team moneylines in town.",
          "Stamp the hedge at Circa or Pinnacle, where the single is cheaper. Do not hedge a South Point parlay at South Point if Circa will give you a better plus-money number on the dog.",
          "Stations (Red Rock, GVR, Durango, Palace, Sunset, Boulder, Santa Fe, Fiesta) is a different book. Walk in. Read their card. Do not assume it pays like Gaughan.",
        ],
      },
      {
        heading: "When not to hedge",
        body: [
          "If the hedge would eat the parlay — if winning the slip and losing the hedge leaves you near zero — do not hedge. Drop the weak team and climb down a rung instead.",
          "If the “weak” team is still 80% on the desk (Jags, Chargers), you are paying insurance on a house fire in a brick house. Skip it.",
          "If you cannot afford the parlay without the hedge saving you, you cannot afford the parlay. See Don’t bet rent.",
        ],
      },
    ],
    reading: [
      { title: "Parlays (this app)", url: "/parlays", why: "Each rung already names the hedge." },
      { title: "Books (this app)", url: "/books", why: "Parlay window vs hedge window." },
      { title: "Don’t bet rent", url: "/learn/bankroll", why: "If the hedge is the only reason you can stamp, sit." },
    ],
  },
  {
    slug: "bankroll",
    title: "Don’t bet rent",
    kicker: "Core",
    teaser: "If losing the ticket changes your week, the ticket is too big. Kelly is a formula, not a dare.",
    member: false,
    body: [
      "Sports are supposed to stay sports. The second a slip decides rent, groceries, or whether you show up to work right, you are not handicapping. You are in a hole. Climb out. 1-800-GAMBLER.",
    ],
    sections: [
      {
        heading: "The week test",
        body: [
          "Write down the number you can burn on Sunday and still have a normal Monday. That number is the bankroll for the week — not your checking account, not your rent, not the credit card.",
          "The 3-teamer is the ticket sized to that number. The 6-teamer is a flyer off what is left. Flip those and you will hate football by 5:15 PT.",
        ],
      },
      {
        heading: "Units, without a spreadsheet",
        body: [
          "A unit is 1% of what you can stand to lose this season, not this hour. If that season number is $500, a unit is $5. A 3-teamer at 2–5 units is a real ticket. A 6-teamer at 1 unit is a poster.",
          "People get wrecked increasing the unit after a hit. The unit does not move because Jacksonville covered. The unit moves when the bankroll does, slowly.",
        ],
      },
      {
        heading: "Kelly in one paragraph",
        body: [
          "Kelly Criterion is a formula: how large a bet should be if you truly have an edge. Most people do not have an edge. The juice means the house is the one with Kelly on you.",
          "If you cannot explain why your number is better than Circa’s, Kelly says bet zero. That is the useful part. The rest is costume.",
        ],
      },
      {
        heading: "Stop is a method",
        body: [
          "1-800-GAMBLER. Nevada Council on Problem Gambling. If the app is open at 1 a.m. on a Tuesday and no game is on, close it.",
          "This desk will never tell you a ticket is rent money. If a page ever sounds like that, it is a bug.",
        ],
      },
    ],
    reading: [
      { title: "1-800-GAMBLER", url: "https://www.1800gambler.net/", why: "If betting is a problem." },
      { title: "Nevada Council on Problem Gambling", url: "https://www.nevadacouncil.org/", why: "Local help." },
      {
        title: "Wizard of Odds — Kelly",
        url: "https://wizardofodds.com/games/blackjack/kelly-criterion/",
        why: "The formula. Same warning: you need a real edge first.",
      },
    ],
  },
  {
    slug: "study",
    title: "What this desk is actually doing",
    kicker: "Open",
    teaser:
      "Research, a public blend, Grok on a wire. Compared to humans. Misses stay posted. Nobody is selling a lock.",
    member: false,
    body: [
      "Pinks is a desk, not a book. We do not take your action. We write down what we think, what the humans think, and what the wire just said — then we grade it in public.",
    ],
    sections: [
      {
        heading: "The loop",
        body: [
          "Games and the Engine start from a snapshot: schedule, injuries, posted lines, public splits, capper lean. Anyone can read those pages. We weight them and print a side.",
          "The Wire is Grok searching X when you tap Pull — Schefter, Rapoport, Pelissero, Garafolo, the league account. Not on page load. Not a mystic.",
          "The letter is the recap in English. The log keeps hits and misses in order so a weight that stopped earning its keep gets cut.",
        ],
      },
      {
        heading: "What we will admit",
        body: [
          "A cold prompt and less feeling would get most of Week 1. If we ever have something worth hiding, Learn will mark it house. We are not there.",
          "Melbourne was a miss. Desk and engine both on the Rams. 27–7 the other way. That stays in the log. We do not patch a miss after the fact and pretend the model “had the 49ers all along.”",
        ],
      },
      {
        heading: "Money",
        body: [
          "Join is free. Tuition is $0. If APIs ever cost real money, the fee shows on Join first and only covers the study — not a promise you get paid.",
          "Email and text are drafted and dark. Signing up stores intent on this phone. Nothing leaves until Join says the mailer is live.",
        ],
      },
    ],
    reading: [
      { title: "Engine (this app)", url: "/engine", why: "Weights in the open." },
      { title: "Sources (this app)", url: "/sources", why: "Everything we query, linked." },
      { title: "What’s new", url: "/log", why: "Hits, misses, ships — dated." },
    ],
  },
  {
    slug: "algorithms",
    title: "The algorithms, without the cologne",
    kicker: "Open",
    teaser:
      "Elo, Massey, Pythagorean, Kelly, closing-line value — what they are in English, and which 32% of our blend is just the market.",
    member: false,
    body: [
      "There is no secret NFL formula. There are families of math people reuse because football scoring is noisy and the season is short. Pinks is not one of those models with a cologne name. We say what we are.",
    ],
    sections: [
      {
        heading: "The families, in English",
        body: [
          "Power ratings (Elo, Glicko, Silver’s ELWAY): every team has a number. Win, the number goes up. Lose, it goes down. Home field is worth about three points in the public Elo everyone copies. Week 1 has almost nothing to update — last year is a ghost.",
          "Least-squares rankings (Massey, Colley): who beat whom, by how much, strength of schedule baked in. Needs games. We do not have a real Massey until Sunday’s scores exist.",
          "Scoring profile (Pythagorean): points scored vs points allowed, exponent around 2.37 in football. Record lies; point differential tells you who got lucky. Also needs games.",
          "Price: strip the juice off a moneyline and you have the market’s percent. Circa −150 is not “a lock.” It is “the market thinks about 58% after tax.”",
          "Stake (Kelly): how large, if you have an edge. Process (closing-line value): did you beat the number the book closed at, even if the game later went the other way. That is how you know if you were sharp or lucky.",
        ],
      },
      {
        heading: "What Pinks actually is this week",
        body: [
          "A weighted blend, printed: market 32, capper consensus 18, injuries 16, public fade 12, spot 12, desk prior 10.",
          "The market slice is the other models already averaged, with juice on top. We are not smarter than Circa on Wednesday of Week 1. We are overlaying injuries, public tickets, and a travel spot (Melbourne) on that price.",
          "Grok is a pull — last-hour injuries and CBS/Circa when you tap — not a neural net we trained on 30 years of downs. Calling that “AI picks” would be cologne.",
        ],
      },
      {
        heading: "After Sunday",
        body: [
          "Once we have points, a toy Massey and Pythagorean become legal. Until then, claiming a power rating is costume.",
          "Closing-line value starts when we grade our snapshot against the number that died at kickoff. Pull CBS / Circa vs the printed line is the first half. The final is the second.",
        ],
      },
    ],
    reading: [
      { title: "Engine (this app)", url: "/engine", why: "The six weights, with bars." },
      {
        title: "FiveThirtyEight — NFL Elo",
        url: "https://fivethirtyeight.com/features/how-our-nfl-predictions-work",
        why: "The public Elo everyone copies. Home ~48 Elo points. EloDiff / 25 ≈ spread.",
      },
      {
        title: "Nate Silver — ELWAY",
        url: "https://www.natesilver.net/p/how-our-elway-forecasts-work-methodology",
        why: "2026. Offense/defense plus QBERT. Not just wins.",
      },
      {
        title: "Pythagorean wins (NFL)",
        url: "https://nflanalytic.com/explainer-pythagorean-wins.html",
        why: "PF^2.37. Record lies; differential regresses.",
      },
    ],
  },
  {
    slug: "humans",
    title: "Grok vs humans vs other prompts",
    kicker: "Open",
    teaser:
      "Analysts are ranked. The engine is scored. Grok is a pull, not a priest. The log keeps the bodies.",
    member: false,
    body: [
      "Three voices sit on this desk. Humans who publish picks. A blend that does not care who yelled on TV. Grok, who can search X when you ask. We keep score so the loudest one does not win by default.",
    ],
    sections: [
      {
        heading: "The humans",
        body: [
          "Analysts are public cappers — SportsLine, Action, the usual names — listed side by side with a weight. We do not copy the loudest account. A good year last season is a prior, not a crown.",
          "When a human beats the blend for a month, the log will say so. When they ride a dog into a wall, that stays too.",
        ],
      },
      {
        heading: "The engine",
        body: [
          "Market, consensus, injury, public fade, situation, desk. Every final graded straight up and against the spread.",
          "Public fade is not “fade the world.” It is: when 69% of tickets sit on Denver +2.5 and the money is not there with them, notice. Sometimes the public is right. We still write the split down.",
        ],
      },
      {
        heading: "The wire",
        body: [
          "You tap Pull live Grok. Native X search. That is the gap vs a web-only researcher: Schefter can move a number in six minutes. A page that only scrapes NFL.com at dawn will miss it.",
          "Grok is not a priest. If the last-hour injury is the only reason a ticket lives, the letter will say that. If the pull is noise, we will say that too.",
        ],
      },
      {
        heading: "How you should use all three",
        body: [
          "Read the letter. Look at the engine bars. If a capper you trust is on the other side, that is a flag, not a veto. If the wire just posted an OUT, the snapshot is stale — pull, then decide.",
          "Over a season we will see who was right more. That is the study. Anyone selling “the AI is 87% this week” is selling cologne.",
        ],
      },
    ],
    reading: [
      { title: "Analysts (this app)", url: "/analysts", why: "The humans." },
      { title: "Engine (this app)", url: "/engine", why: "The blend." },
      { title: "Wire (this app)", url: "/wire", why: "The pull." },
      { title: "What’s new", url: "/log", why: "Who was right on Wednesday night." },
    ],
  },
];

export function lessonBySlug(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}
