# AI Club Problem Site

**What:** The public site where members browse the AI Club's frontier problems by industry, read short briefs, step through the full problem in bites, and see how to start it in Claude Code.
**How:** A static Next.js export built from `club-agent/problems/**` and `club-agent/install/SETUP-GUIDE.md`. Per-member state (peeked, saved, progress, filters) lives only in the browser's `localStorage`.
**Objective:** Members with low reading stamina but real curiosity find a problem that's theirs, fast.

## Run it

From the repo root:

- `npm ci && npm ci --prefix site`: install everything.
- `npm run site:dev`: dev server at http://localhost:3000.
- `npm run site:build`: static export to `site/out/`.
- `npm run site:test`: unit tests, plus checks on the export when `site/out` exists.
- `npm run check`: format, lint, kit tests and site unit tests (runs on every commit).
- `npm run site:e2e`: Playwright smoke, sanity and regression suites against the built site at phone, tablet and desktop sizes. Locally it uses your installed Chrome; in CI it installs Chromium.
- `npm run verify`: everything above plus a fresh build. Runs before every push and in CI.

### What the browser suites cover

| Suite                                 | What it checks                                                                                                                                                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Smoke (`e2e/smoke.spec.ts`)           | Every page (landing, start, every world, every problem) returns 200, has a heading and title, and logs no script errors or missing assets.                                                                                |
| Sanity (`e2e/sanity.spec.ts`)         | The member journeys: landing to world to problem to bites to "Start it"; filters narrow, clear and persist; deep links; save and peek counter; Surprise me; copy; keyboard; storage blocked; JavaScript off; setup guide. |
| Regression (`e2e/regression.spec.ts`) | The control size system (every button 48px with 16px text, every pill, tab and filter chip 44px), no button stretching in a row, and no horizontal overflow, on the key pages at all three sizes.                         |

## Content

- **Problems:** edit or add files in `club-agent/problems/<industry>/`. The site picks them up on the next build. A file that breaks the schema fails the build.
- **New industry:** add its folder, then add one entry to `site/src/lib/industries.ts` (name, colour token, mascot seed, joke) and its colour token in `site/src/app/globals.css`.
- **Nudges:** `site/src/lib/nudges.ts`.
- **Setup steps:** edit `club-agent/install/SETUP-GUIDE.md`. `/start` renders it.

## Configure

| Setting                    | Where                                       | Default                                       |
| -------------------------- | ------------------------------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | GitHub repository variable (and Vercel env) | `https://ai-club-problems.vercel.app`         |
| `NEXT_PUBLIC_KIT_REPO_URL` | GitHub repository variable (and Vercel env) | `https://github.com/REPLACE-ME/ai-club-agent` |

## Deploy

`.github/workflows/deploy-site.yml` deploys to Vercel production on every push to `main` that touches the site, the problems or the setup guide. One-time setup:

0. Git-triggered Vercel deployments are disabled by the root `vercel.json` (`git.deploymentEnabled: false`), so only this tested workflow deploys, even if the repo is connected to Vercel.
1. Create a Vercel project. The workflow uploads the already-built `site/out` folder, so set Framework Preset to **Other** and leave Root Directory and Build Command empty.
2. In GitHub, add these repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`. Run `vercel link` at the repo root, then copy them from `.vercel/project.json`.
3. Add the repository variables `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_KIT_REPO_URL`.
