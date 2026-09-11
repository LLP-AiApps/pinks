import { createFileRoute } from "@tanstack/react-router";
import { CHANGELOG, logByDay, type LogKind } from "@/data/changelog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { HelpRow } from "@/components/help-tip";

export const Route = createFileRoute("/log")({ component: LogPage });

const FILTERS: { id: LogKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "result", label: "Results" },
  { id: "miss", label: "Misses" },
  { id: "ship", label: "Ships" },
  { id: "feed", label: "Feeds" },
];

function tone(kind: LogKind) {
  if (kind === "miss") return "risk" as const;
  if (kind === "result") return "win" as const;
  if (kind === "feed") return "accent" as const;
  return "neutral" as const;
}

function LogPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const days = useMemo(() => {
    const src = filter === "all" ? CHANGELOG : CHANGELOG.filter((e) => e.kind === filter);
    return logByDay(src);
  }, [filter]);

  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">What’s new</p>
        <HelpRow id="log">
          <h1 className="font-display text-3xl tracking-tight">The log</h1>
        </HelpRow>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Newest first. Ships, finals, and misses stay dated so we can see if a weight or a feed
          went cold. A miss is not rewritten. If something used to work and then doesn’t, it will
          show up here as a streak, not a vibe.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "inline-flex h-11 min-h-11 items-center rounded-md px-4 text-sm",
              filter === f.id ? "bg-accent text-accent-fg" : "text-muted shadow-[var(--shadow-border)]",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {days.length === 0 ? (
        <p className="text-sm text-muted">Nothing in this filter yet.</p>
      ) : (
        days.map((group) => (
          <section key={group.day} className="flex flex-col gap-3">
            <h2 className="font-display text-xl">{group.day}</h2>
            <ol className="flex flex-col gap-3">
              {group.items.map((e) => (
                <li key={e.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={tone(e.kind)}>{e.kind}</Badge>
                    <span className="font-mono text-xs text-muted">{e.time}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{e.body}</p>
                  {e.record ? (
                    <p className="mt-3 font-mono text-xs tabular-nums text-muted">
                      Desk {e.record.desk} · Engine SU {e.record.engineSu} · ATS {e.record.engineAts}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
        ))
      )}
    </main>
  );
}
