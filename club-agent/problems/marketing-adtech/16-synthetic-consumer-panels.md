---
id: "16"
title: "Can synthetic consumers replace market research?"
industry: marketing-adtech
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "Survey consent; Rights over interview data used for training"
last_verified: 2026-11-08
level_fit: L2–L5
effort: semester
skills: "survey design, fieldwork and interviews, statistics, prompt engineering, research ethics and consent"
---

**What:** For which segments do LLM-simulated consumers reproduce real survey results, and where do they fail systematically?
**How:** Theory: external validity and representativeness. Practice (no lab): run the same survey on real Indian respondents (Tier-2/3 included) and on synthetic ones, then compare.
**Objective:** Cheap synthetic research could replace expensive panels, if it is valid.

# 16. Can synthetic consumers replace market research?

## The open question

For which segments do LLM-simulated consumers reproduce real survey results, and where do they fail systematically?

## Why it matters

Cheap synthetic research could replace expensive panels, if it is valid.

## Who cares

- Consumer-insights or market-research manager at an FMCG or consumer brand
- Market-research agency head evaluating synthetic-panel vendors
- Product manager at a synthetic-research startup

## In scope

- Comparing LLM-simulated survey answers with real respondents' answers on the same questions
- Which segments (region, language, income, age, urban or rural) are matched or missed
- Indian consumers, including Tier-2 and Tier-3 towns

## Out of scope

- Using real people's interview data to train models without consent
- Building a commercial synthetic-panel product
- Election or political-opinion forecasting

## What is known

- LLM agents built from interviews with real people replicated their General Social Survey answers at 86% of the people's own two-week test-retest consistency; demographics-only agents reached 74%. ([LLM Agents Grounded in Self-Reports Enable General-Purpose Simulation of Individuals (Park et al.)](https://arxiv.org/abs/2411.10109))
- ChatGPT personas matched average US election-survey responses but about 48% of regression coefficients differed significantly from the human data, and results shifted with prompt changes and over time. ([Synthetic Replacements for Human Survey Data? The Perils of Large Language Models (Bisbee et al., Political Analysis 2024)](https://www.cambridge.org/core/product/B92267DC26195C7F36E63EA04A47D2FE))
- Language models showed substantial misalignment with the opinions of 60 US demographic groups, and it persisted even when models were steered toward a group. ([Whose Opinions Do Language Models Reflect? (Santurkar et al.)](https://arxiv.org/abs/2303.17548))
- On cross-national survey questions, a model's default answers were more similar to opinions in the USA and some European and South American countries than elsewhere. ([Towards Measuring the Representation of Subjective Global Opinions in Language Models (Durmus et al.)](https://arxiv.org/abs/2306.16388))

## What is unknown

- Independent audits of those claims.
- Failure modes across cultures.

## Key terms

- **Synthetic respondent (silicon sample)**: An AI model prompted to answer a survey as if it were a particular kind of person.
- **External validity**: Whether a result holds outside the setting where it was measured.
- **Representativeness**: Whether a sample reflects the population you care about.
- **Test-retest reliability**: How consistently the same person answers the same question at two different times.
- **Tier-2/3 towns**: Smaller Indian cities below the largest metros, often under-sampled in online panels.

## Possible angles

- **Theory:** external validity and representativeness
- **Practice (no lab):** run the same survey on real Indian respondents (Tier-2/3 included) and on synthetic ones, then compare

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                                            | Type     | Link                                                                                                                          |
| --------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| GlobalOpinionQA dataset (includes India samples, from World Values Survey and Pew Global Attitudes) | dataset  | https://huggingface.co/datasets/Anthropic/llm_global_opinions                                                                 |
| OpinionQA code and data links                                                                       | dataset  | https://github.com/tatsu-lab/opinions_qa                                                                                      |
| ESOMAR - 20 Questions to help buyers of AI-based services for market research                       | standard | https://esomar.org/newsroom/esomar-launches-20-questions-to-help-buyers-of-ai-based-services-for-market-research-and-insights |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Whether models trained on Western data represent Indian consumers.

## Funding evidence

| Funder / company                   | What                                                           | Date    | Link                                                                                                              | Evidence |
| ---------------------------------- | -------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| Greenoaks (lead) into Simile       | More than $200M Series B at a $2B post-money valuation         | 2026-07 | https://pulse2.com/simile-raises-over-200-million-in-series-b-at-a-2-billion-valuation/                           | verified |
| Redpoint Ventures (lead) into Aaru | Series A at a $1B headline valuation (blended valuation lower) | 2025-12 | https://techcrunch.com/2025/12/05/ai-synthetic-research-startup-aaru-raised-a-series-a-at-a-1b-headline-valuation | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- Survey consent.
- Rights over interview data used for training.

## Leads to check

Not verified when this file was written; never treat as fact.

- Vendor claims of high agreement between synthetic and real surveys (No vendor validation report was opened; claims remain vendor-reported)
- World Values Survey India wave data access (The WVS site was reached but the page did not confirm India coverage or download terms)
- Simile's own Series B announcement (Only news coverage (Pulse 2.0) was opened)
