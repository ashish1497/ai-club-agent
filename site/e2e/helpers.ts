// What: Shared helpers for the end-to-end suites: the list of every page, and console-error capture.
// How: Reads problem ids and industries from the same loaders the site uses.
// Objective: Tests cover every real page automatically, including problems added later.
import type { Page } from "@playwright/test";
import { INDUSTRIES } from "../src/lib/industries";
import { loadProblems } from "../src/lib/problems";

export const problems = loadProblems();
const used = new Set(problems.map((p) => p.industry));
export const worlds = INDUSTRIES.filter((i) => used.has(i.slug));

export const ALL_PAGES = [
  "/",
  "/start/",
  ...worlds.map((w) => `/worlds/${w.slug}/`),
  ...problems.map((p) => `/problems/${p.id}/`),
];

/** Key pages that use every kind of control; used for layout and size rules. */
export const KEY_PAGES = ["/", "/worlds/fintech/", "/problems/07/", "/problems/07/#risks", "/start/"];

export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(`console: ${m.text()}`);
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith("http://localhost:4322") && r.request().method() === "GET")
      errors.push(`http ${r.status()}: ${r.url()}`);
  });
  return errors;
}

export async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
}
