"use client";

import { use, useState } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
  notFound,
} from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { ProductSort, useGetProductsQuery } from "@livinglog/graphql";
import { findCategory } from "@/lib/categories";
import { CategorySidebar } from "@/components/CategorySidebar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SortBar } from "@/components/SortBar";
import { ProductGrid } from "@/components/ProductGrid";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@livinglog/ui";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export function ProductsContent({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = (searchParams.get("sort") as ProductSort) ?? ProductSort.Popular;
  const [filterOpen, setFilterOpen] = useState(false);

  const category = findCategory(slug);
  if (!category) notFound();

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
    <div className="max-w-7xl w-full mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex gap-8 lg:gap-12">
        {/* 데스크톱 사이드바 */}
        <div className="hidden lg:block">
          <CategorySidebar slugs={slug} />
        </div>

        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <Breadcrumb slugs={slug} />

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-brand transition-colors"
                >
                  <SlidersHorizontal strokeWidth={1.5} size={16} />
                  카테고리
                </button>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetHeader className="px-6 py-4 border-b border-neutral-100">
                    <SheetTitle className="text-base font-semibold text-brand">
                      카테고리
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <CategorySidebar
                      slugs={slug}
                      onNavigate={() => setFilterOpen(false)}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <h1 className="text-xl md:text-2xl font-bold text-brand">
                {category?.label ?? "상품"}
              </h1>
            </div>
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
