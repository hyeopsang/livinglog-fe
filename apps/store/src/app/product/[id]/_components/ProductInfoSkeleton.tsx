import { Skeleton } from "@livinglog/ui";

export function ProductInfoSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-px w-full rounded-none" />
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-10 w-36" />
      <Skeleton className="h-16 rounded-2xl" />
      <Skeleton className="h-14 rounded-2xl" />
    </div>
  );
}
