import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { askQuestion } from "@/lib/questions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/ask")({ component: AskPage });

function AskPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setError("");
    setBusy(true);
    try {
      const out = (await askQuestion({ data: { name, email, body } })) as
        | { ok: true }
        | { ok: false; error: string };
      if (!out.ok) {
        setError(out.error);
        return;
      }
      setDone(true);
    } catch {
      setError("Could not save. Try again later.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <main className="mx-auto flex max-w-lg flex-col gap-4">
        <h1 className="font-display text-3xl tracking-tight">Got it</h1>
        <p className="text-sm text-muted">
          It is on the desk list. We answer when we can. No robot yet. Nothing emailed tonight.
        </p>
        <Button asChild>
          <Link to="/help">How a week works</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Human desk</p>
        <h1 className="font-display text-3xl tracking-tight">Ask</h1>
        <p className="text-sm text-muted">
          A real question about a ticket, a word, or this week. We read these. Not a chatbot.
        </p>
      </header>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-md bg-surface px-3 shadow-[var(--shadow-border)]"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-md bg-surface px-3 shadow-[var(--shadow-border)]"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Question
          <textarea
            required
            minLength={8}
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="rounded-md bg-surface px-3 py-2 shadow-[var(--shadow-border)]"
          />
        </label>
        {error ? <p className="text-sm text-risk">{error}</p> : null}
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Send to the desk"}
        </Button>
      </form>
    </main>
  );
}
