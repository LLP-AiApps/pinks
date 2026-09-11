import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/help")({ component: HelpPage });

const STEPS = [
  {
    title: "1. Read the scoreboard",
    body: "Home shows games that already ended. Our written picks are a person. The computer is math. Your tickets are only what you saved. Those three lists do not mix.",
  },
  {
    title: "2. Learn the ticket",
    body: "A ticket with three games means all three must win. One loss and it is dead. Start with three. Four and five add weaker games on purpose.",
  },
  {
    title: "3. Look at this week",
    body: "Open Games. Who is hurt. Who is at home. If it feels like a coin flip, leave it off a multi-game ticket. One game you like is safer than six you hope for.",
  },
  {
    title: "4. Look at two shops",
    body: "Same game, two prices. Take the better one. We link boards. We do not take the bet.",
  },
  {
    title: "5. Save your slip",
    body: "Yours or Parlays → Save pink ticket. Sign in first if you want it on another phone. After Sunday, mark win, lose, or tie.",
  },
  {
    title: "6. Midweek news",
    body: "A starter gets hurt. A number moves. Open late news only when you need the last hour. If your weak game now looks dead, a hedge is a small second bet on the other side so you do not go home with zero.",
  },
  {
    title: "7. Why hedge",
    body: "You already like five teams. One looks shaky Friday. A small bet on that shaky team at another shop can pay the stake back if that one game ruins the big ticket. You give up some of the dream payout. That is the trade.",
  },
];

function HelpPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">One week</p>
        <h1 className="font-display text-3xl tracking-tight">How this works</h1>
        <p className="text-sm text-muted">
          Read the games. Write a ticket. Check news. Keep score. We are a desk, not a cashier.
        </p>
      </header>
      <ol className="flex flex-col gap-3">
        {STEPS.map((s) => (
          <li key={s.title} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-xl">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/terms">Words</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/learn">School</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/ask">Ask a question</Link>
        </Button>
      </div>
    </main>
  );
}
