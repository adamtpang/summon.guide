/** Composite portraits use the same assets in chat and in the onboarding audit. */
export const COMPOSITE_PORTRAITS: Record<string, { name: string; src: string }[]> = {
  "/portraits/buffettmunger.svg": [
    { name: "Warren Buffett", src: "/portraits/warren-buffett.jpg" },
    { name: "Charlie Munger", src: "/portraits/charlie-munger.jpg" },
  ],
};
export function portraitAssets(src?: string) {
  return src ? COMPOSITE_PORTRAITS[src]?.map(member => member.src) || [src] : [];
}
