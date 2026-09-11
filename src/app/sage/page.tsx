import { Suspense } from "react";
import type { Metadata } from "next";
import SageConversation from "@/components/SageConversation";
import { getSourceCorpus } from "@/lib/sourceCorpus";

export const metadata: Metadata = {
  title: "Sage | summon.guide",
  description: "Talk to Sage. Source-backed counsel from Founders and David Senra.",
  alternates: { canonical: "https://summon.guide/sage" },
};
export default function SagePage() {
  return <main style={{ background: "#080808", color: "#eee", minHeight: "100dvh" }}>
    <Suspense fallback={<p style={{ padding: 32 }}>Sage</p>}>
      <SageConversation episodes={getSourceCorpus("founders-podcast")?.episodes || []} />
    </Suspense>
  </main>;
}
