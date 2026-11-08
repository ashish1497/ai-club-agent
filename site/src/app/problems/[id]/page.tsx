// What: The full problem page: question header, bite-by-bite reader, fit check and the start panel.
// How: Statically generated per problem id; bites are server-rendered and enhanced by BiteViewer.
// Objective: A curious member reads the whole problem in about two minutes and knows exactly how to start it.
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BiteViewer } from "@/components/BiteViewer";
import { SaveButton } from "@/components/SaveButton";
import { StartPanel } from "@/components/StartPanel";
import { StepContent } from "@/components/StepContent";
import { TopBar } from "@/components/TopBar";
import { SITE_URL } from "@/config";
import { industryBySlug } from "@/lib/industries";
import { effortLabel, levelLabel } from "@/lib/labels";
import { getProblem, loadProblems } from "@/lib/problems";
import { buildSteps } from "@/lib/steps";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadProblems().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = getProblem((await params).id)!;
  return {
    title: `${p.id}. ${p.title}`,
    description: p.why,
    openGraph: { title: p.title, description: p.why, url: `${SITE_URL}/problems/${p.id}/`, type: "article" },
  };
}

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const p = getProblem((await params).id)!;
  const industry = industryBySlug(p.industry);
  const worldHref = `/worlds/${industry.slug}/`;
  const style = { "--tc": `var(${industry.colorVar})` } as CSSProperties;
  return (
    <div className="wrap" style={style}>
      <TopBar>
        <Link className="pill" href={worldHref}>
          {industry.name}
        </Link>
        <SaveButton id={p.id} />
      </TopBar>
      <main className="problem">
        <header className="problem-head">
          <p className="small">Problem {p.id}</p>
          <h1 className="problem-title">{p.title}</h1>
        </header>
        <div className="problem-main">
          <BiteViewer
            id={p.id}
            worldHref={worldHref}
            panels={buildSteps(p).map((s) => (
              <StepContent key={s.slug} step={s} />
            ))}
          />
        </div>
        <aside className="problem-side">
          <StartPanel id={p.id} />
          <section className="card fit" aria-labelledby="fit-h">
            <h2 id="fit-h" className="bite-h">
              Fit check
            </h2>
            <div className="chips">
              <span className="chip chip--lvl">{levelLabel(p.levelFit)}</span>
              <span className="chip chip--eff">{effortLabel(p.effort)}</span>
              {p.skills.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
