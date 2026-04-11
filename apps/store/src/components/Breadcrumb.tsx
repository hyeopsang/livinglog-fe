import { getBreadcrumbs } from "@/lib/categories";

interface Props {
  slugs: string[];
}

export function Breadcrumb({ slugs }: Props) {
  const crumbs = getBreadcrumbs(slugs);

  return (
    <nav className="flex items-center gap-1.5 text-sm text-neutral-400">
      {crumbs.map((crumb, i) => (
        <span key={crumb.slug} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          <span className={i === crumbs.length - 1 ? "text-[#1C1C19] font-medium" : ""}>
            {crumb.label}
          </span>
        </span>
      ))}
    </nav>
  );
}
