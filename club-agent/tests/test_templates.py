# What: Tests for the student workspace, problem and domain-pack templates.
# How: Check each template exists, opens with What/How/Objective, and carries the exact tokens skills rely on.
# Objective: Skills and the installer can depend on fixed headings, columns and placeholders.
import unittest
from pathlib import Path

from tests._frontmatter import has_wao_header

KIT = Path(__file__).resolve().parent.parent
T = KIT / "templates"

WORKSPACE = ["AGENTS.md", "CLAUDE.md", "LOCAL.md", "profile.md", "watchlist.md"]
PROBLEM = ["brief.md", "glossary.md", "field-map.md", "sources.md", "gaps.md", "bets.md", "log.md", "tests/README.md"]
EVIDENCE = ["human study", "animal", "bench", "simulation", "preprint", "industry claim", "news", "opinion"]
CONFIDENCE = ["established", "contested", "unknown"]
MILESTONES = ["question sharpened", "premise corrected", "field map verified", "gap chosen", "bet written",
              "bet killed", "dataset found", "test run", "expert spoken to", "prototype built"]


def read(*p):
    return (T.joinpath(*p)).read_text()


class TestTemplates(unittest.TestCase):
    def all_paths(self):
        return ([T / "workspace" / f for f in WORKSPACE] + [T / "problem" / f for f in PROBLEM]
                + [T / "domain-pack.md"])

    def test_all_templates_exist(self):
        for p in self.all_paths():
            self.assertTrue(p.is_file(), p)

    def test_every_template_has_wao_header(self):
        for p in self.all_paths():
            if p.name == "CLAUDE.md":
                continue  # must be exactly two import lines; documented in LOCAL.md instead
            self.assertTrue(has_wao_header(p.read_text()), p)

    def test_field_map_header_exact(self):
        rows = [[c.strip() for c in line.strip().strip("|").split("|")]
                for line in read("problem", "field-map.md").splitlines() if line.strip().startswith("|")]
        self.assertIn(["#", "Claim", "Source", "Evidence type", "Confidence", "Date"], rows)

    def test_field_map_lists_evidence_types_and_confidence(self):
        text = read("problem", "field-map.md")
        for word in EVIDENCE + CONFIDENCE:
            self.assertIn(word, text)

    def test_sources_sections(self):
        text = read("problem", "sources.md")
        for h in ["## Search log", "## Verified sources", "## Leads to check"]:
            self.assertIn(h, text)

    def test_bets_statuses(self):
        text = read("problem", "bets.md")
        for s in ["open", "confirmed", "killed", "refined"]:
            self.assertIn(s, text)

    def test_log_sections_and_milestones(self):
        text = read("problem", "log.md")
        self.assertIn("## Milestones", text)
        self.assertIn("## Handoffs", text)
        for m in MILESTONES:
            self.assertIn(m, text)

    def test_brief_sections(self):
        text = read("problem", "brief.md")
        for h in ["## Statement", "## Type", "## Fields", "## Risk flags", "## My framing",
                  "## What counts as an answer", "## What counts as progress", "## Corrected premises"]:
            self.assertIn(h, text)

    def test_domain_pack_sections(self):
        text = read("domain-pack.md")
        for h in ["## Where knowledge lives", "## Data to test with", "## Who decides", "## Connectors",
                  "## News feeds", "## Starter glossary", "## Field risk rules"]:
            self.assertIn(h, text)

    def test_profile_placeholders(self):
        text = read("workspace", "profile.md")
        for ph in ["{{NAME}}", "{{LEVEL}}", "{{INTENSITY}}", "{{INTERESTS}}"]:
            self.assertIn(ph, text)
        for key in ["name:", "level:", "intensity:", "interests:", "digest_every_days: 7",
                    "last_digest: never", "active_problem:"]:
            self.assertIn(key, text)

    def test_workspace_claude_md_exact(self):
        lines = read("workspace", "CLAUDE.md").strip().splitlines()
        self.assertEqual(lines[:2], ["@club/AGENTS.md", "@LOCAL.md"])
        self.assertIn("constitution", "\n".join(lines[2:]))

    def test_codex_stub_points_to_club(self):
        self.assertIn("Before anything else, read club/AGENTS.md, then LOCAL.md. LOCAL.md wins on conflict.",
                      read("workspace", "AGENTS.md"))


if __name__ == "__main__":
    unittest.main()
