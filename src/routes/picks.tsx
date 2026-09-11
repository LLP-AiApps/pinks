import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BOOKS } from "@/data/slate";
import { useJoin } from "@/store/join";
import { useProfile } from "@/store/profile";
import { useBook } from "@/store/book";
import { buildPinkTicket, type BookPref, type Style } from "@/lib/personal";
import { formatAmerican, formatPct } from "@/lib/odds";
import { HelpRow } from "@/components/help-tip";
import { MemberGate } from "@/components/member-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/picks")({ component: PicksPage });

function PicksPage() {
  const { hydrate: hydrateJoin } = useJoin();
  const { profile, hydrate, set } = useProfile();
  const { save, hydrate: hydrateBook } = useBook();
  const navigate = useNavigate();

  useEffect(() => {
    hydrateJoin();
    hydrate();
    hydrateBook();
  }, [hydrateJoin, hydrate, hydrateBook]);

  const ticket = buildPinkTicket(profile);

  function stamp() {
    if (!ticket.legs.length) return;
    const book = BOOKS.find((b) => b.id === ticket.book);
    const slip = save({
      stake: ticket.stake,
      book: ticket.book,
      bookName: ticket.bookName,
      bookPlace: book?.place ?? ticket.bookPlace,
      legs: ticket.legs.map((l) => ({
        gameId: l.gameId,
        pick: l.pick,
        ml: l.ml,
        line: l.line,
      })),
    });
    if (slip) void navigate({ to: "/parlays", hash: `slip-${slip.id}` });
  }

  const form = (
    <div className="flex flex-col gap-8">
      <section className="grid gap-3 sm:grid-cols-2">
        <fieldset className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          <legend className="font-mono text-[0.625rem] uppercase tracking-widest text-muted">
            Style
          </legend>
          {(
            [
              ["lock", "Locks"],
              ["blend", "Blend"],
              ["flyer", "Flyer"],
            ] as const
          ).map(([id, label]) => (
            <label key={id} className="mt-2 flex min-h-11 items-center gap-3 text-sm">
              <input
                type="radio"
                name="style"
                checked={profile.style === id}
                onChange={() => set({ style: id as Style })}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <fieldset className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          <legend className="font-mono text-[0.625rem] uppercase tracking-widest text-muted">
            Max legs
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {([3, 4, 5, 6] as const).map((n) => (
              <Button
                key={n}
                size="sm"
                variant={profile.maxLegs === n ? "default" : "outline"}
                onClick={() => set({ maxLegs: n })}
              >
                {n}
              </Button>
            ))}
          </div>
          <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={profile.fadePublic}
              onChange={(e) => set({ fadePublic: e.target.checked })}
            />
            Haircut sides the public owns
          </label>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={profile.hedge}
              onChange={(e) => set({ hedge: e.target.checked })}
            />
            Mark a hedge on the weak leg
          </label>
        </fieldset>
        <fieldset className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          <legend className="font-mono text-[0.625rem] uppercase tracking-widest text-muted">
            Window
          </legend>
          {(
            [
              ["southpoint", "South Point / Rampart"],
              ["stations", "Stations (STN)"],
              ["circa", "Circa (hedge)"],
            ] as const
          ).map(([id, label]) => (
            <label key={id} className="mt-2 flex min-h-11 items-center gap-3 text-sm">
              <input
                type="radio"
                name="book"
                checked={profile.book === id}
                onChange={() => set({ book: id as BookPref })}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <label className="flex flex-col gap-2 rounded-xl bg-surface p-4 text-sm shadow-[var(--shadow-border)]">
          Stake
          <input
            type="number"
            min={1}
            max={10000}
            value={profile.stake}
            onChange={(e) => set({ stake: Math.max(1, Number(e.target.value) || 1) })}
            className="h-11 rounded-md bg-raised px-3"
          />
        </label>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl">{ticket.title}</h2>
          <Badge>{ticket.floor}</Badge>
        </div>
        <p className="text-sm text-muted">{ticket.vsHouse}</p>
        {ticket.legs.length ? (
          <ol className="flex flex-col gap-2">
            {ticket.legs.map((l, i) => (
              <li
                key={l.gameId}
                className="flex flex-col gap-1 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">
                    {i + 1}. {l.pick}
                  </span>
                  <span className="font-mono tabular-nums">{formatAmerican(l.ml)}</span>
                </div>
                <p className="text-sm text-muted">{l.matchup}</p>
                <p className="font-mono text-[0.6875rem] text-muted">
                  {formatPct(l.personal)} · {l.why}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-muted">No sides cleared the floor.</p>
        )}
        <p className="text-sm text-muted">
          Stamp at {ticket.bookName}. {ticket.bookWhy}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={stamp} disabled={!ticket.legs.length}>
            Save pink ticket
          </Button>
          <Button variant="outline" asChild>
            <Link to="/engine">See the bars</Link>
          </Button>
        </div>
        <p className="text-xs text-muted">
          Educational. Snapshot board, not a live feed. 21+. Not a wager until a licensed window
          takes it.
        </p>
      </section>
    </div>
  );

  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Personalized Pink Ticket
        </p>
        <HelpRow id="picks">
          <h1 className="font-display text-3xl tracking-tight">Yours</h1>
        </HelpRow>
        <p className="max-w-2xl text-sm text-muted">
          Same blend as the desk. Your floor, your window, your haircut on the public. Not a
          different reality — a different filter.
        </p>
      </header>
      <MemberGate teaser="Set style, legs, and window. We rebuild the ladder from the engine with your floor. Join is free. 21+.">
        {form}
      </MemberGate>
    </main>
  );
}
