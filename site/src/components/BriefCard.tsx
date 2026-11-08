// What: A problem's brief card: number, question, one line of why, and fit chips.
// How: Plain component (usable from server and client) linking to the full problem page.
// Objective: A member can decide "is this my kind of problem?" in about 15 seconds.
import Link from "next/link";
import { effortLabel, levelLabel } from "@/lib/labels";

export type Brief = { id: string; title: string; why: string; levelFit: string; effort: string; skills: string[] };

export function BriefCard({ p, peeked }: { p: Brief; peeked: boolean }) {
  return (
    <article className="card brief" aria-labelledby={`b-${p.id}`}>
      <p className="brief-num">
        {p.id}
        {peeked && <span className="seen">seen</span>}
      </p>
      <h3 id={`b-${p.id}`} className="brief-title">
        <Link href={`/problems/${p.id}/`}>{p.title}</Link>
      </h3>
      <p className="brief-why">{p.why}</p>
      <div className="chips">
        <span className="chip chip--lvl">{levelLabel(p.levelFit)}</span>
        <span className="chip chip--eff">{effortLabel(p.effort)}</span>
        {p.skills.slice(0, 2).map((s) => (
          <span className="chip" key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="brief-row">
        <Link className="peek" href={`/problems/${p.id}/`} aria-hidden="true" tabIndex={-1}>
          Read the whole thing
        </Link>
        <Link className="btn btn--primary" href={`/problems/${p.id}/`}>
          I&apos;m curious
        </Link>
      </div>
    </article>
  );
}
