---
name: field-map
description: Use when the member's framing is approved and they need the current state of knowledge - who has tried what, what failed, what is established, contested or unknown - with every source verified.
metadata:
  origin: adapted
  stage: "2"
  source: https://github.com/K-Dense-AI/claude-scientific-skills@a25cf9ec00e2745d03f8704acf6f6919694ccd9a
---

**What:** A lightweight scoping review: what is known, contested and unknown about the member's questions.
**How:** Search with logged queries, screen the results, extract claims into the field-map table, verify every source, then explain the map at the member's level.
**Objective:** Get the member to the edge of current knowledge in hours, not weeks, with nothing invented (F5, C1).

_Adapted from K-Dense `literature-review` (MIT) and the PRISMA-ScR scoping-review method, cut down for student use._

Reads intensity from profile.md.

## Steps

1. **Plan.** From `brief.md`, write 2–4 search strings per sub-question, including synonyms and the field's terms from `glossary.md`. Choose sources from `research/domains/<field>.md ## Where knowledge lives`, and include preprints.
2. **Search.** Log every search (date, where, string, result count) in `sources.md ## Search log`. Cap each pass by intensity: **Gentle 8**, **Standard 12**, **Relentless 20** sources.
   - If the member pastes output from a deep-research tool, treat every claim in it as unverified input.
3. **Screen.** Use the title and abstract against the sub-questions, and note why anything is excluded. Don't decide eligibility by citation count.
4. **Extract.** One row per claim in `field-map.md`: `| # | Claim | Source | Evidence type | Confidence | Date |`.
   - Cover: who is working on it (academia, companies, funders), what has been tried, what failed and why, the current best attempt, and what regulators say.
5. **Verify.** Run `verify-sources` in batches of 5 **before** showing any row. Rows whose source fails are removed from the map.
6. **Label.** Evidence type is one of the 8 template values. Confidence:
   - `established`: several independent verified sources agree
   - `contested`: verified sources disagree
   - `unknown`: searched and not found within this search; say so, and never claim "no prior work exists"
7. **Explain.** Group the findings by theme, not paper by paper, at the member's level. Start with the misconceptions `where-am-i` recorded. Run `glossary` for new terms.
8. **Teach-back.** Ask the member to explain the current state in their own words. Point out gaps, then loop back to step 2 or move on.

## Output

- `research/problems/<slug>/field-map.md`
- `research/problems/<slug>/sources.md` (search log; verified list via `verify-sources`)
- `research/problems/<slug>/log.md`: milestone `field map verified`

## Exit check

Every row in `field-map.md` traces to a source in `## Verified sources`, and the member's teach-back covers known, contested and unknown.
