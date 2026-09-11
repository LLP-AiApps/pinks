import { createFileRoute, Link } from "@tanstack/react-router";
import { TERMS } from "@/data/terms";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Words people use</p>
        <h1 className="font-display text-3xl tracking-tight">Terms</h1>
        <p className="text-sm text-muted">
          Shop talk first. Plain talk when you tap. You do not need all of these to save a 3-game
          ticket.
        </p>
      </header>
      <ul className="flex flex-col gap-2">
        {TERMS.map((t) => (
          <li key={t.id}>
            <details className="rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
              <summary className="cursor-pointer list-none">
                <span className="font-medium">{t.word}</span>
                <span className="mt-1 block text-sm text-muted">{t.short}</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.more}</p>
            </details>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted">
        Still stuck?{" "}
        <Link to="/help" className="text-accent">
          How a week works
        </Link>{" "}
        or{" "}
        <Link to="/ask" className="text-accent">
          ask a question
        </Link>
        .
      </p>
    </main>
  );
}
