// What: A world page: one industry's mascot, filters and brief cards.
// How: Statically generated per industry from INDUSTRIES and the problem files; filters run client-side.
// Objective: Members see only this world's problems, in short cards they can skim.
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Mascot } from "@/components/Mascot";
import { Nudge } from "@/components/Nudge";
import { PeekCounter } from "@/components/PeekCounter";
import { TopBar } from "@/components/TopBar";
import { WorldView } from "@/components/WorldView";
import { effortOptions } from "@/lib/filters";
import { INDUSTRIES, industryBySlug } from "@/lib/industries";
import { NUDGES } from "@/lib/nudges";
import { loadProblems } from "@/lib/problems";

export const dynamicParams = false;

export function generateStaticParams() {
  const used = new Set(loadProblems().map((p) => p.industry));
  return INDUSTRIES.filter((i) => used.has(i.slug)).map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const i = industryBySlug((await params).industry);
  return { title: i.name, description: `${i.name}: ${i.joke}`, openGraph: { title: `${i.name} · AI Club problems` } };
}

export default async function World({ params }: { params: Promise<{ industry: string }> }) {
  const industry = industryBySlug((await params).industry);
  const all = loadProblems();
  const problems = all.filter((p) => p.industry === industry.slug);
  const items = problems.map(({ id, title, why, levelFit, levelMin, effort, skills }) => ({
    id,
    title,
    why,
    levelFit,
    levelMin,
    effort,
    skills,
  }));
  const nudge = NUDGES.world[industry.slug] ?? NUDGES.pickWorld;
  const style = { "--tc": `var(${industry.colorVar})` } as CSSProperties;
  return (
    <div className="wrap">
      <TopBar>
        <a className="pill" href="/#worlds">
          All worlds
        </a>
        <PeekCounter total={all.length} />
      </TopBar>
      <main style={style}>
        <WorldView
          items={items}
          efforts={effortOptions(problems)}
          side={
            <div className="world-head">
              <Mascot seed={industry.seed} size={120} className="world-mascot" />
              <div>
                <h1 className="world-title">{industry.name}</h1>
                <p className="world-sub">
                  {problems.length} {problems.length === 1 ? "problem" : "problems"}. {industry.joke}
                </p>
              </div>
            </div>
          }
          emptyText={<Nudge seed={industry.seed} text={NUDGES.emptyFilter} />}
        />
        <div className="world-nudge">
          <Nudge seed={industry.seed} text={nudge} />
        </div>
      </main>
    </div>
  );
}
