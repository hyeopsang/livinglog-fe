import Image from "next/image";
import Link from "next/link";

interface InspirationItem {
  id: string;
  src: string;
  alt: string;
  user: string;
  location?: string;
  gridClass: string;
  aspectClass: string;
}

const items: InspirationItem[] = [
  {
    id: "insp-01",
    src: "/inspiration/01.avif",
    alt: "inspiration 01",
    user: "@livinglog",
    location: "서울",
    gridClass: "col-span-1 lg:col-span-2 lg:row-span-2",
    aspectClass: "aspect-square",
  },
  {
    id: "insp-02",
    src: "/inspiration/02.avif",
    alt: "inspiration 02",
    user: "@livinglog",
    location: "부산",
    gridClass: "col-span-1",
    aspectClass: "aspect-square",
  },
  {
    id: "insp-03",
    src: "/inspiration/03.avif",
    alt: "inspiration 03",
    user: "@livinglog",
    gridClass: "col-span-1 lg:row-span-2",
    aspectClass: "aspect-square",
  },
  {
    id: "insp-04",
    src: "/inspiration/04.avif",
    alt: "inspiration 04",
    user: "@livinglog",
    location: "제주",
    gridClass: "col-span-1",
    aspectClass: "aspect-square",
  },
  {
    id: "insp-05",
    src: "/inspiration/05.avif",
    alt: "inspiration 05",
    user: "@livinglog",
    gridClass: "col-span-1",
    aspectClass: "aspect-square",
  },
  {
    id: "insp-06",
    src: "/inspiration/06.avif",
    alt: "inspiration 06",
    user: "@livinglog",
    location: "대구",
    gridClass: "col-span-2 lg:col-span-2",
    aspectClass: "aspect-video",
  },
  {
    id: "insp-07",
    src: "/inspiration/07.avif",
    alt: "inspiration 07",
    user: "@livinglog",
    gridClass: "col-span-1",
    aspectClass: "aspect-square",
  },
];

export default function InspirationSection() {
  return (
    <section className="w-full py-10 px-4 md:py-12 md:px-6">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              Inspiration
            </span>
            <p className="text-2xl font-bold text-brand">
              공간에서 온 영감
            </p>
            <p className="text-base text-neutral-500 mt-1">
              Livinglog와 함께하는 사람들의 공간을 만나보세요
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-neutral-400 hover:text-brand transition-colors underline-offset-4 hover:underline self-start md:self-auto"
          >
            더 보기
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-3 auto-rows-fr">
          {items.map((item) => (
            <Link
              key={item.id}
              href="/"
              className={`group relative overflow-hidden rounded-2xl bg-neutral-100 ${item.gridClass}`}
            >
              <div
                className={`relative w-full h-full min-h-48 ${item.aspectClass}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-semibold leading-none">
                  {item.user}
                </p>
                {item.location && (
                  <p className="text-white/70 text-xs mt-1">{item.location}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
