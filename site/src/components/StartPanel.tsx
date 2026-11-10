// What: "Ready to crack it?" panel with the exact command to start the problem in Claude Code.
// How: Three short steps, a terminal snippet with a copy button, and a link to the full setup guide.
// Objective: The jump from curious to working is obvious and small.
import Link from "next/link";
import { CopyButton } from "./CopyButton";
import { NUDGES } from "@/lib/nudges";

export function StartPanel({ id }: { id: string }) {
  const cmd = `start problem ${id}`;
  return (
    <section className="start" aria-labelledby="start-h">
      <h2 id="start-h" tabIndex={-1}>
        Ready to crack it?
      </h2>
      <ol className="start-steps">
        <li>Set up the Club Agent (once, about 15 minutes).</li>
        <li>Open the ai-club-agent folder in Claude Code.</li>
        <li>Tell it which problem.</li>
      </ol>
      <pre className="term">
        <code>
          <span className="term-p">&gt;</span> {cmd}
        </code>
      </pre>
      <div className="start-actions">
        <CopyButton text={cmd} />
        <Link className="btn" href="/start/">
          Setup guide
        </Link>
      </div>
      <p className="start-note">{NUDGES.start}</p>
    </section>
  );
}
