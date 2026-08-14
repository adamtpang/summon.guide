import { ImageResponse } from "next/og";

// Next.js convention: this file generates the site icon at /icon and
// also overrides /favicon.ico when there's no static public/favicon.ico.
// We use ImageResponse so the icon stays in sync with the brand the
// moment we change it, no separate ICO regeneration step.

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          borderRadius: 7,
          position: "relative",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: -1,
            // shift up slightly to optically center with descender
            transform: "translateY(-1px)",
          }}
        >
          S
        </span>
        <span
          style={{
            position: "absolute",
            right: 6,
            bottom: 6,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#059669",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
