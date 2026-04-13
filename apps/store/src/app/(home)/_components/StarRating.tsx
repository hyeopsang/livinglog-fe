const STAR_PATH =
  "M8 1l1.854 3.756L14 5.528l-3 2.922.708 4.131L8 10.5l-3.708 2.081L5 8.45 2 5.528l4.146-.772L8 1z";

const STAR_COLOR = "var(--star)";
const EMPTY_COLOR = "var(--color-neutral-300)";

export function StarRating({ rating }: { rating: number }) {
  const partialOffset = `${(rating % 1) * 100}%`;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;

        return (
          <svg key={i} viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
            {partial ? (
              <>
                <defs>
                  <linearGradient id={`partial-${i}`}>
                    <stop offset={partialOffset} stopColor={STAR_COLOR} />
                    <stop offset={partialOffset} stopColor={EMPTY_COLOR} />
                  </linearGradient>
                </defs>
                <path d={STAR_PATH} fill={`url(#partial-${i})`} />
              </>
            ) : (
              <path d={STAR_PATH} fill={filled ? STAR_COLOR : EMPTY_COLOR} />
            )}
          </svg>
        );
      })}
    </div>
  );
}
