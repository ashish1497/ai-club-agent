// What: Loads the kit's SETUP-GUIDE.md and renders it as HTML for the /start page.
// How: Strips the title and What/How/Objective lines (shown as the page intro), swaps in the real repo URL, renders with marked.
// Objective: One source of truth for setup steps; the site never shows a placeholder or a stale copy.
import { readFileSync } from "node:fs";
import { marked } from "marked";
import { GUIDE_PATH, KIT_REPO_URL } from "../config";

// intro fields are inline HTML (rendered Markdown).
export type Guide = { intro: { what: string; how: string; objective: string }; html: string };

export function loadSetupGuide(path: string = GUIDE_PATH): Guide {
  const raw = readFileSync(path, "utf8");
  const pick = (label: string) =>
    marked.parseInline(raw.match(new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+)$`, "m"))?.[1].trim() ?? "", {
      async: false,
    }) as string;
  const intro = { what: pick("What"), how: pick("How"), objective: pick("Objective") };
  const body = raw
    .split("\n")
    .filter((l) => !/^# /.test(l) && !/^\*\*(What|How|Objective):\*\*/.test(l))
    .join("\n")
    .replaceAll("<club-agent repo URL>", KIT_REPO_URL);
  return { intro, html: marked.parse(body, { async: false }) as string };
}
