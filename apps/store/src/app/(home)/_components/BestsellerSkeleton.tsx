import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";

export function BestsellerSkeleton() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
