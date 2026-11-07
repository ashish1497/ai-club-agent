---
id: "19"
title: "Can a wrist sensor track true blood pressure?"
industry: healthtech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "No medical claims; Public datasets only; raw self-measurements stay in private-data/"
last_verified: 2026-11-08
level_fit: L3–L5
effort: semester
skills: "data analysis, signal processing basics, Python, literature review, standards reading"
---

**What:** Can optical (PPG) signals track absolute blood pressure over days without recalibrating against a cuff?
**How:** Theory: what blood-pressure information the waveform alone contains. Practice (no lab): benchmark published models for drift on public datasets (MIMIC, VitalDB, PulseDB) and compare validation standards.
**Objective:** Cheap continuous blood-pressure tracking would change hypertension screening.

# 19. Can a wrist sensor track true blood pressure?

## The open question

Can optical (PPG) signals track absolute blood pressure over days without recalibrating against a cuff?

## Why it matters

Cheap continuous blood-pressure tracking would change hypertension screening.

## Who cares

- Wearable device product and algorithm teams
- Public-health programme managers running hypertension screening
- Medical-device regulators and standards bodies

## In scope

- Measuring how far PPG-only blood-pressure estimates drift over time without cuff recalibration, using public datasets
- Comparing what existing validation protocols for cuffless devices actually test
- Characterising which physiological information the PPG waveform carries, at the level of published literature

## Out of scope

- Building or modifying hardware or sensors
- Clinical claims, diagnosis or advice to individuals
- Collecting new human data outside the project's private-data rules
- Seeking device certification or regulatory approval

## What is known

- The European Society of Hypertension states there are no generally accepted protocols for validating cuffless BP devices and defines six tests, including a recalibration test for cuff-calibration stability over time. ([ESH recommendations for the validation of cuffless blood pressure measuring devices (J Hypertens, 2023)](https://europepmc.org/article/MED/37303198))
- A 2023 benchmark of 11 machine-learning PPG blood-pressure methods on four open datasets, with no subject calibration, found several models no better than predicting the training-set mean, and concluded the methods still need substantial research. ([A benchmark for machine-learning based non-invasive blood pressure estimation using photoplethysmogram (Scientific Data, 2023)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10030661/))
- WHO estimates about 220 million people in India have hypertension and only about 12% have it under control. ([WHO India: Hypertension](https://www.who.int/india/health-topics/hypertension))

## What is unknown

- Calibration-free accuracy in everyday life.
- Exactly which physiology PPG encodes.

## Key terms

- **PPG (photoplethysmography)**: An optical signal that tracks changes in blood volume under the skin, used by smartwatches.
- **Cuffless blood pressure**: Estimating blood pressure without an inflating arm cuff, usually from optical or electrical signals.
- **Calibration**: Anchoring a device's estimates to one or more cuff readings for a specific person.
- **Drift**: How estimates move away from true values as time passes after the last calibration.
- **Arterial blood pressure (ABP) waveform**: Continuous pressure trace from a catheter in an artery, used as reference truth in ICU and surgical datasets.

## Possible angles

- **Theory:** what blood-pressure information the waveform alone contains
- **Practice (no lab):** benchmark published models for drift on public datasets (MIMIC, VitalDB, PulseDB) and compare validation standards

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                           | Type     | Link                                                 |
| ---------------------------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| PulseDB (cleaned MIMIC-III and VitalDB segments for cuffless BP benchmarking)      | dataset  | https://github.com/pulselabteam/PulseDB              |
| VitalDB on PhysioNet (intraoperative vital-sign waveforms incl. arterial pressure) | dataset  | https://physionet.org/content/vitaldb/1.0.0/         |
| MIMIC-III Waveform Database Matched Subset (ICU PLETH and ABP waveforms)           | dataset  | https://physionet.org/content/mimic3wdb-matched/1.0/ |
| ESH recommendations for validating cuffless BP devices                             | standard | https://europepmc.org/article/MED/37303198           |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Hypertension burden is high and cuff screening coverage is low.

## Funding evidence

| Funder / company | What                                                                                                                               | Date    | Link                                              | Evidence |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------- | -------- |
| NIH / NHLBI      | R01 to Boston University, 1R01HL177304-01A1, wearable speckle contrast optical spectroscopy for cuffless BP, FY2025 award $649,678 | 2025-09 | https://reporter.nih.gov/project-details/11226946 | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- No medical claims.
- Public datasets only; raw self-measurements stay in private-data/.

## Leads to check

Not verified when this file was written; never treat as fact.

- ISO 81060-3:2022 standard for continuous non-invasive (cuffless) blood pressure devices (iso.org page returned 403; not opened)
- NIH RePORTER project page URL (reporter.nih.gov/project-details/11226946) (Award data confirmed via the official NIH RePORTER API (appl_id 11226946); the JavaScript project page itself was not rendered)
