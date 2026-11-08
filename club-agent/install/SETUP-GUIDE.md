# Club Agent Setup Guide

**What:** How to install the Club Agent and run your first session, in about 20 minutes, even if you have never used a terminal.
**How:** You copy three commands into a terminal once. They download the kit and build your own `my-research` folder. After that, everything happens in the Claude desktop app's Code tab.
**Objective:** Every member, including first-timers, has a working agent on day one. L1–L2 members install with a setup buddy.

## Before you start

You need three things:

- **The Claude desktop app**, signed in, with the **Code** tab visible. Every member already has it.
- **git**, the tool that downloads the kit:
  - **macOS:** open Terminal (step 1 below) and type `git --version`, then press Enter. If you see a version number, you're done. If a box pops up offering to install "command line developer tools", click **Install**, wait until it finishes, then type `git --version` again.
  - **Windows:** download and install "Git for Windows" from git-scm.com. Clicking Next on every screen is fine.
- **About 20 minutes**, and a setup buddy if you're L1–L2.

The kit is downloaded into a folder called `ai-club-agent` in your home folder. Your own work goes into a separate folder called `my-research`. The kit is the instruction book; `my-research` is your notebook.

## Install (macOS)

1. **Open Terminal.** Press `Cmd + Space`, type `Terminal`, and press Enter. A window with a blinking cursor opens.
2. **Download the kit.** Copy this line, paste it into Terminal, and press Enter:
   `git clone https://github.com/ashish1497/ai-club-agent ~/ai-club-agent`
   You'll see a few lines ending in "done". You now have a folder called `ai-club-agent` in your home folder.
3. **Build your workspace.** Copy, paste, and press Enter:
   `bash ~/ai-club-agent/club-agent/install/install.sh`
   It asks five questions. Type an answer and press Enter after each one:
   1. **Where to put your research folder.** Press Enter to use `my-research` in your home folder (recommended), or type a path such as `~/Documents/ai-club`.
   2. **Your name**, for example `Riya`.
   3. **Your AI comfort level**, from `L1` (new to this) to `L5` (I build things). Type it exactly like that, for example `L2`.
   4. **Fields that interest you**, separated by commas, for example `fintech, healthtech`.
   5. **Intensity:** press Enter to take the default for your level, or type `gentle`, `standard` or `relentless`.
4. **Check that it worked.** The last lines should say `Club Agent workspace ready.` and `Open this folder in Claude Code:` followed by your research folder's path.

Running step 3 again is safe. It never overwrites your files, and it only asks for the folder again (press Enter if you used the default).

## Install (Windows)

1. **Open PowerShell.** Press the Windows key, type `PowerShell`, and press Enter.
2. **Download the kit.** Copy, paste, and press Enter:
   `git clone https://github.com/ashish1497/ai-club-agent $HOME\ai-club-agent`
3. **Build your workspace.** Copy, paste, and press Enter, then answer the same five questions as on macOS:
   `powershell -ExecutionPolicy Bypass -File $HOME\ai-club-agent\club-agent\install\install.ps1`
4. **Check that it worked.** The last lines should say `Open this folder in Claude Code:` followed by your research folder's path.

If Windows doesn't allow links, the installer copies the kit instead and tells you so. In that case, re-run step 3 after every kit update.

## First session

1. Open the **Claude desktop app** and click the **Code** tab.
2. Choose a folder: pick your research folder (**`my-research`** in your home folder, unless you chose another one). Don't pick `ai-club-agent`.
3. Say `hi`. The agent greets you by name and checks that everything is set up.
4. Pick a problem:
   - **A club problem:** browse them on the club website, then type `start problem 07`, using the problem's number.
   - **Your own problem:** paste the problem statement.

   The agent starts with **triage**, then walks you through:
   1. where you are
   2. your framing
   3. the field map
   4. challenging the premise
   5. your bet and a test

   It asks you questions. That's the point, so answer in your own words.

5. When you stop, type `wrap up`. The agent saves a handoff note in the problem's `log.md`, and next time it picks up where you left off.

Things to know:

- Put any raw personal or health data (for example, your own sensor readings) in `my-research/private-data/`. The agent is blocked from reading it.
- To change how the agent behaves for you, edit `my-research/LOCAL.md`. Never edit `CLUB-RULES.md` (the installer replaces it) or anything inside `club` or `ai-club-agent`.

## Updating

When the club announces an update, get it like this:

1. Download the update:
   - **macOS:** in Terminal, run `cd ~/ai-club-agent && git pull`
   - **Windows:** in PowerShell, run `cd $HOME\ai-club-agent; git pull`
2. Run install step 3 again, and give the same folder as before. This refreshes `CLUB-RULES.md`, the agent's rulebook in your research folder.

Your own files are never touched. Check `CHANGELOG.md` for anything you need to do.

## Optional: weekly digest on a schedule

The agent offers a news digest whenever you open a session and one is due. To run it on a schedule instead, create a Claude Code desktop **scheduled task** on your `my-research` folder, weekly, with the prompt `Run news-digest`. Scheduled tasks on your machine run only while the computer is on.

Optional connectors make research faster, but none are required. In Claude Code, search the plugin marketplace for: the Anthropic life-sciences connectors (PubMed, ClinicalTrials.gov, bioRxiv), an arXiv server, OpenAlex, and openFDA. Install only what your fields need.

## Something went wrong?

| What you see                                      | What to do                                                                                                          |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `git: command not found`                          | git isn't installed. Go back to "Before you start".                                                                 |
| `destination path 'ai-club-agent' already exists` | You already downloaded the kit. Skip to step 3.                                                                     |
| `No such file or directory` on step 3             | Copy the step 3 line again exactly as written. The path has `club-agent` twice: `ai-club-agent/club-agent/install`. |
| `level must be L1-L5`                             | Type the level as a capital L and a number, for example `L3`, then run step 3 again.                                |
| The agent doesn't greet you by name               | You opened the wrong folder. In the Code tab, choose `my-research`, not `ai-club-agent`.                            |
| The agent says it can't see the constitution      | Run install step 3 again, then start a new session.                                                                 |

## Setup buddy checklist

- [ ] `git --version` works.
- [ ] The kit is cloned. `ls ~/ai-club-agent/club-agent/skills` shows 20 folders.
- [ ] The installer ran and printed "Open this folder in Claude Code".
- [ ] `my-research/CLUB-RULES.md` starts with a "Copied from club/AGENTS.md" note, `my-research/club` opens the kit, and `my-research/.claude/skills/triage/SKILL.md` exists.
- [ ] `my-research/profile.md` has a name, level, intensity and interests.
- [ ] In the Code tab, with `my-research` open, the agent greets the member by name.
- [ ] Ask the agent: "Quote the title of your constitution." It must answer "Club Agent: Constitution". If it doesn't, check that `my-research/CLAUDE.md` starts with `@CLUB-RULES.md`, re-run the installer, then restart the session.
- [ ] Type `start problem 19` (or any other number). Triage creates `problems/<slug>/brief.md`.
- [ ] Total time is under 30 minutes. Note what slowed you down and add a `Feedback:` line in the handoff.
