---
name: gap-map
description: Use when the field map is verified and the member needs to see where knowledge runs out, then choose which gap to pursue.
metadata:
  origin: custom
  stage: "3"
---

**What:** Map where current knowledge stops, and let the member choose where to push.
**How:** Build a grid from the verified field map. Empty or contested cells, plus assumptions everyone holds, become ranked open questions.
**Objective:** Point the member's effort at the genuinely unknown.

Reads intensity from profile.md.

## Steps

1. Choose two axes that fit the problem, such as approaches × outcomes, populations × measures or questions × evidence type. Propose them and let the member change them.
2. Fill each cell from `field-map.md` rows only, citing row numbers. Mark each cell:
   - `●` established
   - `◐` contested
   - `○` nothing found
3. List 3–5 **assumptions everyone in the field holds** that the map doesn't actually prove.
4. Turn the `○` cells, `◐` cells and assumptions into open questions. Rank them by importance to the member's framing and by feasibility without a lab.
5. Ask the member to pick one and say why. Don't pick for them. If they say "just pick", pick, mark it `AI-written`, and give your reason.

## Output

- `research/problems/<slug>/gaps.md` (all four sections)
- `research/problems/<slug>/log.md`: milestone `gap chosen`

## Exit check

`## Gap I chose (and why)` is filled in the member's words.
