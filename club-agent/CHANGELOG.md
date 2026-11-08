# Changelog

**What:** Release notes for the Club Agent kit.
**How:** One section per release. Template changes that affect existing workspaces include a migration note.
**Objective:** Members can see what changed after `git pull`, and whether they need to do anything.

## Unreleased

- The constitution is now copied into each workspace as `CLUB-RULES.md`, and `CLAUDE.md` imports that copy, so Claude Code no longer asks to approve an external import. The installer refreshes it on every run. **Migration:** after `git pull`, re-run the installer; it switches an existing `@club/AGENTS.md` line in your `CLAUDE.md` to `@CLUB-RULES.md` and leaves the rest of the file alone.
- Installer asks where to put the research folder (Enter keeps `~/my-research`; `~` and relative paths work). `--workspace` still skips the question.
- Setup guide: clone into `~/ai-club-agent` with the real repo URL (the old `~/club-agent/install` path did not exist after cloning), plain step-by-step instructions and a troubleshooting table. No action needed for existing workspaces.
- Problem site (`site/`): static Next.js "Paper Arcade" site that renders the problem library by industry, in bite-sized steps, with browser-only state; GitHub Action deploys to Vercel from main.

- Problem statements enriched: who cares, in/out of scope, sourced "what is known" (every claim linked), key terms, starting points (datasets, reports, regulators), funding links, level fit, effort, skills, and "Leads to check" for anything unverified. 189 links checked at build time.
- Problem library: 30 structured problem statements in `problems/<industry>/`, a template, an index and schema tests; `triage` loads them by number ("start problem 19").
- Repo tooling: Prettier, ESLint (Markdown) and Husky hooks (pre-commit: lint-staged and tests; pre-push: full check).

## 0.1.0 (2026-11-08)

- First release: constitution, 20 skills, templates, installers.
- Open domain-pack library scaffolded in `club-packs/`.
- Manual acceptance checklist in `DRY-RUN.md` (problems #19, #7, #28).
- Known gap: the Windows installer is untested on Windows (pwsh was not available at build time).
