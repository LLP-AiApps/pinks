import { Link, useRouterState } from "@tanstack/react-router";
import { SNAPSHOT } from "@/data/slate";
import { HOUSE } from "@/data/house";
import { Mark } from "@/components/mark";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Desk" },
  { to: "/picks", label: "Yours" },
  { to: "/letter", label: "Letter" },
  { to: "/learn", label: "Learn" },
  { to: "/help", label: "How to use" },
  { to: "/games", label: "Games" },
  { to: "/parlays", label: "Parlays" },
  { to: "/analysts", label: "Analysts" },
  { to: "/engine", label: "Engine" },
  { to: "/log", label: "What’s new" },
  { to: "/wire", label: "Wire" },
  { to: "/books", label: "Books" },
  { to: "/card", label: "Pool card" },
  { to: "/studio", label: "Studio" },
];

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh">
      <header className="no-print sticky top-0 z-40 bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Mark />
            <p className="hidden text-right font-mono text-[0.6875rem] text-muted md:block">
              {SNAPSHOT.asOf}
            </p>
          </div>
          <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 shrink-0 items-center rounded-md px-3 text-sm transition-colors duration-[var(--motion-quick)]",
                    active
                      ? "text-accent shadow-[inset_0_-2px_0_0_var(--color-accent)]"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="yard-hash" aria-hidden />
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
      <footer className="no-print border-t border-border px-4 py-8 text-center text-xs text-muted">
        {HOUSE.name} · {HOUSE.tag} Desk snapshot, not a book. 21+. 1-800-GAMBLER.
        <span className="mt-2 block">
          <Link to="/legal" className="text-accent">
            Legal
          </Link>
          {" · "}
          <Link to="/join" className="text-accent">
            Join
          </Link>
          {" · "}
          <Link to="/learn" className="text-accent">
            Learn
          </Link>
          {" · "}
          <Link to="/sources" className="text-accent">
            Sources
          </Link>
        </span>
      </footer>
    </div>
  );
}
