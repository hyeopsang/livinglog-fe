"use client";

import { use } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProductSort, useGetProductsQuery } from "@livinglog/graphql";
import { findCategory } from "@/lib/categories";
import { CategorySidebar } from "@/components/CategorySidebar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SortBar } from "@/components/SortBar";
import { ProductGrid } from "@/components/ProductGrid";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export function ProductsContent({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = (searchParams.get("sort") as ProductSort) ?? ProductSort.Popular;

  const category = findCategory(slug);

  // TODO: 서버 연결 시 sort를 filter에 포함
  // const { data, loading } = useGetProductsQuery({
  //   variables: { filter: { categoryId: slug[slug.length - 1], sort } },
  // });
  const { data } = useGetProductsQuery({
    variables: { filter: { categoryId: slug[slug.length - 1] } },
    fetchPolicy: "cache-only",
  });

  // TODO: 서버 연결 시 제거
  const products = [...(data?.products.items ?? [])].sort((a, b) => {
    switch (sort) {
      case ProductSort.PriceAsc:
        return a.originalPrice - b.originalPrice;
      case ProductSort.PriceDesc:
        return b.originalPrice - a.originalPrice;
      case ProductSort.Rating:
        return b.rating - a.rating;
      case ProductSort.Newest:
        return (
          Number(b.id.replace("prod-", "")) - Number(a.id.replace("prod-", ""))
        );
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const handleSortChange = (newSort: ProductSort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex gap-12">
        <CategorySidebar slugs={slug} />

        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <Breadcrumb slugs={slug} />

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-[#1C1C19]">
              {category?.label ?? "상품"}
            </h1>
            <SortBar
              total={products.length}
              sort={sort}
              onSortChange={handleSortChange}
            />
          </div>

          <ProductGrid
            products={products}
            emptyMessage="이 카테고리에 상품이 없습니다"
          />
        </div>
      </div>
    </div>
  );
}
