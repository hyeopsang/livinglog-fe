"use client";

import { useCartStore } from "@/lib/cart-store";
import { CartItemList } from "./CartItemList";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

/**
 * Renders the shopping cart page and shows an empty-cart view when there are no items.
 *
 * @returns The cart page JSX: `EmptyCart` when the cart has no items; otherwise a container with the page heading, `CartItemList`, and `CartSummary`.
 */
export function CartContent() {
  const isEmpty = useCartStore((state) => state.ids.length === 0);

  if (isEmpty) return <EmptyCart />;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-10">
      <h1 className="text-xl font-bold text-brand mb-6 md:mb-8">장바구니</h1>
      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-start">
        <CartItemList />
        <CartSummary />
      </div>
    </div>
  );
}
