// What: Shared types for problems, industries and bite steps.
// How: Plain TypeScript types mirrored from the problem-statement template.
// Objective: Every page and component agrees on the shape of the data.
export type Link = { label: string; url: string };
export type Fact = { text: string; source?: Link };
export type Term = { term: string; meaning: string };
export type Resource = { name: string; type: string; url: string };
export type Evidence = "verified" | "secondary" | "unverified";
export type FundingRow = { funder: string; what: string; date: string; url: string; evidence: Evidence };

export type Problem = {
  id: string;
  slug: string;
  industry: string;
  title: string;
  seat: string;
  status: string;
  fundingStrength: string;
  riskFlags: string;
  lastVerified: string;
  levelFit: string;
  levelMin: number;
  effort: string;
  skills: string[];
  question: string;
  why: string;
  whoCares: string[];
  inScope: string[];
  outOfScope: string[];
  known: Fact[];
  unknown: string[];
  terms: Term[];
  angles: { theory: string; practice: string };
  waysIn: Resource[];
  india: string;
  funding: FundingRow[];
  risks: string[];
  leads: string[];
};

export type Industry = { slug: string; name: string; colorVar: string; seed: string; joke: string };
