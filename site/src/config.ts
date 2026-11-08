// What: Site-wide configuration: public URLs and where the content lives.
// How: Env vars with safe defaults; the repo root is found by walking up to the folder that holds club-agent/.
// Objective: One place to change the site URL or the kit's clone URL once GitHub and Vercel exist.
import { existsSync } from "node:fs";
import path from "node:path";

// `||` (not `??`): GitHub Actions passes an unset repository variable as an empty string.
function urlFromEnv(name: string, fallback: string): string {
  const value = process.env[name] || fallback;
  try {
    new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute URL, got "${value}"`);
  }
  return value.replace(/\/$/, "");
}

export const SITE_URL = urlFromEnv("NEXT_PUBLIC_SITE_URL", "https://ai-club-problems.vercel.app");
export const KIT_REPO_URL = urlFromEnv("NEXT_PUBLIC_KIT_REPO_URL", "https://github.com/REPLACE-ME/ai-club-agent");

function findRepoRoot(start: string): string {
  let dir = start;
  for (;;) {
    if (existsSync(path.join(dir, "club-agent", "problems"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) throw new Error(`club-agent/problems not found above ${start}`);
    dir = parent;
  }
}

export const REPO_ROOT = findRepoRoot(process.cwd());
export const PROBLEMS_DIR = path.join(REPO_ROOT, "club-agent", "problems");
export const GUIDE_PATH = path.join(REPO_ROOT, "club-agent", "install", "SETUP-GUIDE.md");
