import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

const SITE_TITLE =
  "summon.guide | Personal Mentorship from History's Greatest Guides";
const SITE_DESCRIPTION =
  "Type in any life problem and get matched with the legendary human best suited to mentor you, grounded in real biographies. Free to try.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://summon.guide"),
  // Deliberately no `keywords` field: meta keyword stuffing is legacy and
  // adds noise for crawlers (flagged by the lightmark.app AI-visibility
  // audit's head-hygiene check).
  // icon and apple-icon are auto-discovered from src/app/icon.tsx and
  // src/app/apple-icon.tsx (Next.js convention). favicon.svg in /public
  // is also auto-served at /favicon.svg as a vector fallback. opengraph-image.tsx
  // supplies og:image/twitter:image (Next.js file convention).
  openGraph: {
    // Kept identical to <title> on purpose: the audit flags og:title vs
    // <title> mismatches, and there's no reason for these to diverge.
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://summon.guide",
    siteName: "summon.guide",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "https://summon.guide",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  // Organization node so LLM crawlers can ground "summon.guide"
                  // as an entity. sameAs is the one real, working profile
                  // for this project found in the codebase (the GitHub repo
                  // linked from every guide's install instructions); no
                  // social accounts were invented.
                  "@type": "Organization",
                  "@id": "https://summon.guide/#organization",
                  name: "summon.guide",
                  url: "https://summon.guide",
                  sameAs: ["https://github.com/adamtpang/summon.guide"],
                },
                {
                  // WebSite node makes the homepage's JSON-LD primary type
                  // "WebSite" (what AI-visibility audits expect for a
                  // homepage). No SearchAction: the site has a real
                  // typeahead (/api/humans/search) and a real problem-router
                  // (/api/match), but neither is a navigable search-results
                  // page a SearchAction target could honestly point at, so
                  // one isn't declared here rather than faking it.
                  "@type": "WebSite",
                  "@id": "https://summon.guide/#website",
                  name: "summon.guide",
                  url: "https://summon.guide",
                  description:
                    "Type in any life problem and get matched with the legendary human best suited to mentor you through it. AI guides grounded in real biographies and primary sources.",
                  publisher: { "@id": "https://summon.guide/#organization" },
                  author: { "@id": "https://summon.guide/#organization" },
                },
                {
                  "@type": "WebApplication",
                  name: "summon.guide",
                  url: "https://summon.guide",
                  description:
                    "Type in any life problem and get matched with the legendary human best suited to mentor you through it. AI guides grounded in real biographies and primary sources.",
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "Web",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                    description: "25 free messages, then $10 for 100 messages",
                  },
                },
              ],
            }),
          }}
        />
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
