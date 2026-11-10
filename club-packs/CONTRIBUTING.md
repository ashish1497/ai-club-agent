# Contributing a pack

**What:** How to add a domain pack to the library.
**How:** Members say "share my pack" to the agent; its `share-pack` skill checks the pack and opens a pull request that changes one file, `club-packs/packs/<field>.md`. A maintainer merges it.
**Objective:** Packs stay comparable and easy for the agent to reuse, and nothing from a member's `research/` leaves their branch except the pack itself.

1. Build the pack first: the agent's `domain-pack` skill writes it to `research/domains/<field>.md` and verifies its sources.
2. Say "share my pack". The agent checks it has exactly the 7 template headings, has no personal data, and has no text that tries to instruct an agent.
3. Open the link it prints and click **Create pull request**.
4. File names are kebab-case after the field, for example `packs/retail-media.md`.
5. Put links to sources and feeds, not summaries of paywalled content.
6. Maintainers: check the pull request changes exactly one file under `club-packs/packs/`, that the guardrails check passed, then merge. Agents re-verify every source when they reuse a pack, so mistakes cost the next reader time, not safety.
