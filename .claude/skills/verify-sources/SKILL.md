---
name: verify-sources
description: Use when any claim, field-map row, domain-pack source or digest item is about to be shown to the member. Checks each source three ways; anything that fails goes to Leads to check.
metadata:
  origin: custom
  stage: "2"
---

**What:** Check that every source is real, matches what is cited, and actually supports the claim.
**How:** Three checks per source: identifier resolves, metadata matches, supporting quote. Pass, or move to "Leads to check".
**Objective:** Nothing invented ever reaches a member's field map (C1). This matters most in thin fields, where models are most tempted to make things up.

## Steps

For each source, in batches of 5:

1. **Identifier resolves.** Fetch the DOI, arXiv ID, PMID or URL. It must open the exact item. Never construct or guess an identifier. If you don't have one, the source fails.
2. **Metadata matches.** Title, authors or publisher, and date on the fetched page match the citation.
3. **Supporting quote.** Copy a short passage (≤ 40 words) from text the member can legitimately access that supports the specific claim.
   - If only the abstract is accessible, quote from it and tag the row `abstract-only`.
   - Don't use paywalled text you can't actually read.
4. **Pass:** add a row to `sources.md ## Verified sources` with the citation, identifier, quote and access level (`full` / `abstract-only`).
5. **Fail at any check:** add it to `sources.md ## Leads to check` with the check that failed and how the member could verify it by hand (for example, the library or emailing the author). Don't use it anywhere else.
6. Evidence type still applies to verified items. A verified company press release is still `industry claim`.
7. Report: "N verified, M moved to Leads to check."

## Output

- `research/problems/<slug>/sources.md` (`## Verified sources`, `## Leads to check`)

## Exit check

Every source used in the calling step is either in Verified sources with a quote, or in Leads to check. Zero exceptions.
