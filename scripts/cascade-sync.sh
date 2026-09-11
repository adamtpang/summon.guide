#!/bin/bash
# Cascade sync: refreshes raw corpus extraction for registered channels,
# checks for growth, and if found, dispatches a headless Claude digestion
# pass (curate + synthesize + wire into books.ts) on a NEW branch with a PR,
# never auto-merged. Meant to run on a local schedule (Windows Task
# Scheduler), since raw extraction needs yt-dlp on this residential IP and
# reads local files that a cloud agent cannot reach.
set -e

YOUCHOP="/c/Users/adamp/Aether/youchop.app"
SUMMON_GUIDE="/c/Users/adamp/Aether/summon.guide"
LOG="/c/Users/adamp/Aether/summon.guide/scripts/.cascade-sync.log"

echo "=== cascade-sync run: $(date -u +%Y-%m-%dT%H:%M:%SZ) ===" >> "$LOG"

# slug -> real youtube handle, must match SOURCE_MAP in check-corpus-freshness.mjs
declare -A CHANNELS=(
  ["founders-podcast"]="@founderspodcast1"
  ["starter-story"]="@StarterStory"
  ["invest-like-the-best"]="@ILTB_Podcast"
  ["y-combinator"]="@ycombinator"
)

cd "$YOUCHOP"
for slug in "${!CHANNELS[@]}"; do
  handle="${CHANNELS[$slug]}"
  echo "Refreshing $slug ($handle)..." >> "$LOG"
  node tools/corpus.mjs "$handle" --top all --local --out "../summon.company/knowledge" --name "$slug" --pause 500 >> "$LOG" 2>&1 || echo "  (refresh had errors, see log)" >> "$LOG"
done

cd "$SUMMON_GUIDE"
FRESHNESS_OUTPUT=$(node scripts/check-corpus-freshness.mjs 2>&1)
echo "$FRESHNESS_OUTPUT" >> "$LOG"

FLAGGED=$(echo "$FRESHNESS_OUTPUT" | grep "⚑" | sed -E 's/^\s*⚑\s*([a-zA-Z0-9_-]+):.*/\1/')

if [ -z "$FLAGGED" ]; then
  echo "No growth detected, nothing to digest." >> "$LOG"
  exit 0
fi

for src in $FLAGGED; do
  echo "Dispatching digestion pass for $src..." >> "$LOG"
  DATE_TAG=$(date -u +%Y%m%d)
  BRANCH="cascade-sync-${src}-${DATE_TAG}"

  git checkout -b "$BRANCH" origin/main >> "$LOG" 2>&1 || { echo "  branch create failed, skipping $src" >> "$LOG"; continue; }

  PROMPT="You're doing an incremental corpus sync for summon.guide (C:\\Users\\adamp\\Aether\\summon.guide). The channel '$src' has new raw videos since it was last digested (see scripts/check-corpus-freshness.mjs output in scripts/.cascade-sync.log for the exact gap). Raw source: C:\\Users\\adamp\\Aether\\summon.company\\knowledge\\$src\\ (manifest.json + _raw\\ transcripts). Already-digested episodes are in the content/knowledge/ directory registered for this channel in src/lib/books.ts, do not re-digest those, only curate and digest genuinely NEW high-signal episodes (check dates/titles against what's already there). Follow the exact same format, curation discipline (highest-signal, not all of them), and copyright rule (synthesis only, no verbatim transcript beyond short attributed phrases) already used for every existing digest file in this repo, read an existing one in the same content/knowledge/ directory as your template. After writing new digest files, update the books.ts entry's description if the total count changed, regenerate src/lib/sourceCorpus.ts via node scripts/gen-source-corpus.mjs, and run npx tsc --noEmit to confirm clean. Then commit your changes and push this branch (already checked out: $BRANCH), and open a PR via gh pr create with a clear title and summary of what was added, do NOT merge it. If you find nothing genuinely new worth digesting after checking, say so, make no changes, and do not open a PR."

  claude -p "$PROMPT" --dangerously-skip-permissions >> "$LOG" 2>&1 || echo "  claude invocation failed for $src" >> "$LOG"

  git checkout main >> "$LOG" 2>&1
done

echo "=== cascade-sync run complete ===" >> "$LOG"
