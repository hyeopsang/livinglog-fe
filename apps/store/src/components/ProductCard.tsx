import { type Badge } from "@livinglog/graphql";
import Image from "next/image";
import Link from "next/link";
import { BADGE_CONFIG } from "@/lib/badge";
import { formatPrice } from "@/lib/utils";
import { StarRating } from "@/app/(home)/_components/StarRating";

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  originalPrice: number;
  discountRate: number;
  rating: number;
  reviewCount: number;
  badges: Badge[];
  imageUrl: string;
}

export function ProductCard({ product }: { product: ProductCardProps }) {
  const discountedPrice = Math.round(
    product.originalPrice * (1 - product.discountRate / 100)
  );

  return (
    <Link href={`/product/${product.id}`} className="group flex flex-col gap-3">
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
        <span className="text-xs font-medium text-neutral-400">{product.brand}</span>
        <p className="text-sm font-medium text-brand leading-snug line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-base font-bold text-brand">
            {formatPrice(discountedPrice)}원
          </span>
          {product.discountRate > 0 && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.originalPrice)}원
            </span>
          )}
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
  );
}
