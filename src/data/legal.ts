/** Draft house terms. Not a substitute for a lawyer. Dated so we can version them. */

export const LEGAL_VERSION = "2026-09-11-b";
export const LEGAL_UPDATED = "September 11, 2026";

export const LEGAL_SECTIONS: { id: string; title: string; body: string }[] = [
  {
    id: "what",
    title: "What Pinks is",
    body: "Pinks is an educational sports desk. We write down who we think wins and keep score. We are not a casino, not a sportsbook, and not a cashier. We do not take bets, hold money, or pay winners.",
  },
  {
    id: "not-advice",
    title: "Not advice",
    body: "Nothing here is a promise you will make money. Picks are opinions with a record attached. We publish misses. You can lose the entire stake at a real shop.",
  },
  {
    id: "age",
    title: "21+",
    body: "You must be 21 or older to use Pinks or to take a pick to a sportsbook. If it is not legal where you stand, that is yours to know. We do not take bets.",
  },
  {
    id: "responsible",
    title: "Responsible gaming",
    body: "If betting is a problem, stop. 1-800-GAMBLER (1-800-426-2537). Do not chase. Do not bet rent. Do not make a money decision drunk or high. This site is closer to a paper than a cashier.",
  },
  {
    id: "tickets",
    title: "Pink tickets",
    body: "A slip you save here is a worksheet. It is not a wager and not accepted at a window.",
  },
  {
    id: "books",
    title: "Other people’s shops",
    body: "Circa, South Point, Stations, and the rest are independent. Their rules govern their tickets. Shop the number.",
  },
  {
    id: "letter",
    title: "The letter, email, and text",
    body: "The write-up lives on this site. Email and text are OFF. Joining stores your name so we can write later. Nothing is sent until Join says the mailer is live.",
  },
  {
    id: "privacy",
    title: "What we keep",
    body: "Join and questions go to the desk list. We do not sell it. Do not send a password or a card number.",
  },
  {
    id: "record",
    title: "The record",
    body: "A miss stays a miss. 50% after two games means one right and one wrong.",
  },
  {
    id: "risk",
    title: "Your risk",
    body: "You use Pinks at your own risk. The desk is as-is.",
  },
  {
    id: "contact",
    title: "Who this is",
    body: "Jerime Pinkerton. Las Vegas since 1996. Ask lives on this site.",
  },
  {
    id: "education",
    title: "Education",
    body: "Learn and How this works are school. Nobody is promising a payday.",
  },
  {
    id: "tuition",
    title: "What it costs",
    body: "Join is free. There is no charge today.",
  },
];

export const JOIN_CHECKS: { id: string; label: string; required: true }[] = [
  {
    id: "age",
    label: "I am 21 or older.",
    required: true,
  },
  {
    id: "not-book",
    label: "I know Pinks does not take bets. A saved slip is a worksheet. Picks can be wrong. 1-800-GAMBLER if betting is a problem.",
    required: true,
  },
  {
    id: "terms",
    label: "I have read Legal (version 2026-09-11-b), including that email is off and this is not a shop.",
    required: true,
  },
];
