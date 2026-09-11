import { createFileRoute, Link } from "@tanstack/react-router";
import { postBySlug } from "@/data/letter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/letter/$slug")({
  component: LetterPostPage,
});

function LetterPostPage() {
  const { slug } = Route.useParams();
  const post = postBySlug(slug);
  if (!post) {
    return (
      <main className="flex flex-col gap-4">
        <h1 className="font-display text-3xl">No letter by that name</h1>
        <Button asChild>
          <Link to="/letter">All letters</Link>
        </Button>
      </main>
    );
  }

  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <Link to="/letter" className="hover:text-accent">
          The letter
        </Link>
        {" · "}
        {post.day}
      </p>
      <Badge className="w-fit">{post.kicker}</Badge>
      <h1 className="font-display text-4xl tracking-tight">{post.title}</h1>
      {post.body.map((p) => (
        <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted">
          {p}
        </p>
      ))}
      <div className="flex flex-wrap gap-2 pt-4">
        <Button asChild>
          <Link to="/join">Join</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/letter">All letters</Link>
        </Button>
      </div>
    </article>
  );
}
