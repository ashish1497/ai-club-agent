---
id: "12"
title: "Does virtual try-on cut returns or create new ones?"
industry: ecommerce-retail
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "Body and biometric data; Misleading product depiction"
last_verified: 2026-11-08
level_fit: L2–L5
effort: month
skills: "experiment design, consumer behaviour theory, data analysis, interviews with brand returns teams, privacy policy reading"
---

**What:** Do generative try-ons reduce fashion returns, or do they inflate expectations and cause 'doesn't look like the render' returns?
**How:** Theory: expectation-disconfirmation theory. Practice (no lab): an A/B test design with an Indian apparel brand.
**Objective:** Returns are a major cost in online fashion.

# 12. Does virtual try-on cut returns or create new ones?

## The open question

Do generative try-ons reduce fashion returns, or do they inflate expectations and cause 'doesn't look like the render' returns?

## Why it matters

Returns are a major cost in online fashion.

## Who cares

- Head of e-commerce or CX at an Indian apparel brand
- Returns and reverse-logistics manager at a fashion marketplace
- Product manager at a virtual try-on technology vendor

## In scope

- Causal effect of generative (AI-rendered) try-on on fashion return rates
- Whether try-on raises expectations that the delivered product then fails to meet
- Distinguishing fit-related returns from look- or colour-related returns
- Designing an experiment a brand could run, without running it on real customers unasked

## Out of scope

- Collecting body images or measurements of real people without consent
- Building a production try-on model
- Legal advice on DPDP Act or advertising standards
- Return-to-origin (RTO) caused by cash-on-delivery refusals, unless explicitly reframed

## What is known

- A randomized field experiment with an online apparel retailer found that offering virtual fit information raised conversion and order value, lowered return-related fulfilment costs and reduced ordering multiple sizes. ([Gallino and Moreno: The Value of Fit Information in Online Retail (MSOM, 2018)](https://ideas.repec.org/a/inm/ormsom/v20y2018i4p767-787.html))
- Field evidence shows virtual fitting rooms can reduce return rates and lift sales, but personalised versions can fail to raise sales when paired with conventional product images because self-discrepancy becomes salient. ([Yang and Xiong: Try It On! Contingency Effects of Virtual Fitting Rooms (JMIS, 2019)](https://jmis-web.org/articles/1444))
- NRF and Happy Returns estimated a 15.8% overall US retail return rate in 2025 and 19.3% for online sales. ([NRF: Consumers expected to return nearly $850 billion in merchandise in 2025](https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025))
- Doji, which builds a realistic avatar from user photos to show outfits, could not yet show how an item would fit at the time of its May 2025 seed round. ([TechCrunch: Doji raises $14M to make virtual try-ons fun through AI avatars](https://techcrunch.com/2025/05/15/doji-raises-14m-to-make-virtual-try-ons-fun-through-ai-avatars))

## What is unknown

- Causal evidence on returns; most evidence today comes from vendors.

## Key terms

- **Virtual try-on (generative)**: An AI-generated image or video of a garment on a person or avatar, rather than a real photo.
- **Fit vs look**: Fit is whether the size and cut work on the body; look is how the colour, fabric and style appear. Try-ons can help one and not the other.
- **Expectation-disconfirmation**: The idea that satisfaction depends on how the actual product compares with what the customer expected before buying.
- **Bracketing / home try-on**: Ordering several sizes or variants on purpose, planning to return most of them.
- **RTO (return to origin)**: An order sent back before delivery, often a refused cash-on-delivery parcel; different from a post-delivery return.

## Possible angles

- **Theory:** expectation-disconfirmation theory
- **Practice (no lab):** an A/B test design with an Indian apparel brand

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                   | Type   | Link                                                                                                               |
| -------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| The Value of Fit Information in Online Retail: randomized field experiment | paper  | https://ideas.repec.org/a/inm/ormsom/v20y2018i4p767-787.html                                                       |
| Try It On! Contingency Effects of Virtual Fitting Rooms                    | paper  | https://jmis-web.org/articles/1444                                                                                 |
| NRF 2025 Retail Returns Landscape press release                            | report | https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025 |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

High return and RTO rates in Indian apparel.

## Funding evidence

| Funder / company | What                                                  | Date    | Link                                                                                             | Evidence |
| ---------------- | ----------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------ | -------- |
| Doji             | $14M seed led by Thrive Capital, with Seven Seven Six | 2025-05 | https://techcrunch.com/2025/05/15/doji-raises-14m-to-make-virtual-try-ons-fun-through-ai-avatars | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- Body and biometric data.
- Misleading product depiction.

## Leads to check

Not verified when this file was written; never treat as fact.

- Indian online apparel return rates of roughly 25-40% and claims that over 40% of returns are size-related (Return Prime, Unicommerce, logistics vendor blogs). (Seen only in search snippets and vendor blogs; the India Retailing article opened showed only the headline.)
- Oliver (1980), A Cognitive Model of the Antecedents and Consequences of Satisfaction Decisions, Journal of Marketing Research 17(4), the origin of expectation-disconfirmation theory. (Publisher page returned 403.)
- Any causal study of generative (diffusion-based) try-on, as opposed to older fit tools, on returns. (None found; existing field experiments cover size/fit tools from 2018-2019.)
