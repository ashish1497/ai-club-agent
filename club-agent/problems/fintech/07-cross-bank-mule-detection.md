---
id: "07"
title: "Can banks catch mule rings together without pooling customer data?"
industry: fintech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "False positives can freeze innocent people's accounts; Synthetic data only"
last_verified: 2026-11-08
level_fit: L3–L5
effort: semester
skills: "graph data analysis, Python, privacy-enhancing technology reading, policy reading, synthetic data generation, interviews with bank fraud teams"
---

**What:** Can network analytics find money-mule rings that span banks when each bank shares only a privacy-preserving view of its data?
**How:** Theory: graph learning combined with federated learning or secure computation. Practice (no lab): a prototype on synthetic UPI-like transaction graphs.
**Objective:** Mule accounts drive cyber fraud; no single bank sees the whole network.

# 07. Can banks catch mule rings together without pooling customer data?

## The open question

Can network analytics find money-mule rings that span banks when each bank shares only a privacy-preserving view of its data?

## Why it matters

Mule accounts drive cyber fraud; no single bank sees the whole network.

## Who cares

- Head of fraud risk or financial crime compliance at a bank
- Payment system operator or regulator innovation unit (e.g. NPCI, RBIH)
- Fintech or regtech product manager building fraud analytics

## In scope

- Detecting mule-account rings whose transactions span more than one bank
- Privacy-preserving ways for banks to contribute signals without pooling raw customer data
- Measuring detection gain versus false positives on synthetic UPI-like transaction graphs

## Out of scope

- Using or requesting real customer or bank transaction data
- Freezing, reporting or acting on any real account
- Legal advice on data-sharing law or the DPDP Act
- Cross-border, crypto and large-value payment networks unless explicitly reframed

## What is known

- In BIS Project Hertha (June 2025), payment-system-level analytics helped banks find 12% more illicit accounts and 26% more for previously unseen patterns, tested on a synthetic dataset of 1.8 million accounts and 308 million transactions. ([Project Hertha: identifying financial crime patterns in real-time retail payment systems (BIS)](https://www.bis.org/publ/othp96.htm))
- RBI announced in December 2024 that RBIH was piloting MuleHunter.AI, an AI/ML model to detect mule bank accounts, with two large public sector banks. ([RBI Statement on Developmental and Regulatory Policies, 6 Dec 2024](https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=59245))
- An RBI RTI response reported that 23 banks had implemented MuleHunter.AI as of 10 December 2025; RBI has not disclosed how many mule accounts it has flagged. ([MediaNama: 23 banks implement MuleHunter.AI (RTI)](https://www.medianama.com/2025/12/223-rti-23-banks-mulehunter-mule-accounts/))
- The US-UK PETs Prize Challenges (2022) ran a financial crime track on privacy-preserving federated learning using synthetic SWIFT transaction data, so institutions would not share raw data. ([NSF: US and UK launch innovation prize challenges in privacy-enhancing technologies](https://www.nsf.gov/news/us-uk-launch-innovation-prize-challenges-privacy))

## What is unknown

- Legal and practical ways to share without pooling raw data.
- How far system-level detection extends to cross-border and crypto flows.

## Key terms

- **Money mule**: A bank account (often rented or taken over) used to receive and pass on stolen money so it is hard to trace.
- **Federated learning**: Training a shared model where each bank keeps its data and only sends model updates, not raw records.
- **Secure multi-party computation**: Cryptographic methods that let several parties compute a joint result without revealing their inputs to each other.
- **Graph analytics**: Analysing accounts as nodes and payments as links to spot suspicious structures such as fan-in or chains.
- **False positive**: An innocent account wrongly flagged as a mule, which can lead to a wrongful freeze.

## Possible angles

- **Theory:** graph learning combined with federated learning or secure computation
- **Practice (no lab):** a prototype on synthetic UPI-like transaction graphs

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                                                            | Type      | Link                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| Project Hertha report (BIS Innovation Hub and Bank of England)                                                      | report    | https://www.bis.org/publ/othp96.htm                                                                       |
| Realistic Synthetic Financial Transactions for Anti-Money Laundering Models (AMLworld, NeurIPS 2023 Datasets track) | dataset   | https://proceedings.neurips.cc/paper_files/paper/2023/hash/5f38404edff6f3f642d6fa5892479c42-Abstract.html |
| RBI Statement on Developmental and Regulatory Policies (MuleHunter.AI announcement)                                 | regulator | https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=59245                                     |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

UPI scale plus mule-driven cyber fraud.

## Funding evidence

| Funder / company                                   | What                                                                                 | Date    | Link                                                                  | Evidence |
| -------------------------------------------------- | ------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------------------- | -------- |
| BIS Innovation Hub London Centre + Bank of England | Project Hertha experiment and report                                                 | 2025-06 | https://www.bis.org/publ/othp96.htm                                   | verified |
| Reserve Bank Innovation Hub (RBIH)                 | MuleHunter.AI pilot announced by RBI; adopted by 23 banks by Dec 2025 per RTI report | 2024-12 | https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=59245 | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- False positives can freeze innocent people's accounts.
- Synthetic data only.

## Leads to check

Not verified when this file was written; never treat as fact.

- Coverage says Project Hertha excluded cross-border, large-value and crypto networks. (Seen in secondary coverage (FinTech Futures); the BIS summary page I opened only says legal and regulatory issues were out of scope.)
- Published winners and results of the US-UK PETs Prize financial crime track. (Winners page not found or opened; the UKRI blog URL returned 404.)
- IBM AML synthetic datasets hosted on Kaggle (HI/LI small, medium, large). (Kaggle page not opened; only the NeurIPS abstract was fetched.)
