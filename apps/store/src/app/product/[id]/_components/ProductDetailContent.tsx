"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGetProductQuery, useGetProductsQuery } from "@livinglog/graphql";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { notFound } from "next/navigation";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";
interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Render the product detail page for a given route id.
 *
 * Fetches product data (and related products by category) and renders the product image gallery,
 * product information, description/specifications tabs, and a related-products grid when available.
 *
 * @param params - Route params (a promise resolving to an object with an `id` string) used to determine which product to load
 * @returns The product detail UI; while fetching shows a loading skeleton, on fetch error shows an error state, and triggers a 404 when the product cannot be found
 */
export function ProductDetailContent({ params }: Props) {
  const { id } = use(params);

  const { data, loading, error } = useGetProductQuery({
    variables: { id },
    // TODO: 서버 연결 시 cache-and-network로 변경
    fetchPolicy: "cache-only",
  });

  const product = data?.product;

  const { data: relatedData } = useGetProductsQuery({
    variables: { filter: { categoryId: product?.id } },
    fetchPolicy: "cache-only",
    skip: !product,
  });

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <ErrorState message="상품 정보를 불러오는 중 오류가 발생했습니다." />
    );
  }

  if (!product) {
    notFound();
  }

  const images: [string, ...string[]] =
    product.images && product.images.length > 0
      ? (product.images as [string, ...string[]])
      : [product.imageUrl];

  const relatedProducts = (relatedData?.products.items ?? []).filter(
    (p) => p.id !== product.id,
  );

  return (
    <div className="max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-10">
      <nav
        aria-label="breadcrumb"
        className="flex items-center gap-1.5 text-sm text-neutral-400 mb-6 md:mb-8"
      >
        <Link href="/" className="hover:text-brand transition-colors">
          홈
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden />
        <Link
          href={`/products/${product.categorySlug}`}
          className="hover:text-brand transition-colors"
        >
          {product.categorySlug}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden />
        <span
          className="text-brand font-medium line-clamp-1"
          aria-current="page"
        >
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">
        <ProductImageGallery
          images={images}
          name={product.name}
          discountRate={product.discountRate}
        />
        <ProductInfo
          id={product.id}
          brand={product.brand}
          name={product.name}
          imageUrl={product.imageUrl}
          originalPrice={product.originalPrice}
          discountRate={product.discountRate}
          rating={product.rating}
          reviewCount={product.reviewCount}
          badges={product.badges}
        />
      </div>

      <div className="mb-10 md:mb-16">
        <ProductTabs
          description={product.description}
          specifications={product.specifications}
        />
      </div>

      {relatedProducts.length > 0 && (
        <section aria-label="같은 카테고리 상품">
          <h2 className="text-xl font-bold text-brand mb-6">
            같은 카테고리 상품
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}

/**
 * Renders a centered error message with a link back to the home page.
 *
 * @param message - The error message text to display to the user
 */
function ErrorState({ message }: { message: string }) {
  return (
    <div className="max-w-7xl w-full mx-auto px-6 py-24 flex flex-col items-center gap-4 text-center">
      <p className="text-neutral-400 text-lg">{message}</p>
      <Link
        href="/"
        className="text-sm font-medium text-brand underline underline-offset-4"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
