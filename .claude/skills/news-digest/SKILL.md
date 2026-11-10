---
name: news-digest
description: Use when a digest is due (last_digest older than digest_every_days, or never) or the member asks for news on their field. Builds the watchlist and writes a dated digest.
metadata:
  origin: custom
  stage: "5"
---

**What:** A short digest of what changed in the member's fields since the last one.
**How:** Read the feeds in `research/watchlist.md` (built from domain packs and active problems), pick 5–15 items, verify the links, and flag anything that affects the field map or bets.
**Objective:** Keep the member current without weekly searching, and catch new evidence that changes their map.

## Steps

1. If `research/watchlist.md` has no feeds, build it from:
   - every `research/domains/*.md ## News feeds`
   - default free feeds: arXiv category RSS, bioRxiv/medRxiv subject feeds, PubMed saved-search RSS, Google Alerts with RSS delivery, and regulator press pages
   - topics from active problems' `brief.md`
     Show the member the list and let them edit it.
2. Fetch each feed. Keep items newer than `last_digest`, or from the last 14 days if it's `never`.
3. Pick 5–15 items most relevant to the active problems. Prefer primary sources over news coverage.
4. Run `verify-sources` on the picked items in batches of 5. Drop anything that fails.
5. For each item, write the title, link, date, a one-line "why it matters to your problem", and a flag if it supports or contests a `field-map.md` row (cite the row) or bears on a bet in `bets.md`.
6. Set `last_digest: <today>` in `research/profile.md`.

## Output

- `research/watchlist.md` (first run, or when edited)
- `research/digests/<YYYY-MM-DD>.md`
- `research/profile.md` (`last_digest`)

## Exit check

The digest file exists with 5–15 verified items, or says "Quiet week: nothing relevant" with the feeds checked. `last_digest` is updated.
