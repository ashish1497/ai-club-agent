// What: Regression rules for layout and controls on key pages at phone, tablet and desktop sizes.
// How: Measures every visible control and the page width in a real browser.
// Objective: Buttons stay one consistent size, selectors stay tappable, and nothing overflows sideways.
import { expect, test } from "@playwright/test";
import { KEY_PAGES, settle } from "./helpers";

const BUTTON_H = 48;
const SELECTOR_H = 44;

for (const url of KEY_PAGES) {
  test.describe(`regression ${url}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
      await settle(page);
    });

    test("every button is exactly the standard height", async ({ page }) => {
      const sizes = await page.$$eval(".btn", (els) =>
        els
          .filter((e) => (e as HTMLElement).offsetParent)
          .map((e) => ({
            t: e.textContent?.trim(),
            h: Math.round(e.getBoundingClientRect().height),
            f: getComputedStyle(e).fontSize,
          })),
      );
      if (url !== "/start/") expect(sizes.length, "page should have buttons").toBeGreaterThan(0);
      for (const s of sizes) {
        expect.soft(s.h, `button "${s.t}" height`).toBe(BUTTON_H);
        expect.soft(s.f, `button "${s.t}" font size`).toBe("16px");
      }
    });

    test("every selector (pill, tab, filter chip) is exactly the selector height", async ({ page }) => {
      const sizes = await page.$$eval("a.pill, button.pill, span.pill, a.tab, button.chip", (els) =>
        els
          .filter((e) => (e as HTMLElement).offsetParent)
          .map((e) => ({ t: e.textContent?.trim(), h: Math.round(e.getBoundingClientRect().height) })),
      );
      for (const s of sizes) expect.soft(s.h, `selector "${s.t}" height`).toBe(SELECTOR_H);
    });

    test("no horizontal overflow", async ({ page }) => {
      const { sw, vw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: innerWidth }));
      expect(sw).toBeLessThanOrEqual(vw);
      const wide = await page.$$eval("main *", (els) =>
        els
          .filter((e) => {
            const r = e.getBoundingClientRect();
            const scroller = e.closest(".tabs, .term, pre");
            return !scroller && r.width > 0 && r.right > innerWidth + 1;
          })
          .map((e) => e.className || e.tagName),
      );
      expect(wide, "elements poking past the right edge").toEqual([]);
    });

    test("buttons in a row never stretch taller than their siblings", async ({ page }) => {
      const rows = await page.$$eval(".dock, .hero-actions, .start-actions, .brief-row", (els) =>
        els
          .filter((e) => (e as HTMLElement).offsetParent)
          .map((row) => [...row.querySelectorAll(".btn")].map((b) => Math.round(b.getBoundingClientRect().height))),
      );
      for (const r of rows) expect(new Set(r).size).toBeLessThanOrEqual(1);
    });
  });
}
