// What: World-page filter rules for level and effort.
// How: Level uses the lower bound of a problem's level_fit range; effort options come from the data itself.
// Objective: Filters only ever offer choices that can match something, with one fixed meaning.
import type { Problem } from "./types";

export type LevelFilter = "any" | "new" | "experienced";
export type Filters = { level: LevelFilter; effort: string };

export const LEVEL_OPTIONS: { value: LevelFilter; label: string }[] = [
  { value: "any", label: "Any level" },
  { value: "new", label: "New to this?" },
  { value: "experienced", label: "Some experience" },
];

const EFFORT_ORDER = ["weekend", "month", "semester"];

export function effortOptions(problems: Problem[]): string[] {
  const present = new Set(problems.map((p) => p.effort));
  return EFFORT_ORDER.filter((e) => present.has(e)).concat(
    [...present].filter((e) => !EFFORT_ORDER.includes(e)).sort(),
  );
}

export function applyFilters(problems: Problem[], f: Filters): Problem[] {
  return problems.filter((p) => {
    if (f.level === "new" && p.levelMin > 2) return false;
    if (f.level === "experienced" && p.levelMin < 3) return false;
    if (f.effort !== "any" && p.effort !== f.effort) return false;
    return true;
  });
}
