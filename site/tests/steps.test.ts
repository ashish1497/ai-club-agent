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
