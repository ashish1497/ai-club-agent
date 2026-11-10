# AI Club Agent — Design of Design

**Status:** Draft for approval · **Date:** 2026-11-07 · **Scope:** Local only (cloud — AWS/GCP — is a later phase)
**Working name:** "Club Agent" (final name TBD)

---

## 1. Intent — why this exists

Building is no longer the hard part. Anyone in the AI Club can produce an app, a workflow or an agent in an afternoon. The AI Club's problem statements are deliberately hard: live, heavily funded, thinly documented frontier questions (PPG biosensing, neural interfaces, protein research, finance, and fields nobody has named yet) where **the answer probably does not exist yet**. Students must push beyond what they know and find it.

Two things stop them today:

1. **They stall in initial research.** Weeks go into getting oriented, so they fall back to "AI, do this for me."
2. **The AI and the student don't share a picture of the problem.** The AI fills gaps with guesses, invents sources in thin fields, and drifts toward answering instead of helping the student think.

The Club Agent is a locally installed agent every member uses on every problem. It **compresses the known** (gets the student to the edge of current knowledge fast, with verified sources) so the student's time goes into **the unknown** (framing, betting, testing). The club is _for_ the students, not between them and the AI: no gatekeeping, no policing, no per-problem guides.

The underlying idea comes from Matt Pocock's talk _Software Fundamentals Matter More Than Ever_ and the books it draws on: AI does well where structure is good and badly where it isn't. The human holds strategy and design; the AI is the tactical worker. These fundamentals are adapted here from codebases to problem-solving.

## 2. Who it serves

About 45 members (from the Oct 2026 interest form). Most are business-school students; few write production code.

| Level | Approx. count | What they said                                                          | What they need from the agent          |
| ----- | ------------- | ----------------------------------------------------------------------- | -------------------------------------- |
| L2    | ~15           | "weakest skill", "fear of AI", "don't know what I don't know"           | Gentle pace, plain terms, explanations |
| L3    | ~12           | "projects and skills", "real problems"                                  | A structured journey                   |
| L4–L5 | ~18           | "relentless building", "not just vibe code", "don't outsource thinking" | Speed, hard pushback                   |

Domains of interest: fintech, SaaS/B2B, marketing, e-commerce, logistics, healthtech, edtech, real estate. Problems range from vague ("money-making apps") to concrete workflows (expense reimbursement agent) to frontier research (PPG, neural interfaces, proteins).

## 3. Goals, non-goals, anti-goals

**Goals**

- G1. One process that works for **any** problem statement, vague or detailed, in **any** field.
- G2. A student gets from "I barely know this field" to "I know what's known, contested and unknown, with sources" in **hours, not weeks**.
- G3. The AI **asks** when information is missing. It never fills gaps silently.
- G4. Governance is built into the process: source integrity, data and consent, field-specific risks.
- G5. Each student's work is their own: their framing, their bets, their folder. Uniqueness comes from the student's choices, not from varied AI output.
- G6. Works in **both** Claude Code and OpenAI Codex, from one folder.
- G7. A student can see progress even when no answer is found: a sharper question, a disproved bet, a dataset, a test.

**Non-goals**

- Teaching a curriculum or grading students.
- Per-problem guides written by the club.
- Cloud hosting, shared servers or a club backend (later phase).
- Preventing students from editing or removing the agent's rules. It's their tool.

**Anti-goals** (failure even if it technically works)

- The agent does the thinking: it writes the student's framing, bets or conclusions _unasked_.
- Invented or unverified sources appear in a student's field map.
- Students get buried in tools. The core must stay small.
- A beginner can't get it installed and gives up.
- A student is helped toward something harmful (dual-use biology, market manipulation, unsafe self-experiments) without a hard stop.

## 4. The Fundamentals (the "design of design")

These ten principles are the heart of the system. AGENTS.md encodes them and every skill obeys them. They're also written so a member can read them as a one-page guide without the agent.

1. **Outcome first, AI second.** Start from the outcome and the problem, never from the tool. "Is this even an AI problem?" is a valid first answer.
2. **Shared design concept before any output.** (Brooks) The AI and the student must hold the same picture of the problem. Interview until it can be said back. Don't produce artefacts early.
3. **Ask, never assume.** When something needed is missing, the AI asks, one question at a time. If the student says "just proceed", every assumption is written down and labelled `ASSUMPTION`.
4. **Shared language.** (Domain-Driven Design, Evans) Keep a glossary of the field's terms and use it consistently. This cuts verbosity and misunderstanding.
5. **Know the known, label the unknown.** Every claim carries a source and a confidence: _established / contested / unknown_. "Unknown" is a valid and valuable answer. Fabrication is the worst failure.
6. **Challenge the premise.** Problem statements carry hidden assumptions. Check them before investing.
7. **Student leads on judgement, AI leads on legwork.** The student goes first on framing, choosing a gap and making a bet. The AI goes first on searching, summarising and verifying. (General and sergeant.)
8. **Small steps, fast feedback.** (_The Pragmatic Programmer_: "don't outrun your headlights") Make bets small and testable, decide what counts as failure before running a test, and test before building big.
9. **Design the boundaries, delegate the inside.** (Ousterhout, deep modules) For any system or experiment, the student defines inputs, outputs, constraints and checks. The AI can fill in the inside unless stakes are high.
10. **Invest in the design every day.** (Kent Beck) Keep the files current (brief, map, bets, log). Re-running prompts without updating understanding makes things worse ("entropy").
11. **Frame everything as What / How / Objective.** Every step the agent takes, every file it writes, every test, every problem statement and every piece of code opens with three lines: **what** we are doing, **how** we are doing it, and **for what objective**. In code this is a header comment on each file and on each function or block that does real work. If the objective can't be stated, the work doesn't start.

## 5. Architecture (local)

### 5.1 Four layers

| Layer            | What                                                                                                                                      | Loaded                            | Changes per problem?              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------- |
| **Constitution** | `AGENTS.md`: fundamentals, governance core, missing-info protocol, intensity rules, routing (which skill when), session start/end routine | Always                            | No                                |
| **Skills**       | One folder per _thinking move_, in the Agent Skills format (`SKILL.md`: name, description/trigger, steps, output file)                    | On demand                         | No                                |
| **Domain packs** | One file per field: where knowledge lives, data sources, regulators, connectors, feeds, starter glossary, field risk rules                | When a problem touches that field | Yes, the only field-specific part |
| **Workflows**    | Repeating jobs, starting with the news digest                                                                                             | On a schedule or at session start | No                                |

Skills are **thinking moves, not per-problem recipes**. PPG, finance and protein problems all use the same skills. Only the domain pack differs.

### 5.2 Two folders: club kit vs student workspace

> **Superseded (2026-11-10):** members now work in one clone of the `ai-club-agent` repo, on their own `member/<github-name>` branch, in a `research/` folder; see the repo `README.md` and `club-agent/install/SETUP-GUIDE.md`. The layout below is kept for history.

Club material and student work are separated so the club can ship updates without touching anyone's work.

```text
club-agent/                      # distributed by the club (git repo). Read-only for students.
  AGENTS.md                      # the constitution
  FUNDAMENTALS.md                # human-readable one-pager of Section 4
  skills/<skill-name>/SKILL.md   # all skills (custom + vendored)
  templates/                     # blank versions of every student file
  install/                       # installer + setup guide
  LICENSES/                      # attribution for vendored skills

club-packs/                      # SEPARATE open repo: domain-pack library (see 8.3). Anyone may push.

my-research/                     # student-owned workspace. Created by installer. Never overwritten.
  AGENTS.md / CLAUDE.md          # thin stubs that load club-agent/AGENTS.md, then LOCAL.md
  LOCAL.md                       # the student's own overrides/additions to the rules (loaded last)
  .agents/skills  -> club-agent/skills   # Codex discovery
  .claude/skills  -> club-agent/skills   # Claude Code discovery
  private-data/                  # raw personal/health data. Agent must never read (see C4).
  profile.md                     # who I am, level, intensity, interests
  watchlist.md                   # feeds + topics for my digest
  domains/<field>.md             # my domain packs (generated or copied from library)
  digests/YYYY-MM-DD.md          # news digests
  problems/<problem-slug>/
    brief.md                     # statement, type, risks, my framing, what counts as an answer
    glossary.md                  # shared language for this problem
    field-map.md                 # claim | source | evidence type | confidence | date
    sources.md                   # verified source list (+ search log)
    gaps.md                      # gap map + ranked open questions
    bets.md                      # my hypotheses and their status
    tests/                       # test designs + results
    log.md                       # dated milestones + session handoffs
```

The student always opens their agent (Claude Code or Codex) **inside `my-research/`**.

**Who can change what:**

- `club-agent/` is maintained by the club core team. Changes go through pull requests, because every member's `git pull` installs them.
- Students never edit `club-agent/`. That keeps updates conflict-free. A student who wants to change or drop a rule does it in `my-research/LOCAL.md`, which loads last and wins. It's their tool.
- `club-packs/` is open to anyone and kept separate, so it can never change anyone's constitution or skills.

### 5.3 Session routine (continuity without cloud)

- **On session start** the agent reads `profile.md`, the active problem's `brief.md` and the tail of `log.md`. It checks whether a digest is due (see 10) and resumes: "Last time you were testing bet #2. Continue?"
- **On session end**, or when the student says "wrap up", the agent appends a handoff to `log.md` (what was done, what's next, open questions). This adapts Pocock's `handoff` skill.

## 6. The journey

Every problem goes through **Stage 0 (Triage)**, then stages 1–5. Stages 2–4 loop. Each stage has a purpose, skills, the files it writes, and an **exit check** the agent verifies with the student before moving on. The student can jump stages at any time. The agent says what's being skipped and moves on, without lecturing.

### Stage 0: Triage (skill: `triage`)

- **Input:** problem statement pasted by the student, in any form.
- **Does:**
  - Classifies the problem as **Frontier question** (research path), **Build task** (build mode, 6.7) or **Learn a topic** (stages 1–2 only), or a mix.
  - Detects the field(s) and loads or creates the domain pack (8).
  - Raises **risk flags**: personal/health data, money/markets, biology/chemistry, scraping, contacting people, minors.
  - Creates `problems/<slug>/brief.md`.
- **Exit check:** brief has the statement, type, field(s) and risk flags, and the student agrees with the classification.

### Stage 1: Where am I (skills: `where-am-i`, `grilling`, `frame-question`)

- **`where-am-i`:** a short, ungraded diagnostic of 3–5 questions per sub-topic ("Explain PPG in two lines"). It records a starting point per sub-topic in `log.md`, and Stage 2 uses it to pitch explanations.
- **`grilling`** (adapted from Pocock): the agent asks one question at a time until the student can say back who is affected, why it's unsolved, what's been tried, and what would change if it were solved.
- **`frame-question`:** the **student drafts first**, rewriting the statement as one main question plus 3–7 sub-questions, and stating **what would count as an answer** and **what would count as progress**. The agent critiques; it doesn't write.
- **Exit check:** `brief.md` contains the student's own framing and success definition, approved by the student.

### Stage 2: Bring me up to date (skills: `field-map`, `glossary`, `verify-sources`)

- **`field-map`:** a lightweight scoping review.
  - Logs search strings and sources searched in `sources.md`.
  - Screens results and extracts claims into `field-map.md`, with **evidence type** (human study / animal / bench / simulation / preprint / industry claim / news / opinion) and **confidence** (established / contested / unknown).
  - Explains the map at the student's level, filling the gaps the diagnostic found.
  - Covers: who is working on it (academia, companies, funders), what has been tried, what failed and why, the current best attempt, and what regulators say.
  - If the student has a deep-research tool (ChatGPT/Gemini), the agent may suggest running it and pasting the result in. Everything pasted is treated as unverified input.
- **`glossary`:** builds `glossary.md` from terms met (adapted from Pocock's domain-modeling). The agent uses these terms consistently from then on.
- **`verify-sources`** (mandatory, runs before any map is shown). A source counts as **verified** when all three of these hold:
  - (a) its identifier resolves to the exact item: DOI, arXiv ID, PMID, or for items without one (news, company pages, regulator notices) the URL, actually fetched;
  - (b) title, authors or publisher, and date match what was cited;
  - (c) a short passage supporting the claim is quoted from text the student can legitimately access. An abstract is acceptable and is tagged `abstract-only`.
  - Items that fail any check never enter the map. They go into a separate **"Leads to check"** section at the bottom of `sources.md`, which the student can follow up by hand (for example, a paywalled paper via the library).
  - Evidence type (8 categories) and confidence still apply to verified items, so a verified press release is still labelled _industry claim_.
- **Exit check (teach-back):** the student explains the current state in their own words. The agent points out gaps and either loops or moves on.

### Stage 3: Challenge (skills: `premise-check`, `gap-map`)

- **`premise-check`:** tests assumptions in the original statement and in the student's framing against the field map. Example: "Neuralink regulates nerves". Its device mainly _reads_ motor-cortex signals; nerve _regulation_ is bioelectronic medicine (e.g. vagus nerve stimulation). Corrected premises are recorded in `brief.md`.
- **`gap-map`:** builds a grid (e.g. approaches × outcomes, or questions × evidence). Empty or contested cells are open questions. It also lists **assumptions everyone in the field holds** as candidates to challenge. Output: `gaps.md` with ranked open questions.
- **Exit check:** the **student picks** which gap to pursue and says why.

### Stage 4: Bet and test (skills: `hypothesis`, `cheap-test`, `ethics-check`), looping

- **`hypothesis`:** the **student writes the bet first**. The agent stress-tests it: is it falsifiable, what would prove it wrong, who would disagree, has it already been tried (back to the field map). Recorded in `bets.md` with status _open / confirmed / killed / refined_.
- **`cheap-test`:** designs the smallest test that could move the bet: a public-dataset analysis, a phone-camera experiment, a literature contradiction check, a simulation, a prototype, a survey or an expert conversation. The **expected result and kill criterion are written before running**. Saved in `tests/`.
- **`ethics-check`** (mandatory gate before any test that touches people, personal data, money, biology/chemistry, scraping or outreach): applies the core and field governance rules (9). It can block, and if so it names who to involve (faculty mentor).
- If a test needs software, hand off to **build mode** (6.7).
- Results update `bets.md` and the field map, and loop back to Stage 2 or 3 as needed.
- **No final exit.** Progress is recorded as milestones (6.6).

### Stage 5: Stay current (skill: `news-digest`)

Sets up `watchlist.md` from the domain pack plus the student's interests, and produces digests (see 10). Items that change the field map are flagged ("this preprint contests claim #7").

### 6.6 Progress without an answer (skill: `log-progress`)

Milestones logged to `log.md`:

- question sharpened
- premise corrected
- field map verified
- gap chosen
- bet written
- bet killed
- dataset found
- test run
- expert spoken to
- prototype built

Killed bets count as progress.

### 6.7 Build mode

Triggered when triage says _Build task_ or when a test needs software. It reuses existing skills: `grilling` → `to-spec` (Pocock) → `writing-plans` (superpowers) → implement in small steps with `tdd` / `verification`. The student designs the boundaries (inputs, outputs, checks) and the agent implements inside them (Fundamental 9). Output goes in `problems/<slug>/build/`.

## 7. Intensity

Stored in `profile.md`. Every skill reads it. The student can change it at any time ("go harder", "slow down").

|                     | **Gentle**                                                      | **Standard**             | **Relentless**                                 |
| ------------------- | --------------------------------------------------------------- | ------------------------ | ---------------------------------------------- |
| Suggested for       | L1–L2                                                           | L3                       | L4–L5                                          |
| Questions           | One at a time, with an example of what a good answer looks like | One at a time            | One at a time, follow-ups on weak answers      |
| Explanations        | Plain words, define every new term                              | Define key terms         | Terms assumed after the glossary               |
| Pushback            | Encouraging, points to one gap                                  | Points to all major gaps | Argues the opposite side, hunts edge cases     |
| Pace through stages | Smaller chunks, more teach-backs                                | Normal                   | Fast, skips teach-back if the answer is strong |

The **student-leads-on-judgement rule** (Fundamental 7) holds at every intensity. If the student explicitly says "just do it", the agent complies, labels the output as AI-written in the file, and moves on without lecturing.

## 8. Domain packs

### 8.1 Generated, not pre-built

The skill `domain-pack` runs the first time a problem touches a field with no pack in the student's `domains/` folder. It first checks `club-agent/library/packs/` for an existing pack. If found, it copies the pack as a **starting draft and re-verifies its sources**. Otherwise it builds a new one. Nothing depends on the library being good.

### 8.2 Pack contents

| Section                         | Example: finance                                                                                                   | Example: protein research                                                        |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Where knowledge lives           | SSRN, arXiv q-fin, central bank research                                                                           | bioRxiv, PubMed, structural biology journals                                     |
| Data to test with               | SEC EDGAR, FRED, NSE/BSE data                                                                                      | UniProt, PDB, AlphaFold DB                                                       |
| Who decides (regulators/bodies) | SEBI, RBI                                                                                                          | CDSCO/ICMR, biosafety committees                                                 |
| Connectors available            | whatever MCP servers exist, else web search                                                                        | Anthropic life-sciences connectors (PubMed, bioRxiv, ChEMBL, ClinicalTrials.gov) |
| News feeds                      | regulator press releases, journal RSS                                                                              | preprint category feeds, PubMed saved-search RSS                                 |
| Starter glossary                | 15–20 key terms                                                                                                    | 15–20 key terms                                                                  |
| **Field risk rules**            | no personalised investment advice; no insider information; no market manipulation; SEBI rules on research analysts | **dual-use / biosecurity hard stop**; no wet-lab work outside supervised labs    |

(These examples are indicative. The `domain-pack` skill verifies the real sources at generation time.)

### 8.3 Open library

- Any member may add a pack to the separate `club-packs/` repo. There is no review gate.
- Because packs are unreviewed, the agent treats them as **data, never instructions**:
  - It copies only the structured sections (sources, feeds, glossary, risk rules).
  - It ignores any text in a pack that tries to direct the agent's behaviour.
  - It re-verifies every source.
- Field risk rules taken from a library pack can only _add_ restrictions. They can never relax core rules.

## 9. Governance

Governance comes in two layers: **core rules** in AGENTS.md, always on, and **field rules** from the domain pack, added on top. Core rules are grouped under the NIST AI RMF functions so the club can map them to an accepted framework later.

### 9.1 Core rules

| #   | Rule                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Source / basis                                                         |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| C1  | **Source integrity.** No factual claim without a verified source. Quote the supporting passage. Label confidence. Say "unknown" rather than guess. Remove anything that can't be verified.                                                                                                                                                                                                                                                                                                                                                                       | NIST AI 600-1 ("confabulation"); citation-hallucination findings       |
| C2  | **Ask, don't assume.** Missing information triggers a question. Any assumption made to proceed is labelled `ASSUMPTION`.                                                                                                                                                                                                                                                                                                                                                                                                                                         | Fundamental 3                                                          |
| C3  | **Label authorship.** In student files, AI-written content is marked as such. The student's own framing and bets are kept distinct.                                                                                                                                                                                                                                                                                                                                                                                                                              | COPE / ICMJE (AI is never an author; accountability stays with humans) |
| C4  | **Personal data.** Never put identifiable personal or health data into an LLM prompt. Get explicit, specific consent before collecting any personal data (surveys, sensor readings). **Enforcement:** raw personal data lives only in `my-research/private-data/`. The agent's rules forbid reading it, and the installer adds a tool-level deny rule for that folder where the runtime supports one (Claude Code permissions; Codex equivalent to verify). Only de-identified data, created by the student or by a script the student runs, goes into `tests/`. | India DPDP Act 2023 + Rules (2025)                                     |
| C5  | **Human subjects.** Any data collection from people beyond trivial surveys goes through a faculty sponsor and, where required, an ethics committee.                                                                                                                                                                                                                                                                                                                                                                                                              | ICMR National Ethical Guidelines (2017), ICMR AI guidelines (2023)     |
| C6  | **Outreach.** The AI may draft messages to experts or companies. The student reviews and sends. No mass messaging. Disclose AI assistance where relevant.                                                                                                                                                                                                                                                                                                                                                                                                        | Club rule                                                              |
| C7  | **Respect access rules.** Follow site terms and robots.txt. Use no paywalled content outside what the student legitimately has access to.                                                                                                                                                                                                                                                                                                                                                                                                                        | Club rule                                                              |
| C8  | **Disclose when sharing.** Anything published or presented outside the club states how AI was used.                                                                                                                                                                                                                                                                                                                                                                                                                                                              | COPE; EU AI Act Art. 50 spirit                                         |
| C9  | **Provenance.** `log.md` records which tool and model produced major outputs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | NIST AI RMF                                                            |

### 9.2 Hard stops (agent stops, explains, points to a faculty mentor)

- Work moving toward creating or enhancing biological, chemical, radiological or nuclear harm (dual-use).
- Self-experimentation that **intervenes** in the body: stimulation devices, drugs or supplements as test variables, invasive procedures, or implants. (Non-invasive, observational self-measurement with consumer devices, such as a phone-camera PPG reading of one's own pulse or a smartwatch, is **allowed**, provided raw data stays in `private-data/`.)
- Medical diagnosis or treatment claims about real people.
- Personalised investment advice to others, or anything resembling market manipulation or insider trading.
- Surveillance or profiling of identifiable private individuals.

### 9.3 Field rules

Each domain pack carries its own risk rules (8.2), and `ethics-check` applies them along with the core rules.

## 10. News digest (local)

- **`news-digest` setup:** builds `watchlist.md` from free feeds. Defaults are arXiv category RSS, bioRxiv/medRxiv subject feeds, PubMed saved-search RSS and Google Alerts (RSS delivery), plus the domain pack's regulator and journal feeds and topics from the student's active problems.
- **Primary trigger, catch-up on open:** at session start the agent checks the date of the last digest. If a digest is due (weekly by default, set in `profile.md`), it builds one covering everything since the last digest. This works without any scheduler.
- **Optional trigger:** a local scheduled task (Claude Code desktop scheduled tasks, Codex desktop scheduled tasks, or an OS scheduler). The installer offers it but doesn't require it.
- **Output:** `digests/YYYY-MM-DD.md` with 5–15 items, each with a verified link, a one-line "why it matters to your problem", and flags where an item affects `field-map.md` or `bets.md`.
- Cloud scheduling (runs with the laptop off) belongs to the later AWS/GCP phase.

## 11. Skill catalogue

**Origin key:** **Custom** = written by the club. **Adapt** = vendored and modified. **Vendor** = copied as-is.
All vendored skills are pinned copies with licence attribution in `LICENSES/`.

| Skill                           | Stage             | Origin                                                                            | Output                                  |
| ------------------------------- | ----------------- | --------------------------------------------------------------------------------- | --------------------------------------- |
| `triage`                        | 0                 | Custom                                                                            | `brief.md` (type, field, risks)         |
| `domain-pack`                   | 0 / any           | Custom                                                                            | `domains/<field>.md`                    |
| `where-am-i`                    | 1                 | Custom (inspired by Pocock `teach`)                                               | starting point in `log.md`              |
| `grilling`                      | 1, build          | Adapt (Pocock `grilling`, MIT)                                                    | `brief.md`                              |
| `frame-question`                | 1                 | Custom                                                                            | `brief.md` framing + success definition |
| `field-map`                     | 2                 | Adapt (K-Dense `literature-review`, MIT; PRISMA-ScR method)                       | `field-map.md`, `sources.md`            |
| `glossary`                      | 2                 | Adapt (Pocock `domain-modeling`, MIT)                                             | `glossary.md`                           |
| `verify-sources`                | 2 (and any claim) | Custom                                                                            | verified `sources.md`                   |
| `premise-check`                 | 3                 | Adapt (K-Dense `scientific-critical-thinking`, MIT)                               | corrections in `brief.md`               |
| `gap-map`                       | 3                 | Custom (evidence gap map method)                                                  | `gaps.md`                               |
| `hypothesis`                    | 4                 | Adapt (K-Dense `hypothesis-generation`, MIT), changed so the student writes first | `bets.md`                               |
| `cheap-test`                    | 4                 | Custom                                                                            | `tests/`                                |
| `ethics-check`                  | 4 (gate)          | Custom                                                                            | entry in `log.md`; block/allow          |
| `news-digest`                   | 5                 | Custom                                                                            | `watchlist.md`, `digests/`              |
| `log-progress`                  | all               | Custom                                                                            | `log.md` milestones                     |
| `handoff`                       | session end       | Adapt (Pocock `handoff`, MIT)                                                     | `log.md` handoff                        |
| `to-spec`                       | build             | Vendor (Pocock, MIT)                                                              | `build/spec.md`                         |
| `writing-plans`, `verification` | build             | Vendor (superpowers, MIT)                                                         | `build/plan.md`                         |
| `tdd`                           | build             | Vendor (Pocock, MIT)                                                              | code + tests                            |

That's 11 custom or heavily changed skills and 8 vendored or lightly adapted. More skills from K-Dense or elsewhere can be offered as **optional extras**, never loaded by default (anti-goal: tool overload).

## 12. Install and update (local)

- **Prerequisites:** Claude Code (every member has it by default) and git. **Claude Code is the primary runtime.** Codex compatibility (AGENTS.md + `.agents/skills`) is kept as a low-cost bonus, but nothing may depend on it.
- **Surfaces:** the **desktop apps** are the primary target for beginners: the Claude desktop app's Code tab and the Codex app. The **CLIs** are supported for L4–L5. Skills and files must behave the same on both. The setup guide is written for the desktop apps first, and running the installer is the only terminal step.
- **Installer:** one command per OS (macOS, Windows). It clones `club-agent/`, creates `my-research/` from templates, creates the skill links (or copies, where symlinks fail on Windows), creates the stub instruction files, asks 4 profile questions (name, level, interests, preferred intensity), and optionally sets up the scheduled digest.
- **Setup buddy:** each L2 member is paired with an L4/L5 member for install. Target: working install in 30 minutes.
- **Update:** `git pull` inside `club-agent/`. Student files are never touched. Breaking changes to file templates ship with a migration note the agent can apply on request.
- **Connectors:** the installer offers the Anthropic life-sciences connectors and community connectors (arXiv, OpenAlex, openFDA) as optional add-ons. Core skills must work with plain web search when no connectors are installed.

## 12a. Release model

There is no cohort and no deadline. The **full product as designed ships as one release**, members use it, the club collects feedback (a `feedback` skill or form link in `log.md` handoffs; builder's choice), and updates go out via `git pull`. Skills should still be token-aware: cap field-map passes and verify in batches, so a normal Claude plan carries a 2–3 hour session.

## 13. Constraints

- Local only. No club server. Student data stays on the student's machine, apart from what the LLM provider processes during use.
- Must run identically enough in Claude Code and Codex. Skills use only features both support.
- Must work in any field. Nothing field-specific outside domain packs.
- Free sources and tools first. Paid tools (Elicit, Consensus, Scite, etc.) are only ever optional.
- Core stays small: at most about 20 default skills.

## 14. What success looks like

- A new member goes from install to a verified `field-map.md` on an unfamiliar frontier topic **within one 2–3 hour session**.
- Zero sources in any `field-map.md` that fail the three-part verification check (Stage 2). Anything that fails sits in "Leads to check" instead.
- The same skills, unchanged, carry a PPG, a finance and a protein problem through stages 0–4 in a dry run.
- At least 80% of L2 members complete install with a buddy within 30 minutes.
- Students report that framing, gap choice and bets are their own (survey after first cycle).

## 15. Decided vs left to the builder

**Decided in this design**

- Local-first. Two-folder split (club kit / student workspace).
- Agent Skills format plus AGENTS.md for Claude Code and Codex compatibility.
- Stages 0–5 plus build mode, each with exit checks.
- The ten fundamentals, three intensities, and governance core rules plus hard stops.
- Domain packs are generated per student. The open library has no review gate and nothing relies on it.
- Digests use catch-up on open, with an optional local scheduler.
- Vendor-and-pin for external skills.

**Design author's calls (made without the club; check these)**

- `club-agent/` is maintained by a core team through pull requests, and the pack library lives in a separate open repo, `club-packs/`.
- Student rule changes go in `my-research/LOCAL.md`, never in `club-agent/`.
- Pack text is treated as data, not instructions, and field rules from packs can only add restrictions.
- The definition of "verified" (three checks, abstract-only allowed), with failures moved to "Leads to check".
- Raw personal data goes in `private-data/`, which the agent can't read; only de-identified data goes in `tests/`.
- Desktop apps are the primary surface and the CLIs are secondary.

**Left to the builder**

- Exact wording of AGENTS.md and each SKILL.md.
- Installer mechanics (script language, symlink vs copy, stub-file approach for loading the club AGENTS.md).
- File formatting details (Markdown tables vs lists) inside templates.
- Default number of sources per field map per intensity.
- Which optional connectors to list and how to install them.

## 16. Open items to verify

- Whether Claude Code reads `.agents/skills` directly. If not, the `.claude/skills` link in 5.2 covers it.
- Codex free-plan and scheduled-task eligibility.
- Free-tier limits of the optional research tools.
- The DPDP research-exemption effective date (reported as May 2027). Until then, assume no exemption.
- Stability of the community connectors (arXiv, OpenAlex, openFDA).

## 17. Later (not in this phase)

- Cloud (AWS/GCP): scheduled digests that run with the laptop off, an optional shared pack library service, backups.
- Club-level views (who is working on which field), opt-in only.
