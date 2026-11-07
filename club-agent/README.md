# Club Agent

**What:** The AI Club's thinking agent for Claude Code: a constitution, 20 skills, templates and an installer.
**How:** You install it once. It creates your own `my-research/` workspace, and you open that folder in Claude Code for every problem you work on.
**Objective:** Get you to the edge of what is known about any problem quickly, with verified sources, so your time goes into the unknown part: framing it, making bets and testing them.

## What is in here

| Path              | What it is                                                           |
| ----------------- | -------------------------------------------------------------------- |
| `FUNDAMENTALS.md` | The 11 fundamentals: a one-page guide you can read without the agent |
| `AGENTS.md`       | The constitution the agent always follows                            |
| `skills/`         | The 20 thinking moves (triage, field-map, hypothesis, …)             |
| `templates/`      | Blank versions of every file in your workspace                       |
| `install/`        | Installers and the setup guide                                       |

## Install

See [`install/SETUP-GUIDE.md`](install/SETUP-GUIDE.md).

## Updating

Run `git pull` inside this folder. Your `my-research/` files are never touched.

## Feedback

At the end of a session, the agent writes a handoff in your `log.md`. Add a line that starts with `Feedback:` saying what helped, what got in the way, and what was missing. The club collects these from members and ships updates.

## Rules this kit never breaks

- No invented sources. Anything that can't be verified goes to "Leads to check".
- It never reads `private-data/`.
- You go first on judgement (framing, choosing a gap, making a bet). The agent goes first on legwork.
