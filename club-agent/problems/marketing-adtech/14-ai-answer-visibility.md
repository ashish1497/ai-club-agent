---
id: "14"
title: "Can brand visibility inside AI answers be measured?"
industry: marketing-adtech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "Platform terms on automated querying"
last_verified: 2026-11-08
level_fit: L2–L5
effort: month
skills: "measurement design, statistics, data collection, content analysis, Hindi or regional-language skills"
---

**What:** Can a brand's share of voice in AI answers be measured reliably when answers vary by run, model and prompt, and which content changes actually move it?
**How:** Theory: measurement validity under random outputs. Practice (no lab): an open benchmark for Indian categories, including Hinglish queries.
**Objective:** Search is shifting to AI answers; brands need to know where they stand.

# 14. Can brand visibility inside AI answers be measured?

## The open question

Can a brand's share of voice in AI answers be measured reliably when answers vary by run, model and prompt, and which content changes actually move it?

## Why it matters

Search is shifting to AI answers; brands need to know where they stand.

## Who cares

- Brand or SEO lead at a consumer company
- Product manager at an AI-visibility or analytics vendor
- Digital marketing agency strategist

## In scope

- How to define and measure a brand's presence in AI-generated answers
- How stable those measurements are across repeated runs, models and prompt wording
- Indian product categories and Hindi, Hinglish or other Indian-language queries

## Out of scope

- Manipulating or spamming AI systems to inflate visibility
- Automated querying that breaks platform terms of service
- Building a commercial tracking product
- Paid advertising inside AI answers (see problem 15)

## What is known

- The GEO paper (KDD 2024) introduced GEO-bench and reported that content changes could increase source visibility in generative engine answers by up to 40%, with effects varying by domain. ([GEO: Generative Engine Optimization (Aggarwal et al.)](https://arxiv.org/abs/2311.09735))
- In March 2025 browsing data from 900 US adults, users clicked a traditional search result in 8% of visits when a Google AI summary appeared, versus 15% when none appeared. ([Pew Research Center - Google users are less likely to click on links when an AI summary appears](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/))
- A January 2026 study by SparkToro and Gumshoe.ai found ChatGPT and Google's AI returned the same brand list less than 1% of the time across repeated runs of the same prompt. ([Search Engine Journal - AI recommendations change with nearly every query (SparkToro study)](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242))
- Google said in July 2025 that AI Overviews had about 2 billion monthly users and AI Mode over 100 million monthly active users, with AI Mode then available in the US and India. ([TechCrunch - Google's AI Overviews have 2B monthly users](https://techcrunch.com/2025/07/23/googles-ai-overviews-have-2b-monthly-users-ai-mode-100m-in-the-us-and-india))

## What is unknown

- A standard metric.
- Ground truth.
- Reproducibility of results.

## Key terms

- **Share of voice (in AI answers)**: How often, and how prominently, a brand is mentioned compared with competitors across a set of AI answers.
- **Generative engine optimization (GEO)**: Changing web content so that AI answer engines are more likely to cite or mention it.
- **Non-determinism**: The same question to the same AI can give different answers on different runs.
- **Reproducibility**: Whether another person repeating the same measurement gets the same result.
- **Hinglish**: Hindi and English mixed in one query, often written in Latin script.

## Possible angles

- **Theory:** measurement validity under random outputs
- **Practice (no lab):** an open benchmark for Indian categories, including Hinglish queries

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                         | Type     | Link                                                                                                                                         |
| -------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| GEO code and GEO-bench benchmark                                                 | dataset  | https://github.com/GEO-optim/GEO                                                                                                             |
| Pew Research Center study on AI summaries and clicks                             | report   | https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/ |
| Google Search Central - AI features and your website                             | standard | https://developers.google.com/search/docs/appearance/ai-features                                                                             |
| MediaNama - Google AI Mode expands to Hindi and four other languages (Sept 2025) | report   | https://www.medianama.com/2025/09/223-google-ai-expands-to-5-new-languages/                                                                  |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Hinglish and Indian-language queries are under-measured.

## Funding evidence

| Funder / company                                 | What                             | Date    | Link                                                                                                              | Evidence |
| ------------------------------------------------ | -------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| Lightspeed Venture Partners (lead) into Profound | $96M Series C at a $1B valuation | 2026-02 | https://www.tryprofound.com/newsroom/profound-raises-series-c-at-1b-valuation-to-lead-a-new-category-of-marketing | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- Platform terms on automated querying.

## Leads to check

Not verified when this file was written; never treat as fact.

- SparkToro's original blog post on AI brand-recommendation inconsistency (sparktoro.com returned 403; the finding was confirmed through Search Engine Journal coverage)
- Reports of a later Profound Series D (about $180M, September 2026) (Seen only in search snippets; no primary page opened)
- Any public dataset of Hinglish or Indian-language shopping queries (None found and opened during this research)
