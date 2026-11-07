---
id: "08"
title: "Does alternative-data credit really include thin-file borrowers?"
industry: fintech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "Fair-lending concerns; Consent"
last_verified: 2026-11-08
level_fit: L3–L5
effort: semester
skills: "credit risk basics, data analysis, fairness metrics, synthetic data generation, policy reading, interviews with lenders"
---

**What:** Does underwriting on Account Aggregator, ULI and GST data price risk better through a full credit cycle, without creating new bias or inviting gaming?
**How:** Theory: performative prediction and algorithmic fairness. Practice (no lab): a fairness and robustness audit of an MSME scorecard on synthetic data.
**Objective:** Credit access for borrowers with little history is a core goal of India's digital public infrastructure.

# 08. Does alternative-data credit really include thin-file borrowers?

## The open question

Does underwriting on Account Aggregator, ULI and GST data price risk better through a full credit cycle, without creating new bias or inviting gaming?

## Why it matters

Credit access for borrowers with little history is a core goal of India's digital public infrastructure.

## Who cares

- Chief risk officer or credit policy head at an NBFC or bank lending to MSMEs
- Product lead at a lending-infrastructure fintech
- Policy analyst working on India's digital public infrastructure for credit (RBI, RBIH, DFS)

## In scope

- Whether Account Aggregator, ULI and GST-based signals change approval and default outcomes for thin-file borrowers
- Fairness of alternative-data scores across borrower groups
- How scores and borrower behaviour shift once borrowers learn what the score rewards
- Audits on synthetic or publicly released data

## Out of scope

- Making or recommending real lending decisions
- Accessing any real borrower's financial data, even with apparent consent
- Legal advice on fair-lending or DPDP compliance
- Building a production scorecard for a lender

## What is known

- In a study of over 250,000 observations, simple digital-footprint variables predicted consumer default about as well as or better than credit bureau scores, including for customers bureaus could not score. ([Berg, Burg, Gombovic, Puri: On the Rise of FinTechs - Credit Scoring using Digital Footprints (NBER WP 24551)](https://www.nber.org/papers/w24551))
- Using data from an Indian fintech lender to small businesses, greater use of cashless payments by borrowers improved access to fintech credit and predicted lower default. ([Ghosh, Vallee, Zeng: FinTech Lending and Cashless Payments (NBER WP 34148)](https://www.nber.org/papers/w34148))
- RBI piloted ULI (then the Public Tech Platform for Frictionless Credit) from August 2023 using sources such as Aadhaar e-KYC, land records, PAN and account aggregators; in June 2025 DFS and RBI met states and ministries to scale it, with nationwide launch still pending. ([Inc42: Finance Ministry holds meet on scaling up Unified Lending Interface](https://inc42.com/buzz/finance-ministry-holds-meet-on-scaling-up-unified-lending-interface/))
- Sahamati, the RBI-recognised self-regulatory organisation for Account Aggregators, publishes ecosystem statistics including consents raised and fulfilled and the number of participating lenders. ([Sahamati home page](https://sahamati.org.in/))

## What is unknown

- Loan performance through a downturn.
- Fairness across groups.
- Behaviour once borrowers learn how scores work.

## Key terms

- **Thin-file borrower**: Someone with little or no credit bureau history, so traditional scores cannot rate them well.
- **Account Aggregator (AA)**: An RBI-licensed intermediary that moves a person's financial data from one institution to another only with their explicit consent.
- **Unified Lending Interface (ULI)**: An RBI-led platform that lets lenders pull consented data such as land records and KYC from many sources to assess a loan.
- **Performative prediction**: When a model's predictions change the behaviour they are trying to predict, for example borrowers adjusting to how they are scored.
- **Through-the-cycle performance**: How well a credit model holds up across both good times and an economic downturn.

## Possible angles

- **Theory:** performative prediction and algorithmic fairness
- **Practice (no lab):** a fairness and robustness audit of an MSME scorecard on synthetic data

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                           | Type    | Link                               |
| ------------------------------------------------------------------ | ------- | ---------------------------------- |
| Sahamati Account Aggregator ecosystem statistics and dashboards    | dataset | https://sahamati.org.in/           |
| Performative Prediction (Perdomo et al., ICML 2020)                | paper   | https://arxiv.org/abs/2002.06673   |
| A Survey on Bias and Fairness in Machine Learning (Mehrabi et al.) | paper   | https://arxiv.org/abs/1908.09635   |
| FinTech Lending and Cashless Payments (NBER WP 34148)              | paper   | https://www.nber.org/papers/w34148 |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Account Aggregator and ULI are Indian public infrastructure.

## Funding evidence

| Funder / company                       | What                                                                                 | Date    | Link                                                                                                            | Evidence  |
| -------------------------------------- | ------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------- | --------- |
| FinBox                                 | $40M Series B led by WestBridge Capital, with A91 Partners and Aditya Birla Ventures | 2025-09 | https://www.finbox.in/blog/finbox-raises-40mn-seriesb-westbridge-a91-credit-infrastructure-technology-expansion | verified  |
| RBI / Department of Financial Services | ULI scale-up meeting with ministries and states (policy push, no amount)             | 2025-06 | https://inc42.com/buzz/finance-ministry-holds-meet-on-scaling-up-unified-lending-interface/                     | secondary |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- Fair-lending concerns.
- Consent.

## Leads to check

Not verified when this file was written; never treat as fact.

- Reported ULI pilot figure of over 600,000 loans worth about Rs 27,000 crore by December 2024 and a 2025 RBI review over slow adoption. (Seen only in search snippets of secondary coverage; no RBI primary page opened.)
- The claim in the file that approval rates rise with alternative data, specifically for AA/GST-based MSME lending in India. (Found related evidence (cashless payments, digital footprints) but no fetched source quantifying approval-rate changes from AA or GST data.)
- Official RBI page announcing ULI (Governor's speech, 26 Aug 2024). (Only news coverage found in search; RBI speech page not opened.)
