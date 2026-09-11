import { Link } from "@tanstack/react-router";
import { HOUSE } from "@/data/house";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 40" className="h-9 w-7 shrink-0" aria-hidden>
        <rect x="5" y="1" width="26" height="38" rx="1.5" fill="#e8b4b0" />
        <circle cx="5" cy="7" r="2.1" fill="#07090d" />
        <circle cx="5" cy="15" r="2.1" fill="#07090d" />
        <circle cx="5" cy="23" r="2.1" fill="#07090d" />
        <circle cx="5" cy="31" r="2.1" fill="#07090d" />
        <text
          x="19"
          y="25"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="12"
          fill="#071018"
        >
          P
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-tight text-fg">{HOUSE.name}</span>
        <span className="hidden text-[0.625rem] uppercase tracking-[0.18em] text-accent sm:inline">
          {HOUSE.legal}
        </span>
      </span>
    </Link>
  );
}
