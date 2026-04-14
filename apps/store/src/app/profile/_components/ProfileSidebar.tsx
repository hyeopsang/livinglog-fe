"use client";

import { ClipboardList, Heart, Settings, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@livinglog/ui";
import type { Tab } from "../_types/tab";

const MOCK_USER = {
  name: "김민준",
  email: "minjun.kim@example.com",
  joinedAt: "2024년 3월",
  initials: "김",
};

const NAV_ITEMS: { tab: Tab; label: string; icon: React.ElementType }[] = [
  { tab: "orders", label: "주문 내역", icon: ClipboardList },
  { tab: "wishlist", label: "위시리스트", icon: Heart },
  { tab: "settings", label: "계정 설정", icon: Settings },
];

interface ProfileSidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function ProfileSidebar({
  activeTab,
  onTabChange,
}: ProfileSidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
      <div className="hidden lg:flex rounded-3xl border border-neutral-100 p-6 flex-col items-center gap-3 text-center">
        <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {MOCK_USER.initials}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold text-brand">{MOCK_USER.name}</p>
          <p className="text-sm text-neutral-400">{MOCK_USER.email}</p>
        </div>
        <Separator />
        <p className="text-xs text-neutral-400">{MOCK_USER.joinedAt} 가입</p>
      </div>
      <div className="flex lg:hidden items-center gap-3 pb-4 border-b border-neutral-100">
        <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center shrink-0">
          <span className="text-base font-bold text-white">
            {MOCK_USER.initials}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="font-semibold text-brand text-sm">{MOCK_USER.name}</p>
          <p className="text-xs text-neutral-400 truncate">{MOCK_USER.email}</p>
        </div>
        <button className="ml-auto flex items-center gap-1.5 text-xs text-neutral-400 hover:text-brand transition-colors shrink-0">
          <UserRound size={13} strokeWidth={1.5} />
          로그아웃
        </button>
      </div>
      <nav>
        <ul className="flex lg:hidden gap-1 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map(({ tab, label, icon: Icon }) => (
            <li key={tab} className="shrink-0">
              <button
                onClick={() => onTabChange(tab)}
                aria-current={activeTab === tab ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full transition-colors",
                  activeTab === tab
                    ? "bg-brand text-white"
                    : "text-neutral-400 hover:text-brand",
                )}
              >
                <Icon size={15} strokeWidth={1.5} />
                {label}
              </button>
            </li>
          ))}
        </ul>
        <ul className="hidden lg:block rounded-3xl border border-neutral-100 overflow-hidden">
          {NAV_ITEMS.map(({ tab, label, icon: Icon }, idx) => (
            <li key={tab}>
              {idx > 0 && <Separator />}
              <button
                onClick={() => onTabChange(tab)}
                aria-current={activeTab === tab ? "page" : undefined}
                className={cn(
                  "w-full flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "text-brand bg-surface"
                    : "text-neutral-400 hover:text-brand hover:bg-neutral-50",
                )}
              >
                <Icon size={17} strokeWidth={1.5} />
                {label}
                {activeTab === tab && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button className="hidden lg:flex items-center gap-2 px-5 py-2 text-sm text-neutral-400 hover:text-brand transition-colors">
        <UserRound size={15} strokeWidth={1.5} />
        로그아웃
      </button>
    </aside>
  );
}
