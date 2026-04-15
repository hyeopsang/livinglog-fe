"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRound, ShoppingCart, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@livinglog/ui";
import SearchBar from "./SearchBar";
import Logo from "@/assets/Logo.svg";

const menus = [
  { name: "가구", href: "/products/furniture" },
  { name: "주방", href: "/products/kitchen" },
  { name: "조명", href: "/products/lighting" },
  { name: "장식", href: "/products/decor" },
];

function NavItem({
  href,
  name,
  isActive,
}: {
  href: string;
  name: string;
  isActive: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "relative pb-1 text-base font-medium transition-colors",
          "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-brand",
          "after:origin-left after:transition-transform after:duration-200",
          isActive
            ? "text-brand after:scale-x-100"
            : "text-neutral-400 hover:text-brand after:scale-x-0 hover:after:scale-x-100",
        )}
      >
        {name}
      </Link>
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalCount = useCartStore((state) => state.totalCount);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 라우트 변경 시 닫기
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "w-full sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-neutral-100/80"
            : "bg-white border-b border-neutral-100",
        )}
      >
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4 h-16 md:h-18 px-4 md:px-6">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {menus.map((menu) => (
                <NavItem
                  key={menu.href}
                  {...menu}
                  isActive={pathname.startsWith(menu.href)}
                />
              ))}
            </ul>
          </nav>
          <div className="hidden lg:block flex-1 max-w-112.5">
            <SearchBar />
          </div>
          <ul className="flex items-center gap-4 shrink-0 text-neutral-500">
            <li className="lg:hidden">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="검색"
                aria-expanded={searchOpen}
                aria-controls="mobile-search-panel"
                className="hover:text-brand transition-colors"
              >
                <Search strokeWidth={1.5} size={20} />
              </button>
            </li>
            <li>
              <Link
                href="/cart"
                aria-label={
                  totalCount > 0 ? `장바구니, ${totalCount}개` : "장바구니"
                }
                className="relative hover:text-brand transition-colors"
              >
                <ShoppingCart strokeWidth={1.5} size={20} aria-hidden />
                {totalCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-0.5 flex items-center justify-center rounded-full bg-brand text-white text-[10px] font-bold leading-none"
                  >
                    {totalCount > 99 ? "99+" : totalCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="hidden lg:block">
              <Link
                href="/profile"
                aria-label="내 계정"
                className="hover:text-brand transition-colors"
              >
                <UserRound strokeWidth={1.5} size={20} />
              </Link>
            </li>
            <li className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <button
                  onClick={() => setMobileOpen(true)}
                  aria-label="메뉴 열기"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-menu-dialog"
                  aria-haspopup="dialog"
                  className="hover:text-brand transition-colors"
                >
                  <Menu strokeWidth={1.5} size={20} />
                </button>
                <SheetContent id="mobile-menu-dialog" side="right" className="w-72 p-0">
                  <SheetHeader className="px-6 py-4 border-b border-neutral-100">
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                      <Logo />
                    </Link>
                    <SheetTitle className="sr-only">메뉴</SheetTitle>
                  </SheetHeader>

                  <nav className="flex-1 overflow-y-auto px-6 py-6">
                    <ul className="flex flex-col gap-1">
                      {menus.map((menu) => (
                        <li key={menu.href}>
                          <Link
                            href={menu.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center py-3 text-base font-medium border-b border-neutral-50 transition-colors",
                              pathname.startsWith(menu.href)
                                ? "text-brand"
                                : "text-neutral-500 hover:text-brand",
                            )}
                          >
                            {menu.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-2">
                      <Link
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-3 text-sm font-medium text-neutral-500 hover:text-brand transition-colors"
                      >
                        <UserRound strokeWidth={1.5} size={18} />내 계정
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-3 text-sm font-medium text-neutral-500 hover:text-brand transition-colors"
                      >
                        <ShoppingCart strokeWidth={1.5} size={18} />
                        장바구니
                        {totalCount > 0 && (
                          <span className="ml-auto min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-brand text-white text-xs font-bold">
                            {totalCount > 99 ? "99+" : totalCount}
                          </span>
                        )}
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </li>
          </ul>
        </div>
        {searchOpen && (
          <div id="mobile-search-panel" className="lg:hidden px-4 pb-3 border-t border-neutral-100">
            <div className="pt-3">
              <SearchBar />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
