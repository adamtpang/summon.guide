import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The homepage's og:image (and twitter:image): the homepage moment, a
// question and a row of guides from history ready to answer it. Fonts are
// the site's own (Cinzel, Cormorant Garamond) as TTF, because ImageResponse
// cannot read woff2. Portraits are public domain only (no living people, so
// no implied endorsement); sources are in public/og/CREDITS.md.

export const alt = 'summon.guide: portraits of guides from history under the question "What\'s stuck?"';
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GUIDES = [
  { file: "marcus-aurelius.jpg", name: "Marcus Aurelius" },
  { file: "leonardo-da-vinci.jpg", name: "Leonardo" },
  { file: "benjamin-franklin.jpg", name: "Ben Franklin" },
  { file: "abraham-lincoln.jpg", name: "Abraham Lincoln" },
  { file: "marie-curie.jpg", name: "Marie Curie" },
];

const NIGHT = "#f7f5f0";
const RAISED = "#fffdf9";
const EDGE = "#e2ddd2";
const MOON = "#23211d";
const MIST = "#5c574e";

export default async function OpengraphImage() {
  const root = process.cwd();
  const [cinzel, cormorantItalic, cormorant, ...portraits] = await Promise.all([
    readFile(join(root, "src/app/fonts/cinzel-400.ttf")),
    readFile(join(root, "src/app/fonts/cormorant-garamond-500-italic.ttf")),
    readFile(join(root, "src/app/fonts/cormorant-garamond-500.ttf")),
    ...GUIDES.map((g) => readFile(join(root, "public/og", g.file))),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: NIGHT,
          padding: "52px 64px 56px",
          fontFamily: "Cormorant",
          color: MOON,
        }}
      >
        <div style={{ display: "flex", fontFamily: "Cinzel", fontSize: 26, letterSpacing: 7, color: MIST }}>
          SUMMON.GUIDE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontFamily: "Cinzel",
            fontSize: 92,
            lineHeight: 1,
            letterSpacing: 13,
            color: MOON,
          }}
        >
          WHAT&apos;S STUCK?
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 42, fontStyle: "italic", color: MIST }}>
          Ask the ones who walked the road before you.
        </div>
        <div style={{ display: "flex", marginTop: "auto", gap: 22 }}>
          {GUIDES.map((g, i) => (
            <div key={g.file} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 190 }}>
              <div
                style={{
                  display: "flex",
                  width: 146,
                  height: 146,
                  borderRadius: 73,
                  border: `2px solid ${EDGE}`,
                  backgroundColor: RAISED,
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  width={142}
                  height={142}
                  src={`data:image/jpeg;base64,${portraits[i].toString("base64")}`}
                  style={{ width: 142, height: 142, borderRadius: 71, objectFit: "cover" }}
                />
              </div>
              <div style={{ display: "flex", marginTop: 12, fontSize: 25, color: MOON, whiteSpace: "nowrap" }}>{g.name}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cinzel", data: cinzel, style: "normal", weight: 400 },
        { name: "Cormorant", data: cormorant, style: "normal", weight: 500 },
        { name: "Cormorant", data: cormorantItalic, style: "italic", weight: 500 },
      ],
    },
  );
}
