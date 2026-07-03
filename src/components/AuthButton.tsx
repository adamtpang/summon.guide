"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton({ dark = false }: { dark?: boolean }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        className={`w-8 h-8 rounded-full animate-pulse ${dark ? "bg-white/10" : "bg-warm-200"}`}
      />
    );
  }

  if (session?.user) {
    return (
      <button
        onClick={() => signOut()}
        className={`flex items-center gap-2 text-sm transition-colors ${
          dark
            ? "text-warm-400 hover:text-warm-50"
            : "text-warm-400 hover:text-ink-950"
        }`}
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt=""
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-medium ${
              dark ? "bg-white/15" : "bg-warm-300"
            }`}
          >
            {session.user.name?.[0] || "?"}
          </div>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className={`text-sm transition-colors border rounded-full px-4 py-2 ${
        dark
          ? "text-warm-400 border-white/15 hover:text-warm-50 hover:border-gold-500/60"
          : "text-warm-500 border-warm-300 hover:text-ink-950 hover:border-ink-950"
      }`}
    >
      Sign in
    </button>
  );
}
