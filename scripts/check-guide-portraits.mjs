import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { figures } from "../src/lib/figures.ts";
import { portraitAssets } from "../src/lib/guidePortraitAssets.ts";

const errors = [];
const publicRoot = path.resolve("public");
for (const guide of figures) {
  const assets = portraitAssets(guide.portrait);
  if (!assets.length) errors.push(`${guide.slug}: missing portrait`);
  if (guide.members && assets.length !== guide.members.length && assets.length !== 1) errors.push(`${guide.slug}: incomplete duo portrait`);
  for (const asset of assets) {
    if (!asset.startsWith("/") || asset.startsWith("//")) { errors.push(`${guide.slug}: use a committed local asset`); continue; }
    const file = path.resolve(publicRoot, `.${asset}`);
    if (!file.startsWith(publicRoot + path.sep)) { errors.push(`${guide.slug}: invalid path`); continue; }
    if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) { errors.push(`${guide.slug}: a monogram or SVG placeholder is not a portrait`); continue; }
    try {
      const bytes = await fs.readFile(file);
      const image = sharp(bytes);
      const meta = await image.metadata();
      await image.stats(); // Decode pixels as well as headers.
      if (Math.min(meta.width || 0, meta.height || 0) < 64) errors.push(`${guide.slug}: portrait is too small`);
    } catch { errors.push(`${guide.slug}: missing or invalid image ${asset}`); }
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Portrait gate passed for ${figures.length} person and duo chats. Sage uses its intentional wizard identity.`);
