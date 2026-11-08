// What: A short, dry nudge spoken by a world's mascot.
// How: Mascot plus one sentence in a card.
// Objective: Keep readers moving with a smile, one nudge per screen.
import { Mascot } from "./Mascot";

export function Nudge({ seed, text, mint }: { seed: string; text: string; mint?: boolean }) {
  return (
    <aside className={`nudge${mint ? " nudge--mint" : ""}`}>
      <Mascot seed={seed} size={40} />
      <p>{text}</p>
    </aside>
  );
}
