import { Skeleton } from "@livinglog/ui";
import { ProductImageGallerySkeleton } from "./ProductImageGallerySkeleton";
import { ProductInfoSkeleton } from "./ProductInfoSkeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Skeleton className="h-4 w-64 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductImageGallerySkeleton />
        <ProductInfoSkeleton />
      </div>
    </div>
  );
}
