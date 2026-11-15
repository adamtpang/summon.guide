// Inline version of the brand mark for headers. Inherits nothing: the mark
// keeps its own three colors everywhere so it is always recognizable.
export default function SummonMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <rect width="64" height="64" rx="14" fill="var(--color-lapis)" />
      <path d="M18 52V30a14 14 0 0 1 28 0v22" fill="none" stroke="var(--color-night)" strokeWidth="6" strokeLinecap="square" />
      <circle cx="32" cy="35" r="5" fill="var(--color-gilt)" />
    </svg>
  );
}
