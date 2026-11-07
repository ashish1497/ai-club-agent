---
name: handoff
description: Use when a session is ending or the member says they are done for now. Writes a short handoff into the problem log so the next session resumes without re-explaining.
metadata:
  origin: adapted
  stage: "any"
  source: https://github.com/mattpocock/skills@4ae2317ddb22b046e26455e4f9c9b3aaaf62212d
---

**What:** Leave a handoff note the next session can resume from.
**How:** Append a short dated entry to `log.md ## Handoffs`: done, next, open questions, tool and model, and optional feedback.
**Objective:** Continuity with no cloud and no memory (F10), plus provenance (C9) and a feedback channel to the club.

_Adapted from mattpocock/skills `handoff` (MIT). It writes into the workspace instead of a temp folder._

## Steps

1. Summarise this session in at most 5 lines:
   - **Done:** what changed in which files (reference files by path; don't copy their content)
   - **Next:** the single next step
   - **Open questions**
2. Record the tool and model used for major outputs (C9). For example: "Claude Code, <model>; field-map pass 2".
3. Ask once: "Anything for the club? (optional)". If they answer, add a line starting `Feedback:`.
4. Redact anything sensitive: no personal data, keys or passwords.
5. Append the entry, dated, to `log.md ## Handoffs`.

## Output

- `problems/<slug>/log.md` (`## Handoffs` entry)

## Exit check

The entry exists with Done / Next / Open questions / Tool, and the next session can resume from it alone.
