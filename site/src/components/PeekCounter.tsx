"use client";
// What: "N of 30 peeked" pill.
// How: Reads browser-only state; shows 0 until the browser state is available.
// Objective: A light sense of progress without points or streaks.
import { useStoredState } from "@/lib/useStoredState";

export function PeekCounter({ total }: { total: number }) {
  const { peeked } = useStoredState();
  return <span className="pill">{`${peeked.length} of ${total} peeked`}</span>;
}
