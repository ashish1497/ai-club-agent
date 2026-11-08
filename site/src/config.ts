// What: Site-wide configuration: public URLs and where the content lives.
// How: Fixed constants for the live domain and the GitHub repo; the repo root is found by walking up to the folder that holds club-agent/.
// Objective: One place for the two public URLs, with nothing to configure in GitHub or Vercel.
import { existsSync } from "node:fs";
import path from "node:path";

export const SITE_URL = "https://ai-club-agent.vercel.app";
export const KIT_REPO_URL = "https://github.com/ashish1497/ai-club-agent";

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
