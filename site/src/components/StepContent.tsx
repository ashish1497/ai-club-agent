// What: Renders one bite step of a problem (question, scope, known facts, terms, funding...).
// How: A switch over the step kind; facts show their source as a link pill; unverified leads get their own labelled box.
// Objective: Each bite is short, scannable and honest about what is fact and what is not.
import type { BuiltStep } from "@/lib/steps";
import { NUDGES } from "@/lib/nudges";

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

function List({ items }: { items: string[] }) {
  return (
    <ul className="bite-list">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

export function StepContent({ step }: { step: BuiltStep }) {
  switch (step.slug) {
    case "question":
      return (
        <>
          <p className="bite-lead">{step.question}</p>
          <p className="bite-why">
            <strong>Why it matters.</strong> {step.why}
          </p>
        </>
      );
    case "who":
      return (
        <>
          <List items={step.whoCares} />
          <p className="bite-why">
            <strong>India angle.</strong> {step.india}
          </p>
        </>
      );
    case "scope":
      return (
        <div className="scope">
          <div className="fact">
            <h3 className="bite-h">In scope</h3>
            <List items={step.inScope} />
          </div>
          <div className="fact">
            <h3 className="bite-h">Out of scope</h3>
            <List items={step.outOfScope} />
          </div>
        </div>
      );
    case "known":
      return (
        <>
          {step.facts.map((f) => (
            <div className="fact" key={f.text}>
              <p>{f.text}</p>
              {f.source && (
                <a className="src" href={f.source.url} target="_blank" rel="noopener noreferrer">
                  {f.source.label}
                </a>
              )}
            </div>
          ))}
          <p className="bite-note">{NUDGES.known}</p>
        </>
      );
    case "unknown":
      return (
        <>
          {step.items.map((x) => (
            <div className="fact fact--open" key={x}>
              <p>{x}</p>
            </div>
          ))}
          <p className="bite-note">{NUDGES.unknown}</p>
        </>
      );
    case "words":
      return (
        <dl className="terms">
          {step.terms.map((t) => (
            <div className="fact" key={t.term}>
              <dt>{t.term}</dt>
              <dd>{t.meaning}</dd>
            </div>
          ))}
        </dl>
      );
    case "angles":
      return (
        <>
          <div className="fact">
            <h3 className="bite-h">Theory</h3>
            <p>{step.theory}</p>
          </div>
          <div className="fact">
            <h3 className="bite-h">Practice, no lab needed</h3>
            <p>{step.practice}</p>
          </div>
          <p className="bite-note">Starting angles only. Your framing is your own.</p>
        </>
      );
    case "ways-in":
      return (
        <ul className="res">
          {step.resources.map((r) => (
            <li className="fact" key={r.url}>
              <Ext href={r.url}>{r.name}</Ext>
              <span className="chip">{r.type}</span>
            </li>
          ))}
        </ul>
      );
    case "funding":
      return (
        <>
          <ul className="res">
            {step.rows.map((r) => (
              <li className="fact" key={r.url + r.what}>
                <p>
                  <strong>{r.funder}</strong>: {r.what} <span className="small">({r.date})</span>
                </p>
                <span className="res-row">
                  <Ext href={r.url}>Source</Ext>
                  <span className={`chip ev ev--${r.evidence}`}>{r.evidence}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="bite-note">
            Verified means someone opened the funding page and checked it. Secondary means several reports agree but the
            primary page wasn&apos;t opened.
          </p>
        </>
      );
    case "risks":
      return (
        <>
          <List items={step.risks} />
          {step.leads.length > 0 && (
            <div className="leads" role="note">
              <h3 className="bite-h">Unverified leads: not facts</h3>
              <List items={step.leads} />
            </div>
          )}
        </>
      );
  }
}
