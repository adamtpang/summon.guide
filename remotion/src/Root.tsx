import React from "react";
import { Composition } from "remotion";
import { Episode, episodeDurationInFrames } from "./Episode";
import { theme, type Handoff } from "./theme";
import fallback from "./sample-handoff.json";

/**
 * The composition is driven entirely by an input prop, so rendering a different
 * episode means passing a different handoff, not editing a component. The
 * bundled sample only exists so Studio opens with something on screen.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Episode"
      component={Episode as never}
      durationInFrames={episodeDurationInFrames(fallback as Handoff)}
      fps={theme.fps}
      width={1920}
      height={1080}
      defaultProps={{ handoff: fallback as Handoff, audioSrc: null }}
      calculateMetadata={({ props }) => {
        const h = (props as { handoff: Handoff }).handoff;
        return { durationInFrames: episodeDurationInFrames(h), fps: theme.fps };
      }}
    />
  );
};
