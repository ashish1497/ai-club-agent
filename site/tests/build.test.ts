// What: Checks the static export after `npm run build`: every problem and world has a page, and nothing calls DiceBear at runtime.
// How: Walks site/out; skipped when there is no build output (plain unit-test runs).
// Objective: A deploy can never ship with a missing page or a third-party image dependency.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { INDUSTRIES } from "../src/lib/industries";
import { loadProblems } from "../src/lib/problems";

const OUT = path.resolve(import.meta.dirname, "..", "out");
const built = existsSync(path.join(OUT, "index.html"));

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? htmlFiles(path.join(dir, d.name)) : d.name.endsWith(".html") ? [path.join(dir, d.name)] : [],
  );
}

describe.skipIf(!built)("static export", () => {
  const problems = loadProblems();
  it("every problem has an exported page", () => {
    for (const p of problems) expect(existsSync(path.join(OUT, "problems", p.id, "index.html")), p.id).toBe(true);
  });
  it("every used world has an exported page", () => {
    const used = new Set(problems.map((p) => p.industry));
    for (const i of INDUSTRIES.filter((x) => used.has(x.slug)))
      expect(existsSync(path.join(OUT, "worlds", i.slug, "index.html")), i.slug).toBe(true);
  });
  it("start page exists", () => {
    expect(existsSync(path.join(OUT, "start", "index.html"))).toBe(true);
  });
  it("no page references api.dicebear.com", () => {
    for (const f of htmlFiles(OUT)) expect(readFileSync(f, "utf8").includes("api.dicebear.com"), f).toBe(false);
  });
  it("problem pages render all 10 bites server-side", () => {
    const html = readFileSync(path.join(OUT, "problems", "07", "index.html"), "utf8");
    for (const slug of [
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
    ])
      expect(html).toContain(`id="${slug}"`);
  });
});
