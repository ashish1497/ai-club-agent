// What: Tests for the world-page filters (level and effort).
// How: Runs the filter rules over the real 30 problems and small fixtures.
// Objective: Filters never offer an option that always returns nothing, and their meaning is fixed.
import { describe, expect, it } from "vitest";
import { applyFilters, effortOptions } from "../src/lib/filters";
import { loadProblems } from "../src/lib/problems";

const all = loadProblems();

describe("filters", () => {
  it("new = range starts at L2", () => {
    const r = applyFilters(all, { level: "new", effort: "any" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.levelMin <= 2)).toBe(true);
  });

  it("experienced = range starts at L3+", () => {
    const r = applyFilters(all, { level: "experienced", effort: "any" });
    expect(r.every((p) => p.levelMin >= 3)).toBe(true);
    expect(r.length + applyFilters(all, { level: "new", effort: "any" }).length).toBe(all.length);
  });

  it("effort options come from data", () => {
    expect(effortOptions(all)).toEqual(["month", "semester"]);
  });

  it("returns empty when nothing matches", () => {
    expect(applyFilters(all, { level: "any", effort: "weekend" })).toEqual([]);
  });

  it("world 'fintech' has 4 problems", () => {
    expect(all.filter((p) => p.industry === "fintech")).toHaveLength(4);
  });
});
