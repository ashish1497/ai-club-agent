// What: Next.js build settings for the problem site.
// How: Static export with trailing slashes so every page is a plain index.html.
// Objective: Host anywhere (Vercel today) with no server runtime.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
