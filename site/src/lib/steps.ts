// What: The 10 bite steps a full problem is read in, and the mapping from URL hash to step.
// How: A fixed ordered list plus buildSteps(), which slices a Problem into per-step payloads.
// Objective: Readers take the problem in short bites, and links like /problems/07/#known open the right one.
import type { Fact, FundingRow, Problem, Resource, Term } from "./types";

export const STEPS = [
  { slug: "question", label: "The question" },
  { slug: "who", label: "Who cares" },
  { slug: "scope", label: "Scope" },
  { slug: "known", label: "What's known" },
  { slug: "unknown", label: "The unknown" },
  { slug: "words", label: "Words to know" },
  { slug: "angles", label: "Angles" },
  { slug: "ways-in", label: "Ways in" },
  { slug: "funding", label: "Who's paying" },
  { slug: "risks", label: "Watch out" },
] as const;

export type StepSlug = (typeof STEPS)[number]["slug"];

export type BuiltStep =
  | { slug: "question"; label: string; question: string; why: string }
  | { slug: "who"; label: string; whoCares: string[]; india: string }
  | { slug: "scope"; label: string; inScope: string[]; outOfScope: string[] }
  | { slug: "known"; label: string; facts: Fact[] }
  | { slug: "unknown"; label: string; items: string[] }
  | { slug: "words"; label: string; terms: Term[] }
  | { slug: "angles"; label: string; theory: string; practice: string }
  | { slug: "ways-in"; label: string; resources: Resource[] }
  | { slug: "funding"; label: string; rows: FundingRow[] }
  | { slug: "risks"; label: string; risks: string[]; leads: string[] };

const label = (slug: StepSlug) => STEPS.find((s) => s.slug === slug)!.label;

export function buildSteps(p: Problem): BuiltStep[] {
  return [
    { slug: "question", label: label("question"), question: p.question, why: p.why },
    { slug: "who", label: label("who"), whoCares: p.whoCares, india: p.india },
    { slug: "scope", label: label("scope"), inScope: p.inScope, outOfScope: p.outOfScope },
    { slug: "known", label: label("known"), facts: p.known },
    { slug: "unknown", label: label("unknown"), items: p.unknown },
    { slug: "words", label: label("words"), terms: p.terms },
    { slug: "angles", label: label("angles"), theory: p.angles.theory, practice: p.angles.practice },
    { slug: "ways-in", label: label("ways-in"), resources: p.waysIn },
    { slug: "funding", label: label("funding"), rows: p.funding },
    { slug: "risks", label: label("risks"), risks: p.risks, leads: p.leads },
  ];
}

export function stepFromHash(hash: string): number {
  const slug = hash.replace(/^#/, "");
  const i = STEPS.findIndex((s) => s.slug === slug);
  return i < 0 ? 0 : i;
}

export function hasContent(s: BuiltStep): boolean {
  switch (s.slug) {
    case "question":
      return !!s.question;
    case "who":
      return s.whoCares.length > 0;
    case "scope":
      return s.inScope.length > 0 && s.outOfScope.length > 0;
    case "known":
      return s.facts.length > 0;
    case "unknown":
      return s.items.length > 0;
    case "words":
      return s.terms.length > 0;
    case "angles":
      return !!(s.theory && s.practice);
    case "ways-in":
      return s.resources.length > 0;
    case "funding":
      return s.rows.length > 0;
    case "risks":
      return s.risks.length > 0;
  }
}
