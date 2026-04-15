"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@livinglog/ui";
import { formatPrice, getDiscountedPrice } from "@/lib/utils";

/**
 * Render a single cart item row displaying product image, brand/name, pricing (with discount),
 * quantity controls, a remove button, and the line total.
 *
 * @param id - The cart item's identifier
 * @returns The list item element for the specified cart item, or `null` if the item is not found
 */
export function CartItemRow({ id }: { id: string }) {
  const item = useCartStore((state) => state.byId[id]);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  if (!item) return null;

  const discountedPrice = getDiscountedPrice(item.originalPrice, item.discountRate);

  return (
    <li className="flex gap-4 py-6">
      <Link href={`/product/${item.id}`} className="shrink-0">
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-neutral-100">
          <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: "cover" }} />
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <span className="text-xs text-neutral-400 font-medium">{item.brand}</span>
        <Link
          href={`/product/${item.id}`}
          className="text-sm font-semibold text-brand leading-snug line-clamp-2 hover:underline underline-offset-2"
        >
          {item.name}
        </Link>
        {item.discountRate > 0 && (
          <span className="text-xs text-neutral-400 line-through">
            {formatPrice(item.originalPrice)}원
          </span>
        )}
        <span className="text-sm font-bold text-brand">{formatPrice(discountedPrice)}원</span>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={() => removeItem(item.id)}
          aria-label="상품 삭제"
          className="text-neutral-300 hover:text-brand transition-colors"
        >
          <Trash2 size={16} />
        </button>

        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            aria-label="수량 줄이기"
            className="w-7 h-7 rounded-r-none"
          >
            <Minus size={12} />
          </Button>
          <div className="w-9 h-7 flex items-center justify-center border-y border-border text-xs font-medium text-brand">
            {item.quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="수량 늘리기"
            className="w-7 h-7 rounded-l-none"
          >
            <Plus size={12} />
          </Button>
        </div>

        <span className="text-sm font-bold text-brand">
          {formatPrice(discountedPrice * item.quantity)}원
        </span>
      </div>
    </li>
  );
}
