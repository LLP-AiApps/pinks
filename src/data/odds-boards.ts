import type { BookId } from "./slate";

/** Free line boards. Casino homepages stay on Book.url (Open book). */
export const PUBLIC_ODDS: Record<BookId, string> = {
  circa: "https://www.cbssports.com/nfl/odds/",
  westgate: "https://www.vegasinsider.com/nfl/odds/las-vegas/",
  southpoint: "https://www.cbssports.com/nfl/odds/",
  stations: "https://www.covers.com/sport/football/nfl/odds",
  dk: "https://sportsbook.draftkings.com/leagues/football/nfl",
  fd: "https://sportsbook.fanduel.com/navigation/nfl",
  mgm: "https://sports.betmgm.com/en/sports/football-11/betting/usa-9/nfl-35",
  pinnacle: "https://www.pinnacle.com/en/football/nfl/matchups",
  bovada: "https://www.bovada.lv/sports/football/nfl",
};
