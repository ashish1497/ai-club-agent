// What: Tests for site config defaults.
// How: Stubs env vars (including empty strings, as GitHub Actions passes for unset vars) and re-imports config.
// Objective: An unset repo variable can never break the build or ship an empty link.
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("config", () => {
  it("falls back to defaults when env vars are empty strings", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_KIT_REPO_URL", "");
    const c = await import("../src/config");
    expect(() => new URL(c.SITE_URL)).not.toThrow();
    expect(c.KIT_REPO_URL).toMatch(/^https:\/\//);
  });

  it("uses env values when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org");
    const c = await import("../src/config");
    expect(c.SITE_URL).toBe("https://example.org");
  });

  it("rejects a non-URL value with a clear error", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "not a url");
    await expect(import("../src/config")).rejects.toThrow(/NEXT_PUBLIC_SITE_URL/);
  });
});
