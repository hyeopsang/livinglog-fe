"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Button, Separator } from "@livinglog/ui";
import { formatPrice, getDiscountedPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 50000;
const SHIPPING_FEE = 3000;

export function CartSummary() {
  const ids = useCartStore((state) => state.ids);
  const byId = useCartStore((state) => state.byId);

  const subtotal = ids.reduce((sum, id) => {
    const item = byId[id];
    if (!item) return sum;
    return sum + getDiscountedPrice(item.originalPrice, item.discountRate) * item.quantity;
  }, 0);

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  return (
    <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24 rounded-3xl border border-neutral-100 p-5 md:p-6 flex flex-col gap-4">
      <h2 className="text-base font-bold text-brand">주문 요약</h2>
      <Separator />

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-neutral-500">
          <span>상품 금액</span>
          <span>{formatPrice(subtotal)}원</span>
        </div>
        <div className="flex justify-between text-neutral-500">
          <span>배송비</span>
          <span>
            {shippingFee === 0 ? (
              <span className="text-brand font-medium">무료</span>
            ) : (
              `${formatPrice(shippingFee)}원`
            )}
          </span>
        </div>
        {shippingFee > 0 && (
          <p className="text-xs text-neutral-400">
            {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}원 더 담으면 무료배송
          </p>
        )}
      </div>

      <Separator />

      <div className="flex justify-between font-bold text-brand">
        <span>총 주문 금액</span>
        <span>{formatPrice(total)}원</span>
      </div>

      <Button size="lg" className="w-full rounded-2xl py-4 h-auto mt-1">
        주문하기
      </Button>
      <Button variant="outline" size="lg" className="w-full rounded-2xl" asChild>
        <Link href="/">쇼핑 계속하기</Link>
      </Button>
    </aside>
  );
}
