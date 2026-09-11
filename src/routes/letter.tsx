import { createFileRoute, Link, Outlet, useParams } from "@tanstack/react-router";
import { POSTS } from "@/data/letter";
import { MAILER_STATUS } from "@/store/join";
import { HelpRow } from "@/components/help-tip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/letter")({ component: LetterLayout });

function LetterLayout() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  if (slug) return <Outlet />;
  return <LetterIndex />;
}

function LetterIndex() {
  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">The letter</p>
        <HelpRow id="letter">
          <h1 className="font-display text-3xl tracking-tight">Daily desk</h1>
        </HelpRow>
        <p className="max-w-2xl text-sm text-muted">
          Recaps, teasers, where to walk. On the site first. Email and text are{" "}
          <span className="text-fg">{MAILER_STATUS}</span> until Join says otherwise.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/join">Join</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/legal">Legal</Link>
          </Button>
        </div>
      </header>
      <ul className="flex flex-col gap-3">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <Link
              to="/letter/$slug"
              params={{ slug: p.slug }}
              className="flex flex-col gap-2 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{p.kicker}</Badge>
                <span className="font-mono text-xs text-muted">{p.day}</span>
              </div>
              <h2 className="font-display text-2xl">{p.title}</h2>
              <p className="text-sm text-muted">{p.teaser}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
