import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "win" | "risk" | "accent" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide",
        tone === "neutral" && "bg-raised text-muted",
        tone === "win" && "bg-win/15 text-win",
        tone === "risk" && "bg-risk/15 text-risk",
        tone === "accent" && "bg-accent/15 text-accent",
        className,
      )}
      {...props}
    />
  );
}
