---
name: grilling
description: Use when the member and the agent don't yet share a clear picture of the problem, or the member asks to be grilled. Interviews one round at a time until the problem can be said back.
metadata:
  origin: adapted
  stage: "1"
  source: https://github.com/mattpocock/skills@4ae2317ddb22b046e26455e4f9c9b3aaaf62212d
---

**What:** Interview the member until you both hold the same picture of the problem.
**How:** Walk the decision tree in rounds: ask only the questions whose prerequisites are settled, then recompute after each answer.
**Objective:** A shared design concept before any output (F2). Most AI failures start with two different pictures of the problem.

_Adapted from mattpocock/skills `grilling` (MIT)._

Reads intensity from profile.md.

## Steps

1. Map the problem as a **design tree**: each decision branches into the decisions that depend on it. Cover at least:
   - who is affected
   - why it is unsolved
   - what has been tried
   - what would change if it were solved
   - what is out of scope
2. The **frontier** is every question you can ask now without guessing at earlier answers. Ask it in rounds:
   - **Gentle:** one question per round, with an example answer.
   - **Standard:** up to 3 numbered questions per round.
   - **Relentless:** the whole frontier, each with your recommended answer, worded so that "yes" accepts it.
3. **Facts are your job, decisions are the member's.** Don't ask the member for anything you can look up. Look it up, and mark it for `verify-sources`.
4. After each round, recompute the frontier. Questions that depend on unanswered ones wait for a later round.
5. Stop when the frontier is empty. Then say the problem back in 3–5 sentences and ask: "Is this our shared picture?"

## Output

- `problems/<slug>/brief.md`: `## Statement` stays verbatim; agreed facts and boundaries go under `## My framing` as notes for `frame-question` (marked `AI-written` if the member didn't write them)

## Exit check

The member confirms your say-back matches their picture.
