import Link from "next/link";
import { Button } from "@livinglog/ui";

export function EmptyOrderHistory() {
  return (
    <div className="rounded-3xl border border-neutral-100 p-12 flex flex-col items-center justify-center gap-3 text-center">
      <p className="text-base font-semibold text-brand">주문 내역이 없습니다</p>
      <p className="text-sm text-neutral-400">마음에 드는 상품을 주문해보세요</p>
      <Button asChild size="sm" className="rounded-2xl px-6 mt-2">
        <Link href="/">쇼핑하러 가기</Link>
      </Button>
    </div>
  );
}
