"use client";
// What: The interactive part of a world page: level and effort filters plus the brief cards.
// How: Filters live in component state, seeded from and saved to browser storage; the server passes plain data.
// Objective: Members narrow a world to problems that fit their level and time, without a database.
import type { ReactNode } from "react";
import { useState } from "react";
import { BriefCard, type Brief } from "./BriefCard";
import { LEVEL_OPTIONS, type Filters } from "@/lib/filters";
import { effortLabel } from "@/lib/labels";
import { setFilters } from "@/lib/storage";
import { useStoredState } from "@/lib/useStoredState";

type Item = Brief & { levelMin: number };

function matches(p: Item, f: Filters) {
  if (f.level === "new" && p.levelMin > 2) return false;
  if (f.level === "experienced" && p.levelMin < 3) return false;
  return f.effort === "any" || p.effort === f.effort;
}

export function WorldView({
  items,
  efforts,
  side,
  emptyText,
}: {
  items: Item[];
  efforts: string[];
  side: ReactNode;
  emptyText: ReactNode;
}) {
  const stored = useStoredState();
  const [filters, setLocal] = useState<Filters | null>(null);
  const f = filters ?? stored.filters;
  const effort = efforts.includes(f.effort) ? f.effort : "any";
  const current: Filters = { level: f.level, effort };
  const shown = items.filter((p) => matches(p, current));

  function choose(next: Filters) {
    setLocal(next);
    setFilters(next);
  }

  return (
    <div className="world">
      <aside className="world-side">
        {side}
        <fieldset className="filter">
          <legend>How deep are you going?</legend>
          <div className="chips">
            {LEVEL_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className="chip"
                aria-pressed={current.level === o.value}
                onClick={() => choose({ ...current, level: o.value })}
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="filter">
          <legend>How much time?</legend>
          <div className="chips">
            {["any", ...efforts].map((e) => (
              <button
                key={e}
                type="button"
                className="chip"
                aria-pressed={current.effort === e}
                onClick={() => choose({ ...current, effort: e })}
              >
                {e === "any" ? "Any" : effortLabel(e)}
              </button>
            ))}
          </div>
        </fieldset>
      </aside>
      <section className="world-cards" aria-live="polite">
        <p className="visually-hidden">{`${shown.length} of ${items.length} problems shown`}</p>
        {shown.length ? (
          <div className="cards-grid">
            {shown.map((p) => (
              <BriefCard key={p.id} p={p} peeked={stored.peeked.includes(p.id)} />
            ))}
          </div>
        ) : (
          emptyText
        )}
      </section>
    </div>
  );
}
