"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@livinglog/ui";
import { Search, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState("");

  // 검색 페이지를 벗어나면 input 초기화
  useEffect(() => {
    if (!pathname.startsWith("/search")) setValue("");
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className="max-w-112.5 h-13.5 w-full rounded-full bg-surface px-4 py-2 border-0 outline-none ring-0 shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0">
        <InputGroupAddon align={"inline-start"} className="pr-2">
          <button type="submit">
            <Search width={18} strokeWidth={1.5} className="text-subtle" />
          </button>
        </InputGroupAddon>
        <InputGroupInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="placeholder:text-sm px-3 pb-2.25 pt-2 outline-none border-none"
          placeholder="Search for serenity..."
        />
        {value && (
          <InputGroupAddon align={"inline-end"}>
            <button
              type="button"
              onClick={() => setValue("")}
              className="text-neutral-400 hover:text-brand transition-colors"
            >
              <X width={16} strokeWidth={1.5} />
            </button>
          </InputGroupAddon>
        )}
      </InputGroup>
    </form>
  );
}
