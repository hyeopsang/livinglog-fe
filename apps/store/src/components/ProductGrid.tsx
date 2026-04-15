import { type GetProductsQuery } from "@livinglog/graphql";
import { ProductCard } from "./ProductCard";

type Product = GetProductsQuery["products"]["items"][number];

interface Props {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  loading = false,
  emptyMessage = "상품이 없습니다",
}: Props) {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {loading ? (
        Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="flex flex-col gap-3 animate-pulse">
            <div className="w-full aspect-square rounded-2xl bg-neutral-200" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-16 bg-neutral-200 rounded" />
              <div className="h-4 w-full bg-neutral-200 rounded" />
              <div className="h-4 w-2/3 bg-neutral-200 rounded" />
            </div>
          </li>
        ))
      ) : products.length > 0 ? (
        products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))
      ) : (
        <li className="col-span-full py-24 flex flex-col items-center gap-3 text-neutral-400">
          <span className="text-4xl">🔍</span>
          <p className="text-sm">{emptyMessage}</p>
        </li>
      )}
    </ul>
  );
}
