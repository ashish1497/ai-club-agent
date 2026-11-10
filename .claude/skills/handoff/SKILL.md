---
name: handoff
description: Use when a session is ending or the member says they are done for now ("wrap up"). Writes a short handoff into the problem log, then saves research/ to the member's GitHub branch.
metadata:
  origin: adapted
  stage: "any"
  source: https://github.com/mattpocock/skills@4ae2317ddb22b046e26455e4f9c9b3aaaf62212d
---

**What:** Leave a handoff note the next session can resume from.
**How:** Append a short dated entry to `log.md ## Handoffs` (done, next, open questions, tool and model, optional feedback), then run the save script, which commits only `research/` and pushes the member branch.
**Objective:** Continuity with no memory (F10), provenance (C9), a feedback channel to the club, and a backup of the member's work on GitHub.

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
6. Save: run `bash club-agent/scripts/save.sh "<one-line summary of the session>"`. Tell the member what it printed in one line. If the upload failed, say their work is saved on this laptop and will upload next time; don't retry in a loop.

## Output

- `research/problems/<slug>/log.md` (`## Handoffs` entry)
- A commit of `research/` on the member branch, pushed to GitHub when online

## Exit check

The entry exists with Done / Next / Open questions / Tool, the next session can resume from it alone, and `save.sh` has run.
