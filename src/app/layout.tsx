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

export const metadata: Metadata = {
  title: "summon.guide | Personal Mentorship from History's Greatest Guides",
  description:
    "Type in any life problem. We'll match you with the legendary human best suited to mentor you through it. Deeply researched AI guides grounded in real biographies and primary sources. Voice-enabled. Free to try.",
  metadataBase: new URL("https://summon.guide"),
  keywords: [
    "AI mentorship",
    "personal mentor matching",
    "summon a mentor",
    "talk to historical figures",
    "Rockefeller advice",
    "Benjamin Franklin wisdom",
    "AI life coach",
    "historical guides",
    "biography-based AI",
    "summon guide",
    "chat with history",
  ],
  // icon and apple-icon are auto-discovered from src/app/icon.tsx and
  // src/app/apple-icon.tsx (Next.js convention). favicon.svg in /public
  // is also auto-served at /favicon.svg as a vector fallback.
  openGraph: {
    title: "summon.guide, Personal Mentorship from History's Greatest Guides",
    description:
      "Type in any life problem. Get matched with the legendary human best suited to mentor you. Free to try.",
    url: "https://summon.guide",
    siteName: "summon.guide",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "summon.guide, Personal Mentorship from History's Greatest Guides",
    description:
      "Type in any life problem. Get matched with the legendary human best suited to mentor you. Free to try.",
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
