import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";

export function BestsellerSkeleton({ count = 4 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
