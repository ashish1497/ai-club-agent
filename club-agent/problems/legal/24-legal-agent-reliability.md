---
id: "24"
title: "How reliable is an autonomous legal agent?"
industry: legal
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "No legal advice to real parties; Confidentiality"
last_verified: 2026-11-08
level_fit: L3–L5
effort: semester
skills: "legal reading, statute analysis, evaluation design, data annotation, policy reading"
---

**What:** How do we measure legal reasoning errors (not only fake citations) in multi-step agent work, and who is liable for them?
**How:** Theory: an error taxonomy for legal reasoning. Practice (no lab): a benchmark on Indian statutes, including BNS.
**Objective:** Legal AI is scaling faster than ways to evaluate it.

# 24. How reliable is an autonomous legal agent?

## The open question

How do we measure legal reasoning errors (not only fake citations) in multi-step agent work, and who is liable for them?

## Why it matters

Legal AI is scaling faster than ways to evaluate it.

## Who cares

- Law-firm knowledge-management and innovation heads buying legal AI
- Legal AI product and evaluation teams
- Bar councils, courts and regulators setting rules for AI use

## In scope

- Defining categories of legal reasoning error beyond fabricated citations (misreading, misapplying, outdated law)
- Reviewing existing legal AI benchmarks and what they do and do not measure
- Scoping an evaluation set on public Indian statutes such as the Bharatiya Nyaya Sanhita
- Mapping, at a descriptive level, who currently bears responsibility for AI errors in filings

## Out of scope

- Legal advice to any real party or on any live matter
- Using confidential client documents
- Building or selling a legal agent product
- Opining on the liability of named firms or vendors

## What is known

- Stanford researchers found leading AI legal research tools (Lexis+ AI and Westlaw AI products) hallucinated between 17% and 33% of the time, less than general GPT-4. ([Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools (arXiv, 2024)](https://arxiv.org/abs/2405.20362))
- On verifiable questions about random US federal cases, general LLMs hallucinated between 58% (GPT-4) and 88% (Llama 2) of the time. ([Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models (arXiv, 2024)](https://arxiv.org/abs/2401.01301))
- A public database lists 2,266 court decisions (as of 5 Nov 2026) addressing hallucinated AI content, tagging not only fabricated citations but also misrepresented authority, false quotes and outdated advice. ([AI Hallucination Cases Database (Damien Charlotin)](https://www.damiencharlotin.com/hallucinations/))
- LegalBench contains 162 tasks covering six types of legal reasoning, built with legal professionals. ([LegalBench: A Collaboratively Built Benchmark for Measuring Legal Reasoning in LLMs (arXiv, 2023)](https://arxiv.org/abs/2308.11462))

## What is unknown

- Measures of reasoning quality.
- Liability allocation.

## Key terms

- **Hallucination (legal)**: An AI output that states false law or facts, or cites authority that does not exist or does not say what is claimed.
- **Legal agent**: An AI system that performs multi-step legal work, such as research, drafting and checking, with little human input between steps.
- **Error taxonomy**: A structured list of the kinds of mistakes, so they can be counted and compared.
- **BNS (Bharatiya Nyaya Sanhita, 2023)**: India's new criminal code that replaced the Indian Penal Code from 1 July 2024.
- **Groundedness**: Whether each claim in an answer is actually supported by the sources it cites.

## Possible angles

- **Theory:** an error taxonomy for legal reasoning
- **Practice (no lab):** a benchmark on Indian statutes, including BNS

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                                       | Type    | Link                                            |
| ------------------------------------------------------------------------------ | ------- | ----------------------------------------------- |
| IL-TUR: Benchmark for Indian Legal Text Understanding and Reasoning (ACL 2024) | dataset | https://aclanthology.org/2024.acl-long.618      |
| LegalBench                                                                     | dataset | https://arxiv.org/abs/2308.11462                |
| AI Hallucination Cases Database (downloadable CSV)                             | dataset | https://www.damiencharlotin.com/hallucinations/ |
| Hallucination-Free? Assessing AI legal research tools                          | paper   | https://arxiv.org/abs/2405.20362                |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

India's new criminal codes create fresh ground for evaluation.

## Funding evidence

| Funder / company                   | What                    | Date    | Link                              | Evidence |
| ---------------------------------- | ----------------------- | ------- | --------------------------------- | -------- |
| Harvey (co-led by GIC and Sequoia) | $200M at $11B valuation | 2026-03 | https://techcrunch.com/?p=3105952 | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- No legal advice to real parties.
- Confidentiality.

## Leads to check

Not verified when this file was written; never treat as fact.

- Official BNS text on India Code and the MHA/PIB notice that BNS, BNSS and BSA took effect 1 July 2024 (PIB page returned 403; India Code not opened; date seen in multiple search results)
- Mata v. Avianca (S.D.N.Y., 22 June 2023) sanctions opinion as the leading fake-citation case (Seen in search results only; opinion PDF not opened)
- Peer-reviewed version of the Stanford legal-tool hallucination study (reportedly Journal of Empirical Legal Studies) (Only the arXiv version was opened)
- Indian court or Bar Council guidance on AI use in filings (Not searched in this pass)
