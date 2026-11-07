# Club Problem Statements

**What:** The AI Club's library of frontier problem statements: open questions that are actively funded and probably unanswered.
**How:** One file per problem, grouped by industry folder, all following `templates/problem-statement.md`. Tell the agent "start problem 19" (or paste the file) and `triage` takes it from there.
**Objective:** Every member starts from a clearly defined problem, and the library grows in one consistent structure.

## How to use

1. Pick a problem below.
2. In your `my-research` workspace, tell the agent: `start problem <NN>`.
3. The agent reads the file, runs `triage`, and walks you through the journey. The "Possible angles" are starting points only; your framing is your own.

## How to add a problem

1. Copy `templates/problem-statement.md` into the right industry folder as `<NN>-<kebab-slug>.md`, using the next free number.
2. Fill every section. Funding evidence needs at least one row; `funding_strength: strong` requires a `verified` row.
3. Add it to the index below and run `npm run check` (the tests enforce the structure).

## Index

| #   | Problem                                                                                                                  | Industry            | Seat              | Funding |
| --- | ------------------------------------------------------------------------------------------------------------------------ | ------------------- | ----------------- | ------- |
| 01  | [When an enterprise AI agent fails, can the failure be diagnosed automatically?](saas-b2b/01-agent-failure-diagnosis.md) | SaaS / B2B          | form-weighted     | strong  |
| 02  | [Can an agent be made robust to manipulation through what it reads?](saas-b2b/02-agent-manipulation-robustness.md)       | SaaS / B2B          | form-weighted     | strong  |
| 03  | [Can an AI agent truly forget?](saas-b2b/03-agent-memory-forgetting.md)                                                  | SaaS / B2B          | form-weighted     | strong  |
| 04  | [How do you price software that does the work?](saas-b2b/04-pricing-agent-work.md)                                       | SaaS / B2B          | form-weighted     | strong  |
| 05  | [Can AI prove its own code correct for less than the cost of the bugs?](saas-b2b/05-verified-ai-code.md)                 | SaaS / B2B          | form-weighted     | strong  |
| 06  | [When your AI agent spends your money, who is liable?](fintech/06-agent-payments-liability.md)                           | Fintech             | form-weighted     | strong  |
| 07  | [Can banks catch mule rings together without pooling customer data?](fintech/07-cross-bank-mule-detection.md)            | Fintech             | form-weighted     | strong  |
| 08  | [Does alternative-data credit really include thin-file borrowers?](fintech/08-alternative-data-credit.md)                | Fintech             | form-weighted     | medium  |
| 09  | [Can identity checks survive deepfakes?](fintech/09-deepfake-resistant-kyc.md)                                           | Fintech             | form-weighted     | strong  |
| 10  | [When AI agents shop, how do they pick brands?](ecommerce-retail/10-ai-shopping-agents-brands.md)                        | E-commerce / Retail | form-weighted     | strong  |
| 11  | [Can 10-minute delivery ever profit without discounts?](ecommerce-retail/11-quick-commerce-unit-economics.md)            | E-commerce / Retail | form-weighted     | strong  |
| 12  | [Does virtual try-on cut returns or create new ones?](ecommerce-retail/12-virtual-try-on-returns.md)                     | E-commerce / Retail | form-weighted     | weak    |
| 13  | [How do you measure ad lift when no human saw the ad?](ecommerce-retail/13-ad-lift-without-humans.md)                    | E-commerce / Retail | form-weighted     | strong  |
| 14  | [Can brand visibility inside AI answers be measured?](marketing-adtech/14-ai-answer-visibility.md)                       | Marketing / AdTech  | form-weighted     | strong  |
| 15  | [How should ads live inside chatbot answers?](marketing-adtech/15-ads-in-chatbot-answers.md)                             | Marketing / AdTech  | form-weighted     | medium  |
| 16  | [Can synthetic consumers replace market research?](marketing-adtech/16-synthetic-consumer-panels.md)                     | Marketing / AdTech  | form-weighted     | strong  |
| 17  | [Can AI forecast when history stops being a guide?](logistics/17-forecasting-under-shocks.md)                            | Logistics           | form-weighted     | medium  |
| 18  | [Do warehouse robot swarms pay off where labour is cheap?](logistics/18-warehouse-robots-low-wage.md)                    | Logistics           | form-weighted     | strong  |
| 19  | [Can a wrist sensor track true blood pressure?](healthtech/19-cuffless-blood-pressure.md)                                | Healthtech          | form-weighted     | strong  |
| 20  | [Is skin-tone bias in optical sensors fixable in software?](healthtech/20-optical-sensor-skin-tone-bias.md)              | Healthtech          | form-weighted     | strong  |
| 21  | [Do AI tutors produce learning that lasts?](edtech/21-ai-tutor-lasting-gains.md)                                         | EdTech              | form-weighted     | strong  |
| 22  | [When does AI make students think less?](edtech/22-ai-cognitive-offloading.md)                                           | EdTech              | form-weighted     | strong  |
| 23  | [Is climate risk priced into property?](real-estate/23-climate-risk-property-pricing.md)                                 | Real Estate         | form-weighted     | strong  |
| 24  | [How reliable is an autonomous legal agent?](legal/24-legal-agent-reliability.md)                                        | Legal               | form-weighted     | strong  |
| 25  | [Can what we find inside an AI model be trusted as science?](frontier-science/25-interpretability-as-science.md)         | Frontier Science    | frontier-wildcard | strong  |
| 26  | [Will any quantum computer pay for itself?](frontier-science/26-quantum-payback.md)                                      | Frontier Science    | frontier-wildcard | strong  |
| 27  | [Can AI-led labs discover materials that theory missed?](frontier-science/27-ai-materials-discovery.md)                  | Frontier Science    | frontier-wildcard | strong  |
| 28  | [How much carbon does crushed rock really remove?](frontier-science/28-rock-weathering-carbon-removal.md)                | Frontier Science    | frontier-wildcard | strong  |
| 29  | [Can a national payment system go quantum-safe in time?](frontier-science/29-quantum-safe-payments.md)                   | Frontier Science    | frontier-wildcard | strong  |
| 30  | [How do we know a health chatbot is safe in Indian languages?](frontier-science/30-health-chatbot-indian-languages.md)   | Frontier Science    | frontier-wildcard | strong  |

Seats: 24 follow the AI Club interest-form weights; 6 are frontier wildcards. See `docs/2026-11-08-frontier-problem-statements.md` in the repo for how they were chosen.
