"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Isolated client island: detects ?payment=success and shows the modal.
// Kept out of page.tsx (a Server Component) so useSearchParams()'s Suspense
// requirement only gates this small piece, not the entire homepage's HTML.
export default function PurchaseSuccessModal() {
  return (
    <Suspense fallback={null}>
      <PurchaseSuccessModalInner />
    </Suspense>
  );
}

function PurchaseSuccessModalInner() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(
    () => searchParams?.get("payment") === "success"
  );

  useEffect(() => {
    if (searchParams?.get("payment") === "success") {
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl shadow-slate-900/10">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-medium text-slate-900 mb-2">
          Welcome back
        </h2>
        <p className="text-slate-500 text-sm mb-2">
          100 credits have been added to your account.
        </p>
        <p className="text-slate-400 text-xs mb-6">
          Continue your conversations with any legend.
        </p>
        <button
          onClick={() => setShow(false)}
          className="w-full bg-blue-600 text-white rounded-full py-3 px-6 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Start chatting
        </button>
      </div>
    </div>
  );
}
