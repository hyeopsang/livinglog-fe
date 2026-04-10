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
    <footer className="w-full bg-[#1C1C19] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-start gap-12">
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
          <div className="flex gap-16 text-sm">
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
        <div className="mt-16 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-600">
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
