// What: The bar at the top of every page: logo plus contextual actions.
// How: Server component; actions are passed in as children.
// Objective: Consistent way home from anywhere.
import Link from "next/link";
import type { ReactNode } from "react";

export function TopBar({ children }: { children?: ReactNode }) {
  return (
    <header className="topbar">
      <Link href="/" className="logo" aria-label="AI Club problems home">
        <b>AI</b> Club
      </Link>
      <nav className="topbar-actions" aria-label="Page actions">
        {children}
      </nav>
    </header>
  );
}
