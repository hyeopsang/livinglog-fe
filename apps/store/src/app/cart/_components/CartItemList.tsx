"use client";

import { useCartStore } from "@/lib/cart-store";
import { CartItemRow } from "./CartItemRow";

export function CartItemList() {
  const ids = useCartStore((state) => state.ids);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-neutral-400">{ids.length}개 상품</span>
        <button
          onClick={clearCart}
          className="text-sm text-neutral-400 hover:text-brand transition-colors"
        >
          전체 삭제
        </button>
      </div>
      <ul className="divide-y divide-neutral-100">
        {ids.map((id) => (
          <CartItemRow key={id} id={id} />
        ))}
      </ul>
    </div>
  );
}
