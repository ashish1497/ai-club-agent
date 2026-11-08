// What: Tests for industry metadata.
// How: Cross-checks INDUSTRIES against the industries used by the problem files.
// Objective: A new industry folder without metadata fails loudly instead of rendering a broken tile.
import { describe, expect, it } from "vitest";
import { INDUSTRIES, industryBySlug } from "../src/lib/industries";
import { loadProblems } from "../src/lib/problems";

describe("industries", () => {
  it("has 10 industries with unique slugs and seeds", () => {
    expect(INDUSTRIES).toHaveLength(10);
    expect(new Set(INDUSTRIES.map((i) => i.slug)).size).toBe(10);
    expect(new Set(INDUSTRIES.map((i) => i.seed)).size).toBe(10);
  });

  it("every problem industry has metadata", () => {
    for (const p of loadProblems()) expect(() => industryBySlug(p.industry)).not.toThrow();
  });

  it("throws for an unknown industry", () => {
    expect(() => industryBySlug("space-pirates")).toThrow(/no industry metadata for space-pirates/);
  });
});
