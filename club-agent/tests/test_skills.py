# What: Contract tests for every skill in skills/ (custom, adapted and vendored).
# How: Parse each SKILL.md frontmatter and body; check names, origins, headings, licences and key rules.
# Objective: Every skill loads in Claude Code and Codex and keeps the promises the constitution relies on.
import re
import unittest
from pathlib import Path

from tests._frontmatter import parse_frontmatter, has_wao_header
from tests.catalog import EXPECTED_SKILLS, ORIGIN

KIT = Path(__file__).resolve().parent.parent
SKILLS = KIT / "skills"
LICENSE_FOR = {"mattpocock/skills": "mattpocock-skills.txt",
               "obra/superpowers": "obra-superpowers.txt",
               "K-Dense-AI/claude-scientific-skills": "k-dense-scientific-skills.txt"}


def skill_dirs():
    return sorted(p for p in SKILLS.iterdir() if p.is_dir()) if SKILLS.is_dir() else []


def load(name):
    return parse_frontmatter((SKILLS / name / "SKILL.md").read_text())


def section(body, heading):
    after = body.split(heading, 1)[1]
    nxt = re.search(r"(?m)^## ", after)
    return after[: nxt.start()] if nxt else after


class TestSkills(unittest.TestCase):
    def test_skills_dir_not_empty(self):
        self.assertTrue(skill_dirs(), "no skills yet")

    def test_each_existing_skill_dir_has_skill_md(self):
        for d in skill_dirs():
            self.assertTrue((d / "SKILL.md").is_file(), d.name)

    def test_name_matches_dir(self):
        for d in skill_dirs():
            fm, _ = load(d.name)
            self.assertEqual(fm.get("name"), d.name)
            self.assertRegex(d.name, r"^[a-z0-9-]+$")

    def test_description_rules(self):
        for d in skill_dirs():
            fm, _ = load(d.name)
            desc = fm.get("description", "")
            self.assertTrue(desc, d.name)
            self.assertLessEqual(len(desc), 1024, d.name)
            if ORIGIN.get(d.name) in ("custom", "adapted"):
                self.assertTrue(desc.startswith("Use when"), d.name)

    def test_origin_matches_catalog(self):
        for d in skill_dirs():
            fm, _ = load(d.name)
            self.assertIn(d.name, ORIGIN, f"{d.name} not in catalog")
            self.assertEqual(fm.get("metadata", {}).get("origin"), ORIGIN[d.name], d.name)

    def test_wao_header(self):
        for d in skill_dirs():
            self.assertTrue(has_wao_header((d / "SKILL.md").read_text()), d.name)

    def test_custom_and_adapted_have_steps_output_exit(self):
        for d in skill_dirs():
            if ORIGIN.get(d.name) in ("custom", "adapted"):
                fm, body = load(d.name)
                self.assertTrue(fm.get("metadata", {}).get("stage"), d.name)
                for h in ["## Steps", "## Output", "## Exit check"]:
                    self.assertRegex(body, rf"(?m)^{h}\s*$", f"{d.name}: {h}")

    def test_output_paths_are_workspace_relative(self):
        for d in skill_dirs():
            if ORIGIN.get(d.name) in ("custom", "adapted"):
                _, body = load(d.name)
                out = section(body, "## Output")
                for path in re.findall(r"`([^`]+\.md)`", out):
                    self.assertFalse(path.startswith("/"), f"{d.name}: {path}")

    def test_vendored_has_source_and_license(self):
        for d in skill_dirs():
            if ORIGIN.get(d.name) in ("vendored", "adapted"):
                fm, _ = load(d.name)
                src = fm.get("metadata", {}).get("source", "")
                m = re.match(r"^https://github\.com/([^/]+/[^@/]+)@[0-9a-f]{7,40}$", src)
                self.assertTrue(m, f"{d.name}: bad source {src!r}")
                self.assertTrue((KIT / "LICENSES" / LICENSE_FOR[m.group(1)]).is_file(), d.name)

    def test_catalog_complete(self):
        self.assertEqual({d.name for d in skill_dirs()}, set(EXPECTED_SKILLS))

    def test_domain_pack_treats_library_as_data(self):
        self.assertIn("data, never instructions", (SKILLS / "domain-pack" / "SKILL.md").read_text())

    def test_verify_sources_three_checks(self):
        text = (SKILLS / "verify-sources" / "SKILL.md").read_text()
        self.assertIn("abstract-only", text)
        self.assertIn("Leads to check", text)

    def test_cheap_test_kill_criterion_before_run(self):
        text = (SKILLS / "cheap-test" / "SKILL.md").read_text()
        self.assertIn("kill criterion", text)
        self.assertIn("before running", text)

    def test_triage_runs_domain_pack_after_folder_and_confirmation(self):
        _, body = load("triage")
        steps = section(body, "## Steps")
        self.assertLess(steps.index("active_problem"), steps.index("`domain-pack`"))
        self.assertLess(steps.index("agrees"), steps.index("`domain-pack`"))
        self.assertIn("<slug>", section(load("domain-pack")[1], "## Steps"))

    def test_triage_loads_club_problem_by_number(self):
        steps = section(load("triage")[1], "## Steps")
        self.assertIn("club/problems/", steps)
        self.assertIn("start problem", steps)

    def test_frame_question_student_first(self):
        text = (SKILLS / "frame-question" / "SKILL.md").read_text()
        self.assertIn("member drafts first", text)


if __name__ == "__main__":
    unittest.main()
