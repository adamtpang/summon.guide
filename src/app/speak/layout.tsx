import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide voiceover | summon.guide",
  description:
    "Paste a short essay, choose a guide, generate a 90–120 second voiceover. Essay → TTS → book.movie.",
  alternates: {
    canonical: "https://summon.guide/speak",
  },
  openGraph: {
    title: "Guide voiceover, summon.guide",
    description:
      "A guide speaks your essay. Hook, three points, close. Download mp3 for video.",
    url: "https://summon.guide/speak",
    type: "website",
  },
};

export default function SpeakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
