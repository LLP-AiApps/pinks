import { createFileRoute, Link } from "@tanstack/react-router";
import { LEGAL_SECTIONS, LEGAL_UPDATED, LEGAL_VERSION } from "@/data/legal";
import { HelpRow } from "@/components/help-tip";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/legal")({ component: LegalPage });

function LegalPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Version {LEGAL_VERSION}
        </p>
        <HelpRow id="legal">
          <h1 className="font-display text-3xl tracking-tight">Legal</h1>
        </HelpRow>
        <p className="text-sm text-muted">
          Drafted {LEGAL_UPDATED}. House language. Read it before Join. 21+. 1-800-GAMBLER.
        </p>
      </header>
      <ol className="flex flex-col gap-6">
        {LEGAL_SECTIONS.map((s, i) => (
          <li key={s.id} id={s.id} className="flex flex-col gap-2">
            <h2 className="font-display text-xl">
              {i + 1}. {s.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <Button asChild>
        <Link to="/join">Join</Link>
      </Button>
    </main>
  );
}
