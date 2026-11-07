---
id: "13"
title: "How do you measure ad lift when no human saw the ad?"
industry: ecommerce-retail
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "None beyond the core rules"
last_verified: 2026-11-08
level_fit: L3–L5
effort: semester
skills: "causal inference, experiment design, data analysis, marketing analytics, interviews with retail media teams"
---

**What:** How do you measure the causal effect of advertising without cookies, inside walled gardens, and when AI agents make purchases with no human impression?
**How:** Theory: causal inference when the exposed party is an agent. Practice (no lab): geo-lift tests used to calibrate a marketing-mix model.
**Objective:** Retail media budgets depend on proving lift.

# 13. How do you measure ad lift when no human saw the ad?

## The open question

How do you measure the causal effect of advertising without cookies, inside walled gardens, and when AI agents make purchases with no human impression?

## Why it matters

Retail media budgets depend on proving lift.

## Who cares

- Retail media network head at a marketplace or quick-commerce platform
- Brand marketing or performance-marketing lead deciding media budgets
- Measurement and attribution vendor product manager

## In scope

- Causal (incremental) effect of ads on sales, not clicks or impressions alone
- Settings with limited user-level tracking: walled gardens and reduced cookie use
- Purchases completed by AI shopping agents on a human's behalf
- Indian marketplace retail media as the main context

## Out of scope

- Building ad-serving or bidding systems
- Collecting personal data or tracking users without consent
- Legal advice on privacy law compliance
- Running live paid campaigns with real budgets

## What is known

- In 15 US advertising experiments at Facebook, common observational methods often failed to reproduce the lift measured by randomized experiments. ([A Comparison of Approaches to Advertising Measurement (Gordon et al., Marketing Science 2019) - Kellogg summary](https://www.kellogg.northwestern.edu/academics-research/research/detail/2019/a-comparison-of-approaches-to-advertising-measurement-evidence-from/))
- IAB and the Media Rating Council released final Retail Media Measurement Guidelines in January 2024 to make retail media measurement more transparent and consistent. ([IAB - Final IAB/MRC Retail Media Measurement Guidelines](https://www.iab.com/guidelines/final-iab-mrc-retail-media-measurement-guidelines-available-for-download/))
- In July 2024 Google said it would no longer deprecate third-party cookies in Chrome and would instead offer users a choice. ([Digiday - Google says it won't be deprecating third-party cookies in Chrome](https://digiday.com/marketing/after-years-of-uncertainty-google-says-it-wont-be-deprecating-third-party-cookies-in-chrome))
- OpenAI launched Instant Checkout in ChatGPT on 29 September 2025 and open-sourced the Agentic Commerce Protocol built with Stripe, so purchases can be completed inside a chat. ([Search Engine Roundtable - ChatGPT Gets Instant Checkout With Agentic Commerce Protocol](https://www.seroundtable.com/openai-chatgpt-instant-checkout-with-agentic-commerce-protocol-40194.html))

## What is unknown

- Any method that handles exposure by agents.

## Key terms

- **Incrementality (lift)**: Sales that happened because of the ad and would not have happened without it.
- **Geo-lift test**: An experiment where ads run in some regions and not others, and outcomes are compared between them.
- **Marketing-mix model (MMM)**: A statistical model that estimates how much each marketing channel contributed to sales using aggregate data over time.
- **Walled garden**: A large platform that keeps user-level ad and purchase data inside its own systems and shares only summaries.
- **Agentic commerce**: Shopping where an AI agent searches, chooses or pays for products on a person's behalf.

## Possible angles

- **Theory:** causal inference when the exposed party is an agent
- **Practice (no lab):** geo-lift tests used to calibrate a marketing-mix model

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                                               | Type     | Link                                                                                                     |
| ------------------------------------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------- |
| GeoLift (Meta open-source R package for geographic lift tests)                                         | tool     | https://github.com/facebookincubator/GeoLift                                                             |
| Meridian (Google open-source marketing-mix modelling framework, supports calibration with experiments) | tool     | https://github.com/google/meridian                                                                       |
| IAB/MRC Retail Media Measurement Guidelines                                                            | standard | https://www.iab.com/guidelines/final-iab-mrc-retail-media-measurement-guidelines-available-for-download/ |
| Agentic Commerce Protocol specification (OpenAI and Stripe)                                            | standard | https://github.com/agentic-commerce-protocol/agentic-commerce-protocol                                   |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Retail media is growing fast on Indian marketplaces.

## Funding evidence

| Funder / company                                | What                                                                                                                     | Date    | Link                                                                                         | Evidence  |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------- | --------- |
| Moloco, Google, Meta and Unity (into AppsFlyer) | Minority, non-controlling investments in AppsFlyer for AI-powered ad measurement; size not stated in the company release | 2026-06 | https://www.appsflyer.com/company/newsroom/pr/appsflyer-investment-moloco-google-meta-unity/ | verified  |
| Moloco, Google, Meta and Unity (into AppsFlyer) | Series E of over $1B at about $2.7B post-money valuation (amount as reported, originally by Axios)                       | 2026-06 | https://investgame.net/news/appsflyer-over-1b-series-e-from-google-meta-moloco-and-unity/    | secondary |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- None beyond the core rules.

## Leads to check

Not verified when this file was written; never treat as fact.

- Axios report that the AppsFlyer round exceeded $1B at a $2.7B valuation (axios.com returned 403; the amount was confirmed only on a secondary outlet, and AppsFlyer's own release does not state it)
- Gordon et al. (2019) full article on the Marketing Science site (pubsonline.informs.org returned 403; the claim is supported by the Kellogg summary page instead)
- OpenAI's own Instant Checkout announcement page (openai.com returned 403; a news report quoting it was used)
- Size and growth of retail media on Indian marketplaces (No primary public source with figures was found and opened)
