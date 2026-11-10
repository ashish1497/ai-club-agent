---
name: where-am-i
description: Use when starting a problem or a new sub-topic, to find out what the member already knows before explaining anything. Short, ungraded, one question at a time.
metadata:
  origin: custom
  stage: "1"
---

**What:** A quick, ungraded check of what the member already understands about each sub-topic.
**How:** 3–5 questions per sub-topic, one at a time. Record a starting point per sub-topic.
**Objective:** Pitch every later explanation at the right level, starting from where the member actually is.

Reads intensity from profile.md.

## Steps

1. From `brief.md`, list 2–4 sub-topics. For PPG, for example: how the signal is made, what it can measure, known biases.
2. For each sub-topic, ask 3–5 short questions one at a time, such as "Explain X in two lines" or "What do you think limits Y?".
   - **Gentle:** offer an example of the level of answer expected, and reassure them that "I don't know" is a useful answer.
   - **Relentless:** follow up once on a vague answer.
3. Don't correct answers at length here. Note the misconceptions; `field-map` addresses them.
4. Rate each sub-topic: `new` / `heard of it` / `can explain` / `can critique`.

## Output

- `research/problems/<slug>/log.md`: under `## Milestones`, one row per sub-topic: `| <date> | starting point | <sub-topic>: <rating>; misconceptions: … |`

## Exit check

Every sub-topic has a rating. Tell the member in one line what you'll focus on next and why.
