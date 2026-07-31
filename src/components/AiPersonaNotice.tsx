import { figures } from "@/lib/figures";

/**
 * Disclosure for guides who are still alive.
 *
 * The roster began as historical figures, where nobody could be misrepresented
 * to their own detriment. Living guides change that: a simulation can put words
 * in the mouth of someone who can read them, object to them, and be harmed by
 * them. Every serious product in this space discloses. TrainYC, which simulates
 * nine Y Combinator partners, states plainly that the voices and personalities
 * are AI generated and not the actual views of the people depicted.
 *
 * A guide counts as living when their `era` says so. That keeps the disclosure
 * automatic: onboard a living figure and the notice appears without anyone
 * needing to remember it.
 */
export function isLivingGuide(slug: string): boolean {
  const f = figures.find((x) => x.slug === slug);
  if (!f) return false;
  return /present|contemporary|living/i.test(f.era);
}

export default function AiPersonaNotice({
  slug,
  name,
  variant = "block",
}: {
  slug: string;
  name: string;
  /** "block" for profile pages, "inline" for the chat header */
  variant?: "block" | "inline";
}) {
  if (!isLivingGuide(slug)) return null;

  const body = `${name} is alive. This is an AI simulation built from their public work, not their words, and not reviewed or endorsed by them.`;

  if (variant === "inline") {
    return (
      <p className="text-warm-500 text-[11px] leading-snug">
        <span className="font-mono uppercase tracking-[0.14em] text-warm-400">
          AI simulation
        </span>
        {" · "}
        {body}
      </p>
    );
  }

  return (
    <aside
      role="note"
      className="border border-warm-300 bg-warm-100 rounded-xl px-4 py-3 flex gap-3 items-start"
    >
      <svg
        className="w-4 h-4 flex-shrink-0 mt-0.5 text-warm-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <p className="text-warm-600 text-sm leading-relaxed">
        <span className="font-medium text-ink-950">AI simulation.</span> {body}
      </p>
    </aside>
  );
}
