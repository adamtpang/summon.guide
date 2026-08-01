import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BEAT_LABEL, theme, type Beat, type Handoff } from "./theme";

/**
 * One episode, cut on the beat timings that summon.guide already computed.
 *
 * The timings are not re-derived here. scripts/episodes-from-plan.mjs writes
 * seconds per beat into the handoff, the website renders the same numbers, and
 * this reads them. One source, so the page and the video cannot drift.
 */

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="180" height="180" filter="url(#n)" opacity="0.35"/></svg>`
  );

/** Paper, grain, and a whisper of vignette. Static on purpose. */
const Paper: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: theme.color.paper }}>
    <AbsoluteFill
      style={{
        backgroundImage: `url("${GRAIN}")`,
        backgroundRepeat: "repeat",
        opacity: 0.055,
        mixBlendMode: "multiply",
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 78% 62% at 50% 42%, transparent 55%, ${theme.color.paperDeep} 100%)`,
        opacity: 0.75,
      }}
    />
  </AbsoluteFill>
);

/** Persistent chrome: who is speaking and from what. Never moves. */
const Chrome: React.FC<{ h: Handoff; index: number; total: number }> = ({
  h,
  index,
  total,
}) => (
  <>
    <div
      style={{
        position: "absolute",
        top: 64,
        left: 84,
        right: 84,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        fontFamily: theme.font.mono,
        fontSize: 20,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: theme.color.gold,
      }}
    >
      <span>{h.guideName}</span>
      <span style={{ color: theme.color.inkSoft }}>
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 64,
        left: 84,
        right: 84,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        fontFamily: theme.font.sans,
        fontSize: 19,
        color: theme.color.inkSoft,
      }}
    >
      <span style={{ fontStyle: "italic", fontFamily: theme.font.serif }}>
        {h.sourceBook}
      </span>
      <span style={{ fontFamily: theme.font.mono, letterSpacing: "0.1em" }}>
        summon.guide
      </span>
    </div>
  </>
);

/**
 * A beat. The text sets like a paragraph and rises a few pixels. The portrait,
 * when there is one, drifts about one percent over the whole beat. Anything
 * faster competes with the sentence for attention, which is the failure mode of
 * generated B roll.
 */
const BeatScene: React.FC<{
  beat: Beat;
  h: Handoff;
  index: number;
  total: number;
  durationInFrames: number;
}> = ({ beat, h, index, total, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const rise = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 26 });
  const y = interpolate(rise, [0, 1], [22, 0]);
  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  // very slow drift, about 1.2 percent across the beat
  const drift = interpolate(frame, [0, durationInFrames], [1, 1.012]);

  const label = BEAT_LABEL[beat.role] ?? beat.role;
  const isEdge = beat.role === "hook" || beat.role === "close";
  const size = isEdge ? 62 : 54;

  return (
    <AbsoluteFill>
      <Paper />
      <Chrome h={h} index={index} total={total} />

      <AbsoluteFill
        style={{
          padding: "0 84px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity,
        }}
      >
        {/* Top aligned, not centred. Source portraits vary from headshot to
            full length, so centring floats the plate against a tall paragraph
            and the page stops reading as a two column spread. */}
        <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
          {h.portrait && (
            <div
              style={{
                width: 240,
                height: 300,
                flexShrink: 0,
                marginTop: 74,
                overflow: "hidden",
                borderRadius: 6,
                border: `1px solid ${theme.color.rule}`,
                transform: `translateY(${y * 0.4}px)`,
              }}
            >
              <Img
                src={h.portrait}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  transform: `scale(${drift})`,
                  filter: "grayscale(0.55) sepia(0.22) contrast(1.02)",
                }}
              />
            </div>
          )}

          <div style={{ transform: `translateY(${y}px)`, maxWidth: h.portrait ? width - 560 : 1180 }}>
            <div
              style={{
                fontFamily: theme.font.mono,
                fontSize: 19,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: theme.color.gold,
                marginBottom: 22,
              }}
            >
              {label}
            </div>
            <div
              style={{
                width: 64,
                height: 2,
                background: theme.color.gold,
                opacity: 0.5,
                marginBottom: 30,
              }}
            />
            <p
              style={{
                fontFamily: theme.font.serif,
                fontSize: size,
                lineHeight: 1.42,
                color: theme.color.ink,
                margin: 0,
                textWrap: "pretty",
              }}
            >
              {beat.text}
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Title card, held briefly before the hook. */
const TitleCard: React.FC<{ h: Handoff; durationInFrames: number }> = ({
  h,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(
    interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
    })
  );
  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "0 140px",
          textAlign: "center",
          opacity,
        }}
      >
        <div
          style={{
            fontFamily: theme.font.mono,
            fontSize: 20,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: theme.color.gold,
            marginBottom: 30,
          }}
        >
          {h.guideName}
        </div>
        <h1
          style={{
            fontFamily: theme.font.serif,
            fontSize: 96,
            lineHeight: 1.08,
            color: theme.color.ink,
            margin: 0,
            fontWeight: 500,
          }}
        >
          {h.title}
        </h1>
        <div
          style={{
            width: 90,
            height: 2,
            background: theme.color.gold,
            opacity: 0.5,
            margin: "38px 0",
          }}
        />
        <p
          style={{
            fontFamily: theme.font.serif,
            fontStyle: "italic",
            fontSize: 30,
            color: theme.color.inkSoft,
            margin: 0,
          }}
        >
          {h.sourceBook}
          {h.sourceAnchor ? `, ${h.sourceAnchor}` : ""}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Episode: React.FC<{ handoff: Handoff; audioSrc?: string | null }> = ({
  handoff,
  audioSrc,
}) => {
  const { fps } = useVideoConfig();
  const titleFrames = Math.round(2.6 * fps);

  let cursor = titleFrames;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.paper }}>
      {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      <Sequence durationInFrames={titleFrames}>
        <TitleCard h={handoff} durationInFrames={titleFrames} />
      </Sequence>

      {handoff.beats.map((b, i) => {
        const frames = Math.max(1, Math.round(b.seconds * fps));
        const from = cursor;
        cursor += frames;
        return (
          <Sequence key={i} from={from} durationInFrames={frames}>
            <BeatScene
              beat={b}
              h={handoff}
              index={i}
              total={handoff.beats.length}
              durationInFrames={frames}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

/** Total frames for a handoff, so Root and the render script agree. */
export function episodeDurationInFrames(h: Handoff, fps = theme.fps): number {
  const title = Math.round(2.6 * fps);
  const beats = h.beats.reduce((n, b) => n + Math.max(1, Math.round(b.seconds * fps)), 0);
  return title + beats;
}
