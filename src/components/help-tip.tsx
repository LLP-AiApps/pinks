import { HELP, type HelpId } from "@/data/help";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

export function HelpTip({ id }: { id: HelpId }) {
  const [open, setOpen] = useState(false);
  const h = HELP[id];
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-label={`How to use ${h.title}`}
        onClick={() => setOpen((v) => !v)}
        className="no-print grid size-11 shrink-0 place-items-center rounded-full text-sm text-muted shadow-[var(--shadow-border)] hover:text-accent"
      >
        ?
      </button>
      {open ? (
        <aside className="no-print basis-full rounded-xl bg-surface p-4 text-sm shadow-[var(--shadow-border)]">
          <p className="font-display text-base text-fg">{h.title}</p>
          <p className="mt-2 leading-relaxed text-muted">{h.body}</p>
          {h.steps ? (
            <ol className="mt-3 list-decimal space-y-1 pl-4 text-muted">
              {h.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          ) : null}
          <p className="mt-3">
            <Link to="/help" className="text-accent">
              Full how to use
            </Link>
          </p>
        </aside>
      ) : null}
    </>
  );
}

export function HelpRow({
  id,
  children,
  className,
}: {
  id: HelpId;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {children}
      <HelpTip id={id} />
    </div>
  );
}
