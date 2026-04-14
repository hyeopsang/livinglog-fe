import { cn } from "@/lib/utils";
import { STATUS_CONFIG, type OrderStatus } from "../_types/order";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  if (!config) return null;

  return (
    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", config.className)}>
      {config.label}
    </span>
  );
}
