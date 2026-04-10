"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRound, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import Logo from "@/assets/Logo.svg";

const menus = [
  { name: "가구", href: "/furniture" },
  { name: "주방", href: "/kitchen" },
  { name: "조명", href: "/lighting" },
  { name: "장식", href: "/decor" },
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
          "relative pb-1 text-sm font-medium transition-colors",
          "after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-[#1C1C19]",
          "after:origin-left after:transition-transform after:duration-200",
          isActive
            ? "text-[#1C1C19] after:scale-x-100"
            : "text-neutral-400 hover:text-[#1C1C19] after:scale-x-0 hover:after:scale-x-100",
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
            <Link
              href="/cart"
              className="hover:text-[#1C1C19] transition-colors"
            >
              <ShoppingCart strokeWidth={1.5} size={20} />
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="hover:text-[#1C1C19] transition-colors"
            >
              <UserRound strokeWidth={1.5} size={20} />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
