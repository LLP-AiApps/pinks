import { createFileRoute } from "@tanstack/react-router";
import { SOURCES, X_HANDLES } from "@/data/sources";
import { HelpRow } from "@/components/help-tip";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/sources")({ component: SourcesPage });

function SourcesPage() {
  const live = SOURCES.filter((s) => s.use);
  const listed = SOURCES.filter((s) => !s.use);

  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Upon request</p>
        <HelpRow id="sources">
          <h1 className="font-display text-3xl tracking-tight">Sources</h1>
        </HelpRow>
        <p className="max-w-2xl text-sm text-muted">
          If we used it, it should be here and linked. If it is not, say so — we will add it. We do
          not scrape twelve sites on a timer. Free, high-signal, named.
        </p>
      </header>
      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">In the blend or on the wire</h2>
        <SourceList items={live} />
      </section>
      {listed.length ? (
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl">Listed, not queried every pull</h2>
          <SourceList items={listed} />
        </section>
      ) : null}
      <section className="rounded-xl bg-surface p-5 text-sm text-muted shadow-[var(--shadow-border)]">
        <p className="font-display text-lg text-fg">X handles on a live pull</p>
        <p className="mt-2">{X_HANDLES.join(" · ")}</p>
      </section>
    </main>
  );
}

function SourceList({ items }: { items: typeof SOURCES }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((s) => (
        <li key={s.url + s.name} className="flex flex-col gap-1 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-accent">
              {s.name}
            </a>
            <Badge>{s.kind}</Badge>
          </div>
          <p className="text-sm text-muted">
            {s.role} — {s.why}
          </p>
        </li>
      ))}
    </ul>
  );
}
