# Club Agent Setup Guide

**What:** How to install the Club Agent and run your first session, in about 20 minutes, even if you have never used a terminal.
**How:** You download the club's repository once and run one setup command. It gives you your own branch with a `research/` folder for your work. After that, everything happens in the Claude desktop app's Code tab, and club updates arrive automatically.
**Objective:** Every member, including first-timers, has a working agent on day one, keeps their work backed up on GitHub, and always has the latest club rules and problems.

## Before you start

You need four things:

- **The Claude desktop app**, signed in, with the **Code** tab visible. Every member already has it.
- **A GitHub account**, free at github.com. Send your GitHub username to the club. You'll get an email invitation to the club's repository: click **Accept invitation**. This is what lets your work upload.
- **git**, the tool that downloads the club's files:
  - **macOS:** open Terminal (step 1 below), type `git --version` and press Enter. If you see a version number, you're done. If a box offers to install "command line developer tools", click **Install**, wait, then try again.
  - **Windows:** install "Git for Windows" from git-scm.com. Clicking Next on every screen is fine. It also installs **Git Bash**, which you'll use below.
- **About 20 minutes**, and a setup buddy if you're L1–L2.

How it fits together: everyone downloads the same club folder, `ai-club-agent`. Your own work lives in its `research/` folder, on your own branch (`member/<your-github-name>`). The club's files are the instruction book; `research/` is your notebook.

## Install (macOS)

1. **Open Terminal.** Press `Cmd + Space`, type `Terminal`, and press Enter.
2. **Sign in to GitHub.** Install the GitHub CLI from cli.github.com (download the macOS installer and open it). Then type `gh auth login`, press Enter, and press Enter again for each default answer. When it shows a code, press Enter, paste the code in the browser page that opens, and approve.
3. **Download the club folder.** Copy, paste, and press Enter:
   `git clone https://github.com/ashish1497/ai-club-agent ~/ai-club-agent`
4. **Set up your branch.** Copy, paste, and press Enter:
   `cd ~/ai-club-agent && bash club-agent/install/setup.sh`
   It asks a few questions. Type an answer and press Enter after each one:
   1. **Your GitHub username**, only if it can't tell from step 2.
   2. **Your name**, for example `Riya`.
   3. **Your AI comfort level**, from `L1` (new to this) to `L5` (I build things). Type it exactly like that, for example `L2`.
   4. **Fields that interest you**, separated by commas, for example `fintech, healthtech`.
   5. **Intensity:** press Enter for the default for your level, or type `gentle`, `standard` or `relentless`.
5. **Check that it worked.** The last lines should say `Uploaded your branch member/<your-name> to GitHub.` and `Club Agent ready on branch member/<your-name>.`

Running step 4 again is safe. It never overwrites your files.

## Install (Windows)

1. **Open Git Bash.** Press the Windows key, type `Git Bash`, and press Enter.
2. **Download the club folder.** Copy, paste (right-click, then Paste), and press Enter:
   `git clone https://github.com/ashish1497/ai-club-agent $HOME/ai-club-agent`
3. **Set up your branch.** Copy, paste, and press Enter, then answer the same questions as on macOS:
   `cd $HOME/ai-club-agent && bash club-agent/install/setup.sh`
   The first time it uploads, a browser window asks you to sign in to GitHub. Sign in and approve.
4. **Check that it worked.** The last lines should say your branch was uploaded and `Club Agent ready`.

## First session

1. Open the **Claude desktop app** and click the **Code** tab.
2. Choose a folder: pick **`ai-club-agent`** in your home folder. If Claude Code asks whether to trust the folder, click **Trust**.
3. Say `hi`. The agent checks for club updates, greets you by name, and tells you if anything new arrived.
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

5. When you stop, type `wrap up`. The agent writes a handoff note in the problem's `log.md` and saves your `research/` folder to your branch on GitHub. Next time it picks up where you left off, even on another laptop.

Things to know:

- Put any raw personal or health data (for example, your own sensor readings) in `research/private-data/`. It never goes to GitHub, and the agent is blocked from reading it.
- To change how the agent behaves for you, edit `research/LOCAL.md`.
- Only `research/` is yours. Everything else belongs to the club and is replaced by updates; git blocks saving changes to it.
- **This repository is public.** Everything you save in `research/` (outside `private-data/`) can be read by anyone on GitHub, and stays in git history even if you delete it later. Never save confidential course, internship or company material, anything under an NDA, or names and details of private people. Your commits use a private GitHub no-reply email, not your real one.

## Updating

Nothing to do. Every time you start a session, the agent checks GitHub and brings in new club rules, skills, problems and packs. It says so in one line when something arrives. If you're offline, it skips the check and tries again next time.

## Sharing a domain pack

When the agent has built a pack for a field (`research/domains/<field>.md`) and you think it would help others, say `share my pack`. The agent checks it, uploads just that one file, and gives you a link. Open the link and click **Create pull request**. A club maintainer adds it to the library, and every member gets it on their next session.

## Optional: weekly digest on a schedule

The agent offers a news digest whenever you open a session and one is due. To run it on a schedule instead, create a Claude Code desktop **scheduled task** on your `ai-club-agent` folder, weekly, with the prompt `Run news-digest`. Scheduled tasks run only while your computer is on.

Optional connectors make research faster, but none are required. In Claude Code, search the plugin marketplace for: the Anthropic life-sciences connectors (PubMed, ClinicalTrials.gov, bioRxiv), an arXiv server, OpenAlex, and openFDA. Install only what your fields need.

## Something went wrong?

| What you see                                       | What to do                                                                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `git: command not found`                           | git isn't installed. Go back to "Before you start".                                                                                                                                              |
| `destination path 'ai-club-agent' already exists`  | You already downloaded it. Skip to the setup step.                                                                                                                                               |
| `could not upload to GitHub yet`                   | Accept the club's invitation email and sign in to GitHub (macOS step 2), then run the setup step again.                                                                                          |
| `level must be L1-L5`                              | Type the level as a capital L and a number, for example `L3`, then run the setup step again.                                                                                                     |
| The agent doesn't greet you by name                | You opened the wrong folder. In the Code tab, choose `ai-club-agent`.                                                                                                                            |
| The agent says it can't see the constitution       | Close the session and start a new one. If it still happens, ask a club maintainer.                                                                                                               |
| `Blocked: on your member branch only research/...` | You changed a club file. The message shows the command that undoes it.                                                                                                                           |
| "club updates could not be merged"                 | Your `research/` files are safe. Ask a club maintainer for help.                                                                                                                                 |
| `the upload was blocked by a club guardrail`       | Your work is saved on this laptop. Read the lines under the message: they name the file that can't be uploaded (a club file or something in `private-data/`). Ask a maintainer if you're unsure. |

## Setup buddy checklist

- [ ] `git --version` works, and the member has accepted the GitHub invitation.
- [ ] `git branch --show-current` (inside `ai-club-agent`) shows `member/<their-github-name>`.
- [ ] `research/profile.md` has a name, level, intensity and interests.
- [ ] Their branch is on GitHub: open the repository on github.com and look for `member/<their-github-name>` in the branch list.
- [ ] In the Code tab, with `ai-club-agent` open, the agent prints a `Club update check` line and greets the member by name.
- [ ] Ask the agent: "Quote the title of your constitution." It must answer "Club Agent: Constitution".
- [ ] Type `start problem 19` (or any other number). Triage creates `research/problems/<slug>/brief.md`.
- [ ] Type `wrap up`. The agent reports that the work was uploaded.
- [ ] Total time is under 30 minutes. Note what slowed you down and add a `Feedback:` line in the handoff.
