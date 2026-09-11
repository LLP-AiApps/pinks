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
