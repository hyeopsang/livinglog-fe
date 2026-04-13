import Link from "next/link";
import { Button } from "@livinglog/ui";

export function EmptyCart() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6">
      <div className="flex flex-col gap-1.5">
        <p className="text-base font-semibold text-brand">장바구니가 비었습니다</p>
        <p className="text-sm text-neutral-400">마음에 드는 상품을 담아보세요</p>
      </div>
      <Button asChild size="lg" className="rounded-2xl px-8">
        <Link href="/">쇼핑 계속하기</Link>
      </Button>
    </div>
  );
}
