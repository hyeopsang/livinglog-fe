"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ImageOff } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { OrderItem } from "../_types/order";

interface OrderCardItemProps {
  item: OrderItem;
  extraCount: number;
  totalPrice: number;
  showReview: boolean;
  onWriteReview?: () => void;
}

export function OrderCardItem({
  item,
  extraCount,
  totalPrice,
  showReview,
  onWriteReview,
}: OrderCardItemProps) {
  const { product } = item;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="px-5 py-4 flex gap-4 items-start">
      <Link href={`/product/${product.id}`} className="shrink-0">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-neutral-100">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center text-neutral-300">
              <ImageOff size={24} />
            </div>
          ) : (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </Link>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <span className="text-xs text-neutral-400">{product.brand}</span>
        <Link
          href={`/product/${product.id}`}
          className="text-sm font-semibold text-brand leading-snug line-clamp-2 hover:underline underline-offset-2"
        >
          {product.name}
        </Link>
        {extraCount > 0 && (
          <span className="text-xs text-neutral-400">
            외 {extraCount}개 상품
          </span>
        )}
        <span className="text-sm font-bold text-brand mt-0.5">
          {formatPrice(totalPrice)}원
        </span>
      </div>

      {showReview && (
        <button
          onClick={onWriteReview}
          className="shrink-0 flex items-center gap-1 text-xs text-neutral-400 hover:text-brand transition-colors mt-0.5"
        >
          리뷰 작성
          <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}
