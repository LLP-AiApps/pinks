import { Link } from "@tanstack/react-router";
import { SNAPSHOT } from "@/data/slate";
import { HOUSE } from "@/data/house";
import { Mark } from "@/components/mark";
import { Nav } from "@/components/nav";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
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
          <Nav />
        </div>
        <div className="yard-hash" aria-hidden />
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
      <footer className="no-print border-t border-border px-4 py-8 text-center text-xs text-muted">
        {HOUSE.name} · {HOUSE.tag} Desk snapshot, not a book. 21+. 1-800-GAMBLER.
        <span className="mt-2 block">{HOUSE.domain} — the door. Live on Netlify until DNS lands.</span>
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
