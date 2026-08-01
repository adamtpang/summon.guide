/**
 * The editorial look, in one place.
 *
 * This is deliberately not the cinematic path. book.movie's Replicate pipeline
 * generates footage from a visualPrompt, which is right for some work and wrong
 * for this: a summon.guide episode is a page read aloud, and the visual should
 * behave like print rather than like film. Warm paper, ink type, a still
 * portrait, and motion slow enough that you notice the sentence instead of the
 * animation.
 *
 * Values match summon.guide so an episode does not look like a different
 * product once it leaves the site.
 */

export const theme = {
  color: {
    paper: "#F4EFE3",
    paperDeep: "#EBE3D2",
    ink: "#1A1713",
    inkSoft: "rgba(26, 23, 19, 0.62)",
    rule: "rgba(26, 23, 19, 0.16)",
    gold: "#A9781F",
  },
  font: {
    // Georgia is present on macOS and Windows render machines alike, so the
    // render does not depend on a webfont fetch that can silently fall back.
    serif: 'Georgia, "Iowan Old Style", "Times New Roman", serif',
    mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  /** frames per second used by every composition here */
  fps: 30,
} as const;

export const BEAT_LABEL: Record<string, string> = {
  hook: "Hook",
  point1: "One",
  point2: "Two",
  point3: "Three",
  close: "Close",
  // book.movie's own pipeline names them differently; accept both so a handoff
  // from either side renders.
  beat_1: "One",
  beat_2: "Two",
  beat_3: "Three",
};

export interface Beat {
  role: string;
  seconds: number;
  text: string;
}

export interface Handoff {
  source: string;
  guideSlug: string;
  guideName: string;
  episodeSlug: string;
  title: string;
  sourceBook: string;
  sourceAnchor: string | null;
  audio: string;
  words: number;
  estimatedSeconds: number;
  beats: Beat[];
  portrait: string | null;
  aesthetic: string;
}
