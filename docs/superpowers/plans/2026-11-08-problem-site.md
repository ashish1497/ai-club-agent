# Problem Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the "Paper Arcade" problem site in `site/`: a static Next.js export that renders the 30 problem files as a playful, mobile-first browse → brief → bites → start flow, with browser-only state.

**Architecture:**

- **Build time:** server components read `club-agent/problems/**` and `club-agent/install/SETUP-GUIDE.md`, parse them into typed data (the build fails on any schema break), and render static HTML. DiceBear mascots are generated as inline SVG.
- **Client islands:** a few components handle `localStorage` state (peeked, saved, progress, filters), the bite viewer, filters, "Surprise me" and copy.
- **Deploy:** a GitHub Action builds the static export and ships it to Vercel with `vercel deploy --prebuilt --prod`.

**Tech Stack:**

- Next.js 16 (App Router, `output: "export"`), React 19, TypeScript.
- Plain CSS (tokens copied from the mockups).
- `gray-matter` (front matter), `marked` (setup guide Markdown).
- `@dicebear/core` + `@dicebear/collection` (croodles).
- Vitest (unit tests, plus jsdom for storage).
- Root Prettier, ESLint and Husky, extended for TypeScript and React.

**Spec:** `docs/2026-11-08-problem-site-design.md`. Visual references: `docs/designs/flow-v2.html` (phone) and `docs/designs/desktop-v1.html` (desktop).

## Global Constraints

- All pages are statically exported (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true`). There is no server runtime, no API route and no database.
- `localStorage` key is `aiclub:v1`. Every access is wrapped in try/catch, and the site renders and navigates fully with storage unavailable.
- URLs: `/`, `/worlds/<industry>/`, `/problems/<NN>/#<step-slug>`, `/start/`.
- **The 10 bite steps**, as slug and label pairs, in this order:
  1. `question` "The question"
  2. `who` "Who cares"
  3. `scope` "Scope"
  4. `known` "What's known"
  5. `unknown` "The unknown"
  6. `words` "Words to know"
  7. `angles` "Angles"
  8. `ways-in` "Ways in"
  9. `funding` "Who's paying"
  10. `risks` "Watch out"
- **Filters:**
  - Level options: `any`, `new` ("New to this?", `level_fit` starts at L2), `experienced` ("Some experience", starts at L3 or above).
  - Effort options: `any` plus the distinct `effort` values present in the data.
- **Config:**
  - `SITE_URL` (env `NEXT_PUBLIC_SITE_URL`, default `https://ai-club-problems.vercel.app`).
  - `KIT_REPO_URL` (env `NEXT_PUBLIC_KIT_REPO_URL`, default `https://github.com/REPLACE-ME/ai-club-agent`). Both live in `site/src/config.ts` only.
- Fonts: Chillax from `https://api.fontshare.com/v2/css?f[]=chillax@500,600,700&display=swap`.
- The build must fail on:
  - a problem file missing a required section or front matter key
  - a duplicate problem ID
  - an industry folder with no metadata entry
- **Accessibility:**
  - contrast 4.5:1
  - `:focus-visible` on every control
  - touch targets of at least 44 px
  - `prefers-reduced-motion` respected
  - arrow keys move between bites, Esc goes back to the world
- **Fundamental 11:** every source file opens with a `// What:` / `// How:` / `// Objective:` header comment (`/* */` in CSS).
- Copy tone: dry and funny. Nudges never mock the member or a problem's seriousness.

## Review Focus

1. **Storage blocked** (private mode, Safari ITP, quota). Pages must still render and navigate. Pinned by `storage.test.ts › survives a throwing localStorage` (Task 3).
2. **Deep link to a bite** (`/problems/07/#known`) opened fresh. It must open on that step, not step 1. Pinned by `steps.test.ts › stepFromHash maps valid and invalid hashes` (Task 2), plus a manual browser check in Task 8.
3. **A problem with no "Leads to check" section, or an empty optional piece.** The step renders without empty boxes. Pinned by `problems.test.ts › leads are optional` (Task 2).
4. **Filters that match nothing.** The world page shows an empty state with a nudge, not a blank area. Pinned by `filters.test.ts › returns empty and the UI shows empty state` (Task 3; UI checked in Task 6).
5. **A new problem file or industry added later.** The site picks it up with no code change. A new industry with no metadata fails the build with a clear message. Pinned by `industries.test.ts › every problem industry has metadata` (Task 2).

---

## File Structure

```text
site/
  package.json  next.config.ts  tsconfig.json  vitest.config.ts  next-env.d.ts
  src/config.ts                      # SITE_URL, KIT_REPO_URL, paths
  src/lib/types.ts                   # Problem, Industry, Step, FundingRow, Resource, Fact, Term
  src/lib/problems.ts                # loadProblems(), getProblem(), parse helpers
  src/lib/industries.ts              # INDUSTRIES metadata
  src/lib/nudges.ts                  # NUDGES copy
  src/lib/steps.ts                   # STEPS, buildSteps(problem), stepFromHash()
  src/lib/filters.ts                 # levelOptions/effortOptions/applyFilters
  src/lib/mascot.ts                  # mascotSvg(seed)
  src/lib/guide.ts                   # loadSetupGuideHtml()
  src/lib/storage.ts                 # client: readState/writeState/markPeeked/toggleSaved/setProgress/setFilters
  src/app/layout.tsx  globals.css    # tokens + base
  src/app/page.tsx                   # landing (mission + bento)
  src/app/worlds/[industry]/page.tsx
  src/app/problems/[id]/page.tsx
  src/app/start/page.tsx
  src/components/*.tsx               # Mascot, Tile, Bento, Nudge, BriefCard, WorldView (client), BiteViewer (client),
                                     # StartPanel, CopyButton (client), PeekCounter (client), SavedStrip (client), SurpriseButton (client)
  tests/*.test.ts
.github/workflows/deploy-site.yml
```

---

### Task 1: Scaffold the site and tooling

**Files:**

- Create: `site/package.json`, `site/next.config.ts`, `site/tsconfig.json`, `site/vitest.config.ts`, `site/src/config.ts`, `site/src/app/layout.tsx`, `site/src/app/page.tsx` (placeholder), `site/tests/smoke.test.ts`
- Modify: root `package.json` (scripts), `eslint.config.mjs` (TS and React rules for `site/**`), `.gitignore` (`site/.next/`, `site/out/`), `.prettierignore` (`site/.next`, `site/out`, `site/next-env.d.ts`)

**Interfaces:**

- **Produces:**
  - Root scripts: `site:dev`, `site:build` (`npm --prefix site run build`), `site:test` (`npm --prefix site test`).
  - `test` becomes `npm run kit:test && npm run site:test`, with `kit:test` being the old test command. `check` is unchanged, so it now covers both.
  - `config.ts` exports `SITE_URL: string`, `KIT_REPO_URL: string`, `REPO_ROOT: string` (absolute path of the repo root, resolved from `process.cwd()`), `PROBLEMS_DIR`, `GUIDE_PATH`.

- [ ] **Step 1:** Write `tests/smoke.test.ts`. It asserts that `config.ts` exports `PROBLEMS_DIR` and `GUIDE_PATH`, and that both exist on disk.
- [ ] **Step 2:** Run `npm --prefix site test`. Expected: FAIL (the module is missing).
- [ ] **Step 3:** Create the scaffold, then install:
  - site dependencies: next, react, react-dom, gray-matter, marked, @dicebear/core, @dicebear/collection
  - site dev dependencies: typescript, @types/react, @types/node, vitest, jsdom
  - root dev dependencies: typescript-eslint, eslint-plugin-react-hooks, @next/eslint-plugin-next
  - Check that the DiceBear core and collection versions are compatible: install the collection's peer version of core.
- [ ] **Step 4:** Run the following; expected all PASS, including the root `npm run check`:
  - `npm --prefix site test`
  - `npm run site:build`
  - `npx eslint site`
  - `npm run check`
- [ ] **Step 5:** Commit: `chore(site): scaffold Next.js static site and tooling`.

### Task 2: Data layer (problems, industries, steps)

**Files:**

- Create: `site/src/lib/types.ts`, `problems.ts`, `industries.ts`, `steps.ts`, `nudges.ts`
- Test: `site/tests/problems.test.ts`, `industries.test.ts`, `steps.test.ts`

**Interfaces:**

- **Produces:**
  - `type Link = { label: string; url: string }`
  - `type Fact = { text: string; source?: Link }` (from `- claim. ([title](url))`)
  - `type Term = { term: string; meaning: string }`
  - `type Resource = { name: string; type: string; url: string }`
  - `type FundingRow = { funder: string; what: string; date: string; url: string; evidence: "verified" | "secondary" | "unverified" }`
  - `type Problem`:
    - Fields: `id`, `slug`, `industry`, `title`, `seat`, `status`, `fundingStrength`, `riskFlags`, `lastVerified`, `levelFit`, `levelMin: number`, `effort`, `skills: string[]`, `question`, `why`, `whoCares`, `inScope`, `outOfScope`, `known: Fact[]`, `unknown`, `terms: Term[]`, `angles: {theory, practice}`, `waysIn: Resource[]`, `india`, `funding: FundingRow[]`, `risks: string[]`, `leads: string[]`
    - String fields are `string`. `whoCares`, `inScope`, `outOfScope`, `unknown` are `string[]`.
  - `loadProblems(dir = PROBLEMS_DIR): Problem[]`: sorted by id. Throws `Error("<file>: missing section ## X")`, `Error("duplicate problem id NN")` and so on.
  - `getProblem(id: string): Problem | undefined`.
  - `type Industry = { slug: string; name: string; colorVar: string; seed: string; joke: string }`
  - `INDUSTRIES: Industry[]`: the 10 industries, in the mockup's desktop bento order. Colours and seeds come from the mockups; jokes from the mockups (Legal: "Objection, robot").
  - `industryBySlug(slug): Industry` throws if missing.
  - `NUDGES`, typed as `{ landing: string; pickWorld: string; world: Record<string, string>; known: string; start: string; emptyFilter: string; notToday: string }`, with copy from the mockups.
  - `STEPS: { slug: StepSlug; label: string }[]` (the 10 steps in Global Constraints).
  - `buildSteps(p: Problem)`: one entry per step with the data it renders.
  - `stepFromHash(hash: string): number`: the index, defaulting to 0.

- [ ] **Step 1:** Write the tests.
  - **`problems.test.ts`:**
    - `loads 30 problems with unique ids`
    - `problem 07 parses known facts with source links`: at least 2 facts, each `source.url` starts with `https://`.
    - `funding rows parse evidence`
    - `levelMin derives from level_fit`: `"L2–L5"` gives 2.
    - `leads are optional`: a problem without the section gives `[]`.
    - `throws on a file missing a section`: uses a temp dir fixture.
  - **`industries.test.ts`:**
    - `every problem industry has metadata`
    - `10 industries`
  - **`steps.test.ts`:**
    - `10 steps in order`
    - `stepFromHash maps valid and invalid hashes`: `#known` gives 3, `#nope` gives 0, and `""` gives 0.
- [ ] **Step 2:** Run `npm --prefix site test`. Expected: FAIL.
- [ ] **Step 3:** Implement, splitting sections on `^## `. Read bullets as `- ` lines. Parse tables by splitting pipes after the header and divider rows. Parse a fact's source with `/\(\[([^\]]+)\]\((https?:[^)]+)\)\)\s*$/`.
- [ ] **Step 4:** Run. Expected: PASS.
- [ ] **Step 5:** Commit: `feat(site): typed problem loader, industries, steps`.

### Task 3: Filters and browser storage

**Files:**

- Create: `site/src/lib/filters.ts`, `site/src/lib/storage.ts`
- Test: `site/tests/filters.test.ts`, `site/tests/storage.test.ts` (jsdom environment)

**Interfaces:**

- **Produces:**
  - `type Filters = { level: "any" | "new" | "experienced"; effort: string }` (`"any"` or an effort value).
  - `effortOptions(problems): string[]`
  - `applyFilters(problems, f): Problem[]`
  - `type State = { peeked: string[]; saved: string[]; progress: Record<string, number>; filters: Filters }`
  - `readState(): State` (defaults on any failure)
  - `writeState(s): void` (never throws)
  - `markPeeked(id)`, `toggleSaved(id): boolean`, `setProgress(id, step)` (keeps the max), `setFilters(f)`
  - `STORAGE_KEY = "aiclub:v1"`

- [ ] **Step 1:** Write the tests.
  - **`filters.test.ts`:**
    - `new = starts at L2`
    - `experienced = starts at L3+`
    - `effort options come from data` (`["month","semester"]` today)
    - `returns empty when nothing matches`
  - **`storage.test.ts`:**
    - `round-trips state`
    - `markPeeked dedupes`
    - `setProgress keeps max`
    - `survives a throwing localStorage`: stub `localStorage.getItem`/`setItem` to throw; `readState` returns defaults and `writeState` doesn't throw.
    - `ignores corrupt JSON`
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run. Expected: PASS.
- [ ] **Step 5:** Commit: `feat(site): filters and browser-only state`.

### Task 4: Visual system, mascots, landing page

**Files:**

- Create: `site/src/app/globals.css` (tokens and base, ported from the mockups' `:root`, `.btn`, `.tile`, `.card`, `.chip`, `.nudge`, `.sticker`, `.fact`, `.src`, `.term`)
- Create: `site/src/lib/mascot.ts`
- Create components: `Mascot.tsx`, `Tile.tsx`, `Bento.tsx`, `Nudge.tsx`, `PeekCounter.tsx` (client), `SavedStrip.tsx` (client), `SurpriseButton.tsx` (client)
- Modify: `layout.tsx`, `page.tsx`
- Test: `site/tests/mascot.test.ts`

**Interfaces:**

- **Produces:**
  - `mascotSvg(seed: string): string`: an SVG string, deterministic per seed.
  - `<Mascot seed size label?>`: renders the SVG inline with `role="img"` and `aria-label`, or `aria-hidden` when there is no label.
  - `<Tile industry count big?>`: links to `/worlds/<slug>/`.
  - `<Bento problems>`
  - `<Nudge seed text>`
- [ ] **Step 1:** Write `mascot.test.ts`: `same seed same svg`, `different seeds differ`, `returns <svg`.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement. The landing matches the mockups:
  - **Phone:** mission, then the bento below.
  - **Desktop (≥1024px):** a two-column grid, mission on the left and bento on the right.
  - Counts come from the data: problems, industries, and "0 known answers".
  - `SavedStrip` shows saved problems when there are any.
  - `SurpriseButton` picks a random problem and navigates to `/problems/<id>/`.
  - The `PeekCounter` pill shows "N of 30 peeked".
- [ ] **Step 4:** Run the tests and `npm run site:build`. Expected: PASS. Then check by eye in the browser at 375 and 1280 widths against the mockups.
- [ ] **Step 5:** Commit: `feat(site): Paper Arcade styles, mascots, landing`.

### Task 5: World pages

**Files:**

- Create: `site/src/app/worlds/[industry]/page.tsx` (`generateStaticParams` from `INDUSTRIES`)
- Create components: `BriefCard.tsx`, `WorldView.tsx` (client: filters, applying stored filters, peeked marks, empty state)

**Interfaces:**

- **Consumes:** `applyFilters`, `effortOptions`, `readState`, `setFilters` (Task 3); `industryBySlug`, `NUDGES` (Task 2).
- [ ] **Step 1:** Add a test, `filters.test.ts › world 'fintech' has 4 problems`, as a guard for the page's data selection, using `loadProblems().filter(p => p.industry === "fintech")`.
- [ ] **Step 2:** Run. Expected: PASS once the data exists. This is a guard, not the RED step. The real RED is the build: `site:build` fails while the route doesn't exist and is linked from the landing tiles.
- [ ] **Step 3:** Implement to the mockups:
  - **Phone:** a header with the mascot, filter chips, and the cards stacked.
  - **Desktop:** a sticky colour side panel with the filters and a nudge, and a 2-column grid of cards.
  - Each card shows the number, the question, the why line, chips (level, effort, the first 2 skills), "Read the whole thing" and "I'm curious".
  - The empty state uses `NUDGES.emptyFilter`.
- [ ] **Step 4:** Run `npm run site:build`. Expected: `site/out/worlds/fintech/index.html` exists, and the grep `Can banks catch mule rings` is found in it.
- [ ] **Step 5:** Commit: `feat(site): world pages with brief cards and filters`.

### Task 6: Problem pages with the bite viewer

**Files:**

- Create: `site/src/app/problems/[id]/page.tsx` (`generateStaticParams` from `loadProblems`; `generateMetadata` with title, description and Open Graph using `SITE_URL`)
- Create components: `BiteViewer.tsx` (client), `StartPanel.tsx`, `CopyButton.tsx` (client), `FactCard.tsx`

**Interfaces:**

- **Consumes:** `buildSteps`, `STEPS`, `stepFromHash` (Task 2); `markPeeked`, `setProgress`, `toggleSaved`, `readState` (Task 3).
- **Behaviour:**
  - On mount: mark peeked. The opening step is the hash's step, or else the stored progress, or else 0.
  - Step changes update the hash with `history.replaceState` and store progress.
  - Arrow Left/Right move between steps; Esc navigates to `/worlds/<industry>/`.
  - **Phone:** horizontal tabs, the step content, a bottom dock (Back / Next with the next step's label). After the last step, "Start it" shows `StartPanel` inline.
  - **Desktop (≥1024px):** three columns. Left: the vertical step list with done marks. Middle: the step. Right: `StartPanel` plus the fit check.
  - **Server-rendered fallback:** without JavaScript, all steps render stacked as sections with ids, so the content is readable and the anchors work. The client enhances this into the stepper.
  - "Unverified leads: not facts" box: only in `risks`, and only if `leads.length > 0`.
- [ ] **Step 1:** Add the tests:
  - `steps.test.ts › buildSteps(07) known has facts with sources and risks has no leads box when empty`
  - `problems.test.ts › every problem has 10 non-empty steps`
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run the tests and `npm run site:build`. Expected: PASS, and `out/problems/07/index.html` contains `id="known"`.
- [ ] **Step 5:** Commit: `feat(site): problem pages with bite viewer and start panel`.

### Task 7: Start page from the setup guide

**Files:**

- Create: `site/src/lib/guide.ts`, `site/src/app/start/page.tsx`
- Test: `site/tests/guide.test.ts`

**Interfaces:**

- **Produces:** `loadSetupGuideHtml(): string`. It reads `GUIDE_PATH`, strips the What/How/Objective lines (shown as the page intro instead), replaces `<club-agent repo URL>` with `KIT_REPO_URL`, and renders with `marked`.
- [ ] **Step 1:** Write the tests:
  - `guide html contains Install (macOS) heading`
  - `placeholder replaced by KIT_REPO_URL`
  - `no raw <club-agent repo URL> left`
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement. The page styles the guide in the paper look and puts a "Pick a problem first" link back to `/`.
- [ ] **Step 4:** Run the tests and the build. Expected: PASS.
- [ ] **Step 5:** Commit: `feat(site): start page rendered from the kit setup guide`.

### Task 8: Build smoke test, browser QA, deploy workflow

**Files:**

- Create: `site/tests/build.test.ts` (skipped unless `site/out` exists), `.github/workflows/deploy-site.yml`
- Modify: root `README` or `site/README.md` (how to run, configure, deploy), kit `CHANGELOG.md`

**Interfaces:**

- **`build.test.ts`:**
  - `every problem and world has an exported page`: for each problem, `out/problems/<id>/index.html`; for each industry, `out/worlds/<slug>/index.html`.
  - `no page references api.dicebear.com` (mascots are inline).
- **Workflow:** runs on push to `main` with paths `site/**`, `club-agent/problems/**`, `club-agent/install/SETUP-GUIDE.md` and `.github/workflows/deploy-site.yml`. Steps:
  1. checkout
  2. setup-node (from `.nvmrc`, or 22)
  3. `npm ci`
  4. `npm ci --prefix site`
  5. `npm run check`
  6. `npm run site:build`
  7. `npm --prefix site test`
  8. `npx vercel pull --yes --environment=production --token=$VERCEL_TOKEN` (in `site/`)
  9. `npx vercel build --prod`
  10. `npx vercel deploy --prebuilt --prod`

  It uses the env `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` and `NEXT_PUBLIC_*` from repository variables.

- [ ] **Step 1:** Write `build.test.ts`.
- [ ] **Step 2:** Run it after a fresh `npm run site:build`. Expected: PASS. If a page is missing, fix the route.
- [ ] **Step 3:** Browser QA with `preview_start` on `site/out`:
  - check 375px and 1280px against the mockups
  - keyboard: Tab focus is visible, arrows move between bites, Esc goes back
  - deep link `#known` opens that step
  - with storage blocked (devtools override), pages still work
  - fix what fails
- [ ] **Step 4:** Write the workflow and the README.
- [ ] **Step 5:** Run `npm run check`. Expected: PASS. Commit: `feat(site): build smoke test, deploy workflow, docs`.

---

## Not in this plan

- Creating the GitHub repo, the Vercel project, secrets or a domain (the user will do these).
- The PR build workflow (later).
- Search, accounts, analytics.
