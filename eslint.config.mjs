// What: ESLint rules for the repo: Markdown structure (the kit is mostly Markdown) and JS config files.
// How: Flat config. @eslint/markdown lints every .md file with its recommended rules; @eslint/js covers *.js/*.mjs.
// Objective: Contributors can't merge broken links, empty links or malformed Markdown into skills, templates or docs.
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import markdown from "@eslint/markdown";
import globals from "globals";

export default defineConfig([
  globalIgnores([
    "node_modules/",
    ".superpowers/",
    "club-agent/LICENSES/",
    "club-agent/skills/tdd/",
    "club-agent/skills/to-spec/",
    "club-agent/skills/writing-plans/",
    "club-agent/skills/verification/",
  ]),
  {
    files: ["**/*.{js,mjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
]);
