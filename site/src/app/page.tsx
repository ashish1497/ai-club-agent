// What: Landing page: the AI Club mission plus the bento of industry worlds.
// How: Server-rendered from the problem files; small client islands for peek count, saved list and Surprise me.
// Objective: In ten seconds a member knows what this is and can pick a world.
import { Bento } from "@/components/Bento";
import { Nudge } from "@/components/Nudge";
import { PeekCounter } from "@/components/PeekCounter";
import { SavedStrip } from "@/components/SavedStrip";
import { SurpriseButton } from "@/components/SurpriseButton";
import { TopBar } from "@/components/TopBar";
import { CLUB_SEED } from "@/lib/industries";
import { NUDGES } from "@/lib/nudges";
import { loadProblems } from "@/lib/problems";

export default function Home() {
  const problems = loadProblems();
  const industries = new Set(problems.map((p) => p.industry)).size;
  return (
    <div className="wrap">
      <TopBar>
        <a className="pill hide-narrow" href="/start/">
          How it works
        </a>
        <PeekCounter total={problems.length} />
      </TopBar>
      <main className="landing">
        <section className="hero" aria-labelledby="hero-h">
          <p className="sticker" aria-hidden="true">
            no 40-page case studies
          </p>
          <h1 id="hero-h">
            <span className="line">Unsolved.</span> <span className="line">Funded.</span>{" "}
            <span className="line">Yours to crack.</span>
          </h1>
          <p className="lede">
            {problems.length} real questions investors are paying to answer and nobody has. Pick one that itches. The AI
            does the reading; <mark>you do the thinking.</mark>
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#worlds">
              Pick your world
            </a>
            <SurpriseButton ids={problems.map((p) => p.id)} />
          </div>
          <div className="counts">
            <div className="card">
              <div className="big-num">{problems.length}</div>
              <p className="small">open problems</p>
            </div>
            <div className="card">
              <div className="big-num">{industries}</div>
              <p className="small">industries</p>
            </div>
            <div className="card">
              <div className="big-num">0</div>
              <p className="small">known answers</p>
            </div>
          </div>
          <div style={{ marginTop: 18, maxWidth: 460 }}>
            <Nudge seed={CLUB_SEED} text={NUDGES.landing} />
          </div>
          <SavedStrip problems={problems.map((p) => ({ id: p.id, title: p.title }))} />
        </section>
        <section id="worlds" aria-labelledby="worlds-h">
          <h2 id="worlds-h" className="section-title" style={{ marginBottom: 4 }}>
            Pick a world.
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            {NUDGES.pickWorld}
          </p>
          <Bento problems={problems} />
        </section>
      </main>
    </div>
  );
}
