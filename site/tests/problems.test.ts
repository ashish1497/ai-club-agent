// What: Tests for the problem loader that turns club-agent/problems/** into typed data.
// How: Loads the real 30 files, plus temp-dir fixtures for failure cases.
// Objective: The site can never show a problem that differs from, or silently drops, the source files.
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PROBLEMS_DIR } from "../src/config";
import { getProblem, loadProblems } from "../src/lib/problems";

describe("loadProblems", () => {
  const problems = loadProblems();

  it("loads 30 problems with unique ids", () => {
    expect(problems).toHaveLength(30);
    expect(new Set(problems.map((p) => p.id)).size).toBe(30);
  });

  it("problem 07 parses known facts with source links", () => {
    const p = getProblem("07")!;
    expect(p.industry).toBe("fintech");
    expect(p.known.length).toBeGreaterThanOrEqual(2);
    for (const f of p.known) expect(f.source?.url).toMatch(/^https:\/\//);
    expect(p.known[0].text).not.toContain("](");
  });

  it("funding rows parse evidence", () => {
    for (const p of problems) {
      expect(p.funding.length).toBeGreaterThan(0);
      for (const r of p.funding) {
        expect(["verified", "secondary", "unverified"]).toContain(r.evidence);
        expect(r.url).toMatch(/^https?:\/\//);
      }
    }
  });

  it("levelMin derives from level_fit", () => {
    for (const p of problems) expect(p.levelMin).toBe(Number(p.levelFit[1]));
  });

  it("parses lists, terms, ways in and angles", () => {
    const p = getProblem("19")!;
    expect(p.whoCares.length).toBeGreaterThan(0);
    expect(p.inScope.length).toBeGreaterThanOrEqual(2);
    expect(p.outOfScope.length).toBeGreaterThanOrEqual(2);
    expect(p.terms[0].term).toBeTruthy();
    expect(p.terms[0].meaning).toBeTruthy();
    expect(p.waysIn[0].url).toMatch(/^https?:\/\//);
    expect(p.angles.theory).toBeTruthy();
    expect(p.angles.practice).toBeTruthy();
    expect(p.skills.length).toBeGreaterThan(0);
  });

  it("leads are optional", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "probs-"));
    cpSync(PROBLEMS_DIR, dir, { recursive: true });
    const f = path.join(dir, "fintech", "07-cross-bank-mule-detection.md");
    writeFileSync(f, readFileSync(f, "utf8").split("\n## Leads to check")[0]);
    expect(loadProblems(dir).find((p) => p.id === "07")!.leads).toEqual([]);
  });

  it("throws on a file missing a section", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "probs-"));
    cpSync(PROBLEMS_DIR, dir, { recursive: true });
    const f = path.join(dir, "fintech", "07-cross-bank-mule-detection.md");
    writeFileSync(f, readFileSync(f, "utf8").replace("## Who cares", "## Someone"));
    expect(() => loadProblems(dir)).toThrow(/missing section ## Who cares/);
  });

  it("throws on a duplicate id", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "probs-"));
    cpSync(PROBLEMS_DIR, dir, { recursive: true });
    cpSync(path.join(dir, "fintech", "07-cross-bank-mule-detection.md"), path.join(dir, "fintech", "07-copy.md"));
    expect(() => loadProblems(dir)).toThrow(/duplicate problem id 07/);
  });
});
