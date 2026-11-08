// What: Tests for the site's fixed public URLs and content paths.
// How: Imports config and checks the exact live URLs.
// Objective: The site always links to the real repo and real domain; no placeholder or env var can change them.
import { describe, expect, it } from "vitest";
import { KIT_REPO_URL, SITE_URL } from "../src/config";

describe("config", () => {
  it("uses the live Vercel domain", () => {
    expect(SITE_URL).toBe("https://ai-club-agent.vercel.app");
  });

  it("uses the real GitHub repository", () => {
    expect(KIT_REPO_URL).toBe("https://github.com/ashish1497/ai-club-agent");
  });
});
