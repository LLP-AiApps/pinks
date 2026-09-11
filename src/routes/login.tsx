import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { deskLogin, deskLogout, deskMe } from "@/lib/desk-auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    void deskMe().then((out) => {
      if (out && "user" in out) setUser(out.user);
    });
  }, []);

  async function submit() {
    setError("");
    setBusy(true);
    try {
      const out = (await deskLogin({
        data: { email, password },
      })) as { ok: true; user: { email: string; name: string }; first?: boolean } | { ok: false; error: string };
      if (!out.ok) {
        setError(out.error);
        return;
      }
      setUser(out.user);
      void navigate({ to: "/history" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  if (user) {
    return (
      <main className="mx-auto flex max-w-lg flex-col gap-6">
        <h1 className="font-display text-3xl tracking-tight">Signed in</h1>
        <p className="text-sm text-muted">
          {user.name} · {user.email}. History lives on the desk, not this phone.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/history">Open history</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              void deskLogout({}).then(() => setUser(null));
            }}
          >
            Sign out
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Desk door</p>
        <h1 className="font-display text-3xl tracking-tight">Sign in</h1>
        <p className="text-sm leading-relaxed text-muted">
          Join first so the 21+ boxes are on file. First sign-in with that email sets the password.
          After that, same password on any phone. Not a sportsbook account. Mailer still dark.
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
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-md bg-surface px-3 shadow-[var(--shadow-border)]"
            autoComplete="email"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-md bg-surface px-3 shadow-[var(--shadow-border)]"
            autoComplete="current-password"
            minLength={8}
            required
          />
        </label>
        {error ? <p className="text-sm text-risk">{error}</p> : null}
        <Button type="submit" disabled={busy}>
          {busy ? "Opening…" : "Sign in"}
        </Button>
        <p className="text-xs text-muted">
          Not on the list?{" "}
          <Link to="/join" className="text-accent">
            Join
          </Link>
          . 8+ characters. We do not email the password.
        </p>
      </form>
    </main>
  );
}
