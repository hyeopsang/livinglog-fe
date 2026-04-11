"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductSort } from "@livinglog/graphql";
import { ProductListTemplate } from "@/components/ProductListTemplate";

export function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("q") ?? "";
  const sort = (searchParams.get("sort") as ProductSort) ?? ProductSort.Popular;

  const handleSortChange = (newSort: ProductSort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ProductListTemplate
      title={query ? `"${query}" 검색 결과` : "검색"}
      subtitle={query ? undefined : "검색어를 입력해주세요"}
      query={query || undefined}
      sort={sort}
      onSortChange={handleSortChange}
    />
  );
}
