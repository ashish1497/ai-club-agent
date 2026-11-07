---
id: "30"
title: "How do we know a health chatbot is safe in Indian languages?"
industry: frontier-science
seat: frontier-wildcard
status: open
funding_strength: strong
risk_flags: "No real patient data; No medical advice"
last_verified: 2026-11-08
level_fit: L2–L5
effort: month
skills: "survey and rubric design, translation, interviews, basic Python, evaluation design"
---

**What:** How should we measure whether an LLM health assistant is accurate and safe for low-literacy users who speak Indian languages?
**How:** Theory: rubric validity across languages. Practice (no lab): a small Hindi, Marathi or Tamil test set used to evaluate open models.
**Objective:** English benchmarks don't carry over to the people most likely to rely on these tools.

# 30. How do we know a health chatbot is safe in Indian languages?

## The open question

How should we measure whether an LLM health assistant is accurate and safe for low-literacy users who speak Indian languages?

## Why it matters

English benchmarks don't carry over to the people most likely to rely on these tools.

## Who cares

- Public-health programme managers deploying chatbots for frontline workers or patients
- Health-AI developers and evaluators building Indic-language products
- Regulators and ethics bodies (e.g. ICMR, state health departments) setting validation expectations

## In scope

- How existing health benchmarks and rubrics are built and whether they transfer across languages
- What 'safe' and 'accurate' should mean for low-literacy users
- Small, synthetic or public test questions in Hindi, Marathi or Tamil

## Out of scope

- Using real patient data or records
- Giving medical advice or validating clinical decisions
- Deploying a chatbot to real users

## What is known

- The Gates Foundation granted $972,192 (Nov 2025, 14 months) to IFRE to run blinded evaluations of health-AI models with multilingual, locally relevant rubrics. ([Gates Foundation committed grant INV-096588](https://www.gatesfoundation.org/about/committed-grants/2025/11/inv-096588))
- HealthBench evaluates LLMs on 5,000 multi-turn health conversations using 48,562 rubric criteria written by 262 physicians. ([HealthBench: Evaluating Large Language Models Towards Improved Human Health](https://arxiv.org/abs/2505.08775))
- A study of 24 LLMs on real Indian patient queries found factual correctness generally lower for Indic-language queries than for English. ([HEALTH-PARIKSHA: Assessing RAG Models for Health Chatbots in Real-World Multilingual Settings](https://arxiv.org/abs/2410.13671))
- ICMR's 2023 guidelines set ethical principles, review and governance for AI in Indian biomedical research and healthcare. ([ICMR: Ethical Guidelines for Application of AI in Biomedical Research and Healthcare](https://www.icmr.gov.in/ethical-guidelines-for-application-of-artificial-intelligence-in-biomedical-research-and-healthcare))

## What is unknown

- A validated multilingual benchmark tied to real-world safety.

## Key terms

- **Rubric-based evaluation**: Scoring answers against a checklist of what a good response must and must not contain.
- **Validity**: Whether a test actually measures the thing it claims to measure, here real-world safety.
- **Cross-lingual transfer**: Whether results or tools built in one language hold up in another.
- **Low literacy**: Limited reading ability, which changes how people phrase questions and understand answers.
- **Blinded evaluation**: Graders score answers without knowing which model produced them.

## Possible angles

- **Theory:** rubric validity across languages
- **Practice (no lab):** a small Hindi, Marathi or Tamil test set used to evaluate open models

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                             | Type      | Link                                                  |
| ---------------------------------------------------- | --------- | ----------------------------------------------------- |
| HealthBench paper                                    | paper     | https://arxiv.org/abs/2505.08775                      |
| OpenAI simple-evals repo (includes HealthBench code) | tool      | https://github.com/openai/simple-evals                |
| MedMCQA (Indian medical entrance exam questions)     | dataset   | https://arxiv.org/abs/2203.14371                      |
| WHO guidance on large multi-modal models for health  | regulator | https://www.who.int/publications/i/item/9789240084759 |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

India-specific by design.

## Funding evidence

| Funder / company | What                                                                                    | Date    | Link                                                                      | Evidence |
| ---------------- | --------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------- | -------- |
| Gates Foundation | $972,192 grant to International Foundation for Research and Education (IFRE), 14 months | 2025-11 | https://www.gatesfoundation.org/about/committed-grants/2025/11/inv-096588 | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- No real patient data.
- No medical advice.

## Leads to check

Not verified when this file was written; never treat as fact.

- Second IFRE Delhi Gates grant of $383,295 (inv-085290) (Seen only in search results; purpose not checked)
- HiMed Hindi medical benchmark reporting a large English-Hindi gap (Numbers seen only on third-party leaderboard pages)
- Multi-OphthaLingua benchmark (GPT-4 63.4% English vs 50.6% Hindi) (Seen only in search snippets)
