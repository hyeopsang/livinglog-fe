import { Badge } from "@livinglog/graphql";

export const BADGE_CONFIG: Record<Badge, { label: string; className: string }> = {
  [Badge.FreeShipping]: {
    label: "무료배송",
    className: "bg-blue-50 text-blue-600",
  },
  [Badge.Special]: {
    label: "특가",
    className: "bg-red-50 text-red-500",
  },
  [Badge.ShippingFee]: {
    label: "배송비 별도",
    className: "bg-neutral-100 text-neutral-500",
  },
};
