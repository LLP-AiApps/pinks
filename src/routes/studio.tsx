import { createFileRoute } from "@tanstack/react-router";
import { MATERIALS, PALETTES, type Palette } from "@/data/palettes";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HelpRow } from "@/components/help-tip";

export const Route = createFileRoute("/studio")({ component: StudioPage });

function StudioPage() {
  const [active, setActive] = useState(PALETTES[0]!.id);
  const palette = PALETTES.find((p) => p.id === active) ?? PALETTES[0]!;
  const p = palette.preview;

  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">House book</p>
        <HelpRow id="studio">
          <h1 className="font-display text-3xl tracking-tight">Studio</h1>
        </HelpRow>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          The nav stays Ford Field. Tap a scheme below — the big stage is what changes. Pink Ticket,
          crimson, and maize are supposed to look like different rooms.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PALETTES.map((item) => {
          const on = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={cn(
                "flex min-h-16 flex-col items-start justify-between rounded-xl px-3 py-3 text-left",
                on ? "ring-2 ring-offset-2 ring-offset-bg" : "opacity-80",
              )}
              style={{
                background: item.preview.bg,
                color: item.preview.fg,
                boxShadow: `inset 0 0 0 1px ${item.preview.accent}`,
              }}
            >
              <span className="font-mono text-[0.625rem] uppercase tracking-widest" style={{ color: item.preview.accent }}>
                {item.verdict === "live" ? "on desk" : item.verdict}
              </span>
              <span className="font-display text-base leading-tight">{item.name}</span>
            </button>
          );
        })}
      </div>

      <section
        className="flex min-h-[22rem] flex-col justify-between rounded-2xl p-6 sm:p-10"
        style={{ background: p.bg, color: p.fg }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-2xl" style={{ color: p.fg }}>
            Pinks
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: p.accent }}>
            {palette.name}
          </span>
        </div>
        <div className="flex flex-col gap-4 py-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: p.muted }}>
            Week 1 · Sunday
          </p>
          <p className="font-display text-4xl tracking-tight sm:text-5xl" style={{ color: p.accent }}>
            JAX · DET · LAC
          </p>
          <span className="block h-px max-w-xs" style={{ background: p.rule }} />
          <p className="font-display text-2xl">Tickets go as written.</p>
        </div>
        <div
          className="rounded-xl px-4 py-4"
          style={{ background: p.surface, boxShadow: `inset 0 0 0 1px ${p.accent}55` }}
        >
          <p className="text-sm" style={{ color: p.muted }}>
            {palette.note}
          </p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {palette.swatches.map((s) => (
              <li key={s.name} className="flex items-center gap-2 font-mono text-[0.6875rem]">
                <span className="size-6 rounded-sm" style={{ background: s.hex }} />
                <span>
                  {s.name} {s.hex}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl">Materials</h2>
        <p className="text-sm text-muted">
          Scroll here for turf, pigskin, leather, and ticket stock. These do not change with the
          palette — they are the textures.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {MATERIALS.map((m) => (
            <li key={m.id} className="overflow-hidden rounded-xl shadow-[var(--shadow-border)]">
              <div className={cn("relative h-36", m.cls)}>
                {m.id === "pigskin" ? (
                  <div className="laces" aria-hidden>
                    {Array.from({ length: 7 }, (_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="bg-surface px-4 py-3">
                <p className="font-medium">{m.name}</p>
                <p className="mt-1 text-sm text-muted">{m.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
