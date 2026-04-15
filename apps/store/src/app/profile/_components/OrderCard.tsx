"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@livinglog/ui";
import { formatPrice } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import type { Order, OrderItem } from "../_types/order";

export interface OrderCardCallbacks {
  onViewOrder?: (orderId: string) => void;
  onWriteReview?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  onTrackShipment?: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
  onReturnExchange?: (orderId: string, type: "return" | "exchange") => void;
}

/**
 * Render the order header row showing the order's status, date, and order number.
 *
 * @param order - Order data used to populate the header; reads `order.status`, `order.orderedAt`, and `order.orderNumber`
 * @returns A header row element containing a status badge, the order date, and the order number
 */
function OrderCardHeader({ order }: { order: Order }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 bg-surface">
      <div className="flex items-center gap-3">
        <StatusBadge status={order.status} />
        <span className="text-xs text-neutral-400">{order.orderedAt}</span>
      </div>
      <span className="text-xs text-neutral-400 font-mono">
        {order.orderNumber}
      </span>
    </div>
  );
}

/**
 * Renders a single order item row for an order card, showing product image, brand, name, price, an indicator for additional items, and an optional review button.
 *
 * @param item - The order item to render; expected to contain a `product` object with `id`, `imageUrl`, `name`, and `brand`.
 * @param extraCount - Number of additional items in the order beyond this item.
 * @param totalPrice - Total price to display for this item (e.g., quantity * unit price).
 * @param showReview - If `true`, displays a "Write review" button.
 * @param onWriteReview - Callback invoked when the review button is clicked.
 * @returns A JSX element representing the rendered order item row.
 */
function OrderCardItem({
  item,
  extraCount,
  totalPrice,
  showReview,
  onWriteReview,
}: {
  item: OrderItem;
  extraCount: number;
  totalPrice: number;
  showReview: boolean;
  onWriteReview?: () => void;
}) {
  const { product } = item;

  return (
    <div className="px-5 py-4 flex gap-4 items-start">
      <Link href={`/product/${product.id}`} className="shrink-0">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-neutral-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />
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

/**
 * Render action buttons appropriate for the given order's status.
 *
 * Displays:
 * - Reorder, return, and exchange buttons when the order is delivered.
 * - A shipment tracking button when the order is shipping.
 * - A cancel button when the order is pending or confirmed.
 * - A "view order" button always.
 *
 * @param order - Order used to determine which actions are visible
 * @param callbacks - Callback handlers invoked by each action button
 * @returns A React element containing the action buttons for the order
 */
function OrderCardActions({
  order,
  callbacks,
}: {
  order: Order;
  callbacks: OrderCardCallbacks;
}) {
  const isCancellable =
    order.status === "PENDING" || order.status === "CONFIRMED";
  const isDelivered = order.status === "DELIVERED";
  const isShipping = order.status === "SHIPPING";
  const {
    onViewOrder,
    onCancelOrder,
    onTrackShipment,
    onReorder,
    onReturnExchange,
  } = callbacks;

  const actionBtn = "rounded-2xl h-8 px-4 text-xs";

  return (
    <div className="px-5 pb-4 flex gap-2">
      {isDelivered && (
        <>
          <Button
            variant="outline"
            size="sm"
            className={actionBtn}
            onClick={() => onReorder?.(order.id)}
          >
            재구매
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={actionBtn}
            onClick={() => onReturnExchange?.(order.id, "return")}
          >
            반품 신청
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={actionBtn}
            onClick={() => onReturnExchange?.(order.id, "exchange")}
          >
            교환 신청
          </Button>
        </>
      )}
      {isShipping && (
        <Button
          variant="outline"
          size="sm"
          className={actionBtn}
          onClick={() => onTrackShipment?.(order.id)}
        >
          배송 조회
        </Button>
      )}
      {isCancellable && (
        <Button
          variant="outline"
          size="sm"
          className={`${actionBtn} text-destructive border-destructive/30 hover:bg-destructive/5`}
          onClick={() => onCancelOrder?.(order.id)}
        >
          주문 취소
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        className={`${actionBtn} text-neutral-400`}
        onClick={() => onViewOrder?.(order.id)}
      >
        주문 상세
      </Button>
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  callbacks?: OrderCardCallbacks;
}

/**
 * Render an order card list item for a given order.
 *
 * Renders a compact order summary including header, first item preview, action buttons, and total price. Returns `null` when the order contains no items.
 *
 * @param order - The order to display.
 * @param callbacks - Optional callbacks for user actions such as viewing the order, writing a review, cancelling, tracking shipment, reordering, or requesting a return/exchange. Defaults to an empty object.
 * @returns An `<li>` element representing the order card, or `null` if the order has no items.
 */
export function OrderCard({ order, callbacks = {} }: OrderCardProps) {
  if (!order.items.length) return null;

  const firstItem = order.items[0];
  if (!firstItem) return null;

  return (
    <li className="w-full rounded-3xl border border-neutral-100 overflow-hidden">
      <OrderCardHeader order={order} />
      <OrderCardItem
        item={firstItem}
        extraCount={order.items.length - 1}
        totalPrice={order.totalPrice}
        showReview={order.status === "DELIVERED"}
        onWriteReview={() => callbacks.onWriteReview?.(order.id)}
      />
      <OrderCardActions order={order} callbacks={callbacks} />
    </li>
  );
}
