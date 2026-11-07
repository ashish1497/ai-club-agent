---
id: "15"
title: "How should ads live inside chatbot answers?"
industry: marketing-adtech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "ASCI and Consumer Protection Act disclosure rules"
last_verified: 2026-11-08
level_fit: L3–L5
effort: month
skills: "experiment design, survey research, auction and game-theory basics, policy reading, data analysis"
---

**What:** How should auctions work when the ad sits inside a generated answer, and how much does sponsorship erode trust in the answer?
**How:** Theory: mechanism design. Practice (no lab): a user experiment comparing trust with and without sponsorship labels.
**Objective:** This decides how AI assistants are funded and whether users can trust them.

# 15. How should ads live inside chatbot answers?

## The open question

How should auctions work when the ad sits inside a generated answer, and how much does sponsorship erode trust in the answer?

## Why it matters

This decides how AI assistants are funded and whether users can trust them.

## Who cares

- Product or monetization lead at an AI assistant company
- Advertiser or agency media buyer
- Consumer-protection or advertising-standards regulator

## In scope

- Auction and pricing rules when an ad is part of, or next to, a generated answer
- How labels and placement affect whether users notice ads and trust answers
- Indian disclosure rules (ASCI Code, CCPA dark-patterns guidelines)

## Out of scope

- Building or deploying an ad system on a live chatbot
- Legal advice on compliance
- Deceptive or hidden-ad designs except as conditions studied with informed, consenting participants

## What is known

- A WWW 2024 best-paper study proposed a token-by-token auction in which advertisers' LLM agents bid to influence generated text, with second-price-style incentive properties. ([Mechanism Design for Large Language Models (Duetting et al.)](https://arxiv.org/abs/2310.10826))
- In a 179-person experiment, participants struggled to detect product ads embedded in chatbot responses and sometimes preferred responses containing hidden ads. ([Ads that Talk Back (Tang et al.)](https://arxiv.org/abs/2409.15436))
- OpenAI began testing ads in ChatGPT on 9 February 2026 for logged-in adult US users on Free and Go tiers, shown below answers and labelled as sponsored. ([Search Engine Journal - OpenAI begins testing ads in ChatGPT](https://www.searchenginejournal.com/openai-begins-testing-ads-in-chatgpt-for-free-and-go-users/566869))
- India's Central Consumer Protection Authority notified dark-patterns guidelines on 30 November 2023 that list 'disguised advertisement' as a specified dark pattern. ([SCC Online - CCPA notifies Guidelines for Prevention and Regulation of Dark Patterns, 2023](https://www.scconline.com/blog/post/2023/12/04/ccpa-notifies-guidelines-for-prevention-and-regulation-of-dark-patterns-2023-legal-news/))

## What is unknown

- Placement, disclosure and trust effects inside generated answers.

## Key terms

- **Mechanism design**: Designing the rules of an auction or market so participants' self-interested choices lead to a desired outcome.
- **Native ad**: An ad made to look like the surrounding content rather than a separate banner.
- **Sponsorship disclosure**: A clear label telling users that content is paid for.
- **Disguised advertisement**: Under Indian rules, an ad presented so users do not realise it is an ad.
- **Answer independence**: The promise that payments do not change what the AI actually recommends.

## Possible angles

- **Theory:** mechanism design
- **Practice (no lab):** a user experiment comparing trust with and without sponsorship labels

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                               | Type      | Link                                     |
| ------------------------------------------------------ | --------- | ---------------------------------------- |
| Mechanism Design for Large Language Models (paper)     | paper     | https://arxiv.org/abs/2310.10826         |
| Ads that Talk Back (user study paper)                  | paper     | https://arxiv.org/abs/2409.15436         |
| The ASCI Code (Advertising Standards Council of India) | regulator | https://www.ascionline.in/the-asci-code/ |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

ASCI disclosure rules apply.

## Funding evidence

| Funder / company                 | What            | Date    | Link                                                                               | Evidence |
| -------------------------------- | --------------- | ------- | ---------------------------------------------------------------------------------- | -------- |
| Theory Ventures (lead) into Koah | $20.5M Series A | 2026-02 | https://siliconangle.com/2026/02/24/koah-raises-20-5m-scale-adsense-ai-across-apps | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- ASCI and Consumer Protection Act disclosure rules.

## Leads to check

Not verified when this file was written; never treat as fact.

- OpenAI's own pages 'Our approach to advertising' (Jan 2026) and 'Testing ads in ChatGPT' (openai.com returned 403; details were confirmed via Search Engine Journal and MacRumors)
- Official text of the CCPA dark-patterns guidelines on a government site (Not fetched; a legal news summary was used)
- ASCI guidelines on labelling synthetically generated content in ads (September 2026) (The press-release PDF was reached but its text could not be read)
