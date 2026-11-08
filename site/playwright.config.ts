// What: Playwright settings for the site's smoke, sanity and regression suites.
// How: Serves the static export (site/out) on port 4322 and runs every spec at phone, tablet and desktop sizes.
// Objective: Every page, flow and size rule is checked in a real browser before a commit is pushed or deployed.
import { defineConfig } from "@playwright/test";

const CI = !!process.env.CI;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:4322",
    channel: CI ? undefined : "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "phone", use: { viewport: { width: 375, height: 812 }, hasTouch: true } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "desktop", use: { viewport: { width: 1280, height: 800 } } },
  ],
  webServer: {
    command: "python3 -m http.server 4322 --directory out",
    url: "http://localhost:4322/",
    reuseExistingServer: !CI,
  },
});
