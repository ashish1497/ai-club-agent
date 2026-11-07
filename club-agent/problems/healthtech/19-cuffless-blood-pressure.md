---
id: "19"
title: "Can a wrist sensor track true blood pressure?"
industry: healthtech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "No medical claims; Public datasets only; raw self-measurements stay in private-data/"
last_verified: 2026-11-08
---

**What:** Can optical (PPG) signals track absolute blood pressure over days without recalibrating against a cuff?
**How:** Theory: what blood-pressure information the waveform alone contains. Practice (no lab): benchmark published models for drift on public datasets (MIMIC, VitalDB, PulseDB) and compare validation standards.
**Objective:** Cheap continuous blood-pressure tracking would change hypertension screening.

# 19. Can a wrist sensor track true blood pressure?

## The open question

Can optical (PPG) signals track absolute blood pressure over days without recalibrating against a cuff?

## Why it matters

Cheap continuous blood-pressure tracking would change hypertension screening.

## What is known

- PPG features correlate with blood pressure in the lab.

## What is unknown

- Calibration-free accuracy in everyday life.
- Exactly which physiology PPG encodes.

## Possible angles

- **Theory:** what blood-pressure information the waveform alone contains
- **Practice (no lab):** benchmark published models for drift on public datasets (MIMIC, VitalDB, PulseDB) and compare validation standards

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## India angle

Hypertension burden is high and cuff screening coverage is low.

## Funding evidence

| Funder / company | What                     | Date    | Evidence |
| ---------------- | ------------------------ | ------- | -------- |
| NIH / NHLBI      | R01 to Boston University | 2025-09 | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened; `unverified`. Re-check before announcing.

## Risk flags

- No medical claims.
- Public datasets only; raw self-measurements stay in private-data/.
