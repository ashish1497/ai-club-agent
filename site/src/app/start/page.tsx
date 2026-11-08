// What: The /start page: how to install the Club Agent and start a problem in Claude Code.
// How: Renders the kit's SETUP-GUIDE.md (single source of truth) inside the site's paper styling.
// Objective: A hooked member goes from "I'm curious" to their first session without leaving the site.
import type { Metadata } from "next";
import Link from "next/link";
import { Nudge } from "@/components/Nudge";
import { TopBar } from "@/components/TopBar";
import { loadSetupGuide } from "@/lib/guide";
import { CLUB_SEED } from "@/lib/industries";
import { NUDGES } from "@/lib/nudges";

export const metadata: Metadata = {
  title: "Start a problem in Claude Code",
  description: "Install the Club Agent once, then say start problem NN.",
};

export default function Start() {
  const guide = loadSetupGuide();
  return (
    <div className="wrap">
      <TopBar>
        <Link className="pill" href="/#worlds">
          Pick a problem first
        </Link>
      </TopBar>
      <main className="guide-page">
        <header className="guide-head">
          <h1>Start a problem in Claude Code</h1>
          <p className="lede" dangerouslySetInnerHTML={{ __html: guide.intro.what }} />
          <p className="small" dangerouslySetInnerHTML={{ __html: guide.intro.how }} />
          <div style={{ marginTop: 14 }}>
            <Nudge seed={CLUB_SEED} text={NUDGES.start} />
          </div>
        </header>
        <article className="guide card" dangerouslySetInnerHTML={{ __html: guide.html }} />
      </main>
    </div>
  );
}
