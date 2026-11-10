// What: ESLint rules for the repo: Markdown structure, JS config files, and the TypeScript/React site.
// How: Flat config. @eslint/markdown for .md; @eslint/js for JS; typescript-eslint + React Hooks + Next rules for site/.
// Objective: Contributors cannot merge broken Markdown or unsafe React/TS code into the kit or the site.
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import markdown from "@eslint/markdown";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

export default defineConfig([
  globalIgnores([
    "node_modules/",
    ".superpowers/",
    "club-agent/LICENSES/",
    ".claude/skills/tdd/",
    ".claude/skills/to-spec/",
    ".claude/skills/writing-plans/",
    ".claude/skills/verification/",
    "site/.next/",
    "site/out/",
    "site/next-env.d.ts",
    "site/node_modules/",
    "research/",
  ]),
  {
    files: ["**/*.{js,mjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["site/**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommended],
    plugins: { "react-hooks": reactHooks, "@next/next": nextPlugin },
    settings: { next: { rootDir: "site/" } },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      "@next/next/no-page-custom-font": "off",
    },
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
]);
