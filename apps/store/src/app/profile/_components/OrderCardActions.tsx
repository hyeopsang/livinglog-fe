"use client";

import { Button } from "@livinglog/ui";
import type { Order } from "../_types/order";
import type { OrderCardCallbacks } from "./OrderCard";

export function OrderCardActions({
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
