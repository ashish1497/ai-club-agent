# AI Club Agent

**What:** The AI Club's research kit and website in one repository: a Claude Code thinking agent (rules, skills, templates), 30 frontier problem statements, a shared library of domain packs, and the problem site at https://ai-club-agent.vercel.app.
**How:** Every member clones this repo once and works on their own branch, `member/<github-name>`, inside a `research/` folder. Club files come from `main` and merge into each member's branch at the start of every Claude Code session.
**Objective:** Members start every frontier problem at the edge of what's known, keep their work backed up, and always have the latest club rules and problems, while the club learns from what members do.

## Start here (members)

Follow [`club-agent/install/SETUP-GUIDE.md`](club-agent/install/SETUP-GUIDE.md), or the same steps on the site at https://ai-club-agent.vercel.app/start/. In short:

1. Accept the club's GitHub invitation and sign in to git.
2. `git clone https://github.com/ashish1497/ai-club-agent ~/ai-club-agent`
3. `cd ~/ai-club-agent && bash club-agent/install/setup.sh`
4. Open the `ai-club-agent` folder in the Claude desktop app's Code tab and say `hi`.

## How it works

| You do              | What happens                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Run setup once      | Creates your branch `member/<github-name>` from `main`, your `research/` folder, local guardrails, and uploads the branch.                                   |
| Open a session      | A hook (`club-agent/scripts/sync.sh`) fetches `main` and merges club updates into your branch, then tells the agent what arrived.                            |
| Work on a problem   | The agent writes only inside `research/`. Raw personal data goes in `research/private-data/`, which git ignores and the agent can't read.                    |
| Say `wrap up`       | The agent writes a handoff and runs `club-agent/scripts/save.sh`, which commits `research/` and pushes your branch.                                          |
| Say `share my pack` | `club-agent/scripts/share-pack.sh` puts just that pack on a `pack/<name>-<field>` branch and prints a pull-request link. A maintainer merges it into `main`. |
| Use a second laptop | Clone, run setup with the same GitHub name, and your branch and research come back.                                                                          |

## What's in the repo

```text
CLAUDE.md                  loads the constitution, then research/LOCAL.md
AGENTS.md                  the same pointer for Codex and other agents
.claude/settings.json      session-start update hook; blocks reading research/private-data/
.claude/skills/            the 21 skills (triage, field-map, hypothesis, share-pack, ...)
club-agent/                the kit: constitution (AGENTS.md), FUNDAMENTALS.md, problems/, templates/,
                           install/ (setup.sh, SETUP-GUIDE.md), scripts/ (sync, save, share-pack,
                           check-branch), githooks/, tests/
club-packs/packs/          the club's shared domain packs
site/                      the problem website (Next.js static export)
research/                  a member's own work: only on member/* branches, never on main
```

## Guardrails

| Where       | Rule                                                                                                                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code | `.claude/settings.json` blocks reading `research/private-data/`. On members' laptops, setup also blocks edits to club files (`.claude/settings.local.json`).                             |
| git (local) | Setup points git at `club-agent/githooks/`: member branches may commit only `research/`; nothing in `private-data/` is ever committed; `research/` can't be committed to other branches. |
| GitHub      | `.github/workflows/guardrails.yml` re-checks every member push and every pull request into `main` with `club-agent/scripts/check-branch.sh`.                                             |
| `main`      | Protected: changes arrive only through pull requests.                                                                                                                                    |

**This repository is public.** Everything a member saves in `research/` (outside `private-data/`) is visible on GitHub and stays in git history; the setup guide warns members. Setup sets each member's commit email to their GitHub no-reply address. Shell scripts are forced to LF line endings (`.gitattributes`) so they run in Git Bash on Windows.

## Maintainers

- **Add a member:** GitHub → Settings → Collaborators → Add people (write access). Members need write access to push their branch.
- **Protect branches (do this once, before inviting members).** Write access lets any member push to any branch, so add two rulesets in GitHub → Settings → Rules → Rulesets → New branch ruleset, with yourself in the bypass list:
  1. `main`: require a pull request before merging, require the **Guardrails** status check, block force pushes, restrict deletions.
  2. `member/**` and `pack/**`: block force pushes and restrict deletions, so nobody can wipe a classmate's branch.
- **Review a shared pack:** open the pull request from `pack/<name>-<field>`. It should change exactly one file in `club-packs/packs/`, and the guardrails check must pass. Merge it, and every member gets it in their next session.
- **Change club files** (rules, skills, problems, site): branch from `main`, open a pull request, merge. Members pick it up in their next session.
- **See member work:** browse the `member/*` branches on GitHub.
- **Tooling:** `npm ci && npm ci --prefix site`, then:
  - `npm run check`: format, lint, kit tests and site unit tests (pre-commit).
  - `npm run verify`: adds the site build and Playwright suites (pre-push and CI).
- **Website:** `.github/workflows/deploy-site.yml` deploys `site/` to Vercel on every push to `main` that touches the site, the problems or the setup guide. Details in [`site/README.md`](site/README.md).
- **Kit tests** (`npm run kit:test`) run setup, sync, save, share-pack, the git hooks and the guardrail check end to end, against a throwaway copy of this repo.
- **Claude Code in this repo:** `.claude/settings.json` denies any shell command that mentions `private-data`, for maintainers too. Run such commands (including the kit tests that touch it) from a terminal, not through Claude.
- **Husky and member hooks:** `npm install` points git at `.husky/`; on `member/*` branches the Husky hooks hand over to `club-agent/githooks/`, and each session's sync re-points git at the member hooks.

Design notes live in `docs/`. Release notes are in [`club-agent/CHANGELOG.md`](club-agent/CHANGELOG.md).
