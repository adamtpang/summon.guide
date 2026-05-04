import { getFigure } from "@/lib/figures";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ figure: string }>;
}): Promise<Metadata> {
  const { figure: figureSlug } = await params;
  const figure = getFigure(figureSlug);

  if (!figure) {
    return { title: "Legend Not Found | summon.guide" };
  }

  const ogImageUrl = `https://summon.guide/api/og/${figure.slug}`;

  return {
    title: `Talk to ${figure.name} | summon.guide`,
    description: `Chat with ${figure.name} (${figure.era}). ${figure.knownFor}. AI mentor grounded in real biographies and primary sources.`,
    openGraph: {
      title: `Talk to ${figure.name} | summon.guide`,
      description: `Chat with ${figure.name}. ${figure.knownFor}. AI-powered wisdom from real biographies.`,
      url: `https://summon.guide/chat/${figure.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Talk to ${figure.name} | summon.guide`,
      description: `Chat with ${figure.name}. ${figure.knownFor}. AI-powered wisdom from real biographies.`,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `https://summon.guide/chat/${figure.slug}`,
    },
  };
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
