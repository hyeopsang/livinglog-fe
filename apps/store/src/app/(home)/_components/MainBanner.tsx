import { Button } from "@livinglog/ui";
import Image from "next/image";

/**
 * Render the main promotional banner section for the homepage.
 *
 * The banner displays a full-bleed hero image with layered gradient and content overlays,
 * including an uppercase label, a multi-line headline, supporting copy in Korean, and two CTA buttons.
 *
 * @returns The React element for the homepage hero banner containing the image, overlays, text content, and action buttons.
 */
export default function MainBanner() {
  return (
    <section className="w-full">
      <div className="group relative mx-auto w-full h-96 md:h-128 lg:h-160 overflow-hidden">
        <Image
          src="/banner/mainBanner.avif"
          alt="main-banner-image"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/45 to-black/80 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-16 lg:pb-20">
          <div className="max-w-7xl w-full mx-auto px-4 md:px-6 flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-2 md:gap-3">
              <span className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
                New Collection 2026
              </span>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
                Make your
                <br />
                space yours
              </p>
            </div>
            <p className="text-sm md:text-base text-white/70 max-w-md">
              당신의 공간을 완성하는 프리미엄 라이프스타일 컬렉션
            </p>
            <div className="flex gap-3 items-center">
              <Button className="bg-white text-brand rounded-[8px] px-5 py-2.5 md:px-8 md:py-4 text-sm md:text-base font-semibold hover:bg-white/90 transition-colors">
                상품 보기
              </Button>
              <Button className="bg-transparent text-white border border-white/50 rounded-[8px] px-5 py-2.5 md:px-8 md:py-4 text-sm md:text-base font-semibold hover:bg-white/10 transition-colors">
                컬렉션
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
