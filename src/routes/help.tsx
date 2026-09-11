import { createFileRoute, Link } from "@tanstack/react-router";
import { HELP, HELP_ORDER } from "@/data/help";

export const Route = createFileRoute("/help")({ component: HelpPage });

function HelpPage() {
  return (
    <main className="flex flex-col gap-8">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Read this once</p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">How to use</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Same notes as the ? on each page. Tap a ? next to a heading when you only need that
          section.
        </p>
      </header>
      <ol className="flex flex-col gap-4">
        {HELP_ORDER.map((id) => {
          const h = HELP[id];
          return (
            <li key={id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <h2 className="font-display text-xl">{h.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
              {h.steps ? (
                <ol className="mt-3 list-decimal space-y-1 pl-4 text-sm text-muted">
                  {h.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="text-sm text-muted">
        Still lost? Start at{" "}
        <Link to="/" className="text-accent">
          Desk
        </Link>{" "}
        and tap the ? next to the big headline.
      </p>
    </main>
  );
}
