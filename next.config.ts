import type { NextConfig } from "next";

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
  reactCompiler: true,
  async redirects() {
    return SLUG_REDIRECTS.flatMap(([oldSlug, newSlug]) => [
      // Profile page
      {
        source: `/${oldSlug}`,
        destination: `/${newSlug}`,
        permanent: true,
      },
      // Chat page
      {
        source: `/chat/${oldSlug}`,
        destination: `/chat/${newSlug}`,
        permanent: true,
      },
      // OG image
      {
        source: `/api/og/${oldSlug}`,
        destination: `/api/og/${newSlug}`,
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
