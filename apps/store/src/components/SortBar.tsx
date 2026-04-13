import { ProductSort } from "@livinglog/graphql";

const SORT_OPTIONS: { label: string; value: ProductSort }[] = [
  { label: "인기순", value: ProductSort.Popular },
  { label: "최신순", value: ProductSort.Newest },
  { label: "낮은 가격순", value: ProductSort.PriceAsc },
  { label: "높은 가격순", value: ProductSort.PriceDesc },
  { label: "평점순", value: ProductSort.Rating },
];

interface Props {
  total: number;
  sort: ProductSort;
  onSortChange: (sort: ProductSort) => void;
}

export function SortBar({ total, sort, onSortChange }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
      <span className="text-sm text-neutral-400">총 {total.toLocaleString()}개</span>
      <div className="flex gap-1">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              sort === opt.value
                ? "bg-brand text-white"
                : "text-neutral-400 hover:text-brand"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
