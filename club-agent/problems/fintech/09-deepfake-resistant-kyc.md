---
id: "09"
title: "Can identity checks survive deepfakes?"
industry: fintech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "Never imitate real people; Biometrics fall under DPDP"
last_verified: 2026-11-08
level_fit: L3–L5
effort: month
skills: "threat modelling, regulation reading, literature review, ML evaluation basics, interviews with KYC operations teams"
---

**What:** Can video-KYC stay reliable as generative models improve, or must trust move to device attestation, provenance and behavioural signals?
**How:** Theory: limits of synthetic-media detection. Practice (no lab): a threat model for RBI's V-CIP process using only synthetic or consented data.
**Objective:** Remote onboarding depends on proving a real person is present.

# 09. Can identity checks survive deepfakes?

## The open question

Can video-KYC stay reliable as generative models improve, or must trust move to device attestation, provenance and behavioural signals?

## Why it matters

Remote onboarding depends on proving a real person is present.

## Who cares

- Head of KYC operations or digital onboarding at a bank or NBFC
- Fraud and identity risk lead at a fintech or KYC vendor
- Regulator or policy analyst reviewing remote onboarding rules

## In scope

- How reliable video-based customer identification (V-CIP) is against AI-generated faces and voices
- Whether synthetic-media detection keeps working on generators it was not trained on
- Alternative trust signals such as device attestation, content provenance and behavioural signals, at a conceptual level
- Threat modelling using only synthetic or consented data

## Out of scope

- Creating deepfakes of any real person
- Testing attacks against any live KYC system or bank
- Building or sharing tools that help bypass identity checks
- Legal advice on DPDP Act or KYC compliance

## What is known

- RBI's January 2020 amendment to the KYC Master Direction introduced V-CIP as a consent-based alternate method of customer identification and requires the regulated entity to run a liveness check to guard against spoofing. ([RBI: Amendment to Master Direction (MD) on KYC, 9 Jan 2020](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11783))
- A 2026 benchmark of open-source AI-generated image detectors found that modern commercial generators such as Flux Dev, Firefly v4 and Midjourney v7 defeat most detectors, with average accuracy of only 18-30%. ([Ren et al.: How well are open sourced AI-generated image detection models out-of-the-box (arXiv 2602.07814)](https://arxiv.org/abs/2602.07814))
- Deepfake detection research measures generalisation by training on some datasets and testing on others; one 2025-26 method reports state-of-the-art average cross-dataset AUROC across 14 benchmarks from 2019 to 2025. ([Yermakov et al.: Deepfake Detection that Generalizes Across Benchmarks (arXiv 2508.06248)](https://arxiv.org/abs/2508.06248))
- NIST evaluated passive, software-only face presentation attack detection algorithms on 2D images in FATE Part 10 (September 2023). ([NISTIR 8491: FATE Part 10, Performance of Passive Software-based PAD Algorithms](https://www.nist.gov/node/1825041))

## What is unknown

- Whether detection can generalise to future generators.

## Key terms

- **V-CIP**: Video-based Customer Identification Process: RBI-permitted live video call used to verify a customer remotely.
- **Liveness check**: A test that the person on camera is a real, present human, not a photo, mask, replay or synthetic video.
- **Presentation attack vs injection attack**: A presentation attack holds something fake up to the camera; an injection attack feeds fake video directly into the app, bypassing the camera.
- **Device attestation**: Cryptographic proof from a phone's hardware that the app and camera feed are genuine and unmodified.
- **Content provenance**: Signed metadata recording where a piece of media came from and how it was edited, e.g. the C2PA standard.

## Possible angles

- **Theory:** limits of synthetic-media detection
- **Practice (no lab):** a threat model for RBI's V-CIP process using only synthetic or consented data

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                          | Type      | Link                                                          |
| --------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------- |
| RBI KYC Master Direction amendment introducing V-CIP (Jan 2020)                   | regulator | https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11783 |
| NIST FATE Part 10: passive presentation attack detection evaluation (NISTIR 8491) | report    | https://www.nist.gov/node/1825041                             |
| Deepfake Detection that Generalizes Across Benchmarks (GenD)                      | paper     | https://arxiv.org/abs/2508.06248                              |
| Zero-shot benchmark of open-source AI-generated image detectors                   | paper     | https://arxiv.org/abs/2602.07814                              |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

RBI permits video-based customer identification (V-CIP).

## Funding evidence

| Funder / company | What                                                                                                              | Date    | Link                                                                                                                                                                                           | Evidence |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| GetReal Security | $17.5M Series A led by Forgepoint Capital                                                                         | 2025-03 | https://technode.global/prnasia/getreal-security-raises-17-5m-series-a-led-by-forgepoint-capital-to-address-rapidly-growing-threats-associated-with-generative-ai-and-malicious-digital-media/ | verified |
| Resemble AI      | $13M strategic funding (total venture funding $25M); investors include Google's AI Futures Fund and Okta Ventures | 2025-12 | https://www.resemble.ai/resemble-ai-secures-13m-to-combat-rising-ai-generated-threats/                                                                                                         | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- Never imitate real people.
- Biometrics fall under DPDP.

## Leads to check

Not verified when this file was written; never treat as fact.

- RBI consolidated KYC Master Directions of 28 Nov 2025 reportedly state V-CIP is on par with face-to-face CIP and that liveness checks must not exclude persons with special needs. (Seen in law-firm and vendor summaries only; the RBI page redirected and could not be opened.)
- Whether NIST FATE Part 10 covered digital injection attacks and its finding that no algorithm detected all attack types. (Only the NIST abstract page was opened; the full report PDF was not read and vendor accounts conflict.)
