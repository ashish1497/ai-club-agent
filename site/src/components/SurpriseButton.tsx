"use client";
// What: "Surprise me" button that opens a random problem.
// How: Picks a random id client-side, preferring ones not yet peeked, and navigates to it.
// Objective: A one-tap way in for members who can't choose.
import { useRouter } from "next/navigation";
import { readState } from "@/lib/storage";

export function SurpriseButton({ ids, className }: { ids: string[]; className?: string }) {
  const router = useRouter();
  function go() {
    const { peeked } = readState();
    const fresh = ids.filter((id) => !peeked.includes(id));
    const pool = fresh.length ? fresh : ids;
    router.push(`/problems/${pool[Math.floor(Math.random() * pool.length)]}/`);
  }
  return (
    <button type="button" className={className ?? "btn"} onClick={go}>
      Surprise me
    </button>
  );
}
