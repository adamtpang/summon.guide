import type { NextConfig } from "next";
import guideUrls from "./data/guide-urls.json";

// Old long slugs map to short canonical slugs.
// Keep this in sync with figures.ts.
const SLUG_REDIRECTS: Array<[string, string]> = [
  ["john-d-rockefeller", "rockefeller"],
  ["benjamin-franklin", "franklin"],
  ["elon-musk", "elon"],
  ["alexander-the-great", "alexander"],
  ["david-deutsch", "deutsch"],
];

const nextConfig: NextConfig = {
  // Agent builds and durable session artifacts belong to Eve, not Next routes.
  outputFileTracingExcludes: { "/*": ["./eve-guides/**/*", "./scripts/sage-rag/**/*"] },
  reactCompiler: true,
  images: {
    // Newly onboarded guides use public-domain Wikimedia portraits until a
    // local /public/portraits/<slug>.jpg is added. This unblocks the guide
    // onboarding pipeline (see GUIDE_ONBOARDING.md) without a manual
    // image-download step per figure.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
    ],
  },
  async rewrites() {
    return guideUrls.filter(r => r.slug !== r.publicSlug).flatMap(r => [
      { source: `/${r.publicSlug}`, destination: `/${r.slug}` },
      { source: `/${r.publicSlug}/about`, destination: `/${r.slug}/about` },
    ]);
  },
  async redirects() {
    return [
      ...guideUrls.flatMap(r => r.aliases.filter(alias => alias !== r.publicSlug).flatMap(alias => [
        { source: `/${alias}`, destination: `/${r.publicSlug}`, permanent: true },
        { source: `/${alias}/about`, destination: `/${r.publicSlug}/about`, permanent: true },
      ])),
      { source: "/founders-lens", destination: "/sage", permanent: true },
      { source: "/founders-podcast", destination: "/sage", permanent: true },
      { source: "/chat/source/founders-podcast", destination: "/sage", permanent: true },
      { source: "/chat/source/:slug", destination: "/:slug", permanent: true },
      ...SLUG_REDIRECTS.map(([oldSlug, newSlug]) => ({ source: `/chat/${oldSlug}`, destination: `/${newSlug}`, permanent: true })),
      { source: "/chat/:slug", destination: "/:slug", permanent: true },
      ...SLUG_REDIRECTS.flatMap(([oldSlug, newSlug]) => [
      // Profile page
      {
        source: `/${oldSlug}`,
        destination: `/${newSlug}`,
        permanent: true,
      },
      // OG image
      {
        source: `/api/og/${oldSlug}`,
        destination: `/api/og/${newSlug}`,
        permanent: true,
      },
    ])];
  },
};

export default nextConfig;
