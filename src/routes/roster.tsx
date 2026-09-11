import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { listMembers, type MemberRow } from "@/lib/members";
import { HelpRow } from "@/components/help-tip";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/roster")({ component: RosterPage });

function RosterPage() {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<MemberRow[] | null>(null);

  async function open() {
    setBusy(true);
    setError("");
    try {
      const out = (await listMembers({ data: { code } })) as
        | { ok: true; rows: MemberRow[] }
        | { ok: false; error: string };
      if (!out.ok) {
        setRows(null);
        setError(out.error);
        return;
      }
      setRows(out.rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">House</p>
        <HelpRow id="roster">
          <h1 className="font-display text-3xl tracking-tight">Roster</h1>
        </HelpRow>
        <p className="max-w-2xl text-sm text-muted">
          The list lives on the desk, not in one phone. House code. Mailer still dark. Do not
          screenshot this in a bar.
        </p>
      </header>

      <form
        className="flex flex-wrap items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void open();
        }}
      >
        <label className="flex min-w-48 flex-1 flex-col gap-1 text-sm">
          House code
          <input
            type="password"
            autoComplete="off"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-11 rounded-md bg-surface px-3 shadow-[var(--shadow-border)]"
          />
        </label>
        <Button type="submit" disabled={busy}>
          {busy ? "Opening" : "Open roster"}
        </Button>
      </form>

      {error ? <p className="text-sm text-risk">{error}</p> : null}

      {rows ? (
        <section>
          <p className="font-mono text-xs text-muted">{rows.length} on the list</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="text-xs text-muted">
                <tr>
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Email</th>
                  <th className="pb-2 font-medium">Phone</th>
                  <th className="pb-2 font-medium">Channel</th>
                  <th className="pb-2 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="py-2 pr-3">{r.name}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{r.email}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{r.phone || "—"}</td>
                    <td className="py-2 pr-3 text-muted">{r.channel}</td>
                    <td className="py-2 font-mono text-xs text-muted">{r.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </main>
  );
}
