# Club Agent

**What:** The AI Club's thinking agent for Claude Code: a constitution, templates, problem statements, setup and helper scripts. The 21 skills live in the repo's `.claude/skills/`.
**How:** You clone the `ai-club-agent` repo once and run setup. Your work lives in `research/` on your own branch, and you open the whole `ai-club-agent` folder in Claude Code.
**Objective:** Get you to the edge of what is known about any problem quickly, with verified sources, so your time goes into the unknown part: framing it, making bets and testing them.

## What is in here

| Path              | What it is                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `FUNDAMENTALS.md` | The 11 fundamentals: a one-page guide you can read without the agent                                  |
| `AGENTS.md`       | The constitution the agent always follows                                                             |
| `problems/`       | The club's 30 frontier problem statements, one file each, grouped by industry. Say "start problem 19" |
| `templates/`      | Blank versions of the files in `research/` and in each problem folder                                 |
| `install/`        | `setup.sh` and the setup guide                                                                        |
| `scripts/`        | `sync.sh` (session-start updates), `save.sh`, `share-pack.sh`, `check-branch.sh` (GitHub guardrail)   |
| `githooks/`       | Git hooks that keep member branches to `research/` and keep `private-data/` out of git                |

## Install

See [`install/SETUP-GUIDE.md`](install/SETUP-GUIDE.md).

## Updating

Nothing to do: every Claude Code session starts by merging the latest `main` into your branch. Your `research/` files are never touched.

## Feedback

At the end of a session, the agent writes a handoff in your `log.md`. Add a line that starts with `Feedback:` saying what helped, what got in the way, and what was missing. The club collects these from members and ships updates.

## Rules this kit never breaks

- No invented sources. Anything that can't be verified goes to "Leads to check".
- It never reads `research/private-data/`, and that folder never goes to git.
- You go first on judgement (framing, choosing a gap, making a bet). The agent goes first on legwork.
