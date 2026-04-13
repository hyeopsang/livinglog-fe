import { Button } from "@livinglog/ui";
import Image from "next/image";

export default function MainBanner() {
  return (
    <section className="w-full">
      <div className="group relative mx-auto w-full h-160 overflow-hidden">
        <Image
          src="/banner/mainBanner.avif"
          alt="main-banner-image"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/45 to-black/80 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex flex-col justify-end pb-20">
          <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
                New Collection 2026
              </span>
              <p className="text-5xl font-bold text-white leading-tight max-w-2xl">
                Make your
                <br />
                space yours
              </p>
            </div>
            <p className="text-base text-white/70 max-w-md">
              당신의 공간을 완성하는 프리미엄 라이프스타일 컬렉션
            </p>
            <div className="flex gap-4 items-center">
              <Button className="bg-white text-brand rounded-[8px] px-8 py-4 font-semibold hover:bg-white/90 transition-colors">
                상품 보기
              </Button>
              <Button className="bg-transparent text-white border border-white/50 rounded-[8px] px-8 py-4 font-semibold hover:bg-white/10 transition-colors">
                컬렉션
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
