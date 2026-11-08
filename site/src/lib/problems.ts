// What: Build-time loader that parses club-agent/problems/<industry>/<NN>-<slug>.md into typed Problems.
// How: gray-matter for front matter, then a small section/bullet/table parser over the fixed ## headings.
// Objective: The site renders exactly what the problem files say, and the build fails loudly on any schema break.
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { PROBLEMS_DIR } from "../config";
import { buildSteps, hasContent } from "./steps";
import type { Evidence, Fact, FundingRow, Problem, Resource, Term } from "./types";

const REQUIRED = [
  "The open question",
  "Why it matters",
  "Who cares",
  "In scope",
  "Out of scope",
  "What is known",
  "What is unknown",
  "Key terms",
  "Possible angles",
  "Starting points",
  "India angle",
  "Funding evidence",
  "Risk flags",
];
const KEYS = [
  "id",
  "title",
  "industry",
  "seat",
  "status",
  "funding_strength",
  "risk_flags",
  "last_verified",
  "level_fit",
  "effort",
  "skills",
];

function sections(body: string, file: string): Record<string, string> {
  const out: Record<string, string> = {};
  const parts = body.split(/^## /m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf("\n");
    out[part.slice(0, nl).trim()] = part.slice(nl + 1).trim();
  }
  for (const h of REQUIRED) if (!(h in out)) throw new Error(`${file}: missing section ## ${h}`);
  return out;
}

const bullets = (s: string) =>
  s
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2).trim());
const paragraph = (s: string) =>
  s
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("<!--"))
    .join(" ")
    .trim();

function tableRows(s: string): string[][] {
  const rows = s.split("\n").filter((l) => l.trim().startsWith("|"));
  return rows.slice(2).map((r) =>
    r
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim()),
  );
}

const FACT = /\s*\(\[([^\]]+)\]\((https?:[^)\s]+)\)\)\s*$/;
function fact(line: string): Fact {
  const m = line.match(FACT);
  if (!m) return { text: line };
  return { text: line.slice(0, m.index).trim(), source: { label: m[1], url: m[2] } };
}

function term(line: string): Term {
  const m = line.match(/^\*\*(.+?)\*\*:\s*(.+)$/);
  return m ? { term: m[1], meaning: m[2] } : { term: line, meaning: "" };
}

function angles(s: string) {
  const get = (label: RegExp) =>
    bullets(s)
      .find((b) => label.test(b))
      ?.replace(/^\*\*[^*]+\*\*\s*/, "")
      .trim() ?? "";
  return { theory: get(/^\*\*Theory:\*\*/), practice: get(/^\*\*Practice/) };
}

function parse(file: string): Problem {
  const { data, content } = matter(readFileSync(file, "utf8"));
  for (const k of KEYS)
    if (data[k] === undefined || data[k] === "") throw new Error(`${file}: missing front matter ${k}`);
  const s = sections(content, file);
  const levelFit = String(data.level_fit);
  const funding: FundingRow[] = tableRows(s["Funding evidence"]).map(([funder, what, date, url, evidence]) => ({
    funder,
    what,
    date,
    url,
    evidence: evidence as Evidence,
  }));
  const waysIn: Resource[] = tableRows(s["Starting points"]).map(([name, type, url]) => ({ name, type, url }));
  return {
    id: String(data.id),
    slug: path.basename(file, ".md").slice(3),
    industry: String(data.industry),
    title: String(data.title),
    seat: String(data.seat),
    status: String(data.status),
    fundingStrength: String(data.funding_strength),
    riskFlags: String(data.risk_flags),
    lastVerified:
      data.last_verified instanceof Date ? data.last_verified.toISOString().slice(0, 10) : String(data.last_verified),
    levelFit,
    levelMin: Number(levelFit.match(/L(\d)/)?.[1] ?? 0),
    effort: String(data.effort),
    skills: String(data.skills)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    question: paragraph(s["The open question"]),
    why: paragraph(s["Why it matters"]),
    whoCares: bullets(s["Who cares"]),
    inScope: bullets(s["In scope"]),
    outOfScope: bullets(s["Out of scope"]),
    known: bullets(s["What is known"]).map(fact),
    unknown: bullets(s["What is unknown"]),
    terms: bullets(s["Key terms"]).map(term),
    angles: angles(s["Possible angles"]),
    waysIn,
    india: paragraph(s["India angle"]),
    funding,
    risks: bullets(s["Risk flags"]),
    leads: s["Leads to check"] ? bullets(s["Leads to check"]) : [],
  };
}

const cache = new Map<string, Problem[]>();

export function loadProblems(dir: string = PROBLEMS_DIR): Problem[] {
  const hit = cache.get(dir);
  if (hit) return hit;
  const files = readdirSync(dir)
    .filter((d) => statSync(path.join(dir, d)).isDirectory())
    .flatMap((d) =>
      readdirSync(path.join(dir, d))
        .filter((f) => /^\d{2}-.+\.md$/.test(f))
        .map((f) => path.join(dir, d, f)),
    );
  const problems = files
    .map((f) => {
      const p = parse(f);
      for (const step of buildSteps(p))
        if (!hasContent(step)) throw new Error(`${f}: problem ${p.id} has empty step ${step.slug}`);
      return p;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
  const seen = new Set<string>();
  for (const p of problems) {
    if (seen.has(p.id)) throw new Error(`duplicate problem id ${p.id}`);
    seen.add(p.id);
  }
  if (dir === PROBLEMS_DIR) cache.set(dir, problems);
  return problems;
}

export function getProblem(id: string): Problem | undefined {
  return loadProblems().find((p) => p.id === id);
}
