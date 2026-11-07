---
id: "01"
title: "When an enterprise AI agent fails, can the failure be diagnosed automatically?"
industry: saas-b2b
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "Use synthetic traces; real traces contain customer data"
last_verified: 2026-11-08
level_fit: L3–L5
effort: month
skills: "data analysis, taxonomy design, prompt and evaluation design, basic Python, reading research papers"
---

**What:** Can we pinpoint which step broke a long, multi-tool enterprise agent run, and automatically generate the test that would catch that failure next time?
**How:** Theory: credit assignment over non-deterministic action sequences. Practice (no lab): a failure taxonomy and an LLM-judge benchmark on simulated enterprise workflows.
**Objective:** Enterprises won't trust agents in production until failures can be diagnosed and prevented from recurring.

# 01. When an enterprise AI agent fails, can the failure be diagnosed automatically?

## The open question

Can we pinpoint which step broke a long, multi-tool enterprise agent run, and automatically generate the test that would catch that failure next time?

## Why it matters

Enterprises won't trust agents in production until failures can be diagnosed and prevented from recurring.

## Who cares

- Head of AI platform or agent engineering at an enterprise deploying agents
- QA and reliability lead at an Indian IT-services firm running agent workflows for clients
- Product manager at an agent observability or evaluation vendor

## In scope

- Long, multi-step, multi-tool agent runs in simulated enterprise workflows
- Locating the step or agent responsible for a failed run
- Turning a diagnosed failure into a reusable regression test
- Reliability of LLM judges as traces get longer

## Out of scope

- Real customer traces or production data
- Building or fine-tuning a new foundation model
- Fixing the agent's underlying business logic
- Security attacks on agents (see problem 02)

## What is known

- On the Who&When benchmark, the best automated method identified the failure-responsible agent about 53.5% of the time and the decisive error step only about 14.2% of the time. ([Which Agent Causes Task Failures and When? On Automated Failure Attribution of LLM Multi-Agent Systems](https://arxiv.org/abs/2505.00212))
- The MAST taxonomy groups multi-agent LLM failures into 14 failure modes in 3 categories, built from over 1,600 annotated traces across 7 frameworks with inter-annotator kappa of 0.88. ([Why Do Multi-Agent LLM Systems Fail?](https://arxiv.org/abs/2503.13657))
- On tau-bench, even gpt-4o succeeded on under half the tasks and had pass^8 below 25% in the retail domain, showing agents are inconsistent across repeated trials. ([tau-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045))

## What is unknown

- Whether judges stay reliable on long traces with many tool calls and memory.
- What 'root cause' means when the agent is non-deterministic.

## Key terms

- **Trace**: The step-by-step record of what an agent did in one run: model calls, tool calls, inputs and outputs.
- **Failure attribution**: Deciding which agent and which step in a run caused the task to fail.
- **LLM-as-judge**: Using a language model to grade or critique another model's output or trace.
- **pass^k**: The chance that an agent succeeds on the same task in all k repeated attempts; a measure of consistency.
- **Regression test**: A test kept after a bug is found so the same failure is caught if it comes back.

## Possible angles

- **Theory:** credit assignment over non-deterministic action sequences
- **Practice (no lab):** a failure taxonomy and an LLM-judge benchmark on simulated enterprise workflows

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                           | Type    | Link                                                         |
| ------------------------------------------------------------------ | ------- | ------------------------------------------------------------ |
| Who&When failure attribution dataset                               | dataset | https://huggingface.co/datasets/Kevin355/Who_and_When        |
| MAST taxonomy code and annotated traces                            | dataset | https://github.com/multi-agent-systems-failure-taxonomy/MAST |
| tau-bench (points to the newer tau2/tau3-bench)                    | dataset | https://github.com/sierra-research/tau-bench                 |
| Judgeval open-source agent tracing and evaluation SDK (Apache-2.0) | tool    | https://github.com/JudgmentLabs/judgeval                     |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Indian IT-services firms run these workflows at scale.

## Funding evidence

| Funder / company | What                                                                                       | Date    | Link                                                           | Evidence |
| ---------------- | ------------------------------------------------------------------------------------------ | ------- | -------------------------------------------------------------- | -------- |
| Judgment Labs    | $32M seed + Series A (seed led by Lightspeed; Series A co-led by Greenoaks and Lightspeed) | 2026-05 | https://judgmentlabs.ai/blogs/announcing-32m-led-by-lightspeed | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- Use synthetic traces; real traces contain customer data.

## Leads to check

Not verified when this file was written; never treat as fact.

- OpenTelemetry GenAI semantic conventions for agent spans as a tracing standard (The docs page fetched only says the conventions moved to a separate repository; content and status not confirmed)
