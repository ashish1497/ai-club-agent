---
name: frame-question
description: Use when the problem statement needs to become the member's own questions, with a clear definition of what would count as an answer and as progress.
metadata:
  origin: custom
  stage: "1"
---

**What:** Turn the problem statement into the member's own main question, sub-questions and success definitions.
**How:** The member drafts first. The agent critiques; it doesn't write.
**Objective:** Each member's individual angle starts here. A sharp question is worth more than a fast answer.

Reads intensity from profile.md.

## Steps

1. Explain the task in two lines: "Rewrite this as 1 main question plus 3–7 sub-questions, then say what would count as an answer and what would count as progress."
2. The member drafts first. Wait for their draft. At Gentle intensity, you may show a worked example from a _different_ field, never this one.
3. Critique the draft against these checks:
   - Is the main question answerable in principle?
   - Do the sub-questions cover it without overlapping?
   - Is any answer already known? (If unsure, mark it to check in `field-map`.)
   - Is "progress" defined so that a killed bet still counts?
   - **Relentless:** argue for a narrower or a bolder version.
4. The member revises. Repeat until they're satisfied.
5. If the member says "just write it", write it, mark it `AI-written`, and ask them to edit one line to make it theirs.

## Output

- `problems/<slug>/brief.md`: `## My framing`, `## What counts as an answer`, `## What counts as progress`
- `problems/<slug>/log.md`: milestone `question sharpened`

## Exit check

The member approves the framing in their own words: "Yes, this is my question."
