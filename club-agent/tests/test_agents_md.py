# What: Tests for AGENTS.md, the Club Agent constitution.
# How: Check required headings, fundamentals F1–F11, governance C1–C9, hard stops, routing coverage and key rules.
# Objective: The rules every skill depends on cannot silently disappear from the constitution.
import re
import unittest
from pathlib import Path

from tests._frontmatter import has_wao_header
from tests.catalog import EXPECTED_SKILLS

KIT = Path(__file__).resolve().parent.parent
HEADINGS = ["## Fundamentals", "## Missing-information protocol", "## Intensity", "## Governance",
            "## Hard stops", "## Session start", "## Session end", "## Routing", "## Files and precedence"]


def section(text, heading):
    after = text.split(heading, 1)[1]
    nxt = re.search(r"(?m)^## ", after)
    return after[: nxt.start()] if nxt else after


class TestAgentsMd(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.text = (KIT / "AGENTS.md").read_text()

    def test_all_required_headings_present(self):
        for h in HEADINGS:
            self.assertRegex(self.text, rf"(?m)^{re.escape(h)}\s*$", h)

    def test_eleven_fundamentals(self):
        for i in range(1, 12):
            self.assertRegex(self.text, rf"(?m)^### F{i}\. ", f"F{i}")

    def test_governance_c1_to_c9(self):
        gov = section(self.text, "## Governance")
        for i in range(1, 10):
            self.assertRegex(gov, rf"\bC{i}\b", f"C{i}")

    def test_hard_stops_match_spec(self):
        hs = section(self.text, "## Hard stops")
        for phrase in ["biological, chemical, radiological or nuclear harm",
                       "Self-experimentation that **intervenes** in the body",
                       "Non-invasive, observational self-measurement",
                       "Medical diagnosis or treatment claims about real people",
                       "Personalised investment advice to others",
                       "Surveillance or profiling of identifiable private individuals"]:
            self.assertIn(phrase, hs)

    def test_intensity_three_levels(self):
        it = section(self.text, "## Intensity")
        for w in ["Gentle", "Standard", "Relentless", "L1–L2", "L3", "L4–L5"]:
            self.assertIn(w, it)

    def test_routing_lists_every_skill(self):
        routing = section(self.text, "## Routing")
        for s in EXPECTED_SKILLS:
            self.assertIn(f"`{s}`", routing, s)

    def test_routing_triage_accepts_club_problem_number(self):
        routing = section(self.text, "## Routing")
        self.assertIn("club problem number", routing)
        self.assertIn("club-agent/problems/", self.text)

    def test_agents_md_handles_missing_profile(self):
        ss = section(self.text, "## Session start")
        self.assertIn("profile.md is missing or incomplete", ss)
        for q in ["name", "level", "interests", "intensity"]:
            self.assertIn(q, ss)

    def test_agents_md_private_data_rule(self):
        self.assertIn("Never read, list, or open anything under private-data/", self.text)

    def test_local_md_precedence(self):
        self.assertIn("LOCAL.md loads last and wins", self.text)

    def test_assumption_label(self):
        self.assertIn("ASSUMPTION", self.text)

    def test_digest_catch_up(self):
        ss = section(self.text, "## Session start")
        self.assertIn("digest_every_days", ss)
        self.assertIn("last_digest", ss)

    def test_member_branch_layout_and_scripts(self):
        files = section(self.text, "## Files and precedence")
        for phrase in ["member/<github-name>", "research/", "club-agent/scripts/", "save.sh", "share-pack.sh"]:
            self.assertIn(phrase, files)
        self.assertNotIn("my-research", self.text)
        self.assertNotIn("`club/", self.text)

    def test_session_start_relays_sync_and_offers_setup(self):
        ss = section(self.text, "## Session start")
        self.assertIn("Club update check:", ss)
        self.assertIn("club-agent/install/setup.sh --non-interactive --github", ss)

    def test_wao_header(self):
        self.assertTrue(has_wao_header(self.text))


if __name__ == "__main__":
    unittest.main()
