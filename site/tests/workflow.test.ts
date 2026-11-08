// What: Static checks on the deploy workflow.
// How: Reads .github/workflows/deploy-site.yml as text.
// Objective: The deploy ships the already-tested static export and doesn't depend on Vercel's root-directory resolution.
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { REPO_ROOT } from "../src/config";

const wf = readFileSync(path.join(REPO_ROOT, ".github", "workflows", "deploy-site.yml"), "utf8");

describe("deploy workflow", () => {
  it("deploys the tested site/out folder from the repo root", () => {
    expect(wf).toMatch(/vercel@[^\s]+ deploy site\/out --prod/);
    expect(wf).not.toMatch(/working-directory: site/);
  });
  it("builds once", () => {
    expect(wf).not.toMatch(/vercel@[^\s]+ build/);
  });
});
