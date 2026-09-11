import { Link } from "@tanstack/react-router";
import { useJoin } from "@/store/join";
import { Button } from "@/components/ui/button";
import { useEffect, type ReactNode } from "react";

export function MemberGate({
  teaser,
  children,
}: {
  teaser: string;
  children: ReactNode;
}) {
  const { record, hydrate } = useJoin();
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (record) return children;

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <p className="text-sm leading-relaxed text-muted">{teaser}</p>
      <p className="text-sm">
        The rest is for members. Join is free. 21+. You will check every disclaimer. The mailer is
        still dark. Tuition is $0.
      </p>
      <Button asChild>
        <Link to="/join">Join to read</Link>
      </Button>
    </div>
  );
}
