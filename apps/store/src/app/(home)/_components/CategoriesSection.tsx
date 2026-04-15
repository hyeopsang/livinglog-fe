import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    href: "/",
    src: "/categories/table.avif",
    alt: "furniture-image",
    label: "가구",
  },
  {
    href: "/",
    src: "/categories/lighting.avif",
    alt: "lighting-image",
    label: "조명",
  },
  {
    href: "/",
    src: "/categories/cabinet.avif",
    alt: "cabinet-image",
    label: "수납 · 정리",
  },
  {
    href: "/",
    src: "/categories/decor.avif",
    alt: "decor-image",
    label: "장식",
  },
];

export default function CategoriesSection() {
  return (
    <section className="w-full py-12 px-6">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
            categries
          </span>
          <p className="text-2xl font-bold text-brand">
            일상을 위한 큐레이션
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(({ href, src, alt, label }) => (
            <li key={label} className="flex flex-col gap-3">
              <Link
                href={href}
                className="group relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-neutral-100"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <span className="text-base font-medium text-brand">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
