import Link from "next/link";
import Logo from "@/assets/Logo.svg";

const links = {
  카테고리: [
    { label: "가구", href: "/furniture" },
    { label: "주방", href: "/kitchen" },
    { label: "조명", href: "/lighting" },
    { label: "장식", href: "/decor" },
  ],
  고객지원: [
    { label: "자주 묻는 질문", href: "/faq" },
    { label: "배송 안내", href: "/shipping" },
    { label: "교환 · 반품", href: "/returns" },
  ],
  회사: [
    { label: "브랜드 스토리", href: "/about" },
    { label: "공간 영감", href: "/inspiration" },
    { label: "입점 문의", href: "/partnership" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-brand mt-auto">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start md:gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-white">
              <Logo />
            </Link>
            <p className="text-sm text-neutral-400 max-w-56 leading-relaxed">
              일상을 채우는 감각적인 공간.
              <br />
              당신의 공간을 완성하는 프리미엄 라이프스타일 컬렉션.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 md:flex md:gap-16 text-sm">
            {Object.entries(links).map(([group, items]) => (
              <div key={group} className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
                  {group}
                </span>
                {items.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 md:mt-16 pt-6 border-t border-neutral-800 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-neutral-600">
          <span>© 2026 Livinglog. All rights reserved.</span>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-neutral-400 transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/terms"
              className="hover:text-neutral-400 transition-colors"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
