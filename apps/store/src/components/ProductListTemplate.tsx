"use client";

import { ProductSort, useGetProductsQuery } from "@livinglog/graphql";
import { ProductCard } from "./ProductCard";

const SORT_OPTIONS: { label: string; value: ProductSort }[] = [
  { label: "인기순", value: ProductSort.Popular },
  { label: "최신순", value: ProductSort.Newest },
  { label: "낮은 가격순", value: ProductSort.PriceAsc },
  { label: "높은 가격순", value: ProductSort.PriceDesc },
  { label: "평점순", value: ProductSort.Rating },
];

interface Props {
  title: string;
  subtitle?: string;
  categoryId?: string;
  query?: string;
  sort: ProductSort;
  onSortChange: (sort: ProductSort) => void;
}

/**
 * Render a product listing layout with title, optional subtitle, total count, sort controls, and a responsive product grid.
 *
 * @param title - Page title shown at the top of the list
 * @param subtitle - Optional subtitle shown below the title
 * @param categoryId - Optional category identifier used to filter fetched products
 * @param query - Optional search query applied to product name and brand (applied client-side)
 * @param sort - Currently selected sort option
 * @param onSortChange - Callback invoked with the newly selected `ProductSort` when a sort button is clicked
 * @returns A JSX element containing the product list UI (header, sort controls, product grid, or empty state)
 */
export function ProductListTemplate({
  title,
  subtitle,
  categoryId,
  query,
  sort,
  onSortChange,
}: Props) {
  // TODO: 서버 연결 시 query, sort를 filter에 포함하고 fetchPolicy 제거
  // const { data, loading } = useGetProductsQuery({
  //   variables: { filter: { categoryId, query, sort } },
  // });
  const { data } = useGetProductsQuery({
    variables: { filter: { categoryId } },
    fetchPolicy: "cache-only",
  });

  const allItems = data?.products.items ?? [];

  // TODO: 서버 연결 시 제거 (서버에서 검색/정렬 처리)
  const filtered = query
    ? allItems.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()),
      )
    : allItems;

  const products = [...filtered].sort((a, b) => {
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
  const total = products.length;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold text-brand">{title}</h1>
        {subtitle && <p className="text-sm text-neutral-400">{subtitle}</p>}
      </div>

      <div className="flex items-center justify-between border-b border-neutral-100 pb-4 gap-2">
        <span className="text-sm text-neutral-400 shrink-0">
          총 {total.toLocaleString()}개
        </span>
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={`shrink-0 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                sort === opt.value
                  ? "bg-brand text-white"
                  : "text-neutral-400 hover:text-brand"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))
        ) : (
          <li className="col-span-4 py-24 flex flex-col items-center gap-3 text-neutral-400">
            <p className="text-base font-medium">결과가 없습니다</p>
            <p className="text-sm">다른 검색어나 필터를 사용해보세요</p>
          </li>
        )}
      </ul>
    </div>
  );
}
