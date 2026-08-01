#!/usr/bin/env node
// Render one summon.guide episode to mp4, or a still to check the look fast.
//
//   node scripts/render.mjs <handoff.json>
//   node scripts/render.mjs <handoff.json> --still
//   node scripts/render.mjs <handoff.json> --voice            # fetch the mp3 from /api/tts
//   node scripts/render.mjs <handoff.json> --audio voice.mp3  # use an mp3 you already have
//   node scripts/render.mjs <handoff.json> --voice --api https://summon.guide
//
// The handoff is the contract in summon.guide's BOOK_MOVIE_HANDOFF.md.
//
// On timing. The handoff carries an estimate: words divided by 145 wpm. That is
// the right number for planning a script and the wrong number for cutting a
// video, because a real read drifts a second or two across two minutes. When
// audio is present its measured duration wins, and every beat is scaled by the
// same ratio so the cuts stay where they belong.

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
let handoffPath = args.find((a) => !a.startsWith('--') && a.endsWith('.json'));
// Handoffs live at content/episodes/<guide>/<episode>.handoff.json in this repo.
// Accept a path relative to the repo root as well as one relative to remotion/,
// so both of these work from either directory.
if (handoffPath && !fs.existsSync(handoffPath)) {
  for (const base of ['..', path.join(process.cwd(), '..')]) {
    const candidate = path.join(base, handoffPath);
    if (fs.existsSync(candidate)) { handoffPath = candidate; break; }
  }
}
const STILL = args.includes('--still');
const VOICE = args.includes('--voice');
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const AUDIO = flag('--audio');
const API = flag('--api') || 'http://localhost:3000';
const OUT = flag('--out');

if (!handoffPath || !fs.existsSync(handoffPath)) {
  console.error('usage: node scripts/render.mjs <handoff.json> [--voice|--audio f.mp3] [--still]');
  process.exit(1);
}

const h = JSON.parse(fs.readFileSync(handoffPath, 'utf8'));
if (!Array.isArray(h.beats) || !h.beats.length) {
  console.error('handoff has no beats. Was it written by episodes-from-plan.mjs?');
  process.exit(1);
}

const estimated = h.beats.reduce((n, b) => n + b.seconds, 0);
console.log(h.guideName + ' / ' + h.title);
console.log('  ' + h.beats.length + ' beats, ' + estimated + 's estimated, plus a 2.6s title card');

fs.mkdirSync('public', { recursive: true });
fs.mkdirSync('out', { recursive: true });

// ── audio ────────────────────────────────────────────────────────────────────
let audioFile = null;

if (VOICE) {
  const script = h.beats.map((b) => b.text).join('\n\n');
  const url = API.replace(/\/$/, '') + '/api/tts';
  console.log('  requesting voice from ' + url + ' as ' + h.guideSlug);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: script, figureSlug: h.guideSlug, mode: 'script' }),
    });
    if (!res.ok) {
      let why = 'HTTP ' + res.status;
      try {
        const j = await res.json();
        if (j?.error) why = j.error;
      } catch {
        if (res.status === 500) why = 'the voice service is not configured (ELEVENLABS_API_KEY)';
      }
      console.error('  voice request failed: ' + why);
      console.error('  rendering silent against the estimate instead.');
    } else {
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1024) {
        console.error('  voice returned ' + buf.length + ' bytes, too small to be audio. Skipping.');
      } else {
        audioFile = h.guideSlug + '-' + h.episodeSlug + '.mp3';
        fs.writeFileSync(path.join('public', audioFile), buf);
        console.log('  wrote public/' + audioFile + '  (' + (buf.length / 1024 / 1024).toFixed(2) + ' MB)');
      }
    }
  } catch (e) {
    console.error('  could not reach ' + url + ': ' + e.message);
    console.error('  is the summon.guide dev server running? Or pass --api https://summon.guide');
  }
} else if (AUDIO) {
  if (!fs.existsSync(AUDIO)) { console.error('audio not found: ' + AUDIO); process.exit(1); }
  audioFile = path.basename(AUDIO);
  fs.copyFileSync(AUDIO, path.join('public', audioFile));
  console.log('  audio: ' + audioFile);
}

// ── measure the real duration and rescale the beats ──────────────────────────
// Remotion bundles ffmpeg, so ffprobe is available without another dependency.
function measure(file) {
  try {
    const out = execSync(`npx remotion ffprobe "${file}" 2>&1`, { encoding: 'utf8' });
    const m = /Duration:\s*(\d+):(\d+):(\d+\.?\d*)/.exec(out);
    if (!m) return null;
    return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
  } catch {
    return null;
  }
}

let beats = h.beats;
if (audioFile) {
  const actual = measure(path.join('public', audioFile));
  if (!actual) {
    console.log('  could not measure the audio, keeping the estimated timings');
  } else {
    const ratio = actual / estimated;
    console.log(
      '  measured ' + actual.toFixed(1) + 's against ' + estimated + 's estimated' +
        '  (' + (ratio > 1 ? '+' : '') + ((ratio - 1) * 100).toFixed(1) + '%)'
    );
    // Scale every beat by the same ratio. Proportional rather than absolute,
    // because the drift accumulates across the read rather than landing in one
    // place, so stretching the last beat alone would desync the middle.
    beats = h.beats.map((b) => ({ ...b, seconds: b.seconds * ratio }));
    console.log('  beats rescaled so the cuts follow the real read');
  }
}

for (const b of beats) {
  console.log('    ' + b.role.padEnd(8) + b.seconds.toFixed(1) + 's');
}

// ── render ───────────────────────────────────────────────────────────────────
const props = { handoff: { ...h, beats }, audioSrc: audioFile };
const propsPath = path.join('out', 'props.json');
fs.writeFileSync(propsPath, JSON.stringify(props));

const outPath =
  OUT || path.join('out', h.guideSlug + '-' + h.episodeSlug + (STILL ? '.png' : '.mp4'));

const cmd = STILL
  ? `npx remotion still Episode "${outPath}" --props="${propsPath}" --frame=90`
  : `npx remotion render Episode "${outPath}" --props="${propsPath}"`;

console.log('\n' + cmd + '\n');
try {
  execSync(cmd, { stdio: 'inherit' });
  const size = fs.existsSync(outPath) ? (fs.statSync(outPath).size / 1024 / 1024).toFixed(2) : '?';
  console.log('\nwrote ' + outPath + '  (' + size + ' MB)');
  if (!audioFile) {
    console.log('silent. Pass --voice to fetch the read, or --audio to supply one.');
  }
} catch {
  console.error('\nrender failed. The first run downloads a headless browser, which takes a while.');
  process.exit(1);
}
