---
id: "04"
title: "How do you price software that does the work?"
industry: saas-b2b
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "None beyond the core rules"
last_verified: 2026-11-08
level_fit: L2–L5
effort: month
skills: "financial modelling, pricing analysis, contract and incentive reasoning, buyer interviews"
---

**What:** How should a vendor price an AI agent when outcomes are produced jointly with humans, attribution is disputed, and its own compute costs are unpredictable?
**How:** Theory: principal–agent theory and contract design. Practice (no lab): model outcome-based pricing for an Indian SaaS firm and stress-test it against buyer behaviour.
**Objective:** Seat-based pricing breaks when agents replace seats; this decides how AI software companies earn.

# 04. How do you price software that does the work?

## The open question

How should a vendor price an AI agent when outcomes are produced jointly with humans, attribution is disputed, and its own compute costs are unpredictable?

## Why it matters

Seat-based pricing breaks when agents replace seats; this decides how AI software companies earn.

## Who cares

- Pricing or monetisation lead at an Indian SaaS company selling AI agents
- CFO or procurement head at a buyer evaluating agent contracts
- Founder of an AI agent startup choosing a business model

## In scope

- Seat, usage, per-action and outcome-based pricing for AI agents
- How vendors define and count a billable outcome
- Attribution of outcomes produced jointly by agents and humans
- Effect of variable compute cost on vendor margin under each model

## Out of scope

- Legal drafting of real customer contracts
- Using confidential pricing or revenue data from a real firm without permission
- Setting prices for a live product
- Investment advice on SaaS companies

## What is known

- Intercom charges $0.99 per outcome for its Fin AI agent, counting an outcome when the customer confirms resolution, stops asking for help, or Fin completes a workflow. ([Intercom pricing](https://www.intercom.com/pricing))
- Salesforce Agentforce offers $2 per conversation, Flex Credits at $500 per 100k credits (about $0.10 per standard action), and per-user licences, and conversations and Flex Credits cannot be mixed in one org. ([Salesforce Agentforce pricing](https://www.salesforce.com/agentforce/pricing/))
- In August 2024 Zendesk announced outcome-based pricing under which customers pay only for issues resolved autonomously by its AI agents. ([Zendesk newsroom: outcome-based pricing](https://www.zendesk.com/newsroom/articles/zendesk-outcome-based-pricing/))

## What is unknown

- Contract theory for attributing outcomes between agent and human.
- How vendors prove the value delivered.

## Key terms

- **Seat-based pricing**: Charging per human user per month, regardless of how much work the software does.
- **Usage-based pricing**: Charging per unit consumed, such as conversations, actions or credits.
- **Outcome-based pricing**: Charging only when a defined result is achieved, such as a resolved ticket.
- **Attribution**: Deciding how much of a result was caused by the agent versus humans or other systems.
- **Principal-agent problem**: When one party acts for another but has different incentives and the other cannot fully observe its effort.

## Possible angles

- **Theory:** principal–agent theory and contract design
- **Practice (no lab):** model outcome-based pricing for an Indian SaaS firm and stress-test it against buyer behaviour

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                   | Type   | Link                                                                     |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------ |
| Intercom Fin pricing page                  | report | https://www.intercom.com/pricing                                         |
| Salesforce Agentforce pricing page         | report | https://www.salesforce.com/agentforce/pricing/                           |
| Zendesk outcome-based pricing announcement | report | https://www.zendesk.com/newsroom/articles/zendesk-outcome-based-pricing/ |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Indian SaaS firms selling to the US face this shift directly.

## Funding evidence

| Funder / company | What                                                      | Date    | Link                                                                                                                     | Evidence |
| ---------------- | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| Paid             | $21.6M seed led by Lightspeed, with EQT Ventures and FUSE | 2025-09 | https://techcrunch.com/2025/09/28/paid-the-ai-agent-results-based-billing-startup-from-manny-medina-raises-huge-21m-seed | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- None beyond the core rules.

## Leads to check

Not verified when this file was written; never treat as fact.

- Holmstrom (1979) Moral Hazard and Observability, Bell Journal of Economics, as theory starting point (JSTOR page did not load)
- Bessemer AI pricing and monetization playbook (2026) (Only secondary summaries seen; original not opened)
