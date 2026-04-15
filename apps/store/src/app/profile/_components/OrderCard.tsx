import type { Order } from "../_types/order";
import { OrderCardHeader } from "./OrderCardHeader";
import { OrderCardItem } from "./OrderCardItem";
import { OrderCardActions } from "./OrderCardActions";

export interface OrderCardCallbacks {
  onViewOrder?: (orderId: string) => void;
  onWriteReview?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  onTrackShipment?: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
  onReturnExchange?: (orderId: string, type: "return" | "exchange") => void;
}

interface OrderCardProps {
  order: Order;
  callbacks?: OrderCardCallbacks;
}

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
