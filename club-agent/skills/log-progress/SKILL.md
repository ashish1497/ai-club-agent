---
name: log-progress
description: Use when a milestone happens on a problem: a question sharpened, a premise corrected, a map verified, a gap chosen, a bet written or killed, a dataset found, a test run, an expert spoken to, or a prototype built.
metadata:
  origin: custom
  stage: "any"
---

**What:** Record a milestone in the problem's log.
**How:** Add one dated row using only the 10 milestone types.
**Objective:** Make progress visible even when no final answer exists. A killed bet is progress.

## Steps

1. Pick the milestone type. Use only these:
   - question sharpened
   - premise corrected
   - field map verified
   - gap chosen
   - bet written
   - bet killed
   - dataset found
   - test run
   - expert spoken to
   - prototype built
2. Add a row with the date, the type and a one-line note in the member's terms.
3. Every third milestone, show the member the last few in one line ("3 milestones this week: …").

## Output

- `problems/<slug>/log.md` (`## Milestones` row)

## Exit check

The row exists with a valid type and today's date.
