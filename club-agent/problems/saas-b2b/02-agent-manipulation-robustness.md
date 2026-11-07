---
id: "02"
title: "Can an agent be made robust to manipulation through what it reads?"
industry: saas-b2b
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "Focus on defences; test only systems you own; Don't publish working exploits"
last_verified: 2026-11-08
level_fit: L3–L5
effort: month
skills: "security reasoning, threat modelling, basic Python, benchmark design, reading research papers"
---

**What:** Is there an architecture that provably bounds what untrusted text (emails, PDFs, web pages) can make an agent do, or is prompt injection unsolvable in principle?
**How:** Theory: information-flow control for LLM agents. Practice (no lab): a defensive benchmark on Indian enterprise documents, run only in your own sandbox.
**Objective:** Without a security model, enterprises can't let agents act on real data.

# 02. Can an agent be made robust to manipulation through what it reads?

## The open question

Is there an architecture that provably bounds what untrusted text (emails, PDFs, web pages) can make an agent do, or is prompt injection unsolvable in principle?

## Why it matters

Without a security model, enterprises can't let agents act on real data.

## Who cares

- CISO or security architect approving agent deployments
- Head of AI platform at an enterprise letting agents read email and documents
- Product lead at an agent runtime-security vendor

## In scope

- Indirect prompt injection through emails, PDFs, web pages and tool outputs
- Architectural defences that bound what untrusted text can trigger
- Defensive benchmarks run only in a sandbox the team owns
- Mapping the trade-off between security guarantees and task success

## Out of scope

- Attacking third-party or production systems
- Publishing working exploits or attack payloads
- Jailbreaks aimed at extracting harmful content
- Legal advice on liability for breaches

## What is known

- Indirect prompt injection lets an attacker steer an LLM-integrated application by planting instructions in content it later retrieves, because such apps blur the line between data and instructions. ([Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection](https://arxiv.org/abs/2302.12173))
- OWASP states it is unclear whether fool-proof methods of preventing prompt injection exist, and lists mitigations that reduce impact instead. ([OWASP Gen AI Security Project: LLM01 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/))
- The CaMeL design separates trusted control flow from untrusted data and solved 77% of AgentDojo tasks with provable security, versus 84% for an undefended system. ([Defeating Prompt Injections by Design](https://arxiv.org/abs/2503.18813))
- AgentDojo provides 97 realistic agent tasks and 629 security test cases for evaluating prompt injection attacks and defences. ([AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents](https://arxiv.org/abs/2406.13352))

## What is unknown

- Any formal security model for agents that act on untrusted language.

## Key terms

- **Prompt injection**: Text that tricks a language model into following instructions the user or developer did not intend.
- **Indirect prompt injection**: Injection that arrives through content the agent reads, such as an email or web page, rather than from the user.
- **Information-flow control**: Tracking where data came from and restricting what untrusted data is allowed to influence.
- **Utility-security trade-off**: How much useful task performance a defence costs in exchange for its protection.
- **Sandbox**: An isolated test environment the team owns, where nothing real can be harmed.

## Possible angles

- **Theory:** information-flow control for LLM agents
- **Practice (no lab):** a defensive benchmark on Indian enterprise documents, run only in your own sandbox

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                  | Type     | Link                                                    |
| --------------------------------------------------------- | -------- | ------------------------------------------------------- |
| AgentDojo benchmark (MIT licence)                         | dataset  | https://github.com/ethz-spylab/agentdojo                |
| OWASP LLM01 Prompt Injection                              | standard | https://genai.owasp.org/llmrisk/llm01-prompt-injection/ |
| Defeating Prompt Injections by Design (CaMeL)             | paper    | https://arxiv.org/abs/2503.18813                        |
| NIST AI 100-2 E2025 Adversarial Machine Learning taxonomy | standard | https://csrc.nist.gov/pubs/ai/100/2/e2025/final         |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Indian enterprises adopting agents face the same exposure.

## Funding evidence

| Funder / company | What                                                                 | Date    | Link                                                                                        | Evidence |
| ---------------- | -------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------- | -------- |
| Rein Security    | $25M Series A (co-led by Glilot Capital and Sienna Venture Capital)  | 2026-10 | https://pulse2.com/rein-security-raises-25-million-series-a-to-secure-enterprise-ai-agents/ | verified |
| Capsule Security | $7M seed (led by Lama Partners and Forgepoint Capital International) | 2026-04 | https://helpnetsecurity.com/2026/04/15/capsule-security-platform/                           | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- Focus on defences; test only systems you own.
- Don't publish working exploits.

## Leads to check

Not verified when this file was written; never treat as fact.

- Whether NIST AI 100-2 E2025 covers indirect prompt injection in detail (The landing page fetched did not mention prompt injection; full PDF not read)
