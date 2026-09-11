import { createFileRoute, Link } from "@tanstack/react-router";
import { LESSONS, lessonBySlug } from "@/data/learn";
import { MemberGate } from "@/components/member-gate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/learn/$slug")({ component: LessonPage });

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = lessonBySlug(slug);
  if (!lesson) {
    return (
      <main className="flex flex-col gap-4">
        <h1 className="font-display text-3xl">No lesson by that name</h1>
        <Button asChild>
          <Link to="/learn">Learn</Link>
        </Button>
      </main>
    );
  }

  const idx = LESSONS.findIndex((l) => l.slug === lesson.slug);
  const prev = idx > 0 ? LESSONS[idx - 1] : null;
  const next = idx >= 0 && idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;

  const article = (
    <div className="flex flex-col gap-8">
      {lesson.body.map((p) => (
        <p key={p.slice(0, 40)} className="text-base leading-relaxed text-muted">
          {p}
        </p>
      ))}
      {lesson.sections.map((s) => (
        <section key={s.heading} className="flex flex-col gap-3">
          <h2 className="font-display text-2xl tracking-tight">{s.heading}</h2>
          {s.body.map((p) => (
            <p key={p.slice(0, 40)} className="text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </section>
      ))}
      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">Read further</h2>
        <ul className="flex flex-col gap-3">
          {lesson.reading.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target={r.url.startsWith("http") ? "_blank" : undefined}
                rel={r.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-accent"
              >
                {r.title}
              </a>
              <p className="text-sm text-muted">{r.why}</p>
            </li>
          ))}
        </ul>
      </section>
      <nav className="flex flex-wrap gap-2 border-t border-border pt-6">
        {prev ? (
          <Button variant="outline" asChild>
            <Link to="/learn/$slug" params={{ slug: prev.slug }}>
              ← {prev.title}
            </Link>
          </Button>
        ) : null}
        {next ? (
          <Button asChild>
            <Link to="/learn/$slug" params={{ slug: next.slug }}>
              {next.title} →
            </Link>
          </Button>
        ) : null}
      </nav>
    </div>
  );

  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <Link to="/learn" className="hover:text-accent">
          Learn
        </Link>
      </p>
      <Badge className="w-fit">{lesson.kicker}</Badge>
      <h1 className="font-display text-4xl tracking-tight">{lesson.title}</h1>
      <p className="text-base text-muted">{lesson.teaser}</p>
      {lesson.member ? <MemberGate teaser={lesson.teaser}>{article}</MemberGate> : article}
      <Button variant="outline" asChild>
        <Link to="/learn">All lessons</Link>
      </Button>
    </article>
  );
}
