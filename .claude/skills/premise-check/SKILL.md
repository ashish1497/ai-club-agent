---
name: premise-check
description: Use when the field map exists and the assumptions inside the problem statement or the member's framing need testing against the evidence.
metadata:
  origin: adapted
  stage: "3"
  source: https://github.com/K-Dense-AI/claude-scientific-skills@a25cf9ec00e2745d03f8704acf6f6919694ccd9a
---

**What:** Test the hidden assumptions in the problem statement and in the member's framing.
**How:** List each assumption, check it against verified field-map rows, and record which are supported, contested, wrong or unknown.
**Objective:** Catch a wrong premise before it costs weeks (F6).

_Adapted from K-Dense `scientific-critical-thinking` (MIT)._

Reads intensity from profile.md.

## Steps

1. Extract every assumption from `brief.md` `## Statement` and `## My framing`: about what is possible, what causes what, what has been tried, and who the users are.
2. Classify each one as a descriptive, associational, predictive or causal claim. Don't let an association pass as a cause.
3. Check each against `field-map.md` rows, citing row numbers:
   - **supported:** verified rows agree
   - **contested:** verified rows disagree
   - **wrong:** verified rows contradict it; give the corrected version
   - **unknown:** not found in this search; say exactly that
4. Be constructive and proportionate. Separate a fatal flaw from a minor limitation, and say what evidence would settle each open one.
5. **Relentless:** also argue the strongest case _against_ the member's preferred framing.
6. Show the member the corrections, then write them in.

## Output

- `research/problems/<slug>/brief.md` (`## Corrected premises`)
- `research/problems/<slug>/log.md`: milestone `premise corrected` (if any were corrected)

## Exit check

Every assumption has a status with cited rows, and the member has acknowledged the corrections.
