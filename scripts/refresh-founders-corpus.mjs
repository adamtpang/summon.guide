#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const aetherRoot = path.resolve(repoRoot, "..");
const youchopTool = path.join(aetherRoot, "youchop.app", "tools", "corpus.mjs");
const privateRoot = path.join(aetherRoot, "summon.company", "knowledge");
const rebuildIndex = process.argv.includes("--rebuild-index");

const sources = [
  { handle: "@founderspodcast1", slug: "founders-podcast" },
  { handle: "@DavidSenra", slug: "david-senra-conversations" },
];

if (!fs.existsSync(youchopTool)) {
  console.error(`Missing YouChop tool: ${youchopTool}`);
  process.exit(1);
}
if (!fs.existsSync(path.dirname(privateRoot))) {
  console.error(`Missing private corpus owner repo: ${path.dirname(privateRoot)}`);
  process.exit(1);
}

const env = {
  ...process.env,
  CORPUS_DATE: new Date().toISOString().slice(0, 10),
};

for (const source of sources) {
  console.log(`\nRefreshing ${source.handle} -> private ${source.slug}`);
  const result = spawnSync(
    process.execPath,
    [
      youchopTool,
      source.handle,
      "--local",
      "--top",
      "all",
      "--min-minutes",
      "20",
      "--out",
      privateRoot,
      "--name",
      source.slug,
      "--brain",
      "--no-prebuild",
    ],
    { cwd: path.dirname(youchopTool), env, stdio: "inherit" },
  );
  if (result.status !== 0) process.exit(result.status || 1);

  if (rebuildIndex) {
    const brainRoot = path.join(privateRoot, source.slug, "brain");
    const packageJson = path.join(brainRoot, "package.json");
    if (!fs.existsSync(packageJson)) {
      console.error(`Missing generated brain package: ${packageJson}`);
      process.exit(1);
    }
    const install = spawnSync("npm", ["install", "--no-audit", "--no-fund"], {
      cwd: brainRoot,
      shell: process.platform === "win32",
      stdio: "inherit",
    });
    if (install.status !== 0) process.exit(install.status || 1);
    const index = spawnSync(process.execPath, ["ask.mjs", "--rebuild"], {
      cwd: brainRoot,
      stdio: "inherit",
    });
    if (index.status !== 0) process.exit(index.status || 1);
  }
}

const status = spawnSync(process.execPath, [path.join(repoRoot, "scripts", "gen-founders-corpus-status.mjs")], {
  cwd: repoRoot,
  env,
  stdio: "inherit",
});
if (status.status !== 0) process.exit(status.status || 1);

console.log("\nPrivate refresh complete. Review new episodes and write original syntheses before rebuilding the public source corpus.");
if (!rebuildIndex) {
  console.log("Pass --rebuild-index when you also want to regenerate both local semantic indexes.");
}
