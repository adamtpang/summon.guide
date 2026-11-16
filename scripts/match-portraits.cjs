// Cuts every curated guide's portrait to the same framing so the hall reads as
// one set: a 4:5 frame with the face centered across and 40% down, and the
// face (chin to hairline) about 40% of the frame height. Tight headshots that
// cannot be pulled back that far use as much of the picture as exists.
//   node scripts/match-portraits.cjs
// FACES holds, per guide: the source image and where the face is in it, as
// fractions of the image (center x, center y, face height). Measured by eye.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const FACES = {
  "balaji-srinivasan": ["/portraits/balaji-srinivasan.jpg", 0.48, 0.47, 0.6],
  franklin: ["/portraits/benjamin-franklin.jpg", 0.4, 0.28, 0.25],
  "brad-jacobs": ["/avatars/brad-jacobs-portrait.jpg", 0.5, 0.29, 0.39],
  deutsch: ["/portraits/david-deutsch.jpg", 0.69, 0.17, 0.17],
  sivers: ["/portraits/sivers.jpg", 0.5, 0.43, 0.8],
  elon: ["/portraits/elon-musk.jpg", 0.5, 0.33, 0.3],
  "lee-kuan-yew": ["/portraits/lee-kuan-yew.jpg", 0.5, 0.32, 0.34],
  "lulie-tanett": ["/avatars/lulie-tanett-portrait.jpg", 0.48, 0.37, 0.4],
  "nassim-taleb": ["/portraits/nassim-taleb.jpg", 0.51, 0.35, 0.37],
  visakan: ["/avatars/visakan-portrait.jpg", 0.43, 0.35, 0.23],
};
const FACE_SHARE = 0.4;
const FACE_Y = 0.4;
const OUT = path.join("public", "portraits", "matched");

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [slug, [src, cx, cy, fh]] of Object.entries(FACES)) {
    const file = path.join("public", src);
    const { width: W, height: H } = await sharp(file).metadata();
    let h = Math.min((fh * H) / FACE_SHARE, H, W / 0.8);
    let w = h * 0.8;
    let left = cx * W - w / 2;
    let top = cy * H - h * FACE_Y;
    left = Math.max(0, Math.min(left, W - w));
    top = Math.max(0, Math.min(top, H - h));
    const info = await sharp(file)
      .extract({ left: Math.round(left), top: Math.round(top), width: Math.floor(w), height: Math.floor(h) })
      .resize({ width: 640, height: 800 })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, `${slug}.webp`));
    console.log(slug, `${Math.floor(w)}x${Math.floor(h)} of ${W}x${H}`, `face ${Math.round(((fh * H) / h) * 100)}%`, info.size);
  }
})();
