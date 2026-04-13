"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { type Badge } from "@livinglog/graphql";
import { Button, Separator } from "@livinglog/ui";
import { BADGE_CONFIG } from "@/lib/badge";
import { formatPrice, getDiscountedPrice } from "@/lib/utils";
import { StarRating } from "@/app/(home)/_components/StarRating";

interface Props {
  brand: string;
  name: string;
  originalPrice: number;
  discountRate: number;
  rating: number;
  reviewCount: number;
  badges: Badge[];
}

export function ProductInfo({
  brand,
  name,
  originalPrice,
  discountRate,
  rating,
  reviewCount,
  badges,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const discountedPrice = getDiscountedPrice(originalPrice, discountRate);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">{brand}</span>
        <h1 className="text-2xl font-bold text-foreground leading-snug">{name}</h1>
      </div>

      <div className="flex items-center gap-2">
        <StarRating rating={rating} />
        <span className="text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground">
          ({reviewCount.toLocaleString()}개 리뷰)
        </span>
      </div>

      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {badges.map((badge) => (
            <span
              key={badge}
              className={`text-xs font-semibold px-2 py-1 rounded-md ${BADGE_CONFIG[badge].className}`}
            >
              {BADGE_CONFIG[badge].label}
            </span>
          ))}
        </div>
      )}

      <Separator />

      <div className="flex flex-col gap-1.5">
        {discountRate > 0 && (
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(originalPrice)}원
          </span>
        )}
        <div className="flex items-baseline gap-2">
          {discountRate > 0 && (
            <span className="text-xl font-bold text-destructive">{discountRate}%</span>
          )}
          <span className="text-3xl font-bold text-foreground">
            {formatPrice(discountedPrice)}원
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">수량</span>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="수량 줄이기"
            className="rounded-r-none"
          >
            <Minus />
          </Button>
          <div
            aria-live="polite"
            className="w-14 h-9 flex items-center justify-center border-y border-border text-sm font-medium text-foreground"
          >
            {quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="수량 늘리기"
            className="rounded-l-none"
          >
            <Plus />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 px-5 bg-muted rounded-2xl">
        <span className="text-sm text-muted-foreground">총 상품 금액</span>
        <span className="text-lg font-bold text-foreground">
          {formatPrice(discountedPrice * quantity)}원
        </span>
      </div>

      <div className="flex gap-3">
        <Button size="lg" className="flex-1 rounded-2xl py-4 h-auto">
          <ShoppingCart />
          장바구니 담기
        </Button>
        <Button
          variant="outline"
          size="icon-lg"
          aria-label="찜하기"
          className="rounded-2xl"
        >
          <Heart />
        </Button>
      </div>
    </div>
  );
}
