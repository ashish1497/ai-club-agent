// What: DiceBear "croodles" mascot for each world, rendered to an SVG string at build time.
// How: @dicebear/core createAvatar with a fixed seed; ids are prefixed per seed so several inline SVGs never clash.
// Objective: Playful doodle characters with no runtime requests to a third-party API.
import { createAvatar } from "@dicebear/core";
import { croodles } from "@dicebear/collection";

const cache = new Map<string, string>();

export function mascotSvg(seed: string): string {
  const hit = cache.get(seed);
  if (hit) return hit;
  const svg = createAvatar(croodles, { seed }).toString();
  const prefix = `m-${seed.replace(/[^a-z0-9]/gi, "")}-`;
  const unique = svg.replace(/id="([^"]+)"/g, `id="${prefix}$1"`).replace(/url\(#([^)]+)\)/g, `url(#${prefix}$1)`);
  cache.set(seed, unique);
  return unique;
}
