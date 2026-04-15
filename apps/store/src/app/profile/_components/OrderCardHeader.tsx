import { StatusBadge } from "./StatusBadge";
import type { Order } from "../_types/order";

export function OrderCardHeader({ order }: { order: Order }) {
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
