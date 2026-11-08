// @vitest-environment jsdom
// What: Tests for browser-only state (peeked, saved, progress, filters) in localStorage.
// How: jsdom localStorage, plus stubs that throw to mimic private mode and blocked storage.
// Objective: State is remembered when possible, and the site never breaks when storage is unavailable.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  STORAGE_KEY,
  markPeeked,
  readState,
  setFilters,
  setProgress,
  toggleSaved,
  writeState,
} from "../src/lib/storage";

beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe("storage", () => {
  it("returns defaults when empty", () => {
    expect(readState()).toEqual({ peeked: [], saved: [], progress: {}, filters: { level: "any", effort: "any" } });
  });

  it("round-trips state", () => {
    const s = {
      peeked: ["07"],
      saved: ["19"],
      progress: { "07": 3 },
      filters: { level: "new" as const, effort: "month" },
    };
    writeState(s);
    expect(readState()).toEqual(s);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(s);
  });

  it("markPeeked dedupes", () => {
    markPeeked("07");
    markPeeked("07");
    expect(readState().peeked).toEqual(["07"]);
  });

  it("toggleSaved adds then removes", () => {
    expect(toggleSaved("07")).toBe(true);
    expect(readState().saved).toEqual(["07"]);
    expect(toggleSaved("07")).toBe(false);
    expect(readState().saved).toEqual([]);
  });

  it("setProgress keeps max", () => {
    setProgress("07", 4);
    setProgress("07", 2);
    expect(readState().progress["07"]).toBe(4);
  });

  it("setFilters stores filters", () => {
    setFilters({ level: "experienced", effort: "semester" });
    expect(readState().filters).toEqual({ level: "experienced", effort: "semester" });
  });

  it("survives a throwing localStorage", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readState().peeked).toEqual([]);
    expect(() => markPeeked("07")).not.toThrow();
    expect(() => toggleSaved("07")).not.toThrow();
  });

  it("ignores corrupt JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{not json");
    expect(readState().saved).toEqual([]);
  });

  it("ignores wrong shapes", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ peeked: "07", saved: [1], progress: [], filters: null }));
    expect(readState()).toEqual({ peeked: [], saved: [], progress: {}, filters: { level: "any", effort: "any" } });
  });
});
