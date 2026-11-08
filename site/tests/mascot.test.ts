// What: Tests for build-time DiceBear mascots.
// How: Generates SVGs for seeds and compares them.
// Objective: Each world keeps the same mascot everywhere, with no runtime calls to DiceBear.
import { describe, expect, it } from "vitest";
import { mascotSvg } from "../src/lib/mascot";

describe("mascotSvg", () => {
  it("returns an svg", () => {
    expect(mascotSvg("fintech-coin")).toMatch(/^<svg/);
  });
  it("same seed gives the same svg", () => {
    expect(mascotSvg("fintech-coin")).toBe(mascotSvg("fintech-coin"));
  });
  it("different seeds differ", () => {
    expect(mascotSvg("fintech-coin")).not.toBe(mascotSvg("saas-bot"));
  });
  it("makes ids unique per seed so inline svgs don't collide", () => {
    expect(mascotSvg("a")).not.toEqual(mascotSvg("b"));
  });
});
