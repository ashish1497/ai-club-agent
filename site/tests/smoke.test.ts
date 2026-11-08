// What: Smoke test that the site can find its content sources.
// How: Imports the config and checks the problem folder and setup guide exist on disk.
// Objective: Fail fast if the site is moved or the kit paths change.
import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { GUIDE_PATH, PROBLEMS_DIR } from "../src/config";

describe("config", () => {
  it("points at existing content", () => {
    expect(existsSync(PROBLEMS_DIR)).toBe(true);
    expect(existsSync(GUIDE_PATH)).toBe(true);
  });
});
