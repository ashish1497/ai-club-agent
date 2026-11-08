# What: End-to-end tests for the installers (install.sh; install.ps1 when PowerShell exists).
# How: Run the installer non-interactively into temporary folders and inspect the workspace it builds.
# Objective: A member's first five minutes work, and re-running the installer never damages their work.
import json
import os
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

from tests._frontmatter import has_wao_header

KIT = Path(__file__).resolve().parent.parent
SH = KIT / "install" / "install.sh"


def run_sh(ws, *extra, level="L2", name="Test User"):
    args = ["bash", str(SH), "--kit", str(KIT), "--workspace", str(ws), "--non-interactive",
            "--name", name, "--level", level, "--interests", "fintech,health", *extra]
    return subprocess.run(args, capture_output=True, text=True)


class TestInstallSh(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.ws = Path(self.tmp.name) / "my-research"

    def tearDown(self):
        self.tmp.cleanup()

    def install(self, *extra, **kw):
        r = run_sh(self.ws, *extra, **kw)
        self.assertEqual(r.returncode, 0, r.stderr)
        return r

    def test_creates_workspace_layout(self):
        self.install()
        for d in ["problems", "domains", "digests", "private-data"]:
            self.assertTrue((self.ws / d).is_dir(), d)
        self.assertTrue((self.ws / "private-data" / ".gitkeep").exists())
        for f in ["AGENTS.md", "CLAUDE.md", "LOCAL.md", "profile.md", "watchlist.md"]:
            self.assertTrue((self.ws / f).is_file(), f)

    def test_club_symlink_resolves_to_kit(self):
        self.install()
        self.assertTrue((self.ws / "club").is_symlink())
        self.assertEqual((self.ws / "club").resolve(), KIT.resolve())

    def test_skills_visible_via_claude_and_agents_paths(self):
        self.install()
        for base in [".claude/skills", ".agents/skills"]:
            self.assertIn("name: triage", (self.ws / base / "triage" / "SKILL.md").read_text())

    def test_profile_filled(self):
        self.install()
        p = (self.ws / "profile.md").read_text()
        self.assertIn("name: Test User", p)
        self.assertIn("level: L2", p)
        self.assertIn("intensity: gentle", p)
        self.assertIn("interests: fintech,health", p)
        self.assertNotIn("{{", p)

    def test_default_intensity_mapping(self):
        for level, expected in [("L1", "gentle"), ("L3", "standard"), ("L5", "relentless")]:
            ws = Path(self.tmp.name) / f"ws-{level}"
            r = run_sh(ws, level=level)
            self.assertEqual(r.returncode, 0, r.stderr)
            self.assertIn(f"intensity: {expected}", (ws / "profile.md").read_text())

    def test_explicit_intensity_overrides_default(self):
        self.install("--intensity", "relentless")
        self.assertIn("intensity: relentless", (self.ws / "profile.md").read_text())

    def test_settings_deny_private_data(self):
        self.install()
        s = json.loads((self.ws / ".claude" / "settings.json").read_text())
        self.assertIn("Read(./private-data/**)", s["permissions"]["deny"])
        self.assertIn("Edit(./private-data/**)", s["permissions"]["deny"])
        self.assertIn("Bash(*private-data*)", s["permissions"]["deny"])

    def test_workspace_claude_md_imports(self):
        self.install()
        lines = (self.ws / "CLAUDE.md").read_text().splitlines()
        self.assertEqual(lines[:2], ["@club/AGENTS.md", "@LOCAL.md"])
        self.assertIn("constitution", "\n".join(lines[2:]))

    def test_rerun_preserves_student_files(self):
        self.install()
        (self.ws / "profile.md").write_text("MINE profile")
        (self.ws / "LOCAL.md").write_text("MINE local")
        (self.ws / ".claude" / "settings.json").write_text('{"mine": true}')
        (self.ws / "problems" / "x").mkdir()
        self.install(name="Someone Else", level="L5")
        self.assertEqual((self.ws / "profile.md").read_text(), "MINE profile")
        self.assertEqual((self.ws / "LOCAL.md").read_text(), "MINE local")
        self.assertEqual((self.ws / ".claude" / "settings.json").read_text(), '{"mine": true}')
        self.assertTrue((self.ws / "problems" / "x").is_dir())

    def test_install_into_path_with_spaces(self):
        ws = Path(self.tmp.name) / "my space" / "my research"
        r = run_sh(ws)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertTrue((ws / ".claude" / "skills" / "triage" / "SKILL.md").is_file())
        self.assertEqual((ws / "club").resolve(), KIT.resolve())

    def test_bad_level_exits_2(self):
        r = run_sh(self.ws, level="L9")
        self.assertEqual(r.returncode, 2)
        self.assertIn("level must be L1-L5", r.stderr)
        self.assertFalse(self.ws.exists())

    def test_bad_intensity_exits_2(self):
        r = run_sh(self.ws, "--intensity", "brutal")
        self.assertEqual(r.returncode, 2)
        self.assertIn("intensity must be gentle, standard or relentless", r.stderr)

    def test_prints_next_step(self):
        r = self.install()
        self.assertIn("Open this folder in Claude Code:", r.stdout)

    def test_script_has_wao_header(self):
        self.assertTrue(has_wao_header(SH.read_text()))


if __name__ == "__main__":
    unittest.main()


PS1 = KIT / "install" / "install.ps1"
GUIDE = KIT / "install" / "SETUP-GUIDE.md"


class TestInstallPs1(unittest.TestCase):
    def test_ps1_has_wao_header(self):
        self.assertTrue(has_wao_header(PS1.read_text()))

    def test_ps1_declares_same_parameters(self):
        text = PS1.read_text()
        for p in ["$Kit", "$Workspace", "$NonInteractive", "$Name", "$Level", "$Intensity", "$Interests"]:
            self.assertIn(p, text)
        for msg in ["level must be L1-L5", "intensity must be gentle, standard or relentless",
                    "Open this folder in Claude Code:", "Read(./private-data/**)", ".COPIED",
                    "Re-run the installer after every kit update"]:
            self.assertIn(msg, text + (KIT / "install" / "claude-settings.json").read_text())

    def test_ps1_removes_links_without_recursing(self):
        text = PS1.read_text()
        self.assertNotIn("Remove-Item $link -Force -Recurse:$false", text)
        self.assertIn("[System.IO.Directory]::Delete($link)", text)

    def test_ps1_profile_is_utf8_without_bom(self):
        text = PS1.read_text()
        self.assertIn("-Encoding UTF8", text)
        self.assertIn("[System.Text.UTF8Encoding]::new($false)", text)
        self.assertNotIn("Set-Content -Path $profilePath", text)

    @unittest.skipUnless(shutil.which("pwsh"), "pwsh not installed")
    def test_ps1_parity(self):
        with tempfile.TemporaryDirectory() as tmp:
            ws = Path(tmp) / "my space" / "my research"
            r = subprocess.run(["pwsh", "-NoProfile", "-File", str(PS1), "-Kit", str(KIT), "-Workspace", str(ws),
                                "-NonInteractive", "-Name", "Test User", "-Level", "L2", "-Interests", "a,b"],
                               capture_output=True, text=True)
            self.assertEqual(r.returncode, 0, r.stderr)
            self.assertIn("intensity: gentle", (ws / "profile.md").read_text())
            self.assertTrue((ws / ".claude" / "skills" / "triage" / "SKILL.md").is_file())


class TestSetupGuide(unittest.TestCase):
    def test_setup_guide_sections(self):
        text = GUIDE.read_text()
        for h in ["## Before you start", "## Install (macOS)", "## Install (Windows)", "## First session",
                  "## Updating", "## Optional: weekly digest on a schedule", "## Setup buddy checklist"]:
            self.assertIn(h, text)
        buddy = text.split("## Setup buddy checklist", 1)[1]
        self.assertIn("constitution", buddy)
        self.assertTrue(has_wao_header(text))


class TestSetupGuidePaths(unittest.TestCase):
    # What: every kit path the guide tells members to type must exist after cloning the repo.
    # How: the guide clones the whole repo into ~/ai-club-agent (macOS) or $HOME\ai-club-agent (Windows);
    #      each path under that folder is resolved against the repo root and must exist.
    # Objective: a member copying the guide line by line never hits "No such file or directory".
    def test_guide_paths_exist_in_a_fresh_clone(self):
        import re
        text = GUIDE.read_text()
        repo = KIT.parent
        self.assertIn("~/ai-club-agent", text)
        self.assertIn("$HOME\\ai-club-agent", text)
        paths = re.findall(r"~/ai-club-agent/([\w./-]+)", text)
        paths += [p.replace("\\", "/") for p in re.findall(r"\$HOME\\ai-club-agent\\([\w.\\-]+)", text)]
        for p in ["club-agent/install/install.sh", "club-agent/install/install.ps1"]:
            self.assertIn(p, paths)
        for p in paths:
            self.assertTrue((repo / p.rstrip("/.")).exists(), f"guide path missing in repo: {p}")
