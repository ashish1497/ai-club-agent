---
id: "06"
title: "When your AI agent spends your money, who is liable?"
industry: fintech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "RBI authentication rules; Consumer protection"
last_verified: 2026-11-08
level_fit: L2–L5
effort: month
skills: "policy reading, user interviews, service and flow design, payments domain research"
---

**What:** How do you prove a user authorised a specific purchase made by their AI agent, verify the agent's identity and mandate, and decide who pays when it errs or is manipulated?
**How:** Theory: mandate theory for non-human agents. Practice (no lab): design spending caps, revocation and dispute flows that fit UPI, and test them with users.
**Objective:** Agents are starting to transact; consent, identity and liability rules will decide whether people trust them.

# 06. When your AI agent spends your money, who is liable?

## The open question

How do you prove a user authorised a specific purchase made by their AI agent, verify the agent's identity and mandate, and decide who pays when it errs or is manipulated?

## Why it matters

Agents are starting to transact; consent, identity and liability rules will decide whether people trust them.

## Who cares

- Product head for agentic payments at a payment aggregator or bank
- Risk, fraud and dispute-operations lead at a UPI issuer bank
- Policy analyst at a payments regulator or industry body

## In scope

- Proving that a user authorised a specific agent-made purchase
- Agent identity, mandates, spending caps and revocation
- Allocation of loss when an agent errs or is manipulated
- Fit with UPI features and RBI authentication and customer-protection rules

## Out of scope

- Moving real money or running live transactions
- Legal advice or formal liability opinions
- Building a payment app or connecting to production UPI
- Fraud techniques or ways to bypass authentication

## What is known

- NPCI, Razorpay and OpenAI announced a pilot in October 2025 letting users shop and pay via UPI inside ChatGPT, using UPI Reserve Pay and UPI Circle, with Axis Bank and Airtel Payments Bank. ([TechCrunch: India pilots AI chatbot-led e-commerce](https://techcrunch.com/2025/10/09/india-pilots-ai-chatbot-led-e-commerce-with-chatgpt-gemini-claude-in-the-mix/))
- RBI's Directions on Authentication Mechanisms for Digital Payment Transactions (September 2025) require at least two-factor authentication, with compliance due by 1 April 2026. ([RBI press release: Directions on Authentication Mechanisms for Digital Payment Transactions](https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=61282))
- Under RBI's 2017 customer-protection circular, a customer has zero liability for an unauthorised electronic transaction caused by a third-party breach if reported within three working days. ([RBI: Customer Protection - Limiting Liability of Customers in Unauthorised Electronic Banking Transactions](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11040))
- Google's Agent Payments Protocol (AP2) uses cryptographically signed Intent and Cart Mandates to create a non-repudiable audit trail of what the user authorised an agent to buy. ([Google Cloud: Announcing the Agent Payments Protocol (AP2)](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol))

## What is unknown

- Agent identity and mandate standards.
- Dispute and liability allocation.
- Fraud baselines at real volume.

## Key terms

- **Mandate**: A user's recorded instruction authorising an agent or merchant to pay within set limits.
- **Agentic token**: A payment credential issued for a specific AI agent instead of the raw card or account number.
- **Know Your Agent (KYA)**: Checking who deployed an agent, whom it represents and what it is permitted to do.
- **Two-factor authentication**: Confirming a payment with two different kinds of proof, such as a device and a PIN.
- **Chargeback or dispute**: The process by which a customer contests a payment and the loss is assigned to someone.

## Possible angles

- **Theory:** mandate theory for non-human agents
- **Practice (no lab):** design spending caps, revocation and dispute flows that fit UPI, and test them with users

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                               | Type      | Link                                                                                                                                                         |
| ------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AP2 Agent Payments Protocol specification (Apache-2.0) | standard  | https://github.com/google-agentic-commerce/AP2                                                                                                               |
| RBI Authentication Mechanisms Directions 2025          | regulator | https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=61282                                                                                        |
| RBI customer liability circular (2017)                 | regulator | https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11040                                                                                                |
| Mastercard Agent Pay announcement                      | report    | https://newsroom.mastercard.com/news/press/2025/april/mastercard-unveils-agent-pay-pioneering-agentic-payments-technology-to-power-commerce-in-the-age-of-ai |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

NPCI, Razorpay and OpenAI piloted agentic UPI payments in ChatGPT.

## Funding evidence

| Funder / company         | What                                                        | Date    | Link                                                                                                            | Evidence |
| ------------------------ | ----------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| Natural                  | $30M Series A led by Forerunner                             | 2026-07 | https://fintech.global/2026/07/21/natural-raises-30m-to-power-payments-for-ai-agents/                           | verified |
| Baselayer                | $35M Series A led by M13 (Know Your Agent identity suite)   | 2026-09 | https://dealroom.co/news/155407-baselayer-raises-35m-series-a-to-bring-identity-checks-to-ai-agents/            | verified |
| NPCI x Razorpay x OpenAI | Agentic UPI payments pilot in ChatGPT (not a funding round) | 2025-10 | https://techcrunch.com/2025/10/09/india-pilots-ai-chatbot-led-e-commerce-with-chatgpt-gemini-claude-in-the-mix/ | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- RBI authentication rules.
- Consumer protection.

## Leads to check

Not verified when this file was written; never treat as fact.

- NPCI official page describing UPI Circle delegation limits (NPCI page loaded without content)
- Current status of the NPCI-Razorpay-OpenAI pilot after late 2025 (Only October 2025 coverage found)
- Baselayer separately reported $20M Series A in mid-2026 (Conflicting aggregator reports; not resolved)
