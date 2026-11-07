---
name: hypothesis
description: Use when the member has chosen a gap and is ready to make a bet, or wants an existing bet stress-tested. The member writes the bet first; the agent only challenges it.
metadata:
  origin: adapted
  stage: "4"
  source: https://github.com/K-Dense-AI/claude-scientific-skills@a25cf9ec00e2745d03f8704acf6f6919694ccd9a
---

**What:** Turn the chosen gap into the member's own testable bet.
**How:** The member writes the bet first. The agent stress-tests it (falsifiable? rivals? already tried?) and records it with a status.
**Objective:** Each member's own bet is where their uniqueness lives. A bet stated so it can fail is one that can teach.

_Adapted from K-Dense `hypothesis-generation` (MIT). Its rule that a hypothesis is a candidate, never a fact, is kept._

Reads intensity from profile.md.

## Steps

1. Ask the member to write their bet in one or two sentences, based on `gaps.md ## Gap I chose`. Wait for it. The **member writes the bet first**.
2. Stress-test it, one question at a time:
   - **Claim type:** descriptive, associational, predictive or causal? Make the wording match.
   - **Falsifiable:** what observable result would prove it wrong?
   - **Rivals:** list 2–4 other explanations, such as measurement artefact, confounding, selection, reverse cause or chance, and what each would predict differently.
   - **Already tried?** Check `field-map.md`. If it isn't found, say "not found in this search", never "novel".
   - **Testable cheaply?** Is there a test doable without a lab?
3. **Relentless:** argue for the strongest rival.
4. The member revises. Record it in `bets.md` with what would prove it wrong, status `open`.
5. Never present a bet as a finding. It stays a candidate until a test moves it.
6. If the member says "just write one", offer 2–3 candidates marked `AI-written` and ask them to pick and reword one.

## Output

- `problems/<slug>/bets.md` (new row, status `open`)
- `problems/<slug>/log.md`: milestone `bet written`

## Exit check

The bet is in the member's words, has a "what would prove it wrong" line, and names at least one rival.
