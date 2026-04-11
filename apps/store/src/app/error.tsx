"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-4">
        500
      </p>
      <h1 className="text-4xl font-bold text-[#1C1C19] mb-3">
        오류가 발생했어요
      </h1>
      <p className="text-base text-neutral-500 mb-10 max-w-sm">
        일시적인 문제가 생겼어요. 잠시 후 다시 시도해 주세요.
      </p>
      <div className="flex gap-3">
        <button
          onClick={unstable_retry}
          className="inline-flex items-center justify-center bg-[#1C1C19] text-white text-sm font-semibold rounded-[8px] px-8 py-3 hover:bg-[#1C1C19]/90 transition-colors"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-neutral-200 text-[#1C1C19] text-sm font-semibold rounded-[8px] px-8 py-3 hover:bg-neutral-50 transition-colors"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
