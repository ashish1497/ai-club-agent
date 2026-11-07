---
id: "10"
title: "When AI agents shop, how do they pick brands?"
industry: ecommerce-retail
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "Agent platform terms on automated querying; Manipulating agents could be deceptive"
last_verified: 2026-11-08
level_fit: L2–L5
effort: month
skills: "audit design, prompt logging, data analysis, marketing strategy, reading platform terms, interviews with D2C brand teams"
---

**What:** What decides which brands an LLM shopping agent shortlists, and can brands influence that without degrading the agent's answers?
**How:** Theory: consumer choice when the decision-maker is an algorithm. Practice (no lab): audit how often agents recommend Indian D2C brands versus marketplace incumbents.
**Objective:** If agents do the shopping, brand building and marketplace search change.

# 10. When AI agents shop, how do they pick brands?

## The open question

What decides which brands an LLM shopping agent shortlists, and can brands influence that without degrading the agent's answers?

## Why it matters

If agents do the shopping, brand building and marketplace search change.

## Who cares

- Growth or marketplace head at an Indian D2C brand
- Category or search manager at an e-commerce marketplace
- Brand strategist or agency planner advising on AI-era discovery

## In scope

- Which product and brand attributes are associated with being shortlisted by LLM shopping assistants
- Differences between Indian D2C brands and marketplace incumbents in agent recommendations
- Where legitimate catalogue improvement ends and manipulation of agents begins
- Measurement design that respects platform terms on automated querying

## Out of scope

- Building prompt-injection or hidden-text techniques to game agents
- Large-scale scraping that breaks a platform's terms of service
- Running paid campaigns or changing a real brand's listings
- Legal advice on consumer-protection or advertising law

## What is known

- Adding a crafted text sequence to a product's information page substantially increased the chance an LLM listed that product as its top recommendation in tests with fictitious coffee machines. ([Kumar and Lakkaraju: Manipulating Large Language Models to Increase Product Visibility (arXiv 2404.07981)](https://arxiv.org/abs/2404.07981))
- Generative Engine Optimization methods raised content visibility in generative engine answers by up to 40%, with effectiveness varying by domain. ([Aggarwal et al.: GEO: Generative Engine Optimization (KDD 2024)](https://arxiv.org/abs/2311.09735))
- OpenAI and Stripe developed the Agentic Commerce Protocol, an open Apache-2.0 standard that lets AI agents start checkout with businesses and pass payment tokens without exposing card credentials. ([Agentic Commerce Protocol (agenticcommerce.dev)](https://www.agenticcommerce.dev/))
- ReFiBuy, which checks how AI shopping agents interpret each product and redistributes enriched catalogue data, raised a $13.6M seed round in May 2026. ([ReFiBuy press release (Newswire)](https://www.newswire.com/news/refibuy-raises-13-6m-oversubscribed-seed-round-to-accelerate-agentic-commerce))

## What is unknown

- How agents rank products; it is opaque and changes with each model version.
- Whether brand equity still matters to an agent.

## Key terms

- **LLM shopping agent**: An AI assistant that searches, compares and sometimes buys products on a person's behalf.
- **Shortlist / consideration set**: The few brands an agent actually shows or recommends, out of everything it could have picked.
- **Generative Engine Optimization (GEO)**: Changing content so that AI answer engines are more likely to cite or recommend it, the AI-era cousin of SEO.
- **Product feed**: A structured file of product data (title, price, stock, attributes) that a merchant sends to a platform or agent.
- **Brand equity**: The value a brand name adds beyond the product itself, built through reputation and awareness.

## Possible angles

- **Theory:** consumer choice when the decision-maker is an algorithm
- **Practice (no lab):** audit how often agents recommend Indian D2C brands versus marketplace incumbents

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                          | Type     | Link                             |
| ----------------------------------------------------------------- | -------- | -------------------------------- |
| GEO: Generative Engine Optimization (with GEO-bench)              | paper    | https://arxiv.org/abs/2311.09735 |
| Manipulating Large Language Models to Increase Product Visibility | paper    | https://arxiv.org/abs/2404.07981 |
| Agentic Commerce Protocol specification site                      | standard | https://www.agenticcommerce.dev/ |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

D2C brands dependent on marketplace search are exposed.

## Funding evidence

| Funder / company | What                                                                         | Date    | Link                                                                                                                                         | Evidence |
| ---------------- | ---------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| ReFiBuy          | $13.6M seed led by NewRoad Capital Partners                                  | 2026-05 | https://www.newswire.com/news/refibuy-raises-13-6m-oversubscribed-seed-round-to-accelerate-agentic-commerce                                  | verified |
| Spangle AI       | $15M Series A led by NewRoad Capital Partners, with Madrona and DNX Ventures | 2026-01 | https://retailtechinnovationhub.com/home/2026/1/7/spangle-ai-a-startup-launched-by-former-amazon-executives-raises-15-million-series-a-round | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- Agent platform terms on automated querying.
- Manipulating agents could be deceptive.

## Leads to check

Not verified when this file was written; never treat as fact.

- Spangle AI primary press release on Business Wire (8 Jan 2026). (Business Wire and GeekWire returned 403; only trade coverage opened.)
- Reports that OpenAI scaled back ChatGPT Instant Checkout in March 2026 and that ACP includes a Product Feed spec. (Seen only in third-party glossaries; the ACP site I opened did not mention a product feed spec.)
- Data on how often AI agents recommend Indian D2C brands versus marketplace incumbents. (No published study found.)
