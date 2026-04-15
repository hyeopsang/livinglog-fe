"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@livinglog/ui";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";

interface Props {
  slugs: string[];
  onNavigate?: () => void;
}

export function CategorySidebar({ slugs: [main, sub], onNavigate }: Props) {
  const [openItems, setOpenItems] = useState<string[]>(sub ? [sub] : []);

  useEffect(() => {
    setOpenItems(sub ? [sub] : []);
  }, [sub]);

  function toggleItem(slug: string) {
    setOpenItems((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  return (
    <aside className="w-48 shrink-0">
      <ul className="flex flex-col">
        {CATEGORIES.map((cat) => {
          const isActive = cat.slug === main;
          return (
            <li key={cat.slug}>
              <Link
                href={`/products/${cat.slug}`}
                onClick={onNavigate}
                className={cn(
                  "block pb-3 text-lg font-semibold transition-colors",
                  isActive
                    ? "text-brand"
                    : "text-neutral-400 hover:text-brand",
                )}
              >
                {cat.label}
              </Link>

              {isActive && cat.children && (
                <Accordion
                  type="multiple"
                  value={openItems}
                  onValueChange={setOpenItems}
                  className="border-none rounded-none bg-transparent mb-3"
                >
                  {cat.children.map((subCat) => (
                    <AccordionItem
                      key={subCat.slug}
                      value={subCat.slug}
                      className="border-none bg-transparent"
                    >
                      <div className="flex items-center justify-between py-1">
                        <Link
                          href={`/products/${cat.slug}/${subCat.slug}`}
                          onClick={onNavigate}
                          className="text-sm text-brand font-medium"
                        >
                          {subCat.label}
                        </Link>
                        {subCat.children && (
                          <button
                            onClick={() => toggleItem(subCat.slug)}
                            className="p-0.5 text-neutral-400 transition-transform"
                            aria-label="펼치기"
                          >
                            <ChevronDownIcon
                              className={cn(
                                "size-3.5 transition-transform duration-200",
                                openItems.includes(subCat.slug) && "rotate-180",
                              )}
                            />
                          </button>
                        )}
                      </div>

                      {subCat.children && (
                        <AccordionContent className="px-0 pb-1">
                          <ul className="flex flex-col">
                            {subCat.children.map((leafCat) => (
                              <li key={leafCat.slug}>
                                <Link
                                  href={`/products/${cat.slug}/${subCat.slug}/${leafCat.slug}`}
                                  onClick={onNavigate}
                                  className="block py-2 text-xs text-brand font-medium"
                                >
                                  {leafCat.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
