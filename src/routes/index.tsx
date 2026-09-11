import { createFileRoute, Link } from "@tanstack/react-router";
import { CARD_OVERS, GAMES, SNAPSHOT, BOOKS } from "@/data/slate";
import { PUBLIC_ODDS } from "@/data/odds-boards";
import { PRESETS } from "@/data/parlays";
import { CHANGELOG } from "@/data/changelog";
import { HOUSE } from "@/data/house";
import { POSTS } from "@/data/letter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatAmerican, formatPct } from "@/lib/odds";
import { seasonRecord } from "@/lib/engine";
import { HelpRow } from "@/components/help-tip";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const live = GAMES.filter((g) => g.status !== "final");
  const locks = live.filter((g) => g.confidence >= 4 && g.parlaySafe);
  const rec = seasonRecord();
  const desk = `${rec.desk.w}–${rec.desk.l}`;
  return (
    <main className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {HOUSE.name} · {HOUSE.tag}
        </p>
        <HelpRow id="desk">
          <h1 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            {SNAPSHOT.headline}
          </h1>
        </HelpRow>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {HOUSE.line} Circa and South Point first. Wire for the last hour. Not on page load.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Stat label="Desk SU" value={desk} hint="SEA hit · LAR miss · climb starts here" />
        <Stat label="MNF total" value="41" hint="KC 24 · DEN 17 · Over 37½" />
        <Stat label="TNF" value="SF 27–7" hint="Under cashed · travel spot" />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <HelpRow id="letter">
            <h2 className="text-2xl">The letter</h2>
          </HelpRow>
          <Button variant="outline" size="sm" asChild>
            <Link to="/letter">All letters</Link>
          </Button>
        </div>
        <Link
          to="/letter/$slug"
          params={{ slug: POSTS[0]!.slug }}
          className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {POSTS[0]!.kicker} · {POSTS[0]!.day}
          </p>
          <h3 className="mt-2 font-display text-2xl">{POSTS[0]!.title}</h3>
          <p className="mt-2 text-sm text-muted">{POSTS[0]!.teaser}</p>
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <HelpRow id="learn">
            <h2 className="text-2xl">Learn</h2>
          </HelpRow>
          <Button variant="outline" size="sm" asChild>
            <Link to="/learn">School</Link>
          </Button>
        </div>
        <p className="text-sm text-muted">
          Ladder, hedge, Grok vs humans. Members only on the teaching. Join is free. Not a lock.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <HelpRow id="picks">
            <h2 className="text-2xl">Yours</h2>
          </HelpRow>
          <Button variant="outline" size="sm" asChild>
            <Link to="/picks">Pink Ticket</Link>
          </Button>
        </div>
        <p className="text-sm text-muted">
          Personalized ladder from the same blend. Your floor, your window. Snapshot, not a live
          ticker.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-4">
          <HelpRow id="stamp">
            <h2 className="text-2xl">Stamp it</h2>
          </HelpRow>
          <Button variant="outline" size="sm" asChild>
            <Link to="/books">All windows</Link>
          </Button>
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {BOOKS.map((b) => (
            <li key={b.id}>
              <a
                href={PUBLIC_ODDS[b.id]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-between gap-2 rounded-lg bg-surface px-3 py-2 text-sm shadow-[var(--shadow-border)] hover:text-accent"
              >
                <span>{b.name}</span>
                <span className="font-mono text-[0.625rem] uppercase text-muted">odds</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <HelpRow id="whatsnew">
            <h2 className="text-2xl">What’s new</h2>
          </HelpRow>
          <Button variant="outline" size="sm" asChild>
            <Link to="/log">Full log</Link>
          </Button>
        </div>
        <ol className="flex flex-col gap-2">
          {CHANGELOG.slice(0, 3).map((e) => (
            <li key={e.id} className="rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={e.kind === "miss" ? "risk" : e.kind === "result" ? "win" : "neutral"}>
                  {e.kind}
                </Badge>
                <span className="font-mono text-xs text-muted">
                  {e.day} · {e.time}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium">{e.title}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <HelpRow id="ladder">
            <h2 className="text-2xl">Parlay ladder</h2>
          </HelpRow>
          <Button variant="outline" size="sm" asChild>
            <Link to="/parlays">Parlays</Link>
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {PRESETS.map((p) => (
            <Link
              key={p.legs}
              to="/parlays"
              className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] hover:shadow-[var(--shadow-border-hover)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {p.legs} team
                </span>
                <Badge tone="accent">{p.book}</Badge>
              </div>
              <p className="mt-2 font-display text-xl">{p.title}</p>
              <p className="mt-2 text-sm text-muted">{p.bookWhy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <HelpRow id="locks">
          <h2 className="text-2xl">High-confidence sides</h2>
        </HelpRow>
        <ul className="divide-y divide-border rounded-xl bg-surface shadow-[var(--shadow-border)]">
          {locks.map((g) => (
            <li key={g.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-medium">
                  {g.ourPick}{" "}
                  <span className="text-muted">
                    {g.away} @ {g.home}
                  </span>
                </p>
                <p className="font-mono text-xs text-muted">{g.window}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm tabular-nums">{formatPct(g.ourProb)}</p>
                <p className="font-mono text-xs text-muted">
                  {formatAmerican(g.ourPick === g.home ? g.mlHome : g.mlAway)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <HelpRow id="wire-home">
          <h2 className="text-xl">Live Grok wire</h2>
        </HelpRow>
        <p className="mt-2 text-sm text-muted">
          Grok has native X search. Perplexity does not. Pull only when you need it so we do not
          spend the key on every refresh.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/wire">Open wire</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/engine">Open engine</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/studio">Open studio</Link>
          </Button>
        </div>
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <HelpRow id="pool-home">
          <h2 className="text-xl">Pool card — blot these</h2>
        </HelpRow>
        <p className="mt-1 text-sm text-muted">
          Ties win. Tiebreaker is closest to Monday night total. Write {SNAPSHOT.mnfTotal}.
        </p>
        <p className="mt-4 font-mono text-sm leading-relaxed tabular-nums">
          {SNAPSHOT.cardBlots.join("  ·  ")}
        </p>
        <p className="mt-3 text-sm text-muted">
          Sunday {CARD_OVERS.sunday.pick} {CARD_OVERS.sunday.line} (square {CARD_OVERS.sunday.over}).
          Monday {CARD_OVERS.monday.pick} {CARD_OVERS.monday.line} (square {CARD_OVERS.monday.over}).
        </p>
        <Button className="mt-4" asChild>
          <Link to="/card">Full card</Link>
        </Button>
      </section>
    </main>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </div>
  );
}
