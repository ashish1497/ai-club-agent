"use client";
// What: "Save for later" toggle for a problem.
// How: Toggles the id in browser-only state; label follows the stored value.
// Objective: Members can come back to a problem without accounts.
import { toggleSaved } from "@/lib/storage";
import { useStoredState } from "@/lib/useStoredState";

export function SaveButton({ id }: { id: string }) {
  const { saved } = useStoredState();
  const on = saved.includes(id);
  return (
    <button type="button" className="pill pill-btn" aria-pressed={on} onClick={() => toggleSaved(id)}>
      {on ? "Saved" : "Save for later"}
    </button>
  );
}
