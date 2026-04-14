"use client";

// GraphQL 연결 시 아래 주석 제거 후 mock 데이터 제거
// import { useGetMyOrdersQuery } from "@livinglog/graphql";

import { OrderCard } from "./OrderCard";
import { EmptyOrderHistory } from "./EmptyOrderHistory";
import { Skeleton } from "@livinglog/ui";
import { MOCK_ORDERS, type Order } from "../_types/order";

export function OrderHistorySkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-neutral-100 overflow-hidden"
        >
          <div className="px-5 py-3.5 bg-surface flex items-center gap-3">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="px-5 py-4 flex gap-4">
            <Skeleton className="w-20 h-20 rounded-2xl shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-20 mt-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrderHistoryError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-3xl border border-neutral-100 p-12 flex flex-col items-center justify-center gap-3 text-center">
      <p className="text-base font-semibold text-brand">
        주문 내역을 불러오지 못했습니다
      </p>
      <p className="text-sm text-neutral-400">잠시 후 다시 시도해주세요</p>
      <button
        onClick={onRetry}
        className="text-sm text-brand underline underline-offset-2 mt-1 hover:opacity-70 transition-opacity"
      >
        다시 시도
      </button>
    </div>
  );
}

function OrderList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) return <EmptyOrderHistory />;

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </ul>
  );
}

export function OrderHistory() {
  // ─── GraphQL 연결 후 이 블록으로 교체 ────────────────────────────────────
  // const { data, loading, error, refetch } = useGetMyOrdersQuery({
  //   fetchPolicy: "cache-and-network",
  // });
  //
  // if (loading) return <section className="flex flex-col gap-4"><h2 className="text-base font-bold text-brand">주문 내역</h2><OrderHistorySkeleton /></section>;
  // if (error) return <section className="flex flex-col gap-4"><h2 className="text-base font-bold text-brand">주문 내역</h2><OrderHistoryError onRetry={refetch} /></section>;
  //
  // const orders = data?.myOrders ?? [];
  // ─────────────────────────────────────────────────────────────────────────

  const orders = MOCK_ORDERS;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-brand">주문 내역</h2>
      <OrderList orders={orders} />
    </section>
  );
}
