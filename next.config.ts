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

// Every origin the browser loads from, and nothing else. PostHog serves its
// config and lazy extensions from the assets host and receives events on the
// ingest host; Google profile photos come from googleusercontent; guide
// portraits can fall back to Wikimedia. Fonts, music, and scenes are local.
// 'unsafe-inline' stays on scripts because Next inlines its hydration data
// without nonces on statically rendered pages.
const POSTHOG = ["https://us.i.posthog.com", "https://us-assets.i.posthog.com"];
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${POSTHOG.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://upload.wikimedia.org https://lh3.googleusercontent.com ${POSTHOG.join(" ")}`,
  "font-src 'self' data:",
  `connect-src 'self' ${POSTHOG.join(" ")}`,
  "media-src 'self' blob: data:",
  "worker-src 'self' blob:",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
  async headers() {
    // Dev mode needs eval for React refresh, so the policy ships with builds only.
    if (process.env.NODE_ENV !== "production") return [];
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
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
