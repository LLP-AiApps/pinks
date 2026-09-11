import type { Factor } from "@/lib/engine";

export function FactorBars({ factors }: { factors: Factor[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {factors.map((f) => (
        <li key={f.id} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="text-muted">{f.label}</span>
            <span className="font-mono tabular-nums text-muted">
              {Math.round(f.score * 100)} · w {Math.round(f.weight * 100)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-raised">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${Math.round(f.score * 100)}%` }}
            />
          </div>
          <p className="text-[0.6875rem] leading-snug text-muted">{f.note}</p>
        </li>
      ))}
    </ul>
  );
}

export function WeightStrip({
  weights,
}: {
  weights: Record<string, number>;
}) {
  const entries = Object.entries(weights);
  return (
    <div className="flex h-3 overflow-hidden rounded-full bg-raised">
      {entries.map(([k, v]) => (
        <div
          key={k}
          title={`${k} ${Math.round(v * 100)}%`}
          className="h-full bg-accent/80 first:rounded-l-full last:rounded-r-full"
          style={{ width: `${v * 100}%`, opacity: 0.45 + v }}
        />
      ))}
    </div>
  );
}
