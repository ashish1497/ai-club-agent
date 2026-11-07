# What: Structural tests for the Club Agent kit root (required files, fundamentals, test helpers).
# How: Plain unittest assertions against files on disk and the helper functions in tests/.
# Objective: Catch a broken or incomplete kit before any student installs it.
import re
import unittest
from pathlib import Path

from tests._frontmatter import parse_frontmatter, has_wao_header
from tests.catalog import EXPECTED_SKILLS, ORIGIN

KIT = Path(__file__).resolve().parent.parent


class TestStructure(unittest.TestCase):
    def test_required_root_files_exist(self):
        for name in ["README.md", "CHANGELOG.md", "FUNDAMENTALS.md", "CLAUDE.md"]:
            self.assertTrue((KIT / name).is_file(), name)

    def test_claude_md_imports_agents(self):
        self.assertEqual((KIT / "CLAUDE.md").read_text().strip(), "@AGENTS.md")

    def test_fundamentals_has_eleven(self):
        text = (KIT / "FUNDAMENTALS.md").read_text()
        for i in range(1, 12):
            self.assertRegex(text, rf"(?m)^## {i}\. ", f"## {i}.")
        eleven = text.split("## 11.", 1)[1]
        self.assertIn("What / How / Objective", eleven)

    def test_frontmatter_parser(self):
        fm, body = parse_frontmatter("---\nname: x\nmetadata:\n  origin: custom\n---\nbody")
        self.assertEqual(fm, {"name": "x", "metadata": {"origin": "custom"}})
        self.assertEqual(body, "body")
        with self.assertRaises(ValueError):
            parse_frontmatter("no frontmatter here")

    def test_wao_header(self):
        self.assertTrue(has_wao_header("**What:** a\n**How:** b\n**Objective:** c"))
        self.assertTrue(has_wao_header("<!-- What: a -->\n<!-- How: b -->\n<!-- Objective: c -->"))
        self.assertTrue(has_wao_header("# What: a\n# How: b\n# Objective: c"))
        self.assertFalse(has_wao_header("**What:** a\n**How:** b"))

    def test_catalog_shape(self):
        self.assertEqual(len(EXPECTED_SKILLS), 20)
        self.assertEqual(len(set(EXPECTED_SKILLS)), 20)
        self.assertEqual(set(ORIGIN), set(EXPECTED_SKILLS))
        self.assertEqual(set(ORIGIN.values()), {"custom", "adapted", "vendored"})

    def test_dry_run_covers_three_fields(self):
        text = (KIT / "DRY-RUN.md").read_text()
        self.assertTrue(has_wao_header(text))
        for problem in ["#19", "#7", "#28"]:
            self.assertIn(problem, text)
            block = text.split(f"## Problem {problem}", 1)[1].split("## Problem", 1)[0]
            for stage in range(6):
                self.assertRegex(block, rf"(?m)^- \[ \] Stage {stage}\b", f"{problem} stage {stage}")


if __name__ == "__main__":
    unittest.main()
