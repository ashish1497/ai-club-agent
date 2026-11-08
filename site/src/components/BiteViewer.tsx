"use client";
// What: Steps through a problem one bite at a time, with tabs, a progress bar, Back/Next and keyboard control.
// How: All bites are server-rendered; with JavaScript only the current one shows. Current step comes from the URL hash,
//      else stored progress, else the first; changes update the hash and browser-only progress.
// Objective: Nobody faces a wall of text, deep links open the right bite, and the page still reads fine without JS.
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { STEPS, stepFromHash } from "@/lib/steps";
import { markPeeked, setProgress } from "@/lib/storage";
import { useStoredState } from "@/lib/useStoredState";

const subHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

export function BiteViewer({ id, worldHref, panels }: { id: string; worldHref: string; panels: ReactNode[] }) {
  const router = useRouter();
  const hash = useSyncExternalStore(
    subHash,
    () => window.location.hash,
    () => "",
  );
  const stored = useStoredState();
  const [chosen, setChosen] = useState<number | null>(null);
  const fromHash = hash ? stepFromHash(hash) : null;
  const current = chosen ?? fromHash ?? Math.min(stored.progress[id] ?? 0, STEPS.length - 1);
  const last = STEPS.length - 1;

  useEffect(() => {
    markPeeked(id);
    // Deep links show the right bite in place; keep the problem title in view instead of jumping to the anchor.
    if (window.location.hash) window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const tab = document.querySelector<HTMLElement>(".tab.on");
    const strip = tab?.parentElement;
    if (tab && strip && strip.scrollWidth > strip.clientWidth) {
      strip.scrollTo({ left: tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
    }
  }, [current]);

  function go(i: number) {
    const n = Math.max(0, Math.min(last, i));
    setChosen(n);
    setProgress(id, n);
    history.replaceState(null, "", `#${STEPS[n].slug}`);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowRight") go(current + 1);
      else if (e.key === "ArrowLeft") go(current - 1);
      else if (e.key === "Escape") router.push(worldHref);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="bites">
      <div className="progress" aria-hidden="true">
        {STEPS.map((s, i) => (
          <i key={s.slug} className={i < current ? "d" : i === current ? "c" : ""} />
        ))}
      </div>
      <nav className="tabs" aria-label="Problem sections">
        {STEPS.map((s, i) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            className={`tab${i === current ? " on" : ""}${i < current ? " done" : ""}`}
            aria-current={i === current ? "step" : undefined}
            onClick={(e) => {
              e.preventDefault();
              go(i);
            }}
          >
            {s.label}
          </a>
        ))}
      </nav>
      <div className="panels">
        {panels.map((p, i) => (
          <section
            key={STEPS[i].slug}
            id={STEPS[i].slug}
            className={`bite${i === current ? " on" : ""}`}
            aria-labelledby={`${STEPS[i].slug}-h`}
          >
            <h2 id={`${STEPS[i].slug}-h`} className="bite-title">
              {STEPS[i].label}
            </h2>
            {p}
          </section>
        ))}
      </div>
      <div className="dock">
        <button type="button" className="btn" onClick={() => go(current - 1)} disabled={current === 0}>
          Back
        </button>
        {current < last ? (
          <button type="button" className="btn btn--primary" onClick={() => go(current + 1)}>
            Next: {STEPS[current + 1].label}
          </button>
        ) : (
          <a className="btn btn--primary" href="#start-h">
            Start it
          </a>
        )}
      </div>
    </div>
  );
}
