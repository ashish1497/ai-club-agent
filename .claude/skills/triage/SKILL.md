---
name: triage
description: Use when a member pastes a new problem statement (vague or detailed). Classifies it, detects fields and risks, and creates the problem folder before any other work.
metadata:
  origin: custom
  stage: "0"
---

**What:** Turn a pasted problem statement into a classified, risk-flagged problem folder.
**How:** Read the statement, classify it, detect its fields and risks, create `research/problems/<slug>/` from the templates, and confirm with the member.
**Objective:** Every problem starts on the right path (research, build or learning) with its risks visible from minute one.

## Steps

1. If the member names a club problem (for example "start problem 19"), read `club-agent/problems/*/19-*.md`. Use its `## The open question` as the statement, and carry its industry, risk flags and funding evidence forward. Its "Possible angles" are hints, not the member's framing.
   Then restate the problem in one sentence and ask: "Is that what you mean?" Don't proceed until the member agrees or corrects you.
2. Classify it as one of:
   - **Frontier question**: the answer probably doesn't exist yet. Go to stages 1–5.
   - **Build task**: a known thing to make. Go to build mode.
   - **Learn a topic**: the member wants understanding. Go to stages 1–2 only.
   - **Mix**: say which parts are which.
     Also say whether this is even an AI problem (F1).
3. Name the field(s), for example PPG/biosensing, payments, retail media. Don't research them yet.
4. Flag risks that apply, each with one line on why:
   - personal or health data
   - money or markets
   - biology or chemistry
   - scraping
   - contacting people
   - minors
     Check them against the Hard stops in AGENTS.md. If one applies, stop now.
5. Show the type, fields and risk flags, and ask: "Does this classification match what you want to do?" Adjust until the member agrees.
6. Make a short kebab-case slug (≤ 5 words) and create `research/problems/<slug>/` by copying `club-agent/templates/problem/`.
7. Fill `brief.md` sections `## Statement` (verbatim), `## Type`, `## Fields` and `## Risk flags`.
8. Set `active_problem: <slug>` in `research/profile.md`.
9. Only now, for each field with no `research/domains/<field>.md`, run `domain-pack`, passing this problem's `<slug>`.
10. Hand over to `where-am-i`.

## Output

- `research/problems/<slug>/` (all templates copied)
- `research/problems/<slug>/brief.md` (Statement, Type, Fields, Risk flags)
- `research/profile.md` (`active_problem`)

## Exit check

The member agrees with the type, the fields and the risk flags. Ask: "Does this classification match what you want to do?"
