# Dry-Run Acceptance Checklist

**What:** A manual end-to-end run of the Club Agent on three problems from three different fields.
**How:** For each problem: fresh install, paste the statement from `docs/2026-11-08-frontier-problem-statements.md`, play the member, and tick each stage, noting pass/fail.
**Objective:** Prove that the same unchanged skills carry very different problems through the whole journey (spec §14), before members rely on it.

_Note: spec §14 names a protein problem. The published problem set has no protein item, so climate (#28) is used as the third field._

Setup for each problem: `bash install/install.sh --workspace /tmp/dry-<n> --non-interactive --name Tester --level L3 --interests "<field>"`, then open that folder in the Claude Code tab.

## Problem #19: Can a wrist sensor track true blood pressure?

Field: PPG / biosensing

- [ ] Stage 0: `triage` classifies it as a Frontier question, creates `problems/<slug>/`, and runs `domain-pack`; risk flags are right (health data is flagged; no medical claims; public datasets only). Pass / Fail. Notes:
- [ ] Stage 1: `where-am-i` asks ungraded questions one at a time; `frame-question` waits for the member's draft first. Pass / Fail. Notes:
- [ ] Stage 2: `field-map` logs its searches; every map row traces to `## Verified sources` with a quote; failures sit in `## Leads to check`; the teach-back is asked. Pass / Fail. Notes:
- [ ] Stage 3: `premise-check` writes `## Corrected premises` (or confirms none); `gap-map` builds a grid and the member picks the gap. Pass / Fail. Notes:
- [ ] Stage 4: `hypothesis` waits for the member's bet; `cheap-test` writes the expected result and kill criterion before running; `ethics-check` logs allow/block where triggered. Pass / Fail. Notes:
- [ ] Stage 5: `news-digest` writes `digests/<date>.md` with verified links and updates `last_digest`. Pass / Fail. Notes:
- [ ] Wrap up: `handoff` writes Done / Next / Open questions / Tool to `log.md`. Pass / Fail. Notes:
- [ ] Rules: no invented source anywhere; nothing read from `private-data/`; every file the agent wrote opens with What / How / Objective. Pass / Fail. Notes:

## Problem #7: Can banks catch mule rings together without pooling customer data?

Field: Fintech

- [ ] Stage 0: `triage` classifies it as a Frontier question, creates `problems/<slug>/`, and runs `domain-pack`; risk flags are right (money/markets and personal data are flagged). Pass / Fail. Notes:
- [ ] Stage 1: `where-am-i` asks ungraded questions one at a time; `frame-question` waits for the member's draft first. Pass / Fail. Notes:
- [ ] Stage 2: `field-map` logs its searches; every map row traces to `## Verified sources` with a quote; failures sit in `## Leads to check`; the teach-back is asked. Pass / Fail. Notes:
- [ ] Stage 3: `premise-check` writes `## Corrected premises` (or confirms none); `gap-map` builds a grid and the member picks the gap. Pass / Fail. Notes:
- [ ] Stage 4: `hypothesis` waits for the member's bet; `cheap-test` writes the expected result and kill criterion before running; `ethics-check` logs allow/block where triggered. Pass / Fail. Notes:
- [ ] Stage 5: `news-digest` writes `digests/<date>.md` with verified links and updates `last_digest`. Pass / Fail. Notes:
- [ ] Wrap up: `handoff` writes Done / Next / Open questions / Tool to `log.md`. Pass / Fail. Notes:
- [ ] Rules: no invented source anywhere; nothing read from `private-data/`; every file the agent wrote opens with What / How / Objective. Pass / Fail. Notes:

## Problem #28: How much carbon does crushed rock really remove?

Field: Climate / carbon removal

- [ ] Stage 0: `triage` classifies it as a Frontier question, creates `problems/<slug>/`, and runs `domain-pack`; risk flags are right (no special risk flags expected beyond C1). Pass / Fail. Notes:
- [ ] Stage 1: `where-am-i` asks ungraded questions one at a time; `frame-question` waits for the member's draft first. Pass / Fail. Notes:
- [ ] Stage 2: `field-map` logs its searches; every map row traces to `## Verified sources` with a quote; failures sit in `## Leads to check`; the teach-back is asked. Pass / Fail. Notes:
- [ ] Stage 3: `premise-check` writes `## Corrected premises` (or confirms none); `gap-map` builds a grid and the member picks the gap. Pass / Fail. Notes:
- [ ] Stage 4: `hypothesis` waits for the member's bet; `cheap-test` writes the expected result and kill criterion before running; `ethics-check` logs allow/block where triggered. Pass / Fail. Notes:
- [ ] Stage 5: `news-digest` writes `digests/<date>.md` with verified links and updates `last_digest`. Pass / Fail. Notes:
- [ ] Wrap up: `handoff` writes Done / Next / Open questions / Tool to `log.md`. Pass / Fail. Notes:
- [ ] Rules: no invented source anywhere; nothing read from `private-data/`; every file the agent wrote opens with What / How / Objective. Pass / Fail. Notes:

## Result

| Problem | Stages passed | Blocking issues |
| ------- | ------------- | --------------- |
| #19     | /6            |                 |
| #7      | /6            |                 |
| #28     | /6            |                 |
