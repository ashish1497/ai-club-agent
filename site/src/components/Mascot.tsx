// What: Inline DiceBear doodle for a world or the club.
// How: Server component that injects the build-time SVG; decorative unless a label is given.
// Objective: Each world has a recognisable character with zero runtime image requests.
import { mascotSvg } from "@/lib/mascot";

export function Mascot({
  seed,
  size,
  label,
  className,
}: {
  seed: string;
  size: number;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`mascot ${className ?? ""}`}
      style={{ width: size, height: size, display: "inline-block" }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: mascotSvg(seed) }}
    />
  );
}
