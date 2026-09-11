import { createFileRoute, Link, Outlet, useParams } from "@tanstack/react-router";
import { LESSONS } from "@/data/learn";
import { useJoin } from "@/store/join";
import { HelpRow } from "@/components/help-tip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export const Route = createFileRoute("/learn")({ component: LearnLayout });

function LearnLayout() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  if (slug) return <Outlet />;
  return <LearnIndex />;
}

function LearnIndex() {
  const { record, hydrate } = useJoin();
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  const member = !!record;

  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">School</p>
        <HelpRow id="learn">
          <h1 className="font-display text-3xl tracking-tight">Learn</h1>
        </HelpRow>
        <p className="max-w-2xl text-sm text-muted">
          For people who know football and have never stamped a ticket. Start with the board.
          Then the ladder. Educational. Not a promise you get paid. 21+.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/learn/$slug" params={{ slug: "board" }}>
              Start here
            </Link>
          </Button>
          {member ? (
            <Badge tone="win">Member on this phone</Badge>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/join">Join</Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link to="/sources">All sources</Link>
          </Button>
        </div>
      </header>
      <ul className="flex flex-col gap-3">
        {LESSONS.map((l) => (
          <li key={l.slug}>
            <Link
              to="/learn/$slug"
              params={{ slug: l.slug }}
              className="flex flex-col gap-2 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{l.kicker}</Badge>
              </div>
              <h2 className="font-display text-2xl">{l.title}</h2>
              <p className="text-sm text-muted">{l.teaser}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
