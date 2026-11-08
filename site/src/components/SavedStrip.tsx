"use client";
// What: "Your saved problems" list on the landing page.
// How: Filters the passed problem list by the saved ids in browser state; renders nothing when empty.
// Objective: Bring members straight back to what they marked for later.
import Link from "next/link";
import { useStoredState } from "@/lib/useStoredState";

export function SavedStrip({ problems }: { problems: { id: string; title: string }[] }) {
  const { saved } = useStoredState();
  const list = problems.filter((p) => saved.includes(p.id));
  if (!list.length) return null;
  return (
    <section className="card saved" aria-labelledby="saved-h">
      <h2 id="saved-h" style={{ fontSize: 18 }}>
        Your saved problems
      </h2>
      <ul>
        {list.map((p) => (
          <li key={p.id}>
            <Link href={`/problems/${p.id}/`}>
              {p.id}. {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
