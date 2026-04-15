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

/**
 * Renders a horizontal sort bar that displays the total item count and a row of selectable sort option buttons.
 *
 * @param total - Total number of items to display in the count label
 * @param sort - Currently selected sort value
 * @param onSortChange - Callback invoked with the newly selected `ProductSort` when a sort option is clicked
 * @returns The rendered sort bar JSX element
 */
export function SortBar({ total, sort, onSortChange }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 pb-4 gap-2">
      <span className="text-sm text-neutral-400 shrink-0">총 {total.toLocaleString()}개</span>
      <div className="flex gap-1 overflow-x-auto scrollbar-none">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className={`shrink-0 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
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
