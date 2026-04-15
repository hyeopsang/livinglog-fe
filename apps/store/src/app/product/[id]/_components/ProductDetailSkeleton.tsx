import { Skeleton } from "@livinglog/ui";
import { ProductImageGallerySkeleton } from "./ProductImageGallerySkeleton";
import { ProductInfoSkeleton } from "./ProductInfoSkeleton";

/**
 * Render a page-level skeleton layout for a product detail page.
 *
 * The component returns a centered container with a top skeleton header bar and a responsive two-column layout that displays an image gallery skeleton and product info skeleton as placeholders while content loads.
 *
 * @returns The JSX element representing the product detail skeleton UI.
 */
export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl w-full mx-auto px-6 py-10">
      <Skeleton className="h-4 w-64 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductImageGallerySkeleton />
        <ProductInfoSkeleton />
      </div>
    </div>
  );
}
