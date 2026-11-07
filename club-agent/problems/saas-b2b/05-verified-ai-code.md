---
id: "05"
title: "Can AI prove its own code correct for less than the cost of the bugs?"
industry: saas-b2b
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "None beyond the core rules"
last_verified: 2026-11-08
level_fit: L4–L5
effort: semester
skills: "programming, formal methods (Lean or Dafny), cost-benefit analysis, reading research papers"
---

**What:** Can AI write both the formal specification and the machine-checked proof for ordinary business code, at a cost below the bugs it prevents?
**How:** Theory: the economics of a 'verification tax'. Practice (no lab): verify one small fintech function with open tools and compare effort with bug classes removed.
**Objective:** If verification becomes cheap, correctness-critical software changes how it is built.

# 05. Can AI prove its own code correct for less than the cost of the bugs?

## The open question

Can AI write both the formal specification and the machine-checked proof for ordinary business code, at a cost below the bugs it prevents?

## Why it matters

If verification becomes cheap, correctness-critical software changes how it is built.

## Who cares

- Engineering head for payments or core banking software
- Head of developer tools or AI coding at a software firm
- Risk or audit lead responsible for correctness-critical code

## In scope

- AI-generated formal specifications and machine-checked proofs for small business functions
- Comparing verification effort with the classes of bugs it rules out
- Who validates that a specification matches intent
- Open tools such as Lean and Dafny

## Out of scope

- Verifying live production UPI or bank systems
- Proving correctness of whole operating systems or compilers
- Pure competition mathematics without a software link
- Security auditing or penetration testing

## What is known

- AlphaProof, reported in Nature in 2025, learned formal Lean proofs by reinforcement learning and, with AlphaGeometry 2, reached a silver-medal-equivalent score at IMO 2024. ([Olympiad-Level Formal Mathematical Reasoning with Reinforcement Learning](https://research.google/pubs/olympiad-level-formal-mathematical-reasoning-with-reinforcement-learning/))
- On the VERINA benchmark of 189 Lean coding tasks, the best model (o3) reached about 72.6% code correctness and 52.3% specification soundness but only 4.9% proof success. ([VERINA: Benchmarking Verifiable Code Generation](https://arxiv.org/abs/2505.23135))
- The seL4 microkernel has machine-checked proofs from high-level specification to binary, including functional correctness, which rules out whole classes of C bugs such as buffer overflows. ([seL4 Verification](https://sel4.systems/Verification/))

## What is unknown

- Whether that transfers to messy real software with unwritten specs.
- Who checks that the spec itself is right.

## Key terms

- **Formal specification**: A precise, mathematical statement of what code is supposed to do.
- **Machine-checked proof**: A proof that a program meets its specification, checked step by step by software rather than by a person.
- **Proof assistant**: A tool such as Lean that checks proofs; Lean is also a programming language.
- **Verification-aware language**: A language such as Dafny where specifications live in the code and a verifier checks them.
- **Verification tax**: The extra time and cost of proving code correct compared with only testing it.

## Possible angles

- **Theory:** the economics of a 'verification tax'
- **Practice (no lab):** verify one small fintech function with open tools and compare effort with bug classes removed

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                          | Type   | Link                               |
| --------------------------------- | ------ | ---------------------------------- |
| VERINA benchmark paper            | paper  | https://arxiv.org/abs/2505.23135   |
| Lean proof assistant and language | tool   | https://lean-lang.org/             |
| Dafny verification-aware language | tool   | https://dafny.org/                 |
| seL4 verification overview        | report | https://sel4.systems/Verification/ |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Correctness-critical UPI and fintech code.

## Funding evidence

| Funder / company | What                                                          | Date    | Link                                                                                                     | Evidence |
| ---------------- | ------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- | -------- |
| Axiom Math       | $200M Series A at over $1.6B valuation, led by Menlo Ventures | 2026-03 | https://pulse2.com/axiom-200-million-series-a-at-1-6-billion-valuation-raised-for-verified-ai-technology | verified |
| Harmonic         | $120M Series C at $1.45B valuation, led by Ribbit Capital     | 2025-11 | https://siliconangle.com/?p=722850                                                                       | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- None beyond the core rules.

## Leads to check

Not verified when this file was written; never treat as fact.

- Published person-year effort figures for the seL4 proof (ACM paper page returned 403; seL4 site pages fetched do not state effort)
- How Amazon Web Services uses formal methods (CACM) (Page returned 403)
- VERINA code repository (Guessed GitHub URL returned 404; not located)
