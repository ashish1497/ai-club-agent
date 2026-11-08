// What: Browser-only member state: problems peeked, saved, how far they read, and last filters.
// How: One JSON object in localStorage under a versioned key; every read/write is guarded and validated.
// Objective: Remember progress without a database or accounts, and never break when storage is blocked.
import type { Filters, LevelFilter } from "./filters";

export const STORAGE_KEY = "aiclub:v1";

export type State = {
  peeked: string[];
  saved: string[];
  progress: Record<string, number>;
  filters: Filters;
};

const defaults = (): State => ({ peeked: [], saved: [], progress: {}, filters: { level: "any", effort: "any" } });

const strings = (v: unknown) => (Array.isArray(v) && v.every((x) => typeof x === "string") ? (v as string[]) : []);

function normalise(raw: unknown): State {
  const d = defaults();
  if (!raw || typeof raw !== "object") return d;
  const r = raw as Record<string, unknown>;
  const progress: Record<string, number> = {};
  if (r.progress && typeof r.progress === "object" && !Array.isArray(r.progress)) {
    for (const [k, v] of Object.entries(r.progress)) if (typeof v === "number" && Number.isFinite(v)) progress[k] = v;
  }
  const f = r.filters as Record<string, unknown> | null | undefined;
  const level = ["any", "new", "experienced"].includes(String(f?.level)) ? (f!.level as LevelFilter) : "any";
  const effort = typeof f?.effort === "string" ? f.effort : "any";
  return { peeked: strings(r.peeked), saved: strings(r.saved), progress, filters: { level, effort } };
}

export function readState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalise(JSON.parse(raw)) : defaults();
  } catch {
    return defaults();
  }
}

export function writeState(s: State): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // Storage unavailable (private mode, quota, blocked): the site keeps working without memory.
  }
}

function update(fn: (s: State) => State): State {
  const next = fn(readState());
  writeState(next);
  return next;
}

export function markPeeked(id: string): void {
  update((s) => (s.peeked.includes(id) ? s : { ...s, peeked: [...s.peeked, id] }));
}

export function toggleSaved(id: string): boolean {
  const next = update((s) => ({
    ...s,
    saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
  }));
  return next.saved.includes(id);
}

export function setProgress(id: string, step: number): void {
  update((s) => ({ ...s, progress: { ...s.progress, [id]: Math.max(step, s.progress[id] ?? 0) } }));
}

export function setFilters(filters: Filters): void {
  update((s) => ({ ...s, filters }));
}
