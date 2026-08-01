#!/usr/bin/env node
// Reads content/episodes/**/<book>.series.json and writes src/lib/episodes.ts.
//
//   node scripts/gen-episodes.mjs
//
// The episode scripts are authored as files by scripts/episodes-from-plan.mjs,
// which is correct for producing media but leaves them invisible to the website.
// This follows the same convention as src/lib/figureSources.ts: generate a typed
// module from content/, commit it, and import it, rather than reading the
// filesystem at request time.

import fs from 'fs';
import path from 'path';

const ROOT = 'content/episodes';
const OUT = 'src/lib/episodes.ts';

const series = [];
if (fs.existsSync(ROOT)) {
  for (const guideDir of fs.readdirSync(ROOT)) {
    const dir = path.join(ROOT, guideDir);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.series.json')) continue;
      const s = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));

      // pull the hook out of each script so the site can show what an episode
      // actually opens with, rather than only its title
      const episodes = s.episodes.map((ep) => {
        // Carry the beats through, with the per-beat timings the handoff already
        // computed. The player renders them, and book.movie cuts visuals on the
        // same boundaries, so both read from one source.
        let beats = [];
        if (fs.existsSync(ep.handoff)) {
          const h = JSON.parse(fs.readFileSync(ep.handoff, 'utf8'));
          beats = (h.beats || []).map((b) => ({
            role: b.role,
            seconds: b.seconds,
            text: b.text,
          }));
        }
        const hook = beats.find((b) => b.role === 'hook')?.text || '';
        return {
          slug: ep.slug,
          title: ep.title,
          words: ep.words,
          seconds: ep.estimatedSeconds,
          hook,
          beats,
          script: ep.script,
          handoff: ep.handoff,
        };
      });

      series.push({
        guideSlug: s.guideSlug,
        guideName: s.guideName,
        bookSlug: s.bookSlug,
        bookTitle: s.bookTitle,
        episodeCount: s.episodeCount,
        totalSeconds: s.totalSeconds,
        hasMappedVoice: s.hasMappedVoice,
        episodes,
      });
    }
  }
}

series.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));

const banner = `// GENERATED FILE. Do not edit by hand.
// Regenerate with: node scripts/gen-episodes.mjs
//
// Source of truth is content/episodes/<guide>/<book>.series.json, written by
// scripts/episodes-from-plan.mjs. This module exists so the website can render
// the series without reading the filesystem at request time, matching how
// src/lib/figureSources.ts is generated.
`;

const body = `
export interface Beat {
  /** hook, point1, point2, point3, close */
  role: string;
  /** estimated spoken seconds for this beat alone */
  seconds: number;
  text: string;
}

export interface Episode {
  slug: string;
  title: string;
  /** spoken words in the script */
  words: number;
  /** estimated spoken seconds at 145 wpm, see src/lib/episode.ts */
  seconds: number;
  /** the opening lines, shown as the preview */
  hook: string;
  /** the five beats, with the same timings book.movie cuts visuals on */
  beats: Beat[];
  /** repo-relative path to the script markdown */
  script: string;
  /** repo-relative path to the book.movie handoff, with per-beat timings */
  handoff: string;
}

export interface Series {
  guideSlug: string;
  guideName: string;
  bookSlug: string;
  bookTitle: string;
  episodeCount: number;
  totalSeconds: number;
  /** false when the guide has no ElevenLabs voice, so audio uses the default */
  hasMappedVoice: boolean;
  episodes: Episode[];
}

export const series: Series[] = ${JSON.stringify(series, null, 2)};

/** Every series for a given book slug. */
export function getSeriesForBook(bookSlug: string): Series | undefined {
  return series.find((s) => s.bookSlug === bookSlug);
}

/** Every series featuring a given guide. */
export function getSeriesForGuide(guideSlug: string): Series[] {
  return series.filter((s) => s.guideSlug === guideSlug);
}

/** Total watchable runtime across the shelf, in seconds. */
export function totalRuntime(): number {
  return series.reduce((n, s) => n + s.totalSeconds, 0);
}

/** "14m 39s" */
export function formatRuntime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return s + "s";
  return m + "m " + String(s).padStart(2, "0") + "s";
}
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, banner + body);

const eps = series.reduce((n, s) => n + s.episodes.length, 0);
const secs = series.reduce((n, s) => n + s.totalSeconds, 0);
console.log('wrote ' + OUT);
console.log(
  '  series: ' + series.length + '  episodes: ' + eps + '  runtime: ' +
    Math.floor(secs / 60) + 'm ' + (secs % 60) + 's'
);
for (const s of series) {
  console.log('  ' + s.bookTitle.slice(0, 44).padEnd(46) + s.episodes.length + ' eps');
}
