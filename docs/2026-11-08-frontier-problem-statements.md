# AI Club: 30 Frontier Problem Statements (Initial Set)

**Date:** 2026-11-08 · **Status:** Draft for review

- **What:** 30 open questions at the edge of current knowledge. Each one is actively funded in 2025–26.
- **How:**
  - Domains are weighted by the AI Club interest form (43 responses).
  - Four research passes looked for open questions backed by real funding.
  - The strongest candidate was picked for each seat.
- **Objective:** Give members starting points where the answer probably doesn't exist yet. A member pastes one into the Club Agent and starts their own journey. These are not guides: the "How" lines are only possible angles, and students should reframe them.

## Seat allocation

Each respondent's vote was split equally across the domains they ticked. **24 seats (80%) follow the form weights. 6 seats (20%) are frontier wildcards.**

| Domain              | Form weight | Seats |
| ------------------- | ----------- | ----- |
| SaaS / B2B          | 19.5%       | 5     |
| Fintech             | 16.6%       | 4     |
| E-commerce / Retail | 16.1%       | 4     |
| Marketing / AdTech  | 14.8%       | 3     |
| Logistics           | 7.7%        | 2     |
| Healthtech          | 7.4%        | 2     |
| EdTech              | 6.9%        | 2     |
| Real Estate         | 4.2%        | 1     |
| Other               | 6.8%        | 1     |
| Frontier wildcards  | n/a         | 6     |

**Funding tags:**

- **(V):** our research pass opened the funding page.
- **(S):** secondary reports only.
- **(U):** unverified.

Check every tag again before announcing a problem. The agent's `verify-sources` step re-checks them anyway.

**Frame used for each problem (Fundamental 11):**

- **What:** the open question.
- **How:** possible angles, none needing a lab.
- **Objective:** why it matters, and what is known versus unknown.

---

## Where the problems live now

The 30 problems are maintained as structured files, one per problem, grouped by industry:

- Index: [`club-agent/problems/README.md`](../club-agent/problems/README.md)
- Files: `club-agent/problems/<industry>/<NN>-<slug>.md`
- Template: [`club-agent/templates/problem-statement.md`](../club-agent/templates/problem-statement.md)

Each file has front matter (id, industry, seat, status, funding strength, risk flags, last verified) and fixed sections: the open question, why it matters, what is known, what is unknown, possible angles, India angle, funding evidence, and risk flags. The kit's tests enforce this structure.

This document keeps only how the set was chosen (above).
