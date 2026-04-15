"use client";

import { useRef, useState } from "react";
import { Button, Input } from "@livinglog/ui";

const MOCK_USER = {
  name: "김민준",
  email: "minjun.kim@example.com",
  phone: "010-1234-5678",
};

export function AccountInfoForm() {
  const [name, setName] = useState(MOCK_USER.name);
  const [phone, setPhone] = useState(MOCK_USER.phone);
  const [isSaved, setIsSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsSaved(true);
    timeoutRef.current = setTimeout(() => setIsSaved(false), 2000);
  }

  return (
    <div className="rounded-3xl border border-neutral-100 p-6 flex flex-col gap-5">
      <h3 className="text-sm font-semibold text-brand">기본 정보</h3>
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-500" htmlFor="name">
            이름
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-500" htmlFor="email">
            이메일
          </label>
          <Input
            id="email"
            value={MOCK_USER.email}
            readOnly
            disabled
            className="bg-neutral-50 cursor-not-allowed"
          />
          <p className="text-xs text-neutral-400">이메일은 변경할 수 없습니다</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-500" htmlFor="phone">
            연락처
          </label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="연락처를 입력하세요"
          />
        </div>

        <Button type="submit" className="self-end rounded-2xl px-6" size="sm">
          {isSaved ? "저장완료 ✓" : "저장하기"}
        </Button>
      </form>
    </div>
  );
}
