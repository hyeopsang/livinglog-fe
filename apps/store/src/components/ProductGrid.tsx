import { type GetProductsQuery } from "@livinglog/graphql";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

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
  if (loading) return <ProductGridSkeleton />;

  if (products.length === 0) {
    return (
      <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <li className="col-span-full py-24 flex flex-col items-center gap-3 text-neutral-400">
          <span className="text-4xl">🔍</span>
          <p className="text-sm">{emptyMessage}</p>
        </li>
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
