import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const PRIMARY = [
  { to: "/", label: "Desk" },
  { to: "/picks", label: "Yours" },
  { to: "/games", label: "Games" },
  { to: "/parlays", label: "Parlays" },
] as const;

const BOARD = [
  { to: "/analysts", label: "Analysts" },
  { to: "/engine", label: "Engine" },
  { to: "/wire", label: "Wire" },
  { to: "/books", label: "Books" },
  { to: "/card", label: "Pool card" },
] as const;

const LETTER = [
  { to: "/letter", label: "The letter" },
  { to: "/learn", label: "Learn" },
  { to: "/help", label: "How to use" },
  { to: "/log", label: "What’s new" },
  { to: "/sources", label: "Sources" },
  { to: "/studio", label: "Studio" },
] as const;

const JOIN = [
  { to: "/join", label: "Join" },
  { to: "/login", label: "Sign in" },
  { to: "/history", label: "History" },
  { to: "/roster", label: "Roster" },
  { to: "/legal", label: "Legal" },
] as const;

const linkClass = (active: boolean) =>
  cn(
    "inline-flex h-11 shrink-0 items-center rounded-md px-3 text-sm transition-colors duration-[var(--motion-quick)]",
    active ? "text-accent shadow-[inset_0_-2px_0_0_var(--color-accent)]" : "text-muted hover:text-fg",
  );

function inGroup(pathname: string, items: readonly { to: string }[]) {
  return items.some((i) => (i.to === "/" ? pathname === "/" : pathname === i.to || pathname.startsWith(`${i.to}/`)));
}

function Drop({
  label,
  items,
  pathname,
}: {
  label: string;
  items: readonly { to: string; label: string }[];
  pathname: string;
}) {
  const on = inGroup(pathname, items);
  return (
    <details name="pinks-nav" className="relative">
      <summary
        className={cn(
          linkClass(on),
          "cursor-pointer list-none [&::-webkit-details-marker]:hidden",
        )}
      >
        {label}
        <span className="ml-1 text-[0.625rem] opacity-60" aria-hidden>
          ▾
        </span>
      </summary>
      <div className="absolute left-0 z-50 mt-1 min-w-44 rounded-xl bg-surface p-1 shadow-[var(--shadow-border-hover)]">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex h-11 items-center rounded-md px-3 text-sm",
              pathname === item.to || pathname.startsWith(`${item.to}/`)
                ? "text-accent"
                : "text-muted hover:bg-raised hover:text-fg",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    document.querySelectorAll("details[name='pinks-nav']").forEach((el) => {
      el.removeAttribute("open");
    });
  }, [pathname]);

  return (
    <nav className="flex flex-wrap items-center gap-x-0.5">
      {PRIMARY.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={linkClass(item.to === "/" ? pathname === "/" : pathname === item.to)}
        >
          {item.label}
        </Link>
      ))}
      <Drop label="Board" items={BOARD} pathname={pathname} />
      <Drop label="Letter" items={LETTER} pathname={pathname} />
      <Drop label="Join" items={JOIN} pathname={pathname} />
    </nav>
  );
}
