---
id: "26"
title: "Will any quantum computer pay for itself?"
industry: frontier-science
seat: frontier-wildcard
status: open
funding_strength: strong
risk_flags: "None beyond the core rules"
last_verified: 2026-11-08
level_fit: L3–L5
effort: month
skills: "financial modelling, technical reading, scenario analysis, policy reading"
---

**What:** Which qubit approaches reach a point where their computational value exceeds their cost, for which problems, and by when?
**How:** Theory: resource estimation. Practice (no lab): a cost-versus-value model per application from published estimates.
**Objective:** Governments and companies are committing billions on uncertain timelines.

# 26. Will any quantum computer pay for itself?

## The open question

Which qubit approaches reach a point where their computational value exceeds their cost, for which problems, and by when?

## Why it matters

Governments and companies are committing billions on uncertain timelines.

## Who cares

- Government science-mission planners deciding quantum budgets
- Corporate strategy and R&D heads in pharma, chemicals, finance and logistics weighing quantum bets
- Deep-tech investors valuing quantum hardware companies

## In scope

- Published resource estimates (qubits, run time) for named applications
- Cost assumptions for building and running fault-tolerant machines across qubit types
- Comparing timelines claimed by vendors, DARPA's programme and national missions such as India's

## Out of scope

- Building or operating quantum hardware
- Investment recommendations on specific listed companies
- Running cryptanalysis against real systems

## What is known

- DARPA's Quantum Benchmarking Initiative aims to verify whether any approach can reach utility-scale operation, meaning computational value exceeds cost, by 2033. ([DARPA Quantum Benchmarking Initiative](https://www.darpa.mil/research/programs/quantum-benchmarking-initiative))
- Google reported surface-code memories below threshold, with logical error suppressed by a factor of about 2.14 each time code distance rose by two. ([Quantum error correction below the surface code threshold (Acharya et al.)](https://arxiv.org/abs/2408.13687))
- A 2025 estimate put factoring 2048-bit RSA at under a week on fewer than a million noisy qubits, down from about 20 million qubits in 2019. ([How to factor 2048 bit RSA integers with less than a million noisy qubits (Gidney)](https://arxiv.org/abs/2505.15917))
- India's National Quantum Mission has Rs 6,003.65 crore for 2023-24 to 2030-31 and targets intermediate-scale computers of 50-1000 physical qubits in 8 years. ([Office of the Principal Scientific Adviser: National Quantum Mission](https://psa.gov.in/national-quantum-mission))

## What is unknown

- Economics at scale.
- Which applications pay first.

## Key terms

- **Logical qubit**: A reliable qubit built from many error-prone physical qubits using error correction.
- **Resource estimation**: Working out how many qubits and how much time a given algorithm needs on given hardware.
- **Utility scale**: DARPA's term for a machine whose computational value is greater than its cost.
- **Error-correction threshold**: The hardware error rate below which adding more qubits makes errors fall rather than rise.
- **Qubit modality**: The physical technology used for qubits, such as superconducting circuits, trapped ions, neutral atoms or photons.

## Possible angles

- **Theory:** resource estimation
- **Practice (no lab):** a cost-versus-value model per application from published estimates

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                           | Type      | Link                                                                                      |
| -------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------- |
| Microsoft Quantum resource estimator (open source) | tool      | https://learn.microsoft.com/en-us/azure/quantum/intro-to-resource-estimation              |
| DARPA QBI Stage B selection list                   | regulator | https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection |
| Gidney 2025 RSA-2048 resource estimate             | paper     | https://arxiv.org/abs/2505.15917                                                          |
| India National Quantum Mission (PSA page)          | report    | https://psa.gov.in/national-quantum-mission                                               |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

India's National Quantum Mission (₹6,003.65 crore) targets 50–1000 physical-qubit systems.

## Funding evidence

| Funder / company | What                                                                                                                                                                                              | Date    | Link                                                                                      | Evidence |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------- | -------- |
| DARPA            | Quantum Benchmarking Initiative Stage B: 11 companies selected (Atom Computing, Diraq, IBM, IonQ, Nord Quantique, Photonic, Quantinuum, Quantum Motion, QuEra, Silicon Quantum Computing, Xanadu) | 2025-11 | https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- None beyond the core rules.

## Leads to check

Not verified when this file was written; never treat as fact.

- Stage B award size reported as up to about $15M per company (Seen only in secondary search summaries, not on the DARPA page)
- Rajya Sabha reply on actual NQM spending to date (Only secondary reports seen; primary record not opened)
