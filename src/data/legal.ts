/** Draft house terms. Not a substitute for a lawyer. Dated so we can version them. */

export const LEGAL_VERSION = "2026-09-11-a";
export const LEGAL_UPDATED = "September 11, 2026";

export const LEGAL_SECTIONS: { id: string; title: string; body: string }[] = [
  {
    id: "what",
    title: "What Pinks is",
    body: "Pinks (also “the desk,” “the letter,” Pinkerton) is an educational sports desk. We gather open research — schedules, injuries, history, public splits, posted lines — and we write algorithms to predict outcomes. We compare those guesses to human cappers, to other models, and to Grok on a live wire. The question is whether a colder process can beat emotion. We are not a casino, not a sportsbook, not a messenger, and not a broker. We do not take wagers, hold money, cash tickets, or pay winners.",
  },
  {
    id: "not-advice",
    title: "Not advice",
    body: "Nothing here is betting advice, financial advice, or a promise you will make money. “Theoretically” and “on paper” are not a bankroll. Picks are opinions with a record attached. We publish misses. You can lose the entire stake. Many people do. If you build your own app from what we show, that is on you too.",
  },
  {
    id: "age",
    title: "21+",
    body: "You must be 21 or older to use Pinks, to Join, or to follow a pick into a sportsbook. Sports betting in Nevada is 21+. If you are not 21, leave. If you are 21 but it is not legal to bet where you stand, that is your problem to know — we do not check your GPS so we can take a bet, because we do not take bets.",
  },
  {
    id: "responsible",
    title: "Responsible gaming",
    body: "If betting is a problem, stop and get help. National: 1-800-GAMBLER (1-800-426-2537) or 1-800GAMBLER.net. Nevada: the Problem Gambling Helpline 1-800-GAMBLER, and the Nevada Council on Problem Gambling. Don’t chase. Don’t bet rent. A parlay is entertainment priced as risk, not a plan.",
  },
  {
    id: "tickets",
    title: "Pink tickets and the pool card",
    body: "A pink ticket you save or print is a worksheet for you. It is not a wager, not a receipt, and not accepted at any window. The pool card (Bogey’s and every other lounge sheet) is a separate contest run by that bar. We do not operate it. Ties, tiebreakers, and prizes are their rules.",
  },
  {
    id: "books",
    title: "Other people’s windows",
    body: "Circa, South Point, Rampart, Stations / STN Sports, Westgate, DraftKings, FanDuel, BetMGM, Pinnacle, Bovada, and every other name we link are independent. We are not affiliated with the NFL, any club, or any book. Odds change. Their house rules govern their tickets. Shop the number. Do not assume South Point’s parlay sheet is Stations’.",
  },
  {
    id: "letter",
    title: "The letter, email, and text",
    body: "The letter lives on this site first. Email and SMS are optional and are OFF until we turn the mailer on. Joining now stores your name, email, and (if you gave it) phone on the desk roster so it is not trapped in one browser. That is consent to be considered for the list, not a blast today. We will not send a marketing text or email until (1) you have checked every box on Join, (2) the mailer status on Join says live, and (3) you can see how to stop. We do not sell the list. We do not rent the list. The roster is behind a house code. If the GitHub repo is public, that code is a family door, not a vault.",
  },
  {
    id: "tcpa",
    title: "If texts or email ever go live",
    body: "By joining for text you would consent to receive automated sports-desk messages from Pinks at the number you give, including recaps and pick teasers. Frequency varies with the slate (often a few a week in season, quiet in the offseason). Message and data rates may apply. Reply STOP to stop texts, HELP for help. Email: use the unsubscribe link we will put in every letter. Consent is not required to look at the public desk. We do not send until the mailer is on — this paragraph is the draft of that consent, not a live campaign.",
  },
  {
    id: "privacy",
    title: "What we keep",
    body: "Until the mailer is on, a Join on this device is stored on this device (your phone or computer). We are not running a central subscriber database yet on purpose. When we do, we will say so on Join, version this notice, and ask you to confirm again. Do not put a password here. Do not send us a credit card.",
  },
  {
    id: "record",
    title: "The record",
    body: "What’s new / the log is how we keep ourselves honest. A miss stays a miss. The engine is a model with public weights, not a crystal ball. 100% is a north star, not a claim.",
  },
  {
    id: "risk",
    title: "Your risk",
    body: "You use Pinks at your own risk. We are not liable for a bad beat, a pushed total, a booked line that moved, a phone that died at the window, or a ticket you stamped after reading us. To the extent the law allows, the desk is provided as-is. This draft is house language, not a private ruling from a court or the Nevada Gaming Control Board.",
  },
  {
    id: "contact",
    title: "Who this is",
    body: "Jerime Pinkerton. Las Vegas since 1996. The desk is Pinks. If this notice is wrong, we will date a new version rather than quietly rewrite history.",
  },
  {
    id: "education",
    title: "Education, not a get-rich system",
    body: "Learn (the ladder, hedges, shop-the-number) is for members who have signed Join. The public desk still shows the week’s ticket. The teaching is behind Join so we know you saw 21+, not-a-book, and 1-800-GAMBLER. Methods successful bettors talk about — true-odds parlays, hedging a weak leg, Kelly as math not a command — are explained with links out. We do not claim those methods make you a winner.",
  },
  {
    id: "experiment",
    title: "The study",
    body: "We are trying to see if Grok and a public blend can out-predict humans and other prompts over a season. The engine weights are listed. Sources are listed and linked; if something is used and not linked, ask and we will add it. Thus far anyone with one cold prompt and less feeling could copy this desk. If we ever have a real proprietary edge, we will say what is house and what is open. We are not there.",
  },
  {
    id: "tuition",
    title: "What it costs",
    body: "Join is free. There is no charge today. If we ever charge, it will only be to run APIs (Grok wire, data) and keep the study going — not to sell you a lock. The price will be posted on Join before anyone is billed. We will not surprise-charge a card we do not have. Do not send money until Join says otherwise.",
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
    label: "I understand Pinks is not a sportsbook, does not take bets, and a pink ticket is not a wager.",
    required: true,
  },
  {
    id: "opinion",
    label: "I understand picks are opinions. I can lose money. I know 1-800-GAMBLER exists if betting is a problem.",
    required: true,
  },
  {
    id: "terms",
    label: "I have read the Terms, Responsible Gaming, education, and privacy notes (Legal), version 2026-09-11-a.",
    required: true,
  },
  {
    id: "mailer",
    label:
      "I understand email and text are OFF. Joining is consent to be considered later. Nothing is sent until Join says the mailer is live, and I can opt out.",
    required: true,
  },
  {
    id: "edu",
    label:
      "I understand Learn is educational. Nobody is promising I will make money. Any future fee will be posted on Join before it exists, and only to run the study and the APIs.",
    required: true,
  },
];
