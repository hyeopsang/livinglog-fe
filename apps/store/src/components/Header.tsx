"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRound, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import SearchBar from "./SearchBar";
import Logo from "@/assets/Logo.svg";

const menus = [
  { name: "가구", href: "/products/furniture" },
  { name: "주방", href: "/products/kitchen" },
  { name: "조명", href: "/products/lighting" },
  { name: "장식", href: "/products/decor" },
];

function NavItem({ href, name, isActive }: { href: string; name: string; isActive: boolean }) {
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
  const totalCount = useCartStore((state) => state.totalCount);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-neutral-100/80"
          : "bg-white border-b border-neutral-100",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-12 h-18 px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <nav>
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
        <SearchBar />
        <ul className="flex items-center gap-5 shrink-0 text-neutral-500">
          <li>
            <Link href="/cart" className="relative hover:text-brand transition-colors">
              <ShoppingCart strokeWidth={1.5} size={20} />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-0.5 flex items-center justify-center rounded-full bg-brand text-white text-[10px] font-bold leading-none">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-brand transition-colors">
              <UserRound strokeWidth={1.5} size={20} />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
