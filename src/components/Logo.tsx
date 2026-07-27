/**
 * Beach Performance / Trackside mark — a double-chevron "fast-forward" motion
 * mark whose two lower strokes (the "legs") run exactly parallel (both 45°).
 * Uses currentColor so it can be tinted gold, white, or black by its parent.
 */
export function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="12" strokeLinejoin="miter" strokeLinecap="butt">
        <polyline points="46,24 72,50 46,76" fill="none" />
        <line x1="40" y1="44" x2="14" y2="70" />
      </g>
    </svg>
  );
}
