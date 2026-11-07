---
name: ethics-check
description: Use when a planned test or action touches people, personal data, money or markets, biology or chemistry, scraping, or outreach. Gate that allows or blocks, with reasons.
metadata:
  origin: custom
  stage: "4"
---

**What:** A gate that allows or blocks a planned test or action.
**How:** Check it against the Hard stops, governance C1–C9, and the field risk rules from the domain packs. Record the decision.
**Objective:** Members can push hard on frontier problems without harming people or themselves, or breaking the law.

## Steps

1. Restate the planned action in one line.
2. **Hard stops** (AGENTS.md): if any applies, the result is **block**. Name the rule and suggest talking to a faculty mentor. Don't offer workarounds that reach the same end.
3. **Governance**, checked in order:
   - **C4/C5:** Does it collect personal data? Is there explicit, specific consent? Does raw data go only to `private-data/`? Does it need a faculty sponsor or ethics committee?
   - **C6:** Outreach is drafted by the agent and sent by the member, with no mass messaging.
   - **C7:** Site terms and robots.txt are respected; no paywalled content.
   - **C8:** Is disclosure needed?
4. **Field rules:** apply every rule in the relevant `domains/<field>.md ## Field risk rules`.
5. Decide:
   - **allow**
   - **allow with conditions** (list them)
   - **block** (give the reason and the route: faculty mentor or ethics committee)

## Output

- `problems/<slug>/log.md`: under `## Milestones`, a row `| <date> | ethics-check: allow|block | <action>; <rules applied>; <conditions> |`

## Exit check

A decision is recorded. On a block, no part of the blocked action proceeds.
