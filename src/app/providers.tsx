"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";

// Ties the anonymous visit (and its UTM pageview) to the signed-in person, so a
// campaign can be followed to a conversation and a purchase. Id only, no email.
function IdentifyUser() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  useEffect(() => {
    if (userId && process.env.NEXT_PUBLIC_POSTHOG_KEY) posthog.identify(userId);
  }, [userId]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
  }, []);

  const inner = <SessionProvider><IdentifyUser />{children}</SessionProvider>;

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return inner;
  }

  return <PHProvider client={posthog}>{inner}</PHProvider>;
}

// Keep backward compat export
export { Providers as PostHogProvider };
