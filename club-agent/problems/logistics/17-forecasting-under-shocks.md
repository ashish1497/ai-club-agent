---
id: "17"
title: "Can AI forecast when history stops being a guide?"
industry: logistics
seat: form-weighted
status: open
funding_strength: strong
risk_flags: "None beyond the core rules"
last_verified: 2026-11-08
level_fit: L3–L5
effort: semester
skills: "time-series analysis, data wrangling, Python or R, interviews with demand planners, economic reading"
---

**What:** Can AI forecast demand and supply disruptions through regime breaks such as tariffs, conflicts or a failed monsoon?
**How:** Theory: robust and causal forecasting. Practice (no lab): backtest on Indian FMCG demand around past monsoon, festival and tariff shocks.
**Objective:** Supply chains lose the most money exactly when forecasts break.

# 17. Can AI forecast when history stops being a guide?

## The open question

Can AI forecast demand and supply disruptions through regime breaks such as tariffs, conflicts or a failed monsoon?

## Why it matters

Supply chains lose the most money exactly when forecasts break.

## Who cares

- Demand-planning head at an Indian FMCG company
- Supply-chain or S&OP manager at an exporter or 3PL
- Product manager at a supply-chain forecasting software vendor

## In scope

- Forecast accuracy before, during and after regime breaks such as monsoon failures, festivals, tariffs and shipping disruptions
- Retail and FMCG demand, and supply-side disruption signals
- Indian data and Indian exporters

## Out of scope

- Commodity or financial trading on forecasts
- Building production planning software
- Macroeconomic policy recommendations

## What is known

- The M5 competition asked participants to forecast 42,840 hierarchical Walmart unit-sales series. ([M5 accuracy competition: Results, findings, and conclusions (Makridakis et al., IJF 2022)](https://econpapers.repec.org/RePEc:eee:intfor:v:38:y:2022:i:4:p:1346-1364))
- UNCTAD estimated in February 2024 that Suez Canal transits were down 42% from peak and weekly container-ship transits down 67% after Red Sea attacks. ([UNCTAD - Unprecedented shipping disruptions raise risk to global trade](https://unctad.org/news/unprecedented-shipping-disruptions-raise-risk-global-trade-unctad-warns))
- India's 2023 southwest monsoon rainfall was 94% of the long period average, with August at only 64%. ([IMD - End of Season Report, Southwest Monsoon 2023](https://imdpune.gov.in/latestnews/Eosr_SW_Monsoon_2023.pdf))
- A US executive order of 6 August 2025 added a 25% tariff on Indian goods from 27 August 2025, on top of the existing reciprocal rate. ([C.H. Robinson client advisory - Additional 25% tariff on India](https://www.chrobinson.com/en-au/resources/insights-and-advisories/client-advisories/2025q3/08-06-2025-client-advisory-additional-25-tariff-on-india-for-use-russian-oil/))

## What is unknown

- Forecasting under distribution shift.

## Key terms

- **Regime break (structural break)**: A point where the patterns that drove past data stop holding.
- **Distribution shift**: When the data a model sees in use differs from the data it was trained on.
- **Backtest**: Testing a forecasting method on past periods as if you did not know what happened next.
- **Long period average (LPA)**: IMD's long-run average rainfall, used to say whether a monsoon is normal or deficient.
- **Hierarchical forecasting**: Forecasting at several levels (product, store, region) so they add up consistently.

## Possible angles

- **Theory:** robust and causal forecasting
- **Practice (no lab):** backtest on Indian FMCG demand around past monsoon, festival and tariff shocks

These are starting angles only. Reframe the problem in your own words with the agent (`frame-question`).

## Starting points

| Resource                                                          | Type    | Link                                                                      |
| ----------------------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| M5 accuracy competition results paper                             | paper   | https://econpapers.repec.org/RePEc:eee:intfor:v:38:y:2022:i:4:p:1346-1364 |
| Monash Time Series Forecasting Repository                         | dataset | https://forecastingdata.org/                                              |
| TRADESTAT - India export and import data (Department of Commerce) | dataset | https://tradestat.commerce.gov.in/                                        |
| IMD End of Season Report, Southwest Monsoon 2023                  | report  | https://imdpune.gov.in/latestnews/Eosr_SW_Monsoon_2023.pdf                |

Ways into the field, not a reading list. The agent's `field-map` builds the real map.

## India angle

Red Sea disruption and US tariffs hit Indian exporters.

## Funding evidence

| Funder / company                                                                                  | What          | Date    | Link                                                                                                   | Evidence |
| ------------------------------------------------------------------------------------------------- | ------------- | ------- | ------------------------------------------------------------------------------------------------------ | -------- |
| Valor Equity Partners and Valor Atreides AI Fund (lead), with Founders Fund and others, into Loop | $95M Series C | 2026-04 | https://www.loop.com/article/loop-raises-95m-series-c-to-scale-its-ai-platform-across-the-supply-chain | verified |

Evidence: `verified` = funding page opened and checked; `secondary` = several reports, primary not opened. Re-check before announcing.

## Risk flags

- None beyond the core rules.

## Leads to check

Not verified when this file was written; never treat as fact.

- Kaggle M5 Forecasting - Accuracy competition data page (Page loaded but showed only its title, so data availability was not confirmed)
- Current status of US tariffs on Indian goods after August 2025 (Only August 2025 sources were opened; later changes were not checked)
- Public SKU-level Indian FMCG sales data (No open source found; may require a company partnership)
- New York Fed Global Supply Chain Pressure Index (Page loaded but its description and download options were not readable)
