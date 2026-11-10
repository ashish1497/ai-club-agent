# Changelog

**What:** Release notes for the Club Agent kit.
**How:** One section per release. Template changes that affect existing workspaces include a migration note.
**Objective:** Members can see what changed after `git pull`, and whether they need to do anything.

## Unreleased

- **One repo, one branch per member.** Members clone `ai-club-agent` and run `club-agent/install/setup.sh`, which creates their branch `member/<github-name>` and a `research/` folder for their work. The separate `my-research` workspace, the `club` link and the old installers (`install.sh`, `install.ps1`) are gone. Skills moved to the repo's `.claude/skills/`, and the repo's `CLAUDE.md` loads the constitution directly, so there's no import prompt.
- Club updates arrive automatically: a Claude Code session-start hook (`club-agent/scripts/sync.sh`) merges `main` into the member's branch and tells the agent what arrived.
- `wrap up` saves `research/` to the member's GitHub branch (`club-agent/scripts/save.sh`). New `share-pack` skill and script: a member's pack goes to the library as a one-file pull request.
- Guardrails: `research/private-data/` is git-ignored and unreadable by the agent; local git hooks keep member branches to `research/`; a GitHub workflow re-checks member pushes and pull requests into `main`.
- Hardening: work saved on one laptop arrives on the next session on another; uploads recover when another laptop pushed first and say why when a guardrail blocks them; a pre-push check stops private data and club-file edits even after `--no-verify`; member commits use a GitHub no-reply email; `.gitattributes` keeps scripts runnable in Git Bash on Windows.
- **Migration** for anyone who used `my-research`: clone the repo, run setup, then copy your old `my-research/problems/`, `domains/`, `digests/`, `LOCAL.md`, `profile.md` and `watchlist.md` into `research/`, and say `wrap up` to save them. Leave raw personal data out of git.
- Setup guide: plain step-by-step instructions with the real repo URL, and a troubleshooting table.
- Problem site (`site/`): static Next.js "Paper Arcade" site that renders the problem library by industry, in bite-sized steps, with browser-only state; GitHub Action deploys to Vercel from main.

- Problem statements enriched: who cares, in/out of scope, sourced "what is known" (every claim linked), key terms, starting points (datasets, reports, regulators), funding links, level fit, effort, skills, and "Leads to check" for anything unverified. 189 links checked at build time.
- Problem library: 30 structured problem statements in `problems/<industry>/`, a template, an index and schema tests; `triage` loads them by number ("start problem 19").
- Repo tooling: Prettier, ESLint (Markdown) and Husky hooks (pre-commit: lint-staged and tests; pre-push: full check).

## 0.1.0 (2026-11-08)

- First release: constitution, 20 skills, templates, installers.
- Open domain-pack library scaffolded in `club-packs/`.
- Manual acceptance checklist in `DRY-RUN.md` (problems #19, #7, #28).
- Known gap: the Windows installer is untested on Windows (pwsh was not available at build time).
