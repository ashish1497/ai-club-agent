// What: Prettier formatting rules for the whole repo (Markdown, JSON, YAML, JS).
// How: Loaded by `npm run format` / `format:check` and by the pre-commit hook via lint-staged.
// Objective: Every contributor's files look the same, so diffs show content changes, not style noise.
export default {
  proseWrap: "preserve",
  printWidth: 120,
  singleQuote: false,
  trailingComma: "all",
};
