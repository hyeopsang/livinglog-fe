"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@livinglog/ui";
import { formatPrice } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import type { Order, OrderItem } from "../_types/order";

function OrderCardHeader({ order }: { order: Order }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 bg-surface">
      <div className="flex items-center gap-3">
        <StatusBadge status={order.status} />
        <span className="text-xs text-neutral-400">{order.orderedAt}</span>
      </div>
      <span className="text-xs text-neutral-400 font-mono">{order.orderNumber}</span>
    </div>
  );
}

function OrderCardItem({
  item,
  extraCount,
  totalPrice,
  showReview,
}: {
  item: OrderItem;
  extraCount: number;
  totalPrice: number;
  showReview: boolean;
}) {
  const { product } = item;

  return (
    <div className="px-5 py-4 flex gap-4 items-start">
      <Link href={`/product/${product.id}`} className="shrink-0">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-neutral-100">
          <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: "cover" }} />
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
          <span className="text-xs text-neutral-400">외 {extraCount}개 상품</span>
        )}
        <span className="text-sm font-bold text-brand mt-0.5">
          {formatPrice(totalPrice)}원
        </span>
      </div>

      {showReview && (
        <button className="shrink-0 flex items-center gap-1 text-xs text-neutral-400 hover:text-brand transition-colors mt-0.5">
          리뷰 작성
          <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}

function OrderCardActions({ order }: { order: Order }) {
  const isCancellable = order.status === "PENDING" || order.status === "CONFIRMED";
  const isDelivered = order.status === "DELIVERED";
  const isShipping = order.status === "SHIPPING";

  if (!isCancellable && !isDelivered && !isShipping) return null;

  const actionBtn = "rounded-2xl h-8 px-4 text-xs";

  return (
    <div className="px-5 pb-4 flex gap-2">
      {isDelivered && (
        <>
          <Button variant="outline" size="sm" className={actionBtn}>재구매</Button>
          <Button variant="outline" size="sm" className={actionBtn}>반품 신청</Button>
          <Button variant="outline" size="sm" className={actionBtn}>교환 신청</Button>
        </>
      )}
      {isShipping && (
        <Button variant="outline" size="sm" className={actionBtn}>배송 조회</Button>
      )}
      {isCancellable && (
        <Button
          variant="outline"
          size="sm"
          className={`${actionBtn} text-destructive border-destructive/30 hover:bg-destructive/5`}
        >
          주문 취소
        </Button>
      )}
      <Button variant="ghost" size="sm" className={`${actionBtn} text-neutral-400`}>
        주문 상세
      </Button>
    </div>
  );
}

export function OrderCard({ order }: { order: Order }) {
  if (!order.items.length) return null;

  const firstItem = order.items[0];
  if (!firstItem) return null;

  return (
    <li className="rounded-3xl border border-neutral-100 overflow-hidden">
      <OrderCardHeader order={order} />
      <OrderCardItem
        item={firstItem}
        extraCount={order.items.length - 1}
        totalPrice={order.totalPrice}
        showReview={order.status === "DELIVERED"}
      />
      <OrderCardActions order={order} />
    </li>
  );
}
