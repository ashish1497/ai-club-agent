// What: Root layout for every page.
// How: Sets language, metadata defaults and the Chillax font link.
// Objective: Shared shell so pages only render their own content.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "AI Club · Unsolved problems", template: "%s · AI Club" },
  description: "Frontier problems that are funded and unsolved. Pick one that itches.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=chillax@500,600,700&display=swap" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
