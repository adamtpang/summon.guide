import { ImageResponse } from "next/og";

// Apple touch icon — used by iOS Safari for home-screen bookmarks
// and by some Android browsers as the high-res favicon.
// Next.js convention: this file is auto-served at /apple-icon and
// referenced from <link rel="apple-touch-icon">.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1a1814 0%, #0f0e0c 100%)",
          position: "relative",
        }}
      >
        <span
          style={{
            color: "#D4A028",
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: 130,
            letterSpacing: -6,
            transform: "translateY(-6px)",
          }}
        >
          S
        </span>
        <span
          style={{
            position: "absolute",
            right: 36,
            bottom: 36,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#D4A028",
            opacity: 0.85,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
