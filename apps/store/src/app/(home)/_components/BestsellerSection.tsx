"use client";

import { useGetBestsellersQuery } from "@livinglog/graphql";
import Image from "next/image";
import Link from "next/link";
import { BADGE_CONFIG } from "@/lib/badge";
import { formatPrice } from "@/lib/utils";
import { StarRating } from "./StarRating";
import { BestsellerSkeleton } from "./BestsellerSkeleton";

export default function BestsellerSection() {
  const { data, loading } = useGetBestsellersQuery();
  const products = data?.bestsellers ?? [];

  return (
    <section className="w-full py-12 px-6 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              Best Seller
            </span>
            <p className="text-2xl font-bold text-brand">베스트 셀러</p>
            <p className="text-base text-neutral-500 mt-1">
              Livinglog의 철학을 담은 제품 — 기능성과 시간이 만들어내는 아름다움
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-neutral-400 hover:text-brand transition-colors underline-offset-4 hover:underline"
          >
            전체보기
          </Link>
        </div>

        {loading ? (
          <BestsellerSkeleton />
        ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => {
                const discountedPrice = Math.round(
                  product.originalPrice * (1 - product.discountRate / 100),
                );
                return (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.id}`}
                      className="group flex flex-col gap-3"
                    >
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-neutral-100">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                        {product.discountRate > 0 && (
                          <span className="absolute top-3 left-3 bg-brand text-white text-xs font-bold px-2 py-1 rounded-md">
                            -{product.discountRate}%
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-neutral-400">
                          {product.brand}
                        </span>
                        <p className="text-sm font-medium text-brand leading-snug line-clamp-2">
                          {product.name}
                        </p>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-base font-bold text-brand">
                            {formatPrice(discountedPrice)}원
                          </span>
                          <span className="text-xs text-neutral-400 line-through">
                            {formatPrice(product.originalPrice)}원
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <StarRating rating={product.rating} />
                          <span className="text-xs text-neutral-400">
                            {product.rating.toFixed(1)}{" "}
                            <span className="text-neutral-300">
                              ({product.reviewCount.toLocaleString()})
                            </span>
                          </span>
                        </div>
                        {product.badges.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {product.badges.map((badge) => (
                              <span
                                key={badge}
                                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${BADGE_CONFIG[badge].className}`}
                              >
                                {BADGE_CONFIG[badge].label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
        </ul>
        )}
      </div>
    </section>
  );
}
