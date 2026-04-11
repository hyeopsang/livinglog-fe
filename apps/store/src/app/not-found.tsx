import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-4">
        404
      </p>
      <h1 className="text-4xl font-bold text-[#1C1C19] mb-3">
        페이지를 찾을 수 없어요
      </h1>
      <p className="text-base text-neutral-500 mb-10 max-w-sm">
        주소가 잘못되었거나 페이지가 삭제되었을 수 있어요.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-[#1C1C19] text-white text-sm font-semibold rounded-[8px] px-8 py-3 hover:bg-[#1C1C19]/90 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
