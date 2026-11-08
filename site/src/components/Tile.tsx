// What: One industry tile in the bento grid.
// How: A link styled as glossy card stock in the industry's colour, with mascot, name, joke and count.
// Objective: Picking a world feels like picking a level in a game.
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Industry } from "@/lib/types";
import { Mascot } from "./Mascot";

export function Tile({ industry, count, variant }: { industry: Industry; count: number; variant?: "big" | "wide" }) {
  const style = { "--tc": `var(${industry.colorVar})` } as CSSProperties;
  return (
    <Link
      href={`/worlds/${industry.slug}/`}
      className={`tile${variant ? ` tile--${variant}` : ""}`}
      style={style}
      aria-label={`${industry.name}, ${count} ${count === 1 ? "problem" : "problems"}. ${industry.joke}`}
    >
      <span className="count" aria-hidden="true">
        {count}
      </span>
      {variant !== "big" && <Mascot seed={industry.seed} size={56} />}
      <span>
        <span className="tile-name">{industry.name}</span>
        <span className="tile-meta" style={{ display: "block" }}>
          {industry.joke}
        </span>
      </span>
      {variant === "big" && <Mascot seed={industry.seed} size={96} />}
    </Link>
  );
}
