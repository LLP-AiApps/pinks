import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  deskMe,
  gradeDeskTicket,
  listDeskTickets,
  type DeskTicket,
} from "@/lib/desk-auth";
import { formatAmerican } from "@/lib/odds";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [tickets, setTickets] = useState<DeskTicket[] | null>(null);
  const [error, setError] = useState("");

  async function load() {
    const me = (await deskMe()) as { ok: true; user: { email: string; name: string } | null };
    setUser(me.user);
    if (!me.user) {
      setTickets(null);
      return;
    }
    const out = (await listDeskTickets()) as
      | { ok: true; tickets: DeskTicket[] }
      | { ok: false; error: string };
    if (!out.ok) {
      setError(out.error);
      setTickets([]);
      return;
    }
    setError("");
    setTickets(out.tickets);
  }

  useEffect(() => {
    void load();
  }, []);

  async function grade(id: number, result: "win" | "lose" | "push" | "open") {
    await gradeDeskTicket({ data: { id, result } });
    void load();
  }

  const decided = tickets?.filter((t) => t.result === "win" || t.result === "lose" || t.result === "push") ?? [];
  const wins = decided.filter((t) => t.result === "win").length;
  const losses = decided.filter((t) => t.result === "lose").length;
  const pushes = decided.filter((t) => t.result === "push").length;
  const atRisk = decided.reduce((n, t) => n + (t.stake ?? 0), 0);
  const lost = decided.filter((t) => t.result === "lose").reduce((n, t) => n + (t.stake ?? 0), 0);
  const pct = wins + losses ? Math.round((100 * wins) / (wins + losses)) : 0;

  if (user === null && tickets === null && !error) {
    return (
      <main className="mx-auto max-w-2xl text-sm text-muted">Opening the book…</main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto flex max-w-lg flex-col gap-4">
        <h1 className="font-display text-3xl tracking-tight">History</h1>
        <p className="text-sm text-muted">Sign in to see tickets saved off this phone.</p>
        <Button asChild>
          <Link to="/login">Sign in</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {user.name} · season book
        </p>
        <h1 className="font-display text-3xl tracking-tight">History</h1>
        <p className="text-sm text-muted">
          Worksheets you stamped while signed in. Grade them after the window. Compare to the desk
          on the home page. Not a wager the desk holds.
        </p>
      </header>
      {tickets?.length ? (
        <section className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">You</p>
            <p className="mt-1 font-display text-3xl tabular-nums">{pct}%</p>
            <p className="text-sm text-muted">
              {wins}–{losses}{pushes ? ` –${pushes}p` : ""} decided tickets
            </p>
          </div>
          <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Staked</p>
            <p className="mt-1 font-display text-3xl tabular-nums">${atRisk}</p>
            <p className="text-sm text-muted">On tickets you already graded</p>
          </div>
          <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Lost stake</p>
            <p className="mt-1 font-display text-3xl tabular-nums">${lost}</p>
            <p className="text-sm text-muted">Wins still need a payout number. Next.</p>
          </div>
        </section>
      ) : null}
      {error ? <p className="text-sm text-risk">{error}</p> : null}
      {!tickets?.length ? (
        <p className="text-sm text-muted">
          No slips yet. Build one on{" "}
          <Link to="/picks" className="text-accent">
            Yours
          </Link>{" "}
          or{" "}
          <Link to="/parlays" className="text-accent">
            Parlays
          </Link>
          , then Save pink ticket.
        </p>
      ) : (
        <ol className="flex flex-col gap-4">
          {tickets.map((t) => (
            <li key={t.id} className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl">
                  Week {t.week} · {t.title}
                </h2>
                <span className="font-mono text-xs uppercase text-muted">{t.result}</span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {t.book || "window TBD"}
                {t.stake ? ` · $${t.stake}` : ""}
              </p>
              <ul className="mt-3 flex flex-col gap-1 text-sm">
                {t.legs.map((leg, i) => (
                  <li key={`${t.id}-${i}`}>
                    {leg.pick} <span className="text-muted">{leg.line}</span>{" "}
                    <span className="font-mono">{formatAmerican(leg.ml)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["win", "lose", "push", "open"] as const).map((r) => (
                  <Button key={r} size="sm" variant={t.result === r ? "default" : "outline"} onClick={() => void grade(t.id, r)}>
                    {r}
                  </Button>
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
