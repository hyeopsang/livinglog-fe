"use client";

import { useCartStore } from "@/lib/cart-store";
import { CartItemList } from "./CartItemList";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

export function CartContent() {
  const isEmpty = useCartStore((state) => state.ids.length === 0);

  if (isEmpty) return <EmptyCart />;

  return (
    <div className="max-w-7xl w-full mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-brand mb-8">장바구니</h1>
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <CartItemList />
        <CartSummary />
      </div>
    </div>
  );
}
