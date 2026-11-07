# Changelog

**What:** Release notes for the Club Agent kit.
**How:** One section per release. Template changes that affect existing workspaces include a migration note.
**Objective:** Members can see what changed after `git pull`, and whether they need to do anything.

## Unreleased

- Problem library: 30 structured problem statements in `problems/<industry>/`, a template, an index and schema tests; `triage` loads them by number ("start problem 19").
- Repo tooling: Prettier, ESLint (Markdown) and Husky hooks (pre-commit: lint-staged and tests; pre-push: full check).

## 0.1.0 (2026-11-08)

- First release: constitution, 20 skills, templates, installers.
- Open domain-pack library scaffolded in `club-packs/`.
- Manual acceptance checklist in `DRY-RUN.md` (problems #19, #7, #28).
- Known gap: the Windows installer is untested on Windows (pwsh was not available at build time).
