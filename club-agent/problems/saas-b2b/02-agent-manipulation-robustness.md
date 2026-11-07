---
id: "02"
title: "Can an agent be made robust to manipulation through what it reads?"
industry: saas-b2b
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "Focus on defences; test only systems you own.; Don't publish working exploits."
last_verified: 2026-11-08
---

**What:** Is there an architecture that provably bounds what untrusted text (emails, PDFs, web pages) can make an agent do, or is prompt injection unsolvable in principle?
**How:** Theory: information-flow control for LLM agents. Practice (no lab): a defensive benchmark on Indian enterprise documents, run only in your own sandbox.
**Objective:** Without a security model, enterprises can't let agents act on real data.

# 02. Can an agent be made robust to manipulation through what it reads?

## The open question

Is there an architecture that provably bounds what untrusted text (emails, PDFs, web pages) can make an agent do, or is prompt injection unsolvable in principle?

## Why it matters

Without a security model, enterprises can't let agents act on real data.

## What is known

- Detectors and guardrails exist.
- Guardrails are repeatedly bypassed.

## What is unknown

- Any formal security model for agents that act on untrusted language.

## Possible angles

- **Theory:** information-flow control for LLM agents
- **Practice (no lab):** a defensive benchmark on Indian enterprise documents, run only in your own sandbox

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## India angle

Indian enterprises adopting agents face the same exposure.

## Funding evidence

| Funder / company | What          | Date    | Evidence  |
| ---------------- | ------------- | ------- | --------- |
| Rein Security    | $25M Series A | 2026-10 | verified  |
| Capsule Security | $7M seed      | 2026-04 | secondary |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened; `unverified`. Re-check before announcing.

## Risk flags

- Focus on defences; test only systems you own.
- Don't publish working exploits.
