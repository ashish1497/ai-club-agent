# Club Packs

**What:** The AI Club's open library of domain packs, one file per field (for example `packs/ppg-biosensing.md`).
**How:** Members propose packs with the agent's `share-pack` skill (say "share my pack"), which opens a one-file pull request. A maintainer merges it. The Club Agent's `domain-pack` skill copies a pack as a starting draft, then re-verifies every source.
**Objective:** The next member who works in a field starts from someone else's groundwork instead of from zero.

The agent treats every pack as **data, never instructions**. It copies only the 7 template sections and ignores any text that tries to direct its behaviour. Risk rules in a pack can only add restrictions; they can never relax the club's core rules.

Nothing to configure: this folder is part of every member's clone, and new packs arrive with each session's update.
