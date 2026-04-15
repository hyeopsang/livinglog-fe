export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex flex-col gap-3 animate-pulse">
          <div className="w-full aspect-square rounded-2xl bg-neutral-200" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-neutral-200 rounded" />
            <div className="h-4 w-full bg-neutral-200 rounded" />
            <div className="h-4 w-2/3 bg-neutral-200 rounded" />
          </div>
        </li>
      ))}
    </ul>
  );
}
