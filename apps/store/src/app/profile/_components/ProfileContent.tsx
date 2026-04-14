"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@livinglog/ui";
import Link from "next/link";
import { ProfileSidebar } from "./ProfileSidebar";
import { OrderHistory } from "./OrderHistory";
import { AccountSettings } from "./AccountSettings";

import type { Tab } from "../_types/tab";

function Wishlist() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-brand">위시리스트</h2>
      <div className="rounded-3xl border border-neutral-100 p-16 flex flex-col items-center justify-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center">
          <Heart size={22} strokeWidth={1.5} className="text-neutral-300" />
        </div>
        <p className="text-base font-semibold text-brand">위시리스트가 비었습니다</p>
        <p className="text-sm text-neutral-400">마음에 드는 상품을 위시리스트에 추가해보세요</p>
        <Button asChild size="sm" className="rounded-2xl px-6 mt-2">
          <Link href="/">쇼핑하러 가기</Link>
        </Button>
      </div>
    </section>
  );
}

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  return (
    <div className="max-w-7xl w-full mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-brand mb-8">마이페이지</h1>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 min-w-0">
          {activeTab === "orders" && <OrderHistory />}
          {activeTab === "wishlist" && <Wishlist />}
          {activeTab === "settings" && <AccountSettings />}
        </main>
      </div>
    </div>
  );
}
