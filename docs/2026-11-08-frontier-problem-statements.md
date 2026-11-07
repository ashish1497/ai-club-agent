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

## SaaS / B2B

### 1. When an enterprise AI agent fails, can the failure be diagnosed automatically?

- **What:** Can we pinpoint which step broke a long, multi-tool agent run, and auto-generate the test that catches that failure next time?
- **How:**
  - Theory: credit assignment over non-deterministic action sequences.
  - Practice: a failure taxonomy and an LLM-judge benchmark on simulated enterprise workflows.
- **Objective:** Agents can't be trusted in production until their failures can be diagnosed. LLM judges work on short tasks; nobody knows whether they work on long traces.
- **Funding:** Judgment Labs, $32M seed + Series A (Lightspeed), May 2026 (V)
- **Flags:** use synthetic traces, not customer data.

### 2. Can an agent be made robust to manipulation through what it reads?

- **What:** Is there an architecture that provably bounds what untrusted text (emails, PDFs, web pages) can make an agent do? Or is prompt injection unsolvable in principle?
- **How:**
  - Theory: information-flow control for LLM agents.
  - Practice: a defensive benchmark on Indian enterprise documents, run only in your own sandbox.
- **Objective:** Without a security model, enterprises can't let agents act on real data. No formal model exists yet.
- **Funding:** Rein Security, $25M Series A, Oct 2026 (V)
- **Flags:** focus on defences, and test only systems you own.

### 3. Can an AI agent truly forget?

- **What:** How should a long-lived agent decide what to remember? Can it fully remove a person's data after that data has spread into summaries and derived memories?
- **How:**
  - Theory: machine unlearning.
  - Practice: an audit that checks whether deleted facts resurface in an open-source memory layer.
- **Objective:** Agent memory is becoming infrastructure, and privacy law grants a right to erasure. Nobody knows yet how to delete cleanly.
- **Funding:** Mem0, $24M seed + Series A (Peak XV, YC), Oct 2025 (V)
- **India:** right to erasure under the DPDP Act 2023 and its 2025 Rules.

### 4. How do you price software that does the work?

- **What:** How should a vendor price an AI agent when outcomes are produced jointly, attribution is disputed, and compute costs are unpredictable?
- **How:**
  - Theory: principal-agent theory and contract design.
  - Practice: model outcome-based pricing for an Indian SaaS firm.
- **Objective:** Seat-based pricing breaks when agents replace the people in those seats, and there is no settled theory for attributing outcomes. This is the strongest MBA fit in the set.
- **Funding:** Paid, $21M seed (Lightspeed, EQT), Sep 2025 (V)

### 5. Can AI prove its own code correct for less than the cost of the bugs?

- **What:** Can AI write the formal spec and the machine-checked proof for ordinary business code, at a cost below the bugs it prevents?
- **How:**
  - Theory: the economics of a "verification tax".
  - Practice: verify one small fintech function with open tools, and compare the effort with the bug classes it removes.
- **Objective:** AI provers excel at competition maths. Real software has messy, often unwritten specs, and that problem is still open.
- **Funding:**
  - Axiom Math, $200M, Mar 2026 (V)
  - Harmonic, $120M Series C, Nov 2025 (S)

## Fintech

### 6. When your AI agent spends your money, who is liable?

- **What:** How do you prove a user authorised the specific purchase an agent made, verify the agent's identity and mandate, and decide who pays when it errs?
- **How:**
  - Theory: mandate theory for non-human agents.
  - Practice: design spending caps, revocation, and dispute flows that fit UPI, and test them with users.
- **Objective:** Payment rails for agents now exist. Identity, liability and fraud baselines don't.
- **Funding:**
  - Natural, $30M Series A, Jul 2026 (V)
  - Baselayer, $35M Series A, Sep 2026 (V)
  - NPCI × Razorpay × OpenAI agentic UPI pilot, Oct 2025 (V)
- **Flags:** RBI authentication rules, consumer protection.

### 7. Can banks catch mule rings together without pooling customer data?

- **What:** Can network analytics find money-mule rings that span banks, when each bank shares only a privacy-preserving view of its data?
- **How:**
  - Theory: graph learning combined with federated learning or secure computation.
  - Practice: a prototype on synthetic UPI-like transaction graphs.
- **Objective:** BIS Project Hertha found 12% more illicit accounts with a system-wide view, but the legal and practical barriers remain unresolved.
- **Funding:**
  - BIS Innovation Hub with the Bank of England, Project Hertha, Jun 2025 (V)
  - RBIH MuleHunter.AI (S)
- **Flags:** false positives can freeze innocent people's accounts.

### 8. Does alternative-data credit really include thin-file borrowers?

- **What:** Does underwriting on Account Aggregator, ULI and GST data price risk better through a full credit cycle, without creating new bias or inviting gaming?
- **How:**
  - Theory: performative prediction and fairness.
  - Practice: a fairness and robustness audit of an MSME scorecard on synthetic data.
- **Objective:** Approval rates rise with alternative data. Whether loans perform through a downturn, and whether fairness holds, is unknown.
- **Funding:**
  - FinBox, $40M Series B, Sep 2025 (S)
  - RBI scale-up of ULI (S)

### 9. Can identity checks survive deepfakes?

- **What:** Can video-KYC stay reliable as generative models improve, or must trust move to device attestation, provenance and behavioural signals?
- **How:**
  - Theory: limits of synthetic-media detection.
  - Practice: a threat model for RBI's V-CIP using only synthetic or consented data.
- **Objective:** Detectors work against the generators they were trained on. Nobody knows whether they can generalise to future generators.
- **Funding:**
  - GetReal Security, $17.5M Series A, Mar 2025 (V)
  - Resemble AI, $13M, Dec 2025 (S)
- **Flags:** never imitate real people.

## E-commerce / Retail

### 10. When AI agents shop, how do they pick brands?

- **What:** What decides which brands an LLM shopping agent shortlists? Can brands influence that without degrading the agent's answers?
- **How:**
  - Theory: consumer choice when the decision-maker is an algorithm.
  - Practice: audit how often agents recommend Indian D2C brands compared with marketplace incumbents.
- **Objective:** Agent ranking is opaque and changes with each model version. Nobody knows whether brand equity still matters to an agent.
- **Funding:**
  - ReFiBuy, $13.6M seed, May 2026 (V)
  - Spangle AI, $15M Series A, Jan 2026 (S)

### 11. Can 10-minute delivery ever profit without discounts?

- **What:** At what dark-store density and order mix does quick commerce break even, and is that stable with three or more players in the same pin codes?
- **How:**
  - Theory: spatial competition.
  - Practice: a pin-code-level P&L simulator built from public IPO filings.
- **Objective:** Growth is documented, but steady-state profitability is not.
- **Funding:**
  - Zepto, $450M at a $7B valuation, Oct 2025 (V)
  - Updated IPO papers, Jun 2026 (S)
- **Flags:** competition-law and dark-pattern rules.

### 12. Does virtual try-on cut returns or create new ones?

- **What:** Do generative try-ons reduce fashion returns, or do they inflate expectations and cause "doesn't look like the render" returns?
- **How:**
  - Theory: expectation-disconfirmation.
  - Practice: an A/B test design with an Indian apparel brand.
- **Objective:** Causal evidence on returns is thin and comes mostly from vendors.
- **Funding:** Doji, $14M seed, May 2025 (S). This is the weakest funding signal in the set; re-verify it or swap in an alternate.

### 13. How do you measure ad lift when no human saw the ad?

- **What:** How do you measure the causal effect of advertising without cookies, with walled gardens, and when AI agents make purchases with no human impression?
- **How:**
  - Theory: causal inference when the exposed party is an agent.
  - Practice: geo-lift tests used to calibrate a marketing-mix model.
- **Objective:** No current method handles exposure by agents.
- **Funding:** AppsFlyer, Series E of more than $1B, Jun 2026 (V)

## Marketing / AdTech

### 14. Can brand visibility inside AI answers be measured?

- **What:** Can a brand's share of voice in AI answers be measured reliably when answers vary by run, model and prompt? Which content changes move it?
- **How:**
  - Theory: measurement validity when the output is random.
  - Practice: an open GEO benchmark for Indian categories, including Hinglish queries.
- **Objective:** There is no standard metric and no ground truth.
- **Funding:** Profound, $96M Series C, Feb 2026 (V)
- **Flags:** platform terms on automated querying.

### 15. How should ads live inside chatbot answers?

- **What:** How should auctions work when the ad sits inside a generated answer, and how much does sponsorship erode trust?
- **How:**
  - Theory: mechanism design.
  - Practice: a user experiment comparing trust with and without sponsorship labels.
- **Objective:** Search auctions are well understood; placement inside generated answers is not.
- **Funding:** Koah, $20.5M Series A, Feb 2026 (V/S)
- **Flags:** ASCI disclosure rules.

### 16. Can synthetic consumers replace market research?

- **What:** For which segments do LLM-simulated consumers reproduce real survey results, and where do they fail?
- **How:**
  - Theory: external validity.
  - Practice: run the same survey on real Indian respondents (Tier-2/3 included) and on synthetic ones, and compare.
- **Objective:** Accuracy claims are self-reported, and nobody knows how these models fail across cultures.
- **Funding:**
  - Simile, $200M+ Series B, Jul 2026 (V)
  - Aaru, Series A at a $1B valuation, Dec 2025 (V)

## Logistics

### 17. Can AI forecast when history stops being a guide?

- **What:** Can AI forecast demand through regime breaks such as tariffs, conflicts and a failed monsoon?
- **How:**
  - Theory: forecasting under distribution shift.
  - Practice: backtest on Indian FMCG demand around past shocks.
- **Objective:** Forecasting works in stable conditions but is unsolved during shocks.
- **Funding:** Loop, $95M Series C, Apr 2026 (S)

### 18. Do warehouse robot swarms pay off where labour is cheap?

- **What:** Can modular robot swarms earn back their cost in small, brownfield Indian warehouses?
- **How:**
  - Theory: automation adoption at low wages.
  - Practice: a total-cost-of-ownership model for an Indian 3PL.
- **Objective:** The economics are proven in high-wage markets but unknown in India.
- **Funding:** Unbox Robotics (Pune), ₹243 cr Series B, Jan 2026 (V)

## Healthtech

### 19. Can a wrist sensor track true blood pressure?

- **What:** Can PPG signals track absolute blood pressure over days without recalibrating against a cuff?
- **How:**
  - Theory: what blood-pressure information the waveform alone contains.
  - Practice: benchmark published models for drift on public datasets (MIMIC, VitalDB, PulseDB), and compare validation standards.
- **Objective:** Lab correlations exist. Calibration-free accuracy in everyday life has not been shown.
- **Funding:** NIH/NHLBI R01 to Boston University, Sep 2025 (V)
- **Flags:** no medical claims; public datasets only.

### 20. Is skin-tone bias in optical sensors fixable in software?

- **What:** Can algorithms fully correct the error melanin causes in PPG and pulse oximetry, or does it need new hardware?
- **How:**
  - Theory: light-tissue simulation.
  - Practice: audit public datasets for gaps in skin-tone reporting.
- **Objective:** The bias is documented for oximeters. How far it extends into consumer wearables is unknown.
- **Funding:**
  - NIH K99 to Tufts, Sep 2025 (V)
  - Massachusetts Life Sciences Center grant, Jul 2025 (V)
- **India:** wide skin-tone diversity, while validation cohorts are mostly Western.

## EdTech

### 21. Do AI tutors produce learning that lasts?

- **What:** Do AI-tutor gains persist after 6–12 months, and for which learners, languages and schools in India?
- **How:**
  - Theory: causal inference with delayed outcomes.
  - Practice: a pre-registered study design with an edtech partner.
- **Objective:** Short-term trials look positive. Nobody knows whether the gains persist.
- **Funding:**
  - J-PAL Project AI Evidence, Feb 2026 (V)
  - IIT Madras CoE in AI for Education (S)
- **Flags:** parental consent for any child data.

### 22. When does AI make students think less?

- **What:** When does handing recall and reasoning to AI weaken long-term skill, and can task design reverse the effect?
- **How:**
  - Theory: desirable difficulty.
  - Practice: adapt the EEF study design to Indian board-exam students.
- **Objective:** The evidence so far points both ways.
- **Funding:** UK EEF research call on GenAI and cognition, Jun 2026 (V)

## Real Estate

### 23. Is climate risk priced into property?

- **What:** Are property-level climate-risk scores reflected in valuations and mortgage terms, and can the scores be validated?
- **How:**
  - Theory: hedonic pricing.
  - Practice: overlay flood risk on Mumbai or Chennai prices.
- **Objective:** Building-level accuracy and market pricing are both unknown.
- **Funding:** Neural Earth, $9M+ seed, Feb 2026 (V)

## Other: Legal

### 24. How reliable is an autonomous legal agent?

- **What:** How do we measure legal reasoning errors (not only fake citations) in multi-step agent work, and who is liable for them?
- **How:**
  - Theory: an error taxonomy for legal reasoning.
  - Practice: a benchmark on Indian statutes, including BNS.
- **Objective:** Legal AI is scaling faster than ways to evaluate it.
- **Funding:** Harvey, $200M at an $11B valuation, Mar 2026 (V)
- **Flags:** no legal advice to real parties.

## Frontier wildcards

### 25. Can what we find inside an AI model be trusted as science?

- **What:** Can features extracted from a trained model reveal new, testable facts, or do they only echo the training data?
- **How:**
  - Theory: feature faithfulness.
  - Practice: train sparse autoencoders on small open models and test whether the features are stable.
- **Objective:** Readable features exist. Whether they are faithful and complete is unknown.
- **Funding:** Goodfire, $150M Series B, Feb 2026 (V)

### 26. Will any quantum computer pay for itself?

- **What:** Which qubit approaches reach a point where their computational value exceeds their cost, for which problems, and by when?
- **How:**
  - Theory: resource estimates.
  - Practice: a cost-versus-value model per application, built from published estimates.
- **Objective:** Logical qubits have been demonstrated. The economics at scale are unknown.
- **Funding:** DARPA Quantum Benchmarking Initiative Stage B, Nov 2025 (V)

### 27. Can AI-led labs discover materials that theory missed?

- **What:** Can systems that combine LLMs, simulation and robotic labs find materials, such as higher-temperature superconductors, that conventional theory did not predict?
- **How:**
  - Theory: the limits of DFT prediction.
  - Practice: screen public databases (Materials Project, SuperCon) and critically review past claims.
- **Objective:** Nobody knows yet whether autonomous labs beat human-guided search.
- **Funding:** Periodic Labs, $300M seed, Sep 2025 (V)

### 28. How much carbon does crushed rock really remove?

- **What:** How much CO₂ does basalt spread on farmland actually remove, and can that be verified cheaply at scale?
- **How:**
  - Theory: uncertainty in transport models.
  - Practice: a verification cost model, and a comparison of carbon-registry rules.
- **Objective:** The chemistry works. Losses and the cost of measurement are unresolved.
- **Funding:** Frontier × Eion, $33M offtake, Mar 2025 (V)
- **India:** Deccan basalt; Mati Carbon is active in India.

### 29. Can a national payment system go quantum-safe in time?

- **What:** What is the least risky and most cost-effective order for migrating a payment system to post-quantum cryptography?
- **How:**
  - Theory: decisions when the timing of the threat is uncertain.
  - Practice: a migration priority framework for an Indian bank or for UPI.
- **Objective:** BIS Project Leap proved migration is feasible but found large performance gaps.
- **Funding:** BIS Innovation Hub, Project Leap Phase 2, Dec 2025 (V)

### 30. How do we know a health chatbot is safe in Indian languages?

- **What:** How should we measure whether an LLM health assistant is accurate and safe for low-literacy users who speak Indian languages?
- **How:**
  - Theory: rubric validity across languages.
  - Practice: a small Hindi, Marathi or Tamil test set used to evaluate open models.
- **Objective:** English benchmarks don't carry over, and no validated multilingual benchmark exists.
- **Funding:** Gates Foundation grant to IFRE Delhi, $972K, Nov 2025 (V)
- **Flags:** no real patient data, no medical advice.

---

## Alternates

- Tokenized deposits (BIS Agorá)
- Embodied carbon in construction
- AI guidance for teachers (J-PAL)
- Drone last-mile delivery (Skye Air)
- Homogenisation of AI ad creative
- Brand impact of synthetic shoppers
- Virtual try-on alternatives
