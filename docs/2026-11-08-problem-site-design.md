# Problem Site: Design

**What:** A public website where AI Club members browse the 30 frontier problem statements by industry, read a short brief, dive into the full problem in bite-sized steps, and optionally learn how to start it in Claude Code.
**How:** A static Next.js site in `site/`, generated at build time from `club-agent/problems/**`. It uses the approved "Paper Arcade" visual direction, keeps all per-visitor state in the browser, and deploys to Vercel from a GitHub Action on every merge to main.
**Objective:** Members have low reading stamina but real curiosity. The site gets them from "what is this?" to "this one's mine" without a wall of text.

Status: approved direction (mockups `docs/designs/flow-v2.html` for phone and `docs/designs/desktop-v1.html` for desktop). Date: 2026-11-08.

## 1. Audience and job

- **Audience:** ~45 AI Club members. Business-school students in India, mixed skill (L2–L5). They open the site mostly on phones, sometimes on laptops.
- **The one job:** pick a problem they're curious about, and know how to start it.
- **"Game" means the experience, not the rewards.** Worlds you enter, cards you flip, a progress bar through the bites, playful copy. There are **no points, streaks, badges or leaderboards** (user decision).

## 2. Flow (four layers of depth)

1. **Mission (landing):** what the AI Club's problem library is, in one headline, one sentence and three real counts (30 problems, 10 industries, 0 known answers). Actions: "Pick your world" and "Surprise me", which opens a random problem's brief.
2. **Pick a world:** a bento of the 10 industries. Each tile has its industry colour, its DiceBear croodle mascot, its problem count and a one-line joke. On desktop the mission and the bento share the first screen.
3. **World page:** brief cards for that industry's problems. Each card shows the number, the question as the headline, one line of "why it matters", and chips for level, effort and skills. Buttons: "I'm curious" (opens the full problem) and "Read the whole thing" (same target). Filters are built from the data. Level has three options: any; "New to this?" (the range starts at L2); and "Some experience" (the range starts at L3 or above). Effort shows "any" plus only the effort values the problems actually use (today: month, semester).
4. **Full problem in bites:** one step per section, with a progress bar and tabs. Each step has a fixed hash slug:

   | #   | Step          | Slug       | Built from                                                          |
   | --- | ------------- | ---------- | ------------------------------------------------------------------- |
   | 1   | The question  | `question` | open question + why it matters                                      |
   | 2   | Who cares     | `who`      | who cares + India angle                                             |
   | 3   | Scope         | `scope`    | in scope / out of scope                                             |
   | 4   | What's known  | `known`    | what is known (facts with source pills)                             |
   | 5   | The unknown   | `unknown`  | what is unknown                                                     |
   | 6   | Words to know | `words`    | key terms                                                           |
   | 7   | Angles        | `angles`   | possible angles                                                     |
   | 8   | Ways in       | `ways-in`  | starting points table                                               |
   | 9   | Who's paying  | `funding`  | funding table, evidence shown as a pill, plus the evidence footnote |
   | 10  | Watch out     | `risks`    | risk flags, plus "Leads to check" if present                        |

   "Leads to check" items are shown only in the last step, in a box labelled "Unverified leads: not facts", so nothing in the file is hidden and nothing unverified looks like a fact.
   - A step shows at most what its section holds. Facts appear as cards, each with its source as a link pill.
   - Desktop uses three zones: the steps list on the left, the current step in the middle, the "start it" panel and a fit check (level, effort, skills) on the right.

5. **Start it (optional):** three steps (install the Club Agent, open the folder in Claude Code, say `start problem NN`) with a copy button and a link to the setup guide. On phone it is the last screen after the bites; on desktop it is the right-hand panel.

## 3. Visual system ("Paper Arcade", from the approved mockups)

- **Look:**
  - Cream paper with a fine grain.
  - Card-stock buttons with a pressable bottom edge.
  - Tiles and cards with a glossy top-left sheen.
  - Blue-black ink for text.
  - Pear yellow for the primary action, blue for links and focus, coral for one loud sticker, mint for progress.
- **Type:** Chillax 500/600/700 (Fontshare), with a system monospace for code.
- **Industries:** each has a fixed colour token and a fixed DiceBear `croodles` seed, used on every screen inside that world:

  | Industry         | Colour token |
  | ---------------- | ------------ |
  | fintech          | `t-fin`      |
  | saas-b2b         | `t-saas`     |
  | frontier-science | `t-front`    |
  | ecommerce-retail | `t-ecom`     |
  | healthtech       | `t-health`   |
  | marketing-adtech | `t-mkt`      |
  | logistics        | `t-log`      |
  | edtech           | `t-ed`       |
  | real-estate      | `t-re`       |
  | legal            | `t-legal`    |

  Exact values are in the mockups' `:root`.

- **Nudges:** one per screen, dry and funny, spoken by the world's mascot (or the club mascot outside a world). The mockup copy is the starting point. Nudges live in one content file so they are easy to edit.
- **Motion:** a hover or press lift of a few pixels (transform only), a short slide between bite steps, and no animation when `prefers-reduced-motion` is set. Content is visible without JavaScript (static HTML).

## 4. Data

- **Source of truth:** `club-agent/problems/<industry>/<NN>-<slug>.md`, following the schema the kit's tests enforce: front matter plus fixed `##` sections.
- **At build time:** a loader parses every file into typed objects. Sections become structured data: bullets, bullets with a link, and table rows for starting points and funding. Inline Markdown links in facts render as source pills.
- **Fail loudly:** the build fails if any problem file breaks the schema, so the site and the kit never drift.
- **Industry metadata** (display name, colour token, mascot seed, tile joke, nudges) lives in the site's own content file. Adding a problem file needs no site change; adding a new industry folder needs one metadata entry. The build fails if it is missing.

## 5. Browser-only state (no database)

`localStorage` under one versioned key, `aiclub:v1`. Every read and write is wrapped in try/catch, and the site works fully when storage is unavailable:

- **peeked:** the IDs of problems whose full page was opened. Drives "N of 30 peeked" and a subtle "seen" mark on cards.
- **saved:** the IDs the member saved for later. Shown on the landing as "Your saved problems" when non-empty.
- **progress:** per problem, the furthest bite step reached, so returning opens where they left off.
- **filters:** the last chosen level and effort filters.

There are no accounts and no analytics. Nothing leaves the browser.

## 6. URLs

| Page        | URL                                                                                                                                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing     | `/`                                                                                                                                                                                                                                                                                   |
| World       | `/worlds/<industry>` (e.g. `/worlds/fintech`)                                                                                                                                                                                                                                         |
| Problem     | `/problems/<NN>` (e.g. `/problems/07`), with the current step as a hash (`#known`) so links can deep-link a step                                                                                                                                                                      |
| Start guide | `/start` (the full setup page), rendered from `club-agent/install/SETUP-GUIDE.md` so it never drifts. The guide uses the real clone URL (https://github.com/ashish1497/ai-club-agent), which also lives in the site config as `KIT_REPO_URL`. The per-problem start panel links here. |

Problem IDs are permanent and never reused; the build fails on a duplicate ID. Every page is statically generated. Pages have proper titles and descriptions for link previews (Open Graph title and description; no generated images in v1).

## 7. Tech

- Next.js (App Router) with `output: "export"`, which produces a fully static site. TypeScript. Plain CSS with tokens, using CSS modules or one global stylesheet. No Tailwind, so the mockups' CSS ports directly.
- DiceBear mascots render to inline SVG at build time with `@dicebear/core` and `@dicebear/collection`. There are no runtime calls to the DiceBear API.
- Chillax loads from the Fontshare CSS link with `display=swap`, and system fonts are the fallback.
- **Repo tooling:** the root Prettier, ESLint and Husky apply. ESLint gains TypeScript/React/Next rules for `site/`. Site unit tests run in the pre-commit hook alongside the kit tests.
- **Accessibility:** contrast 4.5:1, a visible focus ring, keyboard navigation (arrow keys between bites, Esc back to the world), touch targets of at least 44 px, and alt text on mascots (decorative ones are empty).

## 8. Deployment

- `.github/workflows/deploy-site.yml` runs on push to `main` when `site/**`, `club-agent/problems/**` or the workflow itself changes. It installs, runs `npm run check` and the site tests, builds the static export, and deploys to Vercel production with the Vercel CLI.
- **Secrets** (added by a maintainer in GitHub): `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
- A PR build workflow comes later (user decision). This workflow is written so a PR variant is a small copy.

## 9. Goals, non-goals, anti-goals

- **Goals:** decide "is this my kind of problem?" in about 15 seconds per card; the full problem readable in about 2 minutes as bites; it works on any device; there is one source of truth for the problems.
- **Non-goals:** accounts, a backend, comments, search (with 30 problems, worlds and filters are enough), analytics, editing problems on the site.
- **Anti-goals:** a wall of text anywhere; jokes that mock the member or the problem's seriousness (health and finance problems keep their risk flags visible); content on the site that differs from the problem files.

## 10. Left to the builder

- Component breakdown, CSS organisation, the exact bite transitions and the "Surprise me" behaviour beyond "open a random problem's brief".
- Exact nudge wording beyond the mockups (keep the tone).
