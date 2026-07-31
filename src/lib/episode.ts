/**
 * Episode template for guide voiceovers (essay → TTS → book.movie visuals).
 * Target length: ~90–120 seconds spoken at ~140–150 wpm.
 */

export type EpisodeParts = {
  hook: string;
  points: [string, string, string];
  close: string;
};

/** Spoken words per minute used for duration estimates. */
export const WPM = 145;

/** Soft target for a short vertical/YouTube essay. */
export const TARGET = {
  minWords: 200,
  maxWords: 300,
  minSeconds: 90,
  maxSeconds: 120,
} as const;

export function countWords(text: string): number {
  return text
.trim()
.split(/\s+/)
.filter(Boolean).length;
}

export function estimateSeconds(text: string, wpm: number = WPM): number {
  const words = countWords(text);
  if (words === 0) return 0;
  return Math.round((words / wpm) * 60);
}

export function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0s";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

/** Assemble hook → 3 points → close into a single spoken script. */
export function assembleEpisode(parts: EpisodeParts): string {
  const body = parts.points
.map((p, i) => {
      const n = ["First", "Second", "Third"][i];
      const trimmed = p.trim();
      if (!trimmed) return "";
      // Avoid double-prefix if the author already numbered the point.
      if (/^(first|second|third|1\.|2\.|3\.)/i.test(trimmed)) return trimmed;
      return `${n}. ${trimmed}`;
    })
.filter(Boolean)
.join("\n\n");

  return [parts.hook.trim(), body, parts.close.trim()]
.filter(Boolean)
.join("\n\n");
}

/**
 * Demo episode: Franklin, Sivers-length classic essay.
 * ~240 words → ~100s at 145 wpm. Primary demo path for /speak.
 */
export const FRANKLIN_DEMO: EpisodeParts = {
  hook:
    "You want to become a better person. Most people wish for it, and stop at the wishing. I tried to engineer it. At twenty years of age, with little money and less schooling, I conceived a bold and arduous project of arriving at moral perfection. Not a sermon. A system.",
  points: [
    "I listed thirteen virtues: Temperance, Silence, Order, Resolution, Frugality, Industry, Sincerity, Justice, Moderation, Cleanliness, Tranquility, Chastity, and Humility. Not thirteen goals for someday. Thirteen daily practices. I made a little book, a page for each virtue, and marked every failure with a black spot. The book was plain. The rule was plain. The honesty was the hard part.",
    "I focused on one virtue per week, and cycled through the list four times a year. Order gave me the most trouble. My papers would not stay in their places, and my schedule slipped, again and again. I never achieved perfection. I stopped pretending I would. But I was a better man for the attempt, and that was the only score that mattered.",
    "The method matters more than the scorecard. You do not need my thirteen. Take three habits that would change your year if you kept them. Write them down where you will see them. Review them every evening. Mark the misses without drama and without excuses. Improvement is a science, not a mood. Track it, or you are only daydreaming in better language.",
  ],
  close:
    "Well done is better than well said. An investment in knowledge pays the best interest only when knowledge becomes conduct. Begin tonight, not on Monday. One virtue. One page. One honest mark. That is how a printer's apprentice, with two years of school, remakes himself into a man worth knowing.",
};

export const FRANKLIN_DEMO_SCRIPT = assembleEpisode(FRANKLIN_DEMO);

export const DEMO_GUIDE_SLUG = "franklin" as const;

export const DEMO_EPISODE_META = {
  slug: DEMO_GUIDE_SLUG,
  title: "Thirteen Virtues: a short essay for voiceover",
  guideName: "Benjamin Franklin",
  targetSeconds: estimateSeconds(FRANKLIN_DEMO_SCRIPT),
  words: countWords(FRANKLIN_DEMO_SCRIPT),
  style: "Franklin / Sivers: hook, three points, close. No fluff.",
} as const;
