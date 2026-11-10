---
name: glossary
description: Use when new or fuzzy terms appear in a problem - the member or a source uses a word that is new, overloaded, or used inconsistently.
metadata:
  origin: adapted
  stage: "2"
  source: https://github.com/mattpocock/skills@4ae2317ddb22b046e26455e4f9c9b3aaaf62212d
---

**What:** Keep one shared vocabulary for the problem.
**How:** Challenge fuzzy or conflicting terms when they come up, agree a precise one, and write it into `glossary.md` straight away.
**Objective:** Fewer misunderstandings and tighter answers (F4). The agent and the member mean the same thing by each word.

_Adapted from mattpocock/skills `domain-modeling` (MIT)._

Reads intensity from profile.md.

## Steps

1. When a term conflicts with `glossary.md`, call it out immediately: "Your glossary says X means …, but you seem to mean … Which is it?"
2. When a term is vague or overloaded (for example "accuracy" in PPG work), propose a precise canonical term and a one-line plain-words meaning.
3. Test the term with a concrete edge-case scenario if its boundaries are unclear.
4. Write each resolved term immediately, without batching: `| Term | Meaning (plain words) | Source |`. If the meaning came from the literature, the source must be verified.
5. Keep the glossary free of opinions, plans or findings. It is a glossary and nothing else.
6. From then on, use the glossary's terms in every answer and file.

## Output

- `research/problems/<slug>/glossary.md`

## Exit check

Every term used in `brief.md` and `field-map.md` that a newcomer wouldn't know has a glossary row.
