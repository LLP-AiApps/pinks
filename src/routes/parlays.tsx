import { createFileRoute } from "@tanstack/react-router";
import { PRESETS, type ParlayPreset } from "@/data/parlays";
import { GAMES, bookById, type BookId } from "@/data/slate";
import { useTicket } from "@/store/ticket";
import { useBook, type SlipLeg } from "@/store/book";
import { PinkSlip } from "@/components/pink-slip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  formatAmerican,
  formatAmericanFromDecimal,
  formatMoney,
  formatPct,
  parlayDecimal,
  parlayPayout,
} from "@/lib/odds";
import { planHedge } from "@/lib/hedge";
import { cn } from "@/lib/utils";
import { HelpRow } from "@/components/help-tip";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/parlays")({ component: ParlaysPage });

function currentLegs(selected: string[]): SlipLeg[] {
  return selected
    .map((id) => GAMES.find((g) => g.id === id))
    .filter((g): g is (typeof GAMES)[number] => g != null && g.status !== "final")
    .map((g) => ({
      gameId: g.id,
      pick: g.ourPick,
      ml: g.ourPick === g.home ? g.mlHome : g.mlAway,
      line: `${g.away} @ ${g.home}`,
    }));
}

function ParlaysPage() {
  const { selected, toggle, applyPreset, clear, stake, setStake } = useTicket();
  const { slips, hydrate, save, remove } = useBook();
  const [notice, setNotice] = useState("");
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const legs = selected
    .map((id) => GAMES.find((g) => g.id === id))
    .filter((g): g is (typeof GAMES)[number] => g != null && g.status !== "final");
  const mls = legs.map((g) => (g.ourPick === g.home ? g.mlHome : g.mlAway));
  const dec = mls.length ? parlayDecimal(mls) : 1;
  const payout = mls.length ? parlayPayout(mls, stake) : 0;
  const prob = legs.reduce((acc, g) => acc * g.ourProb, 1);
  const preset = PRESETS.find(
    (p) => p.gameIds.length === selected.length && p.gameIds.every((id) => selected.includes(id)),
  );
  const candidates = GAMES.filter((g) => g.status !== "final");
  const weak = legs.slice().sort((a, b) => a.ourProb - b.ourProb)[0];
  const bookId: BookId = preset?.book ?? "southpoint";
  const book = bookById(bookId);
  const liveHedge = planHedge(currentLegs(selected), stake);

  function saveTicket() {
    const built = currentLegs(selected);
    if (!built.length) return;
    const slip = save({
      stake,
      book: bookId,
      bookName: book.name,
      bookPlace: book.place,
      legs: built,
    });
    if (!slip) return;
    setNotice(`Saved ticket #${slip.rot}. Your tickets are below — we scrolled you there.`);
    window.setTimeout(() => {
      document.getElementById(`slip-${slip.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  function printTickets() {
    if (!slips.length) saveTicket();
    window.setTimeout(() => window.print(), 200);
  }

  return (
    <main className="flex flex-col gap-8">
      <header className="no-print">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Pink tickets</p>
        <HelpRow id="parlays">
          <h1 className="mt-1 font-display text-3xl tracking-tight">Parlays</h1>
        </HelpRow>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Build a ticket. Tap <strong className="text-fg">Save pink ticket</strong> — it jumps you
          down to Your tickets. Tap <strong className="text-fg">Print tickets</strong> for paper or a
          PDF. Each slip names the weak leg and the hedge to cover it.
        </p>
      </header>

      {notice ? (
        <p className="no-print rounded-lg bg-accent/15 px-4 py-3 text-sm text-accent">{notice}</p>
      ) : null}

      {slips.length ? (
        <div className="no-print flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
          <p className="text-sm">
            {slips.length} pink ticket{slips.length === 1 ? "" : "s"} saved on this phone
          </p>
          <Button size="sm" variant="outline" onClick={printTickets}>
            Print tickets
          </Button>
        </div>
      ) : null}

      <div className="no-print flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p.legs}
            variant={preset?.legs === p.legs ? "default" : "outline"}
            size="sm"
            onClick={() => applyPreset(p.legs)}
          >
            {p.legs}-team
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={clear}>
          Clear
        </Button>
      </div>

      <section className="no-print grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Legs</p>
          <ul className="mt-3 flex flex-col gap-1">
            {candidates.map((g) => {
              const on = selected.includes(g.id);
              const ml = g.ourPick === g.home ? g.mlHome : g.mlAway;
              return (
                <li key={g.id}>
                  <button
                    type="button"
                    onClick={() => toggle(g.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm",
                      on ? "bg-raised" : "hover:bg-raised/60",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-5 place-items-center rounded-sm text-[0.625rem]",
                        on ? "bg-accent text-accent-fg" : "bg-raised text-muted",
                      )}
                    />
                    <span className="flex-1">
                      {g.ourPick}{" "}
                      <span className="text-muted">
                        {g.away} @ {g.home}
                      </span>
                    </span>
                    <span className="font-mono tabular-nums">{formatAmerican(ml)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="flex flex-col gap-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {legs.length} team · {formatAmericanFromDecimal(dec)}
          </p>
          <p className="font-display text-4xl tabular-nums">{formatMoney(payout)}</p>
          <p className="text-sm text-muted">
            To hit {formatMoney(stake)} at posted American. Desk hit rate {formatPct(prob)}.
          </p>
          <label className="flex flex-col gap-1 text-sm">
            Stake
            <input
              type="number"
              min={1}
              value={stake}
              onChange={(e) => setStake(Number(e.target.value) || 1)}
              className="h-11 rounded-md bg-raised px-3 font-mono tabular-nums shadow-[var(--shadow-border)] focus-visible:outline-2 focus-visible:outline-accent"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button id="save-pink-ticket" onClick={saveTicket} disabled={!legs.length}>
              Save pink ticket
            </Button>
            <Button id="print-tickets" variant="outline" onClick={printTickets}>
              Print tickets
            </Button>
          </div>
          {liveHedge ? (
            <div className="rounded-md bg-raised px-3 py-3 text-sm">
              <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted">
                Hedge · weak {liveHedge.weakPick}
              </p>
              <p className="mt-1">
                {liveHedge.against} {formatAmerican(liveHedge.againstMl)} for {formatMoney(liveHedge.stake)}
              </p>
              <p className="mt-1 text-muted">{liveHedge.note}</p>
            </div>
          ) : null}
          {preset ? (
            <PresetBook preset={preset} />
          ) : weak ? (
            <p className="text-sm">
              Weakest leg is {weak.ourPick} ({formatPct(weak.ourProb)}). {weak.hedge ?? "No posted hedge."}
            </p>
          ) : (
            <p className="text-sm text-muted">Pick legs or tap 3-team.</p>
          )}
        </aside>
      </section>

      <section>
        <div className="no-print mb-4 flex items-end justify-between gap-3">
          <HelpRow id="tickets">
            <h2 className="font-display text-xl">Your tickets</h2>
          </HelpRow>
          <p className="text-sm text-muted">
            {slips.length ? `${slips.length} saved on this phone` : "None saved yet"}
          </p>
        </div>
        {slips.length ? (
          <ul className="print-slips grid gap-4 md:grid-cols-2">
            {slips.map((slip) => (
              <li key={slip.id} className="flex flex-col gap-2">
                <PinkSlip slip={slip} />
                <Button
                  className="no-print self-start"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(slip.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-print text-sm text-muted">
            Tap Save pink ticket. Then Print tickets — on a phone choose Print, then Save as PDF if
            you want a file instead of paper.
          </p>
        )}
      </section>
    </main>
  );
}

function PresetBook({ preset }: { preset: ParlayPreset }) {
  const book = bookById(preset.book);
  return (
    <div className="flex flex-col gap-3 text-sm">
      <Badge tone="accent">{book.name}</Badge>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" asChild>
          <a href={book.oddsUrl} target="_blank" rel="noopener noreferrer">
            Live odds
          </a>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <a href={book.url} target="_blank" rel="noopener noreferrer">
            Stamp at {book.name}
          </a>
        </Button>
      </div>
      <p>
        <span className="text-muted">Why here · </span>
        {preset.bookWhy}
      </p>
      <p>
        <span className="text-win">Safe · </span>
        {preset.safe}
      </p>
      <p>
        <span className="text-risk">Risk · </span>
        {preset.risk}
      </p>
      <p>
        <span className="text-muted">Hedge · </span>
        {preset.hedge}
      </p>
    </div>
  );
}
