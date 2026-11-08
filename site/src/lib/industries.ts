// What: Display metadata for each industry world: name, colour token, mascot seed and tile joke.
// How: A fixed list in bento order; colour tokens match globals.css; seeds feed DiceBear croodles.
// Objective: Every world looks and sounds the same on every screen, and a new industry without metadata fails the build.
import type { Industry } from "./types";

export const INDUSTRIES: Industry[] = [
  {
    slug: "fintech",
    name: "Fintech",
    colorVar: "--t-fin",
    seed: "fintech-coin",
    joke: "Money moves. Agents spend it. Who's liable?",
  },
  {
    slug: "frontier-science",
    name: "Frontier science",
    colorVar: "--t-front",
    seed: "frontier-rock",
    joke: "For 2am Wikipedia people",
  },
  { slug: "saas-b2b", name: "SaaS / B2B", colorVar: "--t-saas", seed: "saas-bot", joke: "Agents behaving badly" },
  { slug: "ecommerce-retail", name: "E-commerce", colorVar: "--t-ecom", seed: "ecom-cart", joke: "Robots that shop" },
  { slug: "healthtech", name: "Healthtech", colorVar: "--t-health", seed: "health-pulse", joke: "No lab coat needed" },
  { slug: "marketing-adtech", name: "Marketing", colorVar: "--t-mkt", seed: "mkt-mega", joke: "Ads nobody sees" },
  { slug: "logistics", name: "Logistics", colorVar: "--t-log", seed: "log-truck", joke: "Monsoon-proof?" },
  { slug: "edtech", name: "EdTech", colorVar: "--t-ed", seed: "ed-book", joke: "Does it stick?" },
  { slug: "real-estate", name: "Real estate", colorVar: "--t-re", seed: "re-house", joke: "Flood-priced?" },
  { slug: "legal", name: "Legal", colorVar: "--t-legal", seed: "legal-gavel", joke: "Objection, robot" },
];

export const CLUB_SEED = "club";

export function industryBySlug(slug: string): Industry {
  const i = INDUSTRIES.find((x) => x.slug === slug);
  if (!i) throw new Error(`no industry metadata for ${slug}: add it to site/src/lib/industries.ts`);
  return i;
}
