# What: End-to-end tests for the member workflow: setup, session-start sync, save, share-pack, git hooks and guardrails.
# How: Build a throwaway copy of this repo with a local bare "GitHub" remote, clone it like a member would, and run the
#      real scripts against it with an isolated git config.
# Objective: A member's first five minutes, every update, every save and every shared pack work, and the guardrails hold.
import json
import os
import re
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

from tests._frontmatter import has_wao_header

KIT = Path(__file__).resolve().parent.parent
REPO = KIT.parent
GUIDE = KIT / "install" / "SETUP-GUIDE.md"
SCRIPTS = ["install/setup.sh", "scripts/sync.sh", "scripts/save.sh", "scripts/share-pack.sh",
           "scripts/check-branch.sh", "githooks/pre-commit", "githooks/pre-push"]
REPO_URL = "https://github.com/ashish1497/ai-club-agent"
ID = ["-c", "user.name=Maintainer", "-c", "user.email=m@example.org"]


def git_env(home):
    # A fake, signed-out `gh` first on PATH, so setup never picks up the real machine's GitHub login.
    fake_bin = home / "bin"
    fake_bin.mkdir(exist_ok=True)
    (fake_bin / "gh").write_text("#!/bin/sh\nexit 1\n")
    (fake_bin / "gh").chmod(0o755)
    env = {k: v for k, v in os.environ.items() if not k.startswith(("GIT_", "GH_"))}
    env.update(GIT_CONFIG_GLOBAL=os.devnull, GIT_CONFIG_NOSYSTEM="1", HOME=str(home),
               GIT_TERMINAL_PROMPT="0", PATH=f"{fake_bin}{os.pathsep}{os.environ['PATH']}")
    return env


class Sandbox:
    """A fake GitHub (bare repo) holding a copy of this repo's member-facing files on main."""

    def __init__(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.home = Path(self.tmp.name)
        self.env = git_env(self.home)
        src = self.home / "src"
        src.mkdir()
        ignore = shutil.ignore_patterns("__pycache__", "node_modules", ".next", "out", "settings.local.json")
        for name in ["club-agent", "club-packs", ".claude", ".github"]:
            shutil.copytree(REPO / name, src / name, ignore=ignore, symlinks=True)
        for name in ["CLAUDE.md", "AGENTS.md", ".gitignore"]:
            shutil.copy2(REPO / name, src / name)
        self.git(src, "init", "-q", "-b", "main")
        self.git(src, "add", "-A")
        self.git(src, *ID, "commit", "-q", "-m", "club kit")
        self.origin = self.home / "origin.git"
        self.git(self.home, "clone", "-q", "--bare", str(src), str(self.origin))
        self.src = src
        self.git(src, "remote", "add", "origin", str(self.origin))

    def git(self, cwd, *args, check=True):
        r = subprocess.run(["git", *args], cwd=cwd, env=self.env, capture_output=True, text=True)
        if check and r.returncode != 0:
            raise AssertionError(f"git {' '.join(args)} failed: {r.stderr}")
        return r.stdout.strip()

    def clone(self, name="laptop"):
        dest = self.home / name
        self.git(self.home, "clone", "-q", str(self.origin), str(dest))
        return dest

    def run(self, cwd, script, *args, stdin=None):
        return subprocess.run(["bash", str(cwd / "club-agent" / script), *args], cwd=cwd, env=self.env,
                              input=stdin, capture_output=True, text=True)

    def setup(self, cwd, github="Riya-K", *extra, name="Riya", level="L2"):
        return self.run(cwd, "install/setup.sh", "--non-interactive", "--github", github, "--name", name,
                        "--level", level, "--interests", "fintech, health", *extra)

    def club_update(self, path, text, msg):
        f = self.src / path
        f.parent.mkdir(parents=True, exist_ok=True)
        f.write_text(text)
        self.git(self.src, "add", "-A")
        self.git(self.src, *ID, "commit", "-q", "-m", msg)
        self.git(self.src, "push", "-q", "origin", "main")

    def close(self):
        self.tmp.cleanup()


class SandboxCase(unittest.TestCase):
    def setUp(self):
        self.sb = Sandbox()
        self.ws = self.sb.clone()

    def tearDown(self):
        self.sb.close()

    def ok(self, r):
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        return r

    def branch(self, cwd=None):
        return self.sb.git(cwd or self.ws, "branch", "--show-current")


class TestSetup(SandboxCase):
    def test_creates_member_branch_and_research(self):
        r = self.ok(self.sb.setup(self.ws))
        self.assertEqual(self.branch(), "member/riya-k")
        for d in ["problems", "domains", "digests", "private-data"]:
            self.assertTrue((self.ws / "research" / d).is_dir(), d)
        for f in ["LOCAL.md", "profile.md", "watchlist.md"]:
            self.assertTrue((self.ws / "research" / f).is_file(), f)
        p = (self.ws / "research" / "profile.md").read_text()
        for line in ["name: Riya", "level: L2", "intensity: gentle", "interests: fintech, health"]:
            self.assertIn(line, p)
        self.assertIn("Open this folder in Claude Code:", r.stdout)

    def test_branch_is_pushed_with_research_only(self):
        self.ok(self.sb.setup(self.ws))
        self.assertIn("member/riya-k", self.sb.git(self.sb.origin, "branch"))
        changed = self.sb.git(self.ws, "diff", "--name-only", "origin/main...origin/member/riya-k").splitlines()
        self.assertTrue(changed)
        self.assertTrue(all(f.startswith("research/") for f in changed), changed)
        self.assertEqual(self.sb.git(self.ws, "rev-parse", "--abbrev-ref", "@{u}"), "origin/member/riya-k")

    def test_private_data_is_git_ignored(self):
        self.ok(self.sb.setup(self.ws))
        (self.ws / "research" / "private-data" / "pulse.csv").write_text("1,2")
        self.assertEqual(self.sb.git(self.ws, "status", "--porcelain", "--", "research/private-data"), "")

    def test_local_guardrails_installed(self):
        self.ok(self.sb.setup(self.ws))
        self.assertEqual(self.sb.git(self.ws, "config", "core.hooksPath"), "club-agent/githooks")
        local = (self.ws / ".claude" / "settings.local.json").read_text()
        self.assertIn("Edit(./club-agent/**)", local)
        self.assertEqual(self.sb.git(self.ws, "status", "--porcelain", "--", ".claude"), "")

    def test_rerun_is_safe_and_keeps_profile(self):
        self.ok(self.sb.setup(self.ws))
        (self.ws / "research" / "profile.md").write_text("MINE")
        self.ok(self.sb.setup(self.ws, name="Someone Else", level="L5"))
        self.assertEqual((self.ws / "research" / "profile.md").read_text(), "MINE")

    def test_returning_member_on_new_laptop_gets_their_work(self):
        self.ok(self.sb.setup(self.ws))
        laptop2 = self.sb.clone("laptop2")
        r = self.ok(self.sb.run(laptop2, "install/setup.sh", "--non-interactive", "--github", "riya-k"))
        self.assertEqual(self.branch(laptop2), "member/riya-k")
        self.assertIn("name: Riya", (laptop2 / "research" / "profile.md").read_text())
        self.assertIn("ready", r.stdout)

    def test_interactive_questions(self):
        r = self.ok(self.sb.run(self.ws, "install/setup.sh", "--no-push", stdin="Meera99\nMeera\nL3\nedtech\n\n"))
        self.assertEqual(self.branch(), "member/meera99")
        self.assertIn("intensity: standard", (self.ws / "research" / "profile.md").read_text())
        self.assertIn("ready", r.stdout)

    def test_bad_level_rejected(self):
        r = self.sb.setup(self.ws, level="L9")
        self.assertEqual(r.returncode, 2)
        self.assertIn("level must be L1-L5", r.stderr)
        self.assertFalse((self.ws / "research" / "profile.md").exists())

    def test_upload_failure_is_not_fatal(self):
        self.sb.git(self.ws, "remote", "set-url", "--push", "origin", str(self.sb.home / "missing.git"))
        r = self.ok(self.sb.setup(self.ws))
        self.assertIn("could not upload", r.stdout)
        self.assertTrue((self.ws / "research" / "profile.md").exists())


class TestSync(SandboxCase):
    def setUp(self):
        super().setUp()
        self.ok(self.sb.setup(self.ws))

    def test_up_to_date(self):
        self.assertIn("Club update check: up to date.", self.ok(self.sb.run(self.ws, "scripts/sync.sh")).stdout)

    def test_pulls_club_updates_into_member_branch(self):
        self.sb.club_update("club-agent/problems/README.md", "new index\n", "Add problem 31")
        r = self.ok(self.sb.run(self.ws, "scripts/sync.sh"))
        self.assertIn("pulled 1 club update(s)", r.stdout)
        self.assertIn("- Add problem 31", r.stdout)
        self.assertEqual((self.ws / "club-agent" / "problems" / "README.md").read_text(), "new index\n")
        self.assertEqual(self.branch(), "member/riya-k")

    def test_keeps_uncommitted_research_while_updating(self):
        (self.ws / "research" / "notes.md").write_text("draft")
        self.sb.club_update("club-packs/packs/x.md", "pack\n", "Add pack")
        r = self.ok(self.sb.run(self.ws, "scripts/sync.sh"))
        self.assertIn("pulled 1", r.stdout)
        self.assertIn("Unsaved research changes", r.stdout)
        self.assertEqual((self.ws / "research" / "notes.md").read_text(), "draft")

    def test_refuses_to_merge_over_edited_club_files(self):
        (self.ws / "club-agent" / "AGENTS.md").write_text("edited")
        self.sb.club_update("club-packs/packs/x.md", "pack\n", "Add pack")
        r = self.ok(self.sb.run(self.ws, "scripts/sync.sh"))
        self.assertIn("club-agent/AGENTS.md", r.stdout)
        self.assertFalse((self.ws / "club-packs" / "packs" / "x.md").exists())

    def test_offline_never_fails(self):
        self.sb.git(self.ws, "remote", "set-url", "origin", str(self.sb.home / "missing.git"))
        r = self.ok(self.sb.run(self.ws, "scripts/sync.sh"))
        self.assertIn("could not reach GitHub", r.stdout)

    def test_silent_on_non_member_branch(self):
        self.sb.git(self.ws, "switch", "-q", "main")
        self.assertEqual(self.ok(self.sb.run(self.ws, "scripts/sync.sh")).stdout, "")

    def test_claude_settings_run_sync_at_session_start(self):
        s = json.loads((REPO / ".claude" / "settings.json").read_text())
        cmd = s["hooks"]["SessionStart"][0]["hooks"][0]["command"]
        self.assertIn("club-agent/scripts/sync.sh", cmd)
        self.assertIn("Read(./research/private-data/**)", s["permissions"]["deny"])


class TestSave(SandboxCase):
    def setUp(self):
        super().setUp()
        self.ok(self.sb.setup(self.ws))

    def test_commits_research_only_and_pushes(self):
        (self.ws / "research" / "problems" / "ppg").mkdir()
        (self.ws / "research" / "problems" / "ppg" / "brief.md").write_text("brief")
        r = self.ok(self.sb.run(self.ws, "scripts/save.sh", "Framed PPG question"))
        self.assertIn("Uploaded to GitHub", r.stdout)
        log = self.sb.git(self.sb.origin, "log", "-1", "--format=%s", "member/riya-k")
        self.assertEqual(log, "Framed PPG question")

    def test_nothing_to_save(self):
        r = self.ok(self.sb.run(self.ws, "scripts/save.sh", "noop"))
        self.assertIn("Nothing new to save", r.stdout)

    def test_refuses_off_member_branch(self):
        self.sb.git(self.ws, "switch", "-q", "main")
        self.assertEqual(self.sb.run(self.ws, "scripts/save.sh", "x").returncode, 2)


class TestHooks(SandboxCase):
    def setUp(self):
        super().setUp()
        self.ok(self.sb.setup(self.ws))

    def commit(self, *paths):
        self.sb.git(self.ws, "add", "-f", *paths)
        return subprocess.run(["git", "commit", "-q", "-m", "x"], cwd=self.ws, env=self.sb.env,
                              capture_output=True, text=True)

    def test_blocks_club_file_on_member_branch(self):
        (self.ws / "club-agent" / "AGENTS.md").write_text("edited")
        r = self.commit("club-agent/AGENTS.md")
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("only research/ can change", r.stderr)

    def test_blocks_private_data_even_when_forced(self):
        f = self.ws / "research" / "private-data" / "pulse.csv"
        f.write_text("1,2")
        r = self.commit(str(f.relative_to(self.ws)))
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("private-data", r.stderr)

    def test_blocks_research_on_main(self):
        self.sb.git(self.ws, "switch", "-q", "main")
        (self.ws / "research").mkdir(exist_ok=True)
        (self.ws / "research" / "x.md").write_text("x")
        r = self.commit("research/x.md")
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("member/*", r.stderr)


class TestSharePack(SandboxCase):
    def setUp(self):
        super().setUp()
        self.ok(self.sb.setup(self.ws))

    def write_pack(self, field, drop=None):
        heads = [l for l in (KIT / "templates" / "domain-pack.md").read_text().splitlines() if l.startswith("## ")]
        body = "\n\n".join(h + "\n\nsomething" for h in heads if h != drop)
        (self.ws / "research" / "domains" / f"{field}.md").write_text("# Pack\n\n" + body + "\n")

    def test_shares_one_file_on_a_pack_branch(self):
        self.write_pack("retail-media")
        r = self.ok(self.sb.run(self.ws, "scripts/share-pack.sh", "retail-media"))
        self.assertIn("compare/main...pack/riya-k-retail-media", r.stdout)
        self.sb.git(self.ws, "fetch", "-q", "origin")
        changed = self.sb.git(self.ws, "diff", "--name-only", "origin/main...origin/pack/riya-k-retail-media")
        self.assertEqual(changed, "club-packs/packs/retail-media.md")
        self.assertEqual(self.branch(), "member/riya-k")
        self.assertEqual(self.sb.git(self.ws, "worktree", "list").count("\n"), 0)

    def test_rejects_pack_missing_a_heading(self):
        self.write_pack("retail-media", drop="## Field risk rules")
        r = self.sb.run(self.ws, "scripts/share-pack.sh", "retail-media")
        self.assertEqual(r.returncode, 2)
        self.assertIn("## Field risk rules", r.stderr)

    def test_rejects_bad_field_name(self):
        self.assertEqual(self.sb.run(self.ws, "scripts/share-pack.sh", "../etc").returncode, 2)


class TestCheckBranch(SandboxCase):
    def setUp(self):
        super().setUp()
        self.ok(self.sb.setup(self.ws))

    def check(self, mode):
        return self.sb.run(self.ws, "scripts/check-branch.sh", mode, "origin/main")

    def test_member_branch_with_research_only_passes(self):
        self.assertIn("Guardrails OK", self.ok(self.check("member")).stdout)

    def test_member_branch_touching_club_files_fails(self):
        (self.ws / "club-agent" / "AGENTS.md").write_text("edited")
        self.sb.git(self.ws, "-c", "core.hooksPath=/dev/null", "commit", "-q", "-am", "sneaky")
        r = self.check("member")
        self.assertEqual(r.returncode, 1)
        self.assertIn("club-agent/AGENTS.md", r.stdout)

    def test_pr_with_research_fails(self):
        self.assertEqual(self.check("pr").returncode, 1)



class TestReviewFixes(SandboxCase):
    """Regression tests for the review findings on the member-branch workflow."""

    def setUp(self):
        super().setUp()
        self.ok(self.sb.setup(self.ws))

    def test_second_laptop_gets_work_saved_on_the_first(self):
        laptop2 = self.sb.clone("laptop2")
        self.ok(self.sb.run(laptop2, "install/setup.sh", "--non-interactive", "--github", "riya-k"))
        (self.ws / "research" / "notes.md").write_text("from laptop A")
        self.ok(self.sb.run(self.ws, "scripts/save.sh", "A notes"))
        r = self.ok(self.sb.run(laptop2, "scripts/sync.sh"))
        self.assertEqual((laptop2 / "research" / "notes.md").read_text(), "from laptop A", r.stdout)
        (laptop2 / "research" / "more.md").write_text("from B")
        r = self.ok(self.sb.run(laptop2, "scripts/save.sh", "B notes"))
        self.assertIn("Uploaded to GitHub", r.stdout)

    def test_save_recovers_when_the_other_laptop_pushed_first(self):
        laptop2 = self.sb.clone("laptop2")
        self.ok(self.sb.run(laptop2, "install/setup.sh", "--non-interactive", "--github", "riya-k"))
        (self.ws / "research" / "a.md").write_text("A")
        self.ok(self.sb.run(self.ws, "scripts/save.sh", "A"))
        (laptop2 / "research" / "b.md").write_text("B")
        r = self.ok(self.sb.run(laptop2, "scripts/save.sh", "B"))
        self.assertIn("Uploaded to GitHub", r.stdout)
        self.assertTrue((laptop2 / "research" / "a.md").exists())

    def test_sync_merges_with_staged_research_changes(self):
        (self.ws / "research" / "staged.md").write_text("draft")
        self.sb.git(self.ws, "add", "research/staged.md")
        self.sb.club_update("club-packs/packs/y.md", "pack\n", "Add pack y")
        r = self.ok(self.sb.run(self.ws, "scripts/sync.sh"))
        self.assertIn("pulled 1", r.stdout)
        self.assertEqual((self.ws / "research" / "staged.md").read_text(), "draft")

    def test_sync_restores_member_git_hooks(self):
        self.sb.git(self.ws, "config", "core.hooksPath", ".husky/_")
        self.ok(self.sb.run(self.ws, "scripts/sync.sh"))
        self.assertEqual(self.sb.git(self.ws, "config", "core.hooksPath"), "club-agent/githooks")

    def test_pre_push_blocks_private_data_committed_with_no_verify(self):
        f = self.ws / "research" / "private-data" / "pulse.csv"
        f.write_text("1,2")
        self.sb.git(self.ws, "add", "-f", str(f.relative_to(self.ws)))
        self.sb.git(self.ws, "commit", "-q", "--no-verify", "-m", "oops")
        r = subprocess.run(["git", "push", "-q", "origin", "member/riya-k"], cwd=self.ws, env=self.sb.env,
                           capture_output=True, text=True)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("private-data", r.stdout + r.stderr)
        self.assertNotIn("pulse.csv", self.sb.git(self.sb.origin, "ls-tree", "-r", "--name-only", "member/riya-k"))

    def test_save_shows_why_an_upload_was_blocked(self):
        (self.ws / "club-agent" / "AGENTS.md").write_text("edited")
        self.sb.git(self.ws, "commit", "-q", "--no-verify", "-am", "sneaky")
        (self.ws / "research" / "n.md").write_text("n")
        r = self.ok(self.sb.run(self.ws, "scripts/save.sh", "n"))
        self.assertIn("club-agent/AGENTS.md", r.stdout + r.stderr)

    def test_setup_merges_deny_rules_into_existing_local_settings(self):
        laptop2 = self.sb.clone("laptop2")
        (laptop2 / ".claude" / "settings.local.json").write_text('{"permissions": {"allow": ["Bash(ls)"]}}')
        self.ok(self.sb.run(laptop2, "install/setup.sh", "--non-interactive", "--github", "riya-k"))
        local = json.loads((laptop2 / ".claude" / "settings.local.json").read_text())
        self.assertIn("Edit(./club-agent/**)", local["permissions"]["deny"])
        self.assertIn("Bash(ls)", local["permissions"]["allow"])

    def test_commit_email_is_always_github_noreply(self):
        laptop2 = self.sb.clone("laptop2")
        self.sb.git(laptop2, "config", "user.email", "private@gmail.com")
        self.ok(self.sb.run(laptop2, "install/setup.sh", "--non-interactive", "--github", "riya-k"))
        self.assertEqual(self.sb.git(laptop2, "config", "user.email"), "riya-k@users.noreply.github.com")

    def test_level_accepts_lowercase_and_bare_number(self):
        for given, want in [("l3", "L3"), ("4", "L4")]:
            ws = self.sb.clone(f"lv-{given}")
            self.ok(self.sb.setup(ws, f"lv-{given}", level=given))
            self.assertIn(f"level: {want}", (ws / "research" / "profile.md").read_text())

    def test_ampersand_in_answers_is_kept(self):
        ws = self.sb.clone("amp")
        self.ok(self.sb.run(ws, "install/setup.sh", "--non-interactive", "--github", "amp", "--name", "A&B",
                            "--level", "L2", "--interests", "M&A, R&D"))
        p = (ws / "research" / "profile.md").read_text()
        self.assertIn("name: A&B", p)
        self.assertIn("interests: M&A, R&D", p)


class TestRepoConfig(unittest.TestCase):
    def test_shell_files_always_check_out_with_lf(self):
        attrs = (REPO / ".gitattributes").read_text()
        self.assertIn("*.sh text eol=lf", attrs)
        self.assertIn("club-agent/githooks/* text eol=lf", attrs)
        self.assertIn(".husky/* text eol=lf", attrs)

    def test_setup_fills_profile_without_pattern_substitution(self):
        text = (KIT / "install" / "setup.sh").read_text()
        self.assertNotIn("//'{{", text)
        for var in ["NAME", "LEVEL", "INTENSITY", "INTERESTS"]:
            self.assertIn(f"fill \"$t\" '{{{{{var}}}}}' \"${var}\"", text, var)

    def test_sync_runs_on_new_sessions_only(self):
        s = json.loads((REPO / ".claude" / "settings.json").read_text())
        self.assertEqual(s["hooks"]["SessionStart"][0]["matcher"], "startup|resume|clear")

    def test_husky_hooks_hand_member_branches_to_club_hooks(self):
        for hook in ["pre-commit", "pre-push"]:
            text = (REPO / ".husky" / hook).read_text()
            self.assertIn("member/*", text, hook)
            self.assertIn(f"club-agent/githooks/{hook}", text, hook)


class TestScriptsAndGuide(unittest.TestCase):
    def test_scripts_have_wao_header_and_are_executable(self):
        for s in SCRIPTS:
            p = KIT / s
            self.assertTrue(has_wao_header(p.read_text()), s)
            self.assertTrue(os.access(p, os.X_OK), s)

    def test_guardrail_workflow_runs_check(self):
        wf = (REPO / ".github" / "workflows" / "guardrails.yml").read_text()
        self.assertIn("member/**", wf)
        self.assertIn("club-agent/scripts/check-branch.sh", wf)

    def test_setup_guide_sections(self):
        text = GUIDE.read_text()
        for h in ["## Before you start", "## Install (macOS)", "## Install (Windows)", "## First session",
                  "## Updating", "## Sharing a domain pack", "## Something went wrong?", "## Setup buddy checklist"]:
            self.assertIn(h, text)
        self.assertIn("constitution", text.split("## Setup buddy checklist", 1)[1])
        self.assertTrue(has_wao_header(text))

    def test_guide_commands_match_the_repo(self):
        text = GUIDE.read_text()
        self.assertIn(f"git clone {REPO_URL} ~/ai-club-agent", text)
        self.assertIn(f"git clone {REPO_URL} $HOME/ai-club-agent", text)
        self.assertIn("bash club-agent/install/setup.sh", text)
        for path in re.findall(r"`(?:bash )?((?:club-agent|\.claude)/[\w./-]+)`", text):
            self.assertTrue((REPO / path).exists(), f"guide path missing in repo: {path}")
        for old in ["my-research", "install.ps1", "install.sh", "CLUB-RULES"]:
            self.assertNotIn(old, text)

    def test_no_placeholders_in_repo(self):
        files = subprocess.run(["git", "ls-files"], cwd=REPO, capture_output=True, text=True).stdout.split()
        markers = ["<club-agent repo URL>", "REPLACE-ME", "<you>"]
        # Tests are skipped: they name the markers in order to assert they are absent.
        skip = ("docs/superpowers/", "club-agent/tests/", "site/tests/", "site/e2e/", "package-lock.json")
        for f in files:
            if f.startswith(skip) or not f.endswith((".md", ".ts", ".tsx", ".yml", ".json", ".sh")):
                continue
            path = REPO / f
            if path.is_file():
                text = path.read_text(errors="ignore")
                for m in markers:
                    self.assertNotIn(m, text, f"placeholder {m!r} in {f}")


if __name__ == "__main__":
    unittest.main()
