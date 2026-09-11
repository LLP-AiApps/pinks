import { createFileRoute, Link } from "@tanstack/react-router";
import { JOIN_CHECKS, LEGAL_VERSION } from "@/data/legal";
import { MAILER_STATUS, useJoin } from "@/store/join";
import { addMember } from "@/lib/members";
import { HelpRow } from "@/components/help-tip";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/join")({ component: JoinPage });

function JoinPage() {
  const { record, hydrate, sign, leave } = useJoin();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState<"email" | "sms" | "both" | "app">("email");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [deskNote, setDeskNote] = useState("");

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const allChecked = JOIN_CHECKS.every((c) => checks[c.id]);

  async function submit() {
    setError("");
    setDeskNote("");
    if (!allChecked) {
      setError("Every box has to be checked. That is the point.");
      return;
    }
    if (!email.includes("@")) {
      setError("Email is required so the desk roster is not empty.");
      return;
    }
    if ((channel === "sms" || channel === "both") && phone.replace(/\D/g, "").length < 10) {
      setError("A real U.S. number is required for text — when the mailer is live.");
      return;
    }
    sign({ name: name.trim(), email: email.trim(), phone: phone.trim(), channel });
    const out = (await addMember({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        channel,
        version: LEGAL_VERSION,
      },
    })) as { ok: true; source?: string } | { ok: false; error: string };
    if (!out.ok) {
      setDeskNote(`On this phone. Desk list: ${out.error}`);
    } else if (out.source === "pglite") {
      setDeskNote("On this phone, and on the preview desk (memory). The public site needs the database live — that’s the next wire.");
    }
  }

  if (record) {
    return (
      <main className="mx-auto flex max-w-lg flex-col gap-6">
        <HelpRow id="join">
          <h1 className="font-display text-3xl tracking-tight">You’re on the list</h1>
        </HelpRow>
        <p className="rounded-xl bg-surface p-5 text-sm leading-relaxed shadow-[var(--shadow-border)]">
          Mailer status: <span className="text-accent">{record.mailer}</span>. Nothing has been
          emailed or texted. Version you signed: {record.version}. Channel: {record.channel}.
        </p>
        <p className="text-sm text-muted">
          Learn is unlocked on this phone. Your name is also on the desk roster (not just this
          browser). Mailer still dark. Tuition is $0.
        </p>
        {deskNote ? <p className="text-sm text-risk">{deskNote}</p> : null}
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/learn">Open Learn</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/letter">Read the letter</Link>
          </Button>
          <Button variant="outline" onClick={leave}>
            Leave the list
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Mailer {MAILER_STATUS} · {LEGAL_VERSION}
        </p>
        <HelpRow id="join">
          <h1 className="font-display text-3xl tracking-tight">Join</h1>
        </HelpRow>
        <p className="text-sm leading-relaxed text-muted">
          Read{" "}
          <Link to="/legal" className="text-accent">
            Legal
          </Link>{" "}
          first. Check every box. We will not send email or text until the mailer is live.
        </p>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-md bg-surface px-3 shadow-[var(--shadow-border)]"
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-md bg-surface px-3 shadow-[var(--shadow-border)]"
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Mobile (only if you want text later)
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 rounded-md bg-surface px-3 shadow-[var(--shadow-border)]"
            autoComplete="tel"
            placeholder="702…"
          />
        </label>
        <fieldset className="flex flex-col gap-2 text-sm">
          <legend className="mb-1">How should we reach you — later</legend>
          {(
            [
              ["email", "Letter by email"],
              ["sms", "Text"],
              ["both", "Both"],
              ["app", "This site only"],
            ] as const
          ).map(([id, label]) => (
            <label key={id} className="flex min-h-11 items-center gap-3">
              <input
                type="radio"
                name="channel"
                checked={channel === id}
                onChange={() => setChannel(id)}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <ul className="flex flex-col gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          {JOIN_CHECKS.map((c) => (
            <li key={c.id}>
              <label className="flex items-start gap-3 text-sm leading-snug">
                <input
                  type="checkbox"
                  className="mt-1 size-5 shrink-0"
                  checked={!!checks[c.id]}
                  onChange={(e) => setChecks((s) => ({ ...s, [c.id]: e.target.checked }))}
                />
                <span>{c.label}</span>
              </label>
            </li>
          ))}
        </ul>
        {error ? <p className="text-sm text-risk">{error}</p> : null}
        <Button type="submit" disabled={!allChecked}>
          Sign Join
        </Button>
        <p className="text-xs text-muted">
          Disabled until every box is checked. 21+. 1-800-GAMBLER.
        </p>
      </form>
    </main>
  );
}
