---
name: cheap-test
description: Use when a bet needs testing. Designs the smallest test that could move it, with expected result and kill criterion written before running.
metadata:
  origin: custom
  stage: "4"
---

**What:** Design and record the smallest test that could confirm, kill or refine one bet.
**How:** Pick the cheapest test type, write the expected result and kill criterion, gate it through ethics-check, run it, and record the result.
**Objective:** Small steps, fast feedback (F8). A test whose outcome was decided in advance can't fool anyone.

Reads intensity from profile.md.

## Steps

1. Take one bet from `bets.md` with status `open`.
2. Pick the cheapest test that could move it:
   - public-dataset analysis
   - observational phone or wearable measurement (non-invasive only)
   - checking the literature for contradictions
   - simulation
   - small prototype
   - survey
   - expert conversation
3. Write the test file **before running**, with these sections:
   - **What / How / Objective**
   - **Expected result**
   - **Kill criterion** (the result that would kill or weaken the bet)
   - **Data** (de-identified only; raw personal data stays in `private-data/`)
   - **Time box**
4. If the test touches people, personal data, money, biology or chemistry, scraping or outreach, run `ethics-check` first. If it blocks, stop.
5. If the test needs software, hand off to build mode (`to-spec`), with the member designing the inputs, outputs and checks.
6. Run the test, or guide the member to run it. Record the actual result next to the expected one.
7. Update the bet's status in `bets.md` (confirmed / killed / refined), and update `field-map.md` if the result changes a claim.

## Output

- `problems/<slug>/tests/<YYYY-MM-DD>-<name>.md`
- `problems/<slug>/bets.md` (status)
- `problems/<slug>/log.md`: milestone `test run` (and `bet killed` if killed)

## Exit check

The test file has the expected result and the kill criterion dated before the result, and the bet's status has been updated.
