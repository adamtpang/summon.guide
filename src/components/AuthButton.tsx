"use client";

import { useSession, signIn, signOut } from "next-auth/react";

// `dark` is accepted for older callers and ignored: the site has one theme.
export default function AuthButton({}: { dark?: boolean }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-moon/10" />;
  }

  if (session?.user) {
    return (
      <button
        onClick={() => signOut()}
        aria-label="Sign out"
        title="Sign out"
        className="flex min-h-11 items-center px-1"
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" className="h-9 w-9 rounded-full" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-moon/10 text-sm font-medium text-moon">
            {session.user.name?.[0] || "?"}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="min-h-11 rounded-[3px] border border-moon/25 px-4 text-[15px] text-moon transition-colors hover:border-lapis hover:bg-lapis hover:text-night"
    >
      Sign in
    </button>
  );
}
