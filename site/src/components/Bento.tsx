// What: The bento grid of all industry worlds.
// How: Counts problems per industry; first world is the big tile, second is wide on desktop.
// Objective: All worlds visible at a glance, with a clear first choice.
import { INDUSTRIES } from "@/lib/industries";
import type { Problem } from "@/lib/types";
import { Tile } from "./Tile";

export function Bento({ problems }: { problems: Problem[] }) {
  const counts = new Map<string, number>();
  for (const p of problems) counts.set(p.industry, (counts.get(p.industry) ?? 0) + 1);
  return (
    <div className="bento">
      {INDUSTRIES.filter((i) => counts.get(i.slug)).map((i, n) => (
        <Tile
          key={i.slug}
          industry={i}
          count={counts.get(i.slug)!}
          variant={n === 0 ? "big" : n === 1 ? "wide" : undefined}
        />
      ))}
    </div>
  );
}
