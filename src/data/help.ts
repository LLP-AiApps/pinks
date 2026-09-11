export const HELP = {
  desk: {
    title: "Home",
    body: "This page is the scoreboard. The big numbers are games that already ended. Under that is this week.",
    steps: [
      "Our picks = the person who runs this site wrote down a winner before the game.",
      "The computer = a math mix that also picks a winner. Same games, different method.",
      "Your tickets = slips you saved. Grade them after the game so your year adds up.",
    ],
  },
  stamp: {
    title: "Where to look at a number",
    body: "These are real sportsbooks, not us. We show a link to their odds. We do not take your money.",
    steps: [
      "Tap a name to see their board.",
      "Compare two shops before you spend.",
    ],
  },
  whatsnew: {
    title: "What changed",
    body: "What we posted, what we got right, what we got wrong. A wrong pick stays on the list.",
    steps: ["Open the full list if you want every date."],
  },
  ladder: {
    title: "Ready-made tickets",
    body: "A ticket with 3, 4, 5, or 6 games. Every game on the ticket has to win. One loss and the ticket is dead.",
    steps: [
      "Start with 3 games. More games pays more and loses more often.",
      "Save it so it lands in Your tickets.",
    ],
  },
  locks: {
    title: "Games we like most",
    body: "One game at a time. Still can lose. The percent is our guess, not a promise.",
    steps: ["Open Games to see why and who is hurt."],
  },
  "wire-home": {
    title: "Late news",
    body: "Injuries and last-hour chatter. It does not update by itself.",
    steps: ["Open Wire, then pull only when you need the last hour."],
  },
  "pool-home": {
    title: "Pool card",
    body: "A bar sheet with every team. Different from a 3-game ticket. Ties count as a win. Monday night total breaks a tie.",
    steps: ["Mark the teams listed.", "Write the Monday total on the back."],
  },
  games: {
    title: "Games",
    body: "Each matchup. Who we like, who is hurt, what the number looks like.",
    steps: [
      "If it feels like a coin flip, leave it off a multi-game ticket.",
      "One game you like is safer than six you hope for.",
    ],
  },
  parlays: {
    title: "Build a ticket",
    body: "Pick 3 to 6 winners. All of them must win. Set how many dollars the slip is for. That is a worksheet. The shop takes the real bet.",
    steps: [
      "Tap 3, 4, 5, or 6.",
      "Read the weak game. That is the one most likely to ruin the ticket.",
      "Save pink ticket. It goes to History if you are signed in.",
    ],
  },
  tickets: {
    title: "Your tickets",
    body: "Slips you saved. After the games, mark win, lose, or tie. That is how your year is counted.",
    steps: [
      "Win = every team on that slip won.",
      "Lose = one team lost.",
      "The shop pays you. This site only keeps score.",
    ],
  },
  analysts: {
    title: "Other writers",
    body: "People who pick games in public. We look at them. We do not copy the loudest one.",
    steps: ["See who agrees with us and who does not."],
  },
  engine: {
    title: "The computer",
    body: "Math on the same games. Our written pick can differ. Both get graded when the game ends. Right and wrong both stay.",
    steps: [
      "Tap a game to see the pieces: injuries, public money, home or road.",
      "We publish the mix so a bad source can get cut.",
    ],
  },
  log: {
    title: "The log",
    body: "Dated list of what shipped, what hit, what missed.",
    steps: ["Filter if you only want results."],
  },
  wire: {
    title: "Wire",
    body: "Late news from reporters. You ask for it. It does not run all day.",
    steps: ["Tap Pull when you need the last hour."],
  },
  books: {
    title: "Shops",
    body: "Places that take a real bet. South Point and Rampart use one parlay sheet. Stations is a different shop with many corners.",
    steps: [
      "Look at two shops. Take the better number.",
      "A hedge is a second small bet in case one team on your ticket looks like it will lose.",
    ],
  },
  card: {
    title: "Pool card",
    body: "32 boxes. Mark our teams. This is the bar pool, not a Pinks multi-game ticket.",
    steps: ["Monday total breaks a tie. Write it down."],
  },
  studio: {
    title: "Studio",
    body: "Color tests. The rest of the site stays dark.",
    steps: ["Tap a tile. Only the big stage changes."],
  },
  letter: {
    title: "The letter",
    body: "What we wrote today. Reading is free. We are not emailing yet.",
    steps: ["Tap a headline. A teaser is not a bet."],
  },
  join: {
    title: "Join",
    body: "Put your name on the list. You must be 21. Check every box. We do not email yet.",
    steps: ["Read Legal first.", "Then Sign in if you want tickets saved off this phone."],
  },
  legal: {
    title: "Legal",
    body: "House rules. We do not take bets. If play stops being fun, stop. 1-800-GAMBLER.",
    steps: ["Read it once."],
  },
  learn: {
    title: "Learn",
    body: "How a ticket works, how a hedge works, why we show misses. School, not a payday.",
    steps: ["Open a lesson. Start with the ladder if numbers are new."],
  },
  sources: {
    title: "Sources",
    body: "Where the numbers and news come from.",
    steps: ["Tap a name to open the original."],
  },
  picks: {
    title: "Yours",
    body: "Build a ticket from the same games, with your rules. Safer, or longer, or more games.",
    steps: [
      "3 games is the simple start.",
      "4, 5, and 6 add weaker games on purpose. They are marked.",
      "Save. Then grade it on History after Sunday.",
    ],
  },
  roster: {
    title: "Roster",
    body: "The shared list. House only.",
    steps: ["Do not leave this up on a TV."],
  },
} as const;

export type HelpId = keyof typeof HELP;

export const HELP_ORDER: HelpId[] = [
  "desk",
  "games",
  "parlays",
  "tickets",
  "picks",
  "books",
  "card",
  "analysts",
  "engine",
  "wire",
  "letter",
  "join",
  "legal",
  "learn",
  "sources",
  "roster",
  "log",
  "studio",
];
