"use client";
// What: Button that copies a command to the clipboard.
// How: navigator.clipboard with a visible "Copied" state; falls back silently if the clipboard is blocked.
// Objective: Starting a problem in Claude Code is one paste away.
import { useState } from "react";

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      setDone(false);
    }
  }
  return (
    <button type="button" className={className ?? "btn btn--primary btn--sm"} onClick={copy} aria-live="polite">
      {done ? "Copied" : "Copy"}
    </button>
  );
}
