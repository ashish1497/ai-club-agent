# What: Tests for the club problem-statement library in problems/<industry>/<NN>-<slug>.md.
# How: Check folder layout, front matter schema, required sections, funding evidence and the README index.
# Objective: Every problem a member picks up is clearly and consistently defined, and contributors follow one structure.
import re
import unittest
from pathlib import Path

from tests._frontmatter import parse_frontmatter, has_wao_header

KIT = Path(__file__).resolve().parent.parent
PROBLEMS = KIT / "problems"
TEMPLATE = KIT / "templates" / "problem-statement.md"

INDUSTRIES = ["saas-b2b", "fintech", "ecommerce-retail", "marketing-adtech", "logistics",
              "healthtech", "edtech", "real-estate", "legal", "frontier-science"]
KEYS = ["id", "title", "industry", "seat", "status", "funding_strength", "risk_flags", "last_verified",
        "level_fit", "effort", "skills"]
SECTIONS = ["## The open question", "## Why it matters", "## Who cares", "## In scope", "## Out of scope",
            "## What is known", "## What is unknown", "## Key terms", "## Possible angles", "## Starting points",
            "## India angle", "## Funding evidence", "## Risk flags"]
URL = re.compile(r"https?://[^\s)>|]+")


def section(body, heading):
    return body.split(heading, 1)[1].split("\n## ", 1)[0]


def table_rows(text):
    return [[c.strip() for c in r.strip().strip("|").split("|")]
            for r in text.splitlines() if r.strip().startswith("|") and not re.match(r"^\|\s*-", r.strip())][1:]


def problem_files():
    return sorted(PROBLEMS.glob("*/*.md")) if PROBLEMS.is_dir() else []


class TestProblems(unittest.TestCase):
    def test_template_has_schema_and_sections(self):
        text = TEMPLATE.read_text()
        self.assertTrue(has_wao_header(text))
        fm, _ = parse_frontmatter(text)
        for k in KEYS:
            self.assertIn(k, fm)
        for h in SECTIONS:
            self.assertIn(h, text)

    def test_thirty_problems(self):
        self.assertEqual(len(problem_files()), 30)

    def test_only_known_industry_folders(self):
        for d in PROBLEMS.iterdir():
            if d.is_dir():
                self.assertIn(d.name, INDUSTRIES, d.name)

    def test_filename_and_front_matter(self):
        ids = []
        for f in problem_files():
            self.assertRegex(f.name, r"^\d{2}-[a-z0-9-]+\.md$", f)
            fm, _ = parse_frontmatter(f.read_text())
            for k in KEYS:
                self.assertTrue(fm.get(k), f"{f}: {k}")
            self.assertEqual(fm["id"], f.name[:2], f)
            self.assertEqual(fm["industry"], f.parent.name, f)
            self.assertIn(fm["seat"], ["form-weighted", "frontier-wildcard"], f)
            self.assertIn(fm["status"], ["open", "in-progress", "retired"], f)
            self.assertIn(fm["funding_strength"], ["strong", "medium", "weak"], f)
            self.assertRegex(fm["last_verified"], r"^\d{4}-\d{2}-\d{2}$", f)
            self.assertRegex(fm["level_fit"], r"^L[1-5](–L[1-5])?$", f)
            self.assertIn(fm["effort"], ["weekend", "month", "semester"], f)
            ids.append(fm["id"])
        self.assertEqual(len(ids), len(set(ids)))

    def test_six_frontier_wildcards(self):
        seats = [parse_frontmatter(f.read_text())[0]["seat"] for f in problem_files()]
        self.assertEqual(seats.count("frontier-wildcard"), 6)

    def test_sections_and_header(self):
        for f in problem_files():
            text = f.read_text()
            self.assertTrue(has_wao_header(text), f)
            for h in SECTIONS:
                self.assertRegex(text, rf"(?m)^{re.escape(h)}\s*$", f"{f}: {h}")

    def test_funding_evidence_matches_strength(self):
        for f in problem_files():
            fm, body = parse_frontmatter(f.read_text())
            table = body.split("## Funding evidence", 1)[1].split("\n## ", 1)[0]
            rows = [r for r in table.splitlines() if r.startswith("|") and not re.match(r"^\|\s*-", r)][1:]
            self.assertTrue(rows, f"{f}: no funding rows")
            tags = [r.strip().strip("|").split("|")[-1].strip() for r in rows]
            for t in tags:
                self.assertIn(t, ["verified", "secondary", "unverified"], f)
            if fm["funding_strength"] == "strong":
                self.assertIn("verified", tags, f)

    def test_every_known_claim_has_a_source_link(self):
        for f in problem_files():
            _, body = parse_frontmatter(f.read_text())
            bullets = [l for l in section(body, "## What is known").splitlines() if l.startswith("- ")]
            self.assertGreaterEqual(len(bullets), 2, f)
            for b in bullets:
                self.assertRegex(b, URL, f"{f}: unsourced known claim: {b}")

    def test_funding_rows_have_links(self):
        for f in problem_files():
            _, body = parse_frontmatter(f.read_text())
            for row in table_rows(section(body, "## Funding evidence")):
                self.assertRegex(" ".join(row), URL, f"{f}: funding row without link")

    def test_starting_points_have_links(self):
        for f in problem_files():
            _, body = parse_frontmatter(f.read_text())
            rows = table_rows(section(body, "## Starting points"))
            self.assertGreaterEqual(len(rows), 2, f)
            for row in rows:
                self.assertRegex(" ".join(row), URL, f)

    def test_scope_who_cares_and_terms_filled(self):
        for f in problem_files():
            _, body = parse_frontmatter(f.read_text())
            for h, minimum in [("## Who cares", 1), ("## In scope", 2), ("## Out of scope", 2), ("## Key terms", 3)]:
                bullets = [l for l in section(body, h).splitlines() if l.startswith("- ")]
                self.assertGreaterEqual(len(bullets), minimum, f"{f}: {h}")

    def test_readme_indexes_every_problem(self):
        readme = (PROBLEMS / "README.md").read_text()
        self.assertTrue(has_wao_header(readme))
        for f in problem_files():
            self.assertIn(f"{f.parent.name}/{f.name}", readme, f)


if __name__ == "__main__":
    unittest.main()
