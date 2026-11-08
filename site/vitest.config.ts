// What: Unit test settings for the site.
// How: Node environment by default; individual files opt into jsdom with a header comment.
// Objective: Fast tests that run in the repo's pre-commit hook.
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
