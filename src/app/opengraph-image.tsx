import { ImageResponse } from "next/og";

// Next.js file convention: auto-generates the homepage's og:image (and,
// absent a separate twitter-image.tsx, its twitter:image too) and wires
// the resulting <meta> tags into the page head automatically. Added
// because the lightmark.app AI-visibility audit flagged og:image as
// missing on the homepage; content mirrors the real h1/tagline in
// src/app/page.tsx rather than inventing separate marketing copy.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "80px 90px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase" as const,
            color: "#2563eb",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
            marginBottom: 28,
          }}
        >
          summon.guide
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 66,
            lineHeight: 1.12,
            color: "#0f172a",
            fontWeight: 500,
            maxWidth: 980,
          }}
        >
          <span>Every legend who ever lived,</span>
          <span style={{ color: "#2563eb", fontStyle: "italic" }}>
            on call.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 24,
            color: "#64748b",
            fontFamily: "system-ui, sans-serif",
            maxWidth: 760,
            lineHeight: 1.5,
          }}
        >
          Search any great human in history, or describe what you&apos;re
          facing, and summon the mind best suited to walk you through it.
        </div>
      </div>
    ),
    { ...size }
  );
}
