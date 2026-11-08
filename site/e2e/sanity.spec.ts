// What: Sanity tests for the main member journeys: pick a world, filter, read a problem in bites, save, start.
// How: Drives the real static site like a member would, at every screen size; desktop-only checks for keyboard.
// Objective: The core flow works end to end after every change, including with storage blocked or JS off.
import { expect, test } from "@playwright/test";
import { collectErrors, problems, settle } from "./helpers";

const fintech = problems.filter((p) => p.industry === "fintech");

test("landing → world → problem → bites → start it", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/");
  await page.getByRole("link", { name: /^Fintech, 4 problems/ }).click();
  await expect(page).toHaveURL(/\/worlds\/fintech\/$/);
  await expect(page.getByRole("heading", { level: 1, name: "Fintech" })).toBeVisible();
  await expect(page.locator(".brief")).toHaveCount(fintech.length);

  await page.locator(".brief").filter({ hasText: "mule rings" }).getByRole("link", { name: "I'm curious" }).click();
  await expect(page).toHaveURL(/\/problems\/07\/$/);
  await settle(page);
  await expect(page.locator(".bite.on")).toHaveAttribute("id", "question");

  await page.getByRole("button", { name: /^Next: Who cares/ }).click();
  await expect(page.locator(".bite.on")).toHaveAttribute("id", "who");
  await expect(page).toHaveURL(/#who$/);
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.locator(".bite.on")).toHaveAttribute("id", "question");

  await page.getByRole("link", { name: "Watch out" }).click();
  await page.getByRole("button", { name: "Start it" }).click();
  await expect(page.locator(".bite.on")).toHaveAttribute("id", "risks");
  await expect(page.locator("#start-h")).toBeFocused();
  await expect(page.locator(".term")).toContainText("start problem 07");
  expect(errors).toEqual([]);
});

test("filters narrow, clear and persist", async ({ page }) => {
  await page.goto("/worlds/fintech/");
  await settle(page);
  const all = await page.locator(".brief").count();
  await page.getByRole("button", { name: "A semester" }).click();
  const semester = fintech.filter((p) => p.effort === "semester").length;
  await expect(page.locator(".brief")).toHaveCount(semester);
  await expect(page.getByText(`Showing ${semester} of ${all}.`)).toBeVisible();
  await page.reload();
  await settle(page);
  await expect(page.locator(".brief")).toHaveCount(semester);
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".brief")).toHaveCount(all);
});

test("deep link opens the named bite and survives reload", async ({ page }) => {
  await page.goto("/problems/19/#known");
  await settle(page);
  await expect(page.locator(".bite.on")).toHaveAttribute("id", "known");
  await expect(page.locator(".bite.on .src").first()).toHaveAttribute("href", /^https:\/\//);
  await page.reload();
  await settle(page);
  await expect(page.locator(".bite.on")).toHaveAttribute("id", "known");
});

test("save, peek counter and saved list", async ({ page }) => {
  await page.goto("/problems/23/");
  await settle(page);
  await page.getByRole("button", { name: "Save for later" }).click();
  await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();
  await page.goto("/");
  await settle(page);
  await expect(page.getByText(/^1 of \d+ peeked$/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your saved problems" })).toBeVisible();
  await expect(page.locator(".saved a")).toHaveAttribute("href", "/problems/23/");
});

test("surprise me opens a problem", async ({ page }) => {
  await page.goto("/");
  await settle(page);
  await page.getByRole("button", { name: "Surprise me" }).click();
  await expect(page).toHaveURL(/\/problems\/\d{2}\/$/);
});

test("copy button copies the start command", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "clipboard permissions are Chromium-only");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/problems/07/");
  await settle(page);
  await page.getByRole("button", { name: "Copy" }).click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("start problem 07");
});

test("keyboard: arrows move bites, Esc returns to the world", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "keyboard flow checked on desktop");
  await page.goto("/problems/07/");
  await settle(page);
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".bite.on")).toHaveAttribute("id", "who");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".bite.on")).toHaveAttribute("id", "question");
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/\/worlds\/fintech\/$/);
});

test.describe("storage blocked", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        configurable: true,
        get() {
          throw new DOMException("blocked", "SecurityError");
        },
      });
    });
  });

  test("pages render and bites still work", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    await settle(page);
    await expect(page.getByText(/^0 of \d+ peeked$/)).toBeVisible();
    await page.goto("/problems/07/");
    await settle(page);
    await page.getByRole("button", { name: /^Next: / }).click();
    await expect(page.locator(".bite.on")).toHaveAttribute("id", "who");
    await page.getByRole("button", { name: "Save for later" }).click();
    expect(errors).toEqual([]);
  });
});

test.describe("JavaScript off", () => {
  test.use({ javaScriptEnabled: false });
  test("problem page shows every bite as readable sections", async ({ page }) => {
    await page.goto("/problems/07/");
    for (const id of ["question", "known", "unknown", "funding", "risks"])
      await expect(page.locator(`#${id}`)).toBeVisible();
  });
});

test("start page renders the setup guide without placeholders", async ({ page }) => {
  await page.goto("/start/");
  await expect(page.getByRole("heading", { name: "Install (macOS)" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("<club-agent repo URL>");
});
