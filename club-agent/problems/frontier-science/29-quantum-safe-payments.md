---
id: "29"
title: "Can a national payment system go quantum-safe in time?"
industry: frontier-science
seat: frontier-wildcard
status: open
funding_strength: strong
risk_flags: "None beyond the core rules"
last_verified: 2026-11-08
level_fit: L3–L5
effort: month
skills: "policy reading, risk frameworks, decision analysis, interviews with security practitioners"
---

**What:** What is the least risky, most cost-effective order for migrating a payment system to post-quantum cryptography?
**How:** Theory: decisions under uncertain threat timing. Practice (no lab): a migration priority framework for an Indian bank or UPI.
**Objective:** Payment systems must migrate before capable quantum computers exist.

# 29. Can a national payment system go quantum-safe in time?

## The open question

What is the least risky, most cost-effective order for migrating a payment system to post-quantum cryptography?

## Why it matters

Payment systems must migrate before capable quantum computers exist.

## Who cares

- Chief information security officers at Indian banks and payment operators
- Payment-system regulators and operators (RBI, NPCI)
- Payment technology vendors planning product roadmaps

## In scope

- Which payment-system components rely on quantum-vulnerable public-key cryptography
- Performance and cost differences reported in published tests
- Published national and international migration timelines and how they would apply to banks

## Out of scope

- Testing or probing live payment systems
- Writing or deploying cryptographic code in production
- Legal or compliance advice to a named institution

## What is known

- NIST released its first three finalised post-quantum standards, FIPS 203 (ML-KEM), FIPS 204 (ML-DSA) and FIPS 205 (SLH-DSA), on 13 August 2024. ([NIST releases first 3 finalized post-quantum encryption standards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards))
- BIS Project Leap Phase 2 replaced digital signatures with post-quantum ones in an operational payment system; all scenarios succeeded but processing time was significantly higher. ([BIS: Project Leap phase 2: quantum-proofing payment systems](https://www.bis.org/publ/othp107.htm))
- Project Leap's stated purpose is to counter 'harvest now, decrypt later' attacks on financial data. ([BIS Innovation Hub: Project Leap](https://www.bis.org/project/leap))
- A February 2026 DST task-force report set post-quantum milestones of 2027/2028/2029 for critical information infrastructure and 2028/2030/2033 for enterprises. ([ORF: India's post-quantum cryptography migration roadmap](https://www.orfonline.org/expert-speak/india-s-post-quantum-cryptography-migration-roadmap))

## What is unknown

- How to close the performance gaps Leap Phase 2 reported on live systems.
- Cost-optimal migration order.

## Key terms

- **Post-quantum cryptography (PQC)**: Encryption and signature methods designed to stay secure even against large quantum computers.
- **Harvest now, decrypt later**: Collecting encrypted data today to decrypt it once quantum computers can.
- **Crypto-agility**: How easily a system can swap one cryptographic algorithm for another.
- **Digital signature**: A cryptographic stamp proving who sent a message and that it was not changed.
- **Cryptographic inventory**: A list of where and how a system uses cryptography, needed before migrating.

## Possible angles

- **Theory:** decisions under uncertain threat timing
- **Practice (no lab):** a migration priority framework for an Indian bank or UPI

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                         | Type     | Link                                                                                                            |
| -------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| BIS Project Leap Phase 2 report                                                  | report   | https://www.bis.org/publ/othp107.htm                                                                            |
| NIST IR 8547 Transition to Post-Quantum Cryptography Standards (final, Oct 2026) | standard | https://csrc.nist.gov/pubs/ir/8547/final                                                                        |
| NIST FIPS 203/204/205 announcement                                               | standard | https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards |
| ORF summary of India's PQC migration roadmap                                     | report   | https://www.orfonline.org/expert-speak/india-s-post-quantum-cryptography-migration-roadmap                      |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

UPI throughput makes performance gaps critical.

## Funding evidence

| Funder / company                                                                                               | What                                                         | Date    | Link                                 | Evidence |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------- | ------------------------------------ | -------- |
| BIS Innovation Hub Eurosystem Centre with Bank of Italy, Bank of France, Deutsche Bundesbank, Nexi-Colt, Swift | Project Leap Phase 2 report (programme, not a funding round) | 2025-12 | https://www.bis.org/publ/othp107.htm | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- None beyond the core rules.

## Leads to check

Not verified when this file was written; never treat as fact.

- DST task-force report PDFs (Report_TaskForce_PQMigration_4Feb26, Quantum-Safe-Ecosystem-in-India) (DST URLs returned 404 or empty pages)
- RBI Q-SAFE committee on PQC in finance, reportedly formed May 2026 (Seen only in secondary search summaries)
- NIST IR 8547 deprecation dates (2030/2035) (Landing page fetched but dates are in the PDF, which was not read)
- Current UPI monthly transaction volumes from NPCI (NPCI statistics page did not render for the tool)
