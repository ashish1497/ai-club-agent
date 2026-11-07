# Club Agent Setup Guide

**What:** How to install the Club Agent and run your first session, in about 30 minutes.
**How:** One terminal command creates your `my-research` workspace. After that, everything happens in the Claude desktop app's Code tab.
**Objective:** Every member, including first-timers, gets a working agent on day one. L2 members install with a setup buddy.

## Before you start

- The Claude desktop app with Claude Code (every member has it).
- git:
  - **macOS:** run `git --version` in Terminal; if it isn't installed, macOS offers to install it.
  - **Windows:** install "Git for Windows".
- About 30 minutes, and a setup buddy if you're L1–L2.

## Install (macOS)

1. Open Terminal.
2. Download the kit:
   `git clone <club-agent repo URL> ~/club-agent`
3. Run the installer and answer its 4 questions (name, level L1–L5, interests, intensity):
   `bash ~/club-agent/install/install.sh`

This creates `~/my-research`. Re-running it is safe: it never overwrites your files.

## Install (Windows)

1. Open PowerShell.
2. Download the kit:
   `git clone <club-agent repo URL> $HOME\club-agent`
3. Run the installer:
   `powershell -ExecutionPolicy Bypass -File $HOME\club-agent\install\install.ps1`

If Windows doesn't allow links, the installer copies the kit instead and tells you. In that case, re-run the installer after every kit update.

## First session

1. Open the Claude desktop app, go to the **Code** tab, and choose your `my-research` folder.
2. Say hi. The agent reads your profile and checks everything is set up.
3. Paste a problem statement, any of the club's or your own. The agent starts with **triage**, then walks you through:
   1. where you are
   2. your framing
   3. the field map
   4. challenging the premise
   5. your bet and a test
4. When you stop, say "wrap up". The agent writes a handoff in the problem's `log.md`, so next time you continue where you left off.

Things to know:

- Put any raw personal or health data (for example, your own sensor readings) in `private-data/`. The agent is blocked from reading it.
- Change how the agent behaves for you in `LOCAL.md`. Never edit the `club` folder.

## Updating

- **macOS:** `cd ~/club-agent && git pull`
- **Windows:** `cd $HOME\club-agent; git pull` (and re-run the installer if it copied the kit).

Your `my-research` files are never touched. Check `CHANGELOG.md` for anything you need to do.

## Optional: weekly digest on a schedule

The agent offers a news digest whenever you open a session and one is due. To run it on a schedule instead, create a Claude Code desktop **scheduled task** on your `my-research` folder, weekly, with the prompt `Run news-digest`. Scheduled tasks on your machine run only while the computer is on.

Optional connectors make research faster, but none are required. In Claude Code, search the plugin marketplace for: the Anthropic life-sciences connectors (PubMed, ClinicalTrials.gov, bioRxiv), an arXiv server, OpenAlex, and openFDA. Install only what your fields need.

## Setup buddy checklist

- [ ] `git --version` works.
- [ ] The kit is cloned. `ls ~/club-agent/skills` shows 20 folders.
- [ ] The installer ran and printed "Open this folder in Claude Code".
- [ ] `my-research/club` opens the kit, and `my-research/.claude/skills/triage/SKILL.md` exists.
- [ ] `my-research/profile.md` has a name, level, intensity and interests.
- [ ] In the Code tab, with `my-research` open, the agent greets the member by name.
- [ ] Ask the agent: "Quote the title of your constitution." It must answer "Club Agent: Constitution". If it doesn't, approve the `club/AGENTS.md` import when Claude Code asks, then restart the session.
- [ ] Paste problem #19 (or any other). Triage creates `problems/<slug>/brief.md`.
- [ ] Total time is under 30 minutes. Note what slowed you down and add a `Feedback:` line in the handoff.
