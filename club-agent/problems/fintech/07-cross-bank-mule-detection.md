---
id: "07"
title: "Can banks catch mule rings together without pooling customer data?"
industry: fintech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "False positives can freeze innocent people's accounts; Synthetic data only"
last_verified: 2026-11-08
---

**What:** Can network analytics find money-mule rings that span banks when each bank shares only a privacy-preserving view of its data?
**How:** Theory: graph learning combined with federated learning or secure computation. Practice (no lab): a prototype on synthetic UPI-like transaction graphs.
**Objective:** Mule accounts drive cyber fraud; no single bank sees the whole network.

# 07. Can banks catch mule rings together without pooling customer data?

## The open question

Can network analytics find money-mule rings that span banks when each bank shares only a privacy-preserving view of its data?

## Why it matters

Mule accounts drive cyber fraud; no single bank sees the whole network.

## What is known

- A system-wide view found 12% more illicit accounts in BIS Project Hertha.

## What is unknown

- Legal and practical ways to share without pooling raw data.
- Cross-border and crypto networks (out of Hertha's scope).

## Possible angles

- **Theory:** graph learning combined with federated learning or secure computation
- **Practice (no lab):** a prototype on synthetic UPI-like transaction graphs

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## India angle

UPI scale plus mule-driven cyber fraud.

## Funding evidence

| Funder / company                     | What                  | Date    | Evidence  |
| ------------------------------------ | --------------------- | ------- | --------- |
| BIS Innovation Hub + Bank of England | Project Hertha report | 2025-06 | verified  |
| RBIH                                 | MuleHunter.AI rollout | 2025    | secondary |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened; `unverified`. Re-check before announcing.

## Risk flags

- False positives can freeze innocent people's accounts.
- Synthetic data only.
