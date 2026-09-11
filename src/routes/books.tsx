import { createFileRoute } from "@tanstack/react-router";
import { BOOKS } from "@/data/slate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpRow } from "@/components/help-tip";

export const Route = createFileRoute("/books")({ component: BooksPage });

function BooksPage() {
  return (
    <main className="flex flex-col gap-6">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Where to stamp</p>
        <HelpRow id="books">
          <h1 className="mt-1 font-display text-3xl tracking-tight">The windows</h1>
        </HelpRow>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          South Point and Rampart share one sheet — friendliest parlays, not all over town. Stations
          (STN Sports) is a different book with windows in most neighborhoods. Walk to Stations. Do
          not assume it pays like South Point. 21+.
        </p>
      </header>
      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-xl">Free live boards</h2>
        <p className="mt-1 text-sm text-muted">
          Casino apps hide the number behind a login. These pages do not. Shop the window after you
          read the line.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" asChild>
            <a href="https://www.cbssports.com/nfl/odds/" target="_blank" rel="noopener noreferrer">
              CBS odds
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a
              href="https://www.vegasinsider.com/nfl/odds/las-vegas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              VegasInsider
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a
              href="https://www.covers.com/sport/football/nfl/odds"
              target="_blank"
              rel="noopener noreferrer"
            >
              Covers
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href="https://www.vegasodds.com/" target="_blank" rel="noopener noreferrer">
              VegasOdds
            </a>
          </Button>
        </div>
      </section>
      <ul className="grid gap-3 md:grid-cols-2">
        {BOOKS.map((b) => (
          <li key={b.id} className="flex flex-col gap-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl">{b.name}</h2>
                <p className="mt-1 font-mono text-xs text-muted">{b.place}</p>
              </div>
              <Badge>{b.kind}</Badge>
            </div>
            <p className="text-sm">{b.juice}</p>
            <p className="text-sm text-muted">{b.bestFor}</p>
            {b.windows?.length ? (
              <ul className="flex flex-col gap-1 text-xs text-muted">
                {b.windows.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            ) : null}
            <div className="mt-auto flex flex-wrap gap-2">
              <Button size="sm" asChild>
                <a href={b.oddsUrl} target="_blank" rel="noopener noreferrer">
                  Live odds
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  Open book
                </a>
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-xl">Desk order of operations</h2>
        <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5 text-sm leading-relaxed">
          <li>
            3–6 team moneyline parlays: South Point or Rampart (same sheet). Stations is around the
            corner for most of the valley — walk in, but read their parlay card. It is not South
            Point.
          </li>
          <li>Singles / sides: Circa, then Pinnacle, then Westgate (Caesars board).</li>
          <li>Hedges: Circa or Pinnacle so you are not paying −110 twice. Size is on the pink ticket.</li>
          <li>
            The pool card is a bar sheet every lounge in town runs. Different ticket. Blot it if you
            play the pool — this desk is Pinks.
          </li>
        </ol>
      </section>
    </main>
  );
}
