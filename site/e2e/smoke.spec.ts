// What: Smoke test: every page of the site loads cleanly at phone, tablet and desktop sizes.
// How: Visits all pages (landing, start, every world, every problem) and checks status, heading, title and errors.
// Objective: A broken page, script error or missing asset is caught before anyone ships.
import { expect, test } from "@playwright/test";
import { ALL_PAGES, collectErrors, settle } from "./helpers";

for (const url of ALL_PAGES) {
  test(`smoke ${url}`, async ({ page }) => {
    const errors = collectErrors(page);
    const res = await page.goto(url);
    expect(res?.status()).toBe(200);
    await settle(page);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).toHaveTitle(/AI Club/);
    await expect(page.locator(".logo")).toBeVisible();
    expect(errors).toEqual([]);
  });
}
