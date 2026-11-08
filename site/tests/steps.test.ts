// What: Tests for the 10 bite steps and hash deep links.
// How: Checks step order, hash mapping and what each step carries for real problems.
// Objective: Deep links open the right step and every step has something to show.
import { describe, expect, it } from "vitest";
import { loadProblems } from "../src/lib/problems";
import { STEPS, buildSteps, stepFromHash } from "../src/lib/steps";

describe("steps", () => {
  it("10 steps in order", () => {
    expect(STEPS.map((s) => s.slug)).toEqual([
      "question",
      "who",
      "scope",
      "known",
      "unknown",
      "words",
      "angles",
      "ways-in",
      "funding",
      "risks",
    ]);
  });

  it("stepFromHash maps valid and invalid hashes", () => {
    expect(stepFromHash("#known")).toBe(3);
    expect(stepFromHash("known")).toBe(3);
    expect(stepFromHash("#nope")).toBe(0);
    expect(stepFromHash("")).toBe(0);
  });

  it("buildSteps returns one entry per step for every problem", () => {
    for (const p of loadProblems()) {
      const s = buildSteps(p);
      expect(s).toHaveLength(10);
      expect(s.map((x) => x.slug)).toEqual(STEPS.map((x) => x.slug));
    }
  });
});

import { hasContent } from "../src/lib/steps";
import { getProblem as get } from "../src/lib/problems";

describe("step content", () => {
  it("problem 07 'known' step carries facts with sources", () => {
    const known = buildSteps(get("07")!).find((s) => s.slug === "known");
    expect(known && known.slug === "known" && known.facts.every((f) => f.source)).toBe(true);
  });

  it("every problem has 10 steps with content", () => {
    for (const p of loadProblems())
      for (const s of buildSteps(p)) expect(hasContent(s), `${p.id} ${s.slug}`).toBe(true);
  });

  it("risks step carries leads only when the file has them", () => {
    const p = { ...get("07")!, leads: [] };
    const risks = buildSteps(p).find((s) => s.slug === "risks");
    expect(risks && risks.slug === "risks" && risks.leads).toEqual([]);
  });
});
