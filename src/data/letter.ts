export type LetterPost = {
  slug: string;
  date: string;
  day: string;
  kicker: string;
  title: string;
  teaser: string;
  body: string[];
};

export const POSTS: LetterPost[] = [
  {
    slug: "week-2-sunday-bag-mnf",
    date: "2026-09-21",
    day: "Mon Sep 21",
    kicker: "Week 2",
    title: "Week 2 through Sunday: 9–6. Season 21–10. MNF open.",
    teaser:
      "Desk 9–6 SU after TNF + Sunday. Ladder SF/BAL/TB died on chalk. BUF −3 cashed. Tonight NYG @ LAR — desk LAR, write 44, leave pending.",
    body: [
      "Week 2 is graded through Sunday and Thursday night. Fifteen games. PinksDesk 9–6 straight up. Add Week 1's 12–4 and the season sits 21–10 before Monday night.",
      "The ladder died early. Tampa Bay lost to Cleveland 23–19. Baltimore lost to New Orleans 24–17. San Francisco still cashed 35–13 as a single. Buffalo opened the week right: 41–31, covered −3.",
      "Other hits: Cincinnati, Green Bay in OT, Philadelphia (SU only), New England, Dallas, Seattle with Lock, Kansas City in OT. Misses that stay posted: Atlanta, Chicago (Murray OUT slog), Chargers (hedged off the naked ticket — process held), Jacksonville at altitude.",
      "Monday night is still open. Giants at Rams, 5:15 PM PT. Desk on Los Angeles. Pool card write 44 — Over 37½. We do not grade Monday until the final. Preview first. Publish only when told.",
    ],
  },
  {
    slug: "week-1-closed-week-2",
    date: "2026-09-15",
    day: "Tue Sep 15",
    kicker: "Week 2",
    title: "Week 1 closed 12–4. Week 2 is live.",
    teaser:
      "Desk 12–4 SU. MNF write 41 exact (KC 31–10). Melbourne and LAC stay in the miss log. Ladder SF / BAL / TB → PHI → BUF → CHI. LAC hedged off the naked ticket.",
    body: [
      "Week 1 is graded. PinksDesk finished 12–4 straight up. The Monday night write landed on the nose: we wrote 41, Kansas City 31 and Denver 10 made 41. Exact.",
      "The misses stay posted. Melbourne we said Rams; San Francisco won 27–7. Titans, Chargers, and Cowboys also missed. Against the spread the tape is uglier than the moneyline — that is why Last week shows both.",
      "Week 2 opens Thursday at Highmark: Buffalo −3 / 53.5. The ladder is San Francisco, Baltimore, Tampa Bay, then Philadelphia, Buffalo, Chicago. Chargers are hedge-only after the Arizona wreck. Murray is OUT for Minnesota at Chicago.",
      "Tap Score so far or Last week for every pick vs final. Bribe the Book is live if you want more ships. Football-season updates: Friday noon, Monday noon, Tuesday noon PT — preview first, one Publish when told.",
    ],
  },
  {
    slug: "week-1-open",
    date: "2026-09-10",
    day: "Thu Sep 10",
    kicker: "Week 1",
    title: "Two in the book. Sunday is the card.",
    teaser:
      "Seattle 13–10. Niners 27–7 in Melbourne. The 3-teamer is still Jags, Lions, Chargers — and Stations is not South Point.",
    body: [
      "The season is already 1–1 on the desk. Seattle got the Super Bowl rematch in a slog; Darnold left, Lock and three Maye picks closed it, under cashed. Thursday in Australia the 49ers ran the Rams off the Melbourne Cricket Ground. We were on Los Angeles. That miss stays in the log.",
      "Sunday is the real sheet. The ladder starts with Jacksonville, Detroit, and the Chargers — three mismatches, true-odds moneylines, not a 6-to-1 lounge card. Add Philadelphia, then Cincinnati, then Chicago if you want the extra rungs. Leave Buffalo/Houston, Green Bay/Minnesota, the Jets, and Monday night off the parlay.",
      "If you live south or in Summerlin, South Point and Rampart share a parlay sheet. If you live anywhere else in the valley, Stations (Red Rock, GVR, Durango, Palace, Sunset, Boulder, Santa Fe, Fiesta) is the walk-in. Different book. Read their card. Do not assume Gaughan payouts.",
      "Print the pink ticket. Phones still die at windows. Hedge the weak leg at Circa or Pinnacle if the slip says the hedge is worth it.",
    ],
  },
  {
    slug: "ladder",
    date: "2026-09-10",
    day: "Thu Sep 10",
    kicker: "Mechanics",
    title: "The ladder is four tickets, not four ideas.",
    teaser: "Same three sides. Each rung adds one team. Juice eats chalk. That is why $50 on three huge favorites does not pay like a lottery ticket.",
    body: [
      "A parlay is all-or-nothing. The price is the moneylines multiplied. JAX −455, DET −310, LAC −550 is a 3-teamer that looks like a lock and pays like a small favorite — because it is three small favorites stacked, juice and all.",
      "The 4-teamer is that ticket plus the Eagles. The 5 adds Burrow at home. The 6 adds the Bears on the road. You do not rebuild when you get nervous. You step down a rung.",
      "The pink ticket marks the weak leg and sizes a moneyline the other way so if that team dies you get about even, and if the parlay hits you are still up. If the hedge would eat the ticket, drop the leg instead.",
    ],
  },
  {
    slug: "join-mailer-dark",
    date: "2026-09-10",
    day: "Thu Sep 10",
    kicker: "The letter",
    title: "The letter is here. The mailer is not.",
    teaser: "Read it on the desk. Join only after the disclaimers. We will not email or text until that status flips.",
    body: [
      "Pinks is becoming a daily letter: recaps, teasers, where to walk, what we got wrong. That lives on this site first so you do not need an inbox to use the desk.",
      "If you want it pushed to email or a phone later, Join is the door. Every box on that page is required. 21+. We are not a book. Picks are opinions. 1-800-GAMBLER is in the footer for a reason.",
      "Email and SMS are drafted, not live. Signing up now stores your intent on this device and the version of the terms you checked. When we turn the mailer on, Join will say so, and we will ask you to confirm again. Until then, nothing leaves this phone.",
    ],
  },
];

export function postBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
