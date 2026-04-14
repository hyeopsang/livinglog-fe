//   import { OrderStatus } from "@livinglog/graphql";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPING"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItemProduct {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
}

export interface OrderItem {
  id: string;
  product: OrderItemProduct;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  orderedAt: string;
}

export const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  DELIVERED: { label: "배송완료", className: "text-emerald-600 bg-emerald-50" },
  SHIPPING: { label: "배송중", className: "text-blue-600 bg-blue-50" },
  PENDING: { label: "주문접수", className: "text-amber-600 bg-amber-50" },
  CONFIRMED: { label: "주문확인", className: "text-violet-600 bg-violet-50" },
  CANCELLED: {
    label: "취소완료",
    className: "text-neutral-400 bg-neutral-100",
  },
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "order-1",
    orderNumber: "20240312-0001",
    orderedAt: "2024년 3월 12일",
    status: "DELIVERED",
    totalPrice: 598000,
    items: [
      {
        id: "item-1",
        product: {
          id: "prod-1",
          name: "드레스덴 조야패브릭 호텔식 침대프레임",
          brand: "데일리리빙",
          imageUrl: "/bestseller/best01.avif",
        },
        price: 508300,
        quantity: 1,
      },
    ],
  },
  {
    id: "order-2",
    orderNumber: "20240405-0002",
    orderedAt: "2024년 4월 5일",
    status: "DELIVERED",
    totalPrice: 189000,
    items: [
      {
        id: "item-2",
        product: {
          id: "prod-2",
          name: "홀리스 스윙 플로어 장스탠드 조명",
          brand: "스피아노",
          imageUrl: "/bestseller/best02.avif",
        },
        price: 170100,
        quantity: 1,
      },
    ],
  },
  {
    id: "order-3",
    orderNumber: "20240520-0003",
    orderedAt: "2024년 5월 20일",
    status: "SHIPPING",
    totalPrice: 245000,
    items: [
      {
        id: "item-3",
        product: {
          id: "prod-3",
          name: "마레 오크 원목 사이드 테이블",
          brand: "모던하우스",
          imageUrl: "/bestseller/best03.avif",
        },
        price: 245000,
        quantity: 1,
      },
    ],
  },
  {
    id: "order-4",
    orderNumber: "20240601-0004",
    orderedAt: "2024년 6월 1일",
    status: "PENDING",
    totalPrice: 89000,
    items: [
      {
        id: "item-4",
        product: {
          id: "prod-4",
          name: "노르딕 세라믹 캔들 홀더 세트",
          brand: "코지홈",
          imageUrl: "/bestseller/best04.avif",
        },
        price: 89000,
        quantity: 2,
      },
    ],
  },
];
