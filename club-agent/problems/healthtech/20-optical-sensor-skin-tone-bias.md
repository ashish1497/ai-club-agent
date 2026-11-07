---
id: "20"
title: "Is skin-tone bias in optical sensors fixable in software?"
industry: healthtech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "No medical claims; Consent for any personal data"
last_verified: 2026-11-08
level_fit: L2–L5
effort: month
skills: "literature review, dataset auditing, data analysis, regulatory reading, optics basics"
---

**What:** Can algorithms fully correct the error melanin causes in PPG and pulse oximetry, or does it need new hardware?
**How:** Theory: light–tissue simulation. Practice (no lab): audit public datasets for gaps in skin-tone reporting.
**Objective:** Biased sensors give worse readings to people with darker skin.

# 20. Is skin-tone bias in optical sensors fixable in software?

## The open question

Can algorithms fully correct the error melanin causes in PPG and pulse oximetry, or does it need new hardware?

## Why it matters

Biased sensors give worse readings to people with darker skin.

## Who cares

- Wearable and pulse-oximeter makers' algorithm and validation teams
- Medical-device regulators and procurement officers
- Hospital quality and patient-safety leads

## In scope

- Separating sensor error caused by skin pigment from error caused by motion, device or physiology, using published data
- Auditing whether public PPG and oximetry datasets report skin tone, and how
- Reviewing how regulators now ask for skin tone to be measured in device studies

## Out of scope

- Designing or building new sensor hardware
- Clinical recommendations or medical claims about any device
- Collecting personal or biometric data without consent
- Certifying devices

## What is known

- In patients with pulse-oximeter readings of 92-96%, hidden low oxygen (arterial saturation below 88%) occurred in 11.7% of Black versus 3.6% of White patients in a Michigan cohort. ([Racial Bias in Pulse Oximetry Measurement (NEJM, 2020)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808260/))
- A study of consumer and research wearables found no statistically significant difference in optical heart-rate accuracy across skin tones, but significant differences between devices and about 30% higher error during activity than rest. ([Investigating sources of inaccuracy in wearable optical heart rate sensors (npj Digital Medicine, 2020)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7010823/))
- FDA's January 2025 draft guidance recommends assessing study participants' skin with both the subjective Monk Skin Tone Scale and the objective Individual Typology Angle. ([FDA Proposes Updated Recommendations to Help Improve Performance of Pulse Oximeters Across Skin Tones](https://www.fda.gov/news-events/press-announcements/fda-proposes-updated-recommendations-help-improve-performance-pulse-oximeters-across-skin-tones))
- In a test of 34 oximeters, 22 passed the 2013 FDA accuracy guidance but only 1 passed the anticipated new FDA criteria that include skin-pigment differential bias. ([Pulse Oximeter Performance and Skin Pigment: Comparison of 34 Oximeters (Anesthesia & Analgesia, 2026)](https://europepmc.org/article/MED/42012940))

## What is unknown

- How far it extends into consumer wearables.
- An objective way to measure skin tone.

## Key terms

- **Pulse oximetry (SpO2)**: Estimating blood oxygen from how red and infrared light pass through a finger.
- **Occult hypoxemia**: Truly low blood oxygen that the oximeter reading hides.
- **Monk Skin Tone Scale**: A 10-shade scale for classifying skin tone by visual comparison.
- **Individual Typology Angle (ITA)**: An objective skin-tone number computed from colour-meter (spectrophotometer) readings.
- **Differential bias**: Whether a device's average error differs between darker- and lighter-skinned groups.

## Possible angles

- **Theory:** light–tissue simulation
- **Practice (no lab):** audit public datasets for gaps in skin-tone reporting

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                      | Type      | Link                                                                                                                                                |
| ----------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open Oximetry project (independent device test results and raw data links)    | dataset   | https://openoximetry.org/                                                                                                                           |
| FDA draft guidance announcement on pulse oximeters across skin tones          | regulator | https://www.fda.gov/news-events/press-announcements/fda-proposes-updated-recommendations-help-improve-performance-pulse-oximeters-across-skin-tones |
| Comparison of 34 oximeters against current and emerging regulatory frameworks | paper     | https://europepmc.org/article/MED/42012940                                                                                                          |
| Wearable optical heart-rate accuracy across skin tones                        | paper     | https://pmc.ncbi.nlm.nih.gov/articles/PMC7010823/                                                                                                   |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Wide skin-tone diversity; validation cohorts are mostly Western.

## Funding evidence

| Funder / company                   | What                                                                                                                    | Date    | Link                                                                                        | Evidence |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------- | -------- |
| NIH / NHLBI                        | K99 to Tufts University, 1K99HL181290-01, pulse-oximetry method for unbiased arterial saturation, FY2025 award $134,537 | 2025-09 | https://reporter.nih.gov/project-details/11215091                                           | verified |
| Massachusetts Life Sciences Center | 2025 Health Equity Accelerator grant to Tufts (Koomson lab) for bias-free pulse oximeters; amount not stated on page    | 2025-07 | https://engineering.tufts.edu/news-events/news/koomson-wins-health-equity-accelerator-grant | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- No medical claims.
- Consent for any personal data.

## Leads to check

Not verified when this file was written; never treat as fact.

- Final status of the FDA pulse-oximeter draft guidance after the 2025 comment period (FDA guidance document page returned 404; finalisation not confirmed)
- Google's Monk Skin Tone scale page (skintone.google) (Page content did not render beyond the title)
- MLSC Health Equity Accelerator award amount (state release reportedly says $50,000 per project) (Seen only in search summary; mass.gov release not opened)
- Skin-tone composition of Indian validation cohorts for oximeters or wearables (No primary source found)
- NIH RePORTER project page URL (reporter.nih.gov/project-details/11215091) (Award data confirmed via the official NIH RePORTER API (appl_id 11215091); the JavaScript project page itself did not render)
