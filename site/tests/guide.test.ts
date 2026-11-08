// What: Tests for the /start page content, rendered from the kit's SETUP-GUIDE.md.
// How: Renders the guide and checks headings, URL substitution and the stripped header.
// Objective: The site's setup steps never drift from the kit's guide, and never show a placeholder.
import { describe, expect, it } from "vitest";
import { KIT_REPO_URL } from "../src/config";
import { loadSetupGuide } from "../src/lib/guide";

describe("setup guide", () => {
  const g = loadSetupGuide();
  it("renders the install headings", () => {
    expect(g.html).toMatch(/<h2[^>]*>Install \(macOS\)<\/h2>/);
    expect(g.html).toMatch(/<h2[^>]*>Install \(Windows\)<\/h2>/);
  });
  it("shows the real clone command and no placeholder", () => {
    expect(g.html).toContain(`git clone ${KIT_REPO_URL} ~/ai-club-agent`);
    expect(g.html).not.toContain("&lt;club-agent repo URL&gt;");
    expect(g.html).not.toContain("<club-agent repo URL>");
  });
  it("lifts the What/How/Objective header out of the body", () => {
    expect(g.intro.what).toBeTruthy();
    expect(g.html).not.toMatch(/<strong>What:<\/strong>/);
    expect(g.html).not.toMatch(/<h1/);
  });
});
