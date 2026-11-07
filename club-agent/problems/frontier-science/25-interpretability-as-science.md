---
id: "25"
title: "Can what we find inside an AI model be trusted as science?"
industry: frontier-science
seat: frontier-wildcard
status: open
funding_strength: strong
risk_flags: "None beyond the core rules"
last_verified: 2026-11-08
level_fit: L3–L5
effort: semester
skills: "Python, basic machine learning, statistics, literature review, philosophy of science"
---

**What:** Can features extracted from a trained model reveal new, testable facts, or do they only echo the training data?
**How:** Theory: feature faithfulness. Practice (no lab): train sparse autoencoders on small open models and test whether the features are stable.
**Objective:** If they can, models become scientific instruments.

# 25. Can what we find inside an AI model be trusted as science?

## The open question

Can features extracted from a trained model reveal new, testable facts, or do they only echo the training data?

## Why it matters

If they can, models become scientific instruments.

## Who cares

- AI safety and model-audit teams at AI labs
- Scientists using trained models (e.g. genomics, materials) who want to read new findings out of them
- Funders of interpretability research deciding which methods to back

## In scope

- Whether sparse-autoencoder features are stable across training runs, seeds and dictionary sizes
- How to tell a feature that reflects a real-world regularity from one that only mirrors training-data statistics
- Small open models and released feature sets that can be studied on a laptop or free GPU

## Out of scope

- Training or fine-tuning frontier-scale models
- Wet-lab validation of biological or chemical claims a model suggests
- Using interpretability to bypass model safety measures

## What is known

- Sparse autoencoders trained on a language model's activations recover features that are more interpretable than earlier decomposition methods. ([Sparse Autoencoders Find Highly Interpretable Features in Language Models (Cunningham et al.)](https://arxiv.org/abs/2309.08600))
- Sparse autoencoders trained on the same model and data but different random seeds learn different features; in one Llama 3 8B setting only about 30% of features were shared across seeds. ([Sparse Autoencoders Trained on the Same Data Learn Different Features (Paulo and Belrose)](https://arxiv.org/abs/2501.16615))
- Goodfire and Arc Institute trained sparse autoencoders on the Evo 2 DNA model and found features matching biological concepts such as exon-intron boundaries, protein secondary structure and prophage sequences. ([Goodfire blog: Interpreting Evo 2](https://www.goodfire.com/blog/interpreting-evo-2))

## What is unknown

- Whether features are faithful and complete.

## Key terms

- **Sparse autoencoder (SAE)**: A small network trained to rewrite a model's internal signals as a few active 'features' out of many, so each can be inspected.
- **Feature**: One direction inside a model's internal activity that tends to switch on for a recognisable concept.
- **Faithfulness**: Whether an explanation reflects what the model actually uses to compute, not just a pattern that looks plausible to humans.
- **Seed stability**: Whether the same features appear when the method is rerun with a different random starting point.
- **Mechanistic interpretability**: Research that tries to reverse-engineer how a trained neural network computes its outputs.

## Possible angles

- **Theory:** feature faithfulness
- **Practice (no lab):** train sparse autoencoders on small open models and test whether the features are stable

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                              | Type    | Link                                 |
| --------------------------------------------------------------------- | ------- | ------------------------------------ |
| Gemma Scope: open sparse autoencoders on Gemma 2                      | dataset | https://arxiv.org/abs/2408.05147     |
| SAELens library for training and loading SAEs                         | tool    | https://github.com/jbloomAus/SAELens |
| Neuronpedia feature browser                                           | tool    | https://www.neuronpedia.org/         |
| Sparse Autoencoders Trained on the Same Data Learn Different Features | paper   | https://arxiv.org/abs/2501.16615     |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

None specific.

## Funding evidence

| Funder / company            | What                               | Date    | Link                                       | Evidence |
| --------------------------- | ---------------------------------- | ------- | ------------------------------------------ | -------- |
| Goodfire (led by B Capital) | $150M Series B at $1.25B valuation | 2026-02 | https://www.goodfire.com/blog/our-series-b | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- None beyond the core rules.

## Leads to check

Not verified when this file was written; never treat as fact.

- Anthropic 'Towards Monosemanticity' (transformer-circuits.pub/2023/monosemantic-features) as a foundational SAE reference (Page too large to fetch with the tool)
- Goodfire 2025 report that Evo 2 encodes the bacterial tree of life as a manifold (goodfire.ai/papers/phylogeny-manifold) (Seen only in search results)
