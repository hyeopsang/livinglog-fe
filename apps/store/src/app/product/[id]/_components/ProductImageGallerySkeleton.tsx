import { Skeleton } from "@livinglog/ui";

export function ProductImageGallerySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-square rounded-3xl" />
      <div className="flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-20 h-20 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
