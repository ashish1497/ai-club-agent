"use client";
// What: React hook that exposes the browser-only State and re-renders when it changes.
// How: useSyncExternalStore over the raw localStorage string; the server snapshot is the defaults.
// Objective: Pages render identically on the server, then show the member's own state without hydration errors.
import { useMemo, useSyncExternalStore } from "react";
import { CHANGE_EVENT, STORAGE_KEY, normalise, type State } from "./storage";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CHANGE_EVENT, cb);
  };
}

function snapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function useStoredState(): State {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  return useMemo(() => {
    try {
      return normalise(raw ? JSON.parse(raw) : null);
    } catch {
      return normalise(null);
    }
  }, [raw]);
}
