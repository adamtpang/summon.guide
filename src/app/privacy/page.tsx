import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | summon.guide",
  description:
    "What summon.guide collects, why, and what happens to it. Chat messages are never stored on our servers.",
  alternates: { canonical: "https://summon.guide/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-2xl mx-auto px-6 pt-8 md:pt-14 pb-20">
        <Link
          href="/"
          className="text-blue-600 text-xs tracking-[0.35em] uppercase font-medium"
        >
          summon.guide
        </Link>
        <h1 className="text-[32px] md:text-[44px] font-serif font-medium leading-[1.08] tracking-tight mt-5 mb-2">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-xs mb-10">
          Effective August 14, 2026
        </p>

        <div className="space-y-8 text-slate-600 text-sm leading-relaxed [&_h2]:text-slate-900 [&_h2]:font-serif [&_h2]:text-lg [&_h2]:font-medium [&_h2]:mb-3 [&_h2]:mt-10 [&_strong]:text-slate-900 [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2">
          <p>
            summon.guide (&quot;we,&quot; &quot;us,&quot; &quot;the
            site&quot;) is operated by Adam Pangelinan. This policy explains
            what data summon.guide collects, why, and what happens to it.
          </p>

          <section>
            <h2>What we collect</h2>
            <p>
              <strong>If you sign in with Google:</strong> your name, email
              address, and profile image, via Google&apos;s standard OAuth
              sign-in. We don&apos;t request any Google scopes beyond basic
              profile info, we never see your Google password, and we
              don&apos;t access your email, calendar, or files.
            </p>
            <p className="mt-4">
              <strong>If you don&apos;t sign in:</strong> your free-trial
              message count is tracked only in your browser&apos;s local
              storage. It never reaches our servers, and we have no way to
              identify you.
            </p>
            <p className="mt-4">
              <strong>Chat messages:</strong> when you chat with a guide,
              your message is sent to Anthropic&apos;s Claude API to
              generate a response.{" "}
              <strong>
                We do not store your chat messages or conversation history in
                our own database
              </strong>
              , each conversation exists only in your browser for the
              duration of your session. Anthropic processes the message to
              generate the reply, subject to Anthropic&apos;s own API terms
              and data retention policy (see{" "}
              <a
                href="https://www.anthropic.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                anthropic.com/legal/privacy
              </a>
              ).
            </p>
            <p className="mt-4">
              <strong>Voice/audio:</strong> if you use a guide&apos;s
              spoken-voice feature, the text of the response is sent to
              ElevenLabs to generate the audio. ElevenLabs processes that
              text under its own privacy policy (see{" "}
              <a
                href="https://elevenlabs.io/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                elevenlabs.io/privacy
              </a>
              ).
            </p>
            <p className="mt-4">
              <strong>Feedback:</strong> if you submit feedback on a guide (a
              1-5 rating and an optional comment), we store it tied to your
              account and the guide you rated.
            </p>
            <p className="mt-4">
              <strong>Payment:</strong> if you purchase credits, Stripe
              handles the entire checkout, we never see or store your card
              number, expiration date, or CVV. Stripe sends us a webhook
              confirming a completed payment and the email address you paid
              with, which we use only to add credits to your account.
            </p>
            <p className="mt-4">
              <strong>Usage analytics:</strong> we use PostHog and Vercel
              Analytics to understand aggregate usage (page views, which
              guides get chatted with, general site performance). These
              tools may set cookies or use similar identifiers in your
              browser. We do not use this data to identify you personally
              beyond what&apos;s already tied to your account if you&apos;re
              signed in.
            </p>
          </section>

          <section>
            <h2>Why we collect it</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To let you sign in and keep your credit balance across sessions</li>
              <li>To generate the guide&apos;s response to your message (the core product)</li>
              <li>To generate spoken audio when you ask for it</li>
              <li>To process payments and grant purchased credits</li>
              <li>To understand what&apos;s working and fix what isn&apos;t</li>
            </ul>
          </section>

          <section>
            <h2>Who we share it with</h2>
            <p>
              We share data only with the services below, each solely to
              perform the function you&apos;re using. We do not sell your
              data to anyone, ever.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="text-left py-2 pr-4 font-medium">Service</th>
                    <th className="text-left py-2 pr-4 font-medium">What they receive</th>
                    <th className="text-left py-2 font-medium">Why</th>
                  </tr>
                </thead>
                <tbody className="text-slate-500">
                  <tr className="border-b border-slate-100">
                    <td className="py-2 pr-4">Google</td>
                    <td className="py-2 pr-4">(nothing from us, you sign in directly with them)</td>
                    <td className="py-2">Sign-in</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 pr-4">Anthropic</td>
                    <td className="py-2 pr-4">Your chat message, the guide&apos;s grounding data</td>
                    <td className="py-2">Generating the guide&apos;s reply</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 pr-4">ElevenLabs</td>
                    <td className="py-2 pr-4">Text of a response you asked to hear spoken</td>
                    <td className="py-2">Voice generation</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 pr-4">Stripe</td>
                    <td className="py-2 pr-4">(nothing from us, you pay directly on their checkout)</td>
                    <td className="py-2">Payment processing</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">PostHog, Vercel</td>
                    <td className="py-2 pr-4">Anonymous/aggregate usage events</td>
                    <td className="py-2">Analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>How long we keep it</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Account data</strong> (name, email, image, credit balance): kept as long as your account exists.</li>
              <li><strong>Feedback:</strong> kept indefinitely as product feedback, unless you ask us to delete it.</li>
              <li><strong>Chat messages:</strong> not retained by us at all, governed by Anthropic&apos;s own retention policy on their end.</li>
              <li><strong>Anonymous free-trial usage:</strong> lives only in your browser&apos;s local storage, clearing your browser data clears it.</li>
            </ul>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              You can ask us to delete your account and associated data at
              any time by contacting{" "}
              <a href="mailto:adamtpang@gmail.com">adamtpang@gmail.com</a>.
              Since chat messages aren&apos;t stored by us, there&apos;s
              nothing to delete there beyond what Anthropic may retain per
              their own policy.
            </p>
          </section>

          <section>
            <h2>Children&apos;s privacy</h2>
            <p>
              summon.guide is not directed at children under 13, and we
              don&apos;t knowingly collect data from anyone under 13.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              If this policy changes in a material way, we&apos;ll update
              the effective date above. Continued use of the site after a
              change means you accept the updated policy.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              <a href="mailto:adamtpang@gmail.com">adamtpang@gmail.com</a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-6 border-t border-slate-200">
          <Link href="/" className="text-slate-400 text-xs hover:text-blue-600 transition-colors">
            &larr; Back to summon.guide
          </Link>
        </div>
      </div>
    </main>
  );
}
