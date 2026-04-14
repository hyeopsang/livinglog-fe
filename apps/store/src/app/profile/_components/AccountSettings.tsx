"use client";

import { useState } from "react";
import { Button, Input, Separator } from "@livinglog/ui";

const MOCK_USER = {
  name: "김민준",
  email: "minjun.kim@example.com",
  phone: "010-1234-5678",
};

export function AccountSettings() {
  const [name, setName] = useState(MOCK_USER.name);
  const [phone, setPhone] = useState(MOCK_USER.phone);
  const [isSaved, setIsSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  }

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-base font-bold text-brand">계정 설정</h2>
      <div className="rounded-3xl border border-neutral-100 p-6 flex flex-col gap-5">
        <h3 className="text-sm font-semibold text-brand">기본 정보</h3>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium text-neutral-500"
              htmlFor="name"
            >
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
            <label
              className="text-xs font-medium text-neutral-500"
              htmlFor="email"
            >
              이메일
            </label>
            <Input
              id="email"
              value={MOCK_USER.email}
              readOnly
              disabled
              className="bg-neutral-50 cursor-not-allowed"
            />
            <p className="text-xs text-neutral-400">
              이메일은 변경할 수 없습니다
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium text-neutral-500"
              htmlFor="phone"
            >
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
      <Separator />
      <div className="rounded-3xl border border-neutral-100 p-6 flex flex-col gap-5">
        <h3 className="text-sm font-semibold text-brand">비밀번호 변경</h3>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium text-neutral-500"
              htmlFor="current-password"
            >
              현재 비밀번호
            </label>
            <Input
              id="current-password"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium text-neutral-500"
              htmlFor="new-password"
            >
              새 비밀번호
            </label>
            <Input
              id="new-password"
              type="password"
              placeholder="새 비밀번호를 입력하세요"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium text-neutral-500"
              htmlFor="confirm-password"
            >
              새 비밀번호 확인
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
          </div>
          <Button
            type="submit"
            variant="outline"
            className="self-end rounded-2xl px-6"
            size="sm"
          >
            비밀번호 변경
          </Button>
        </form>
      </div>
      <Separator />
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-neutral-500">회원 탈퇴</p>
          <p className="text-xs text-neutral-400">
            탈퇴 시 모든 데이터가 삭제됩니다
          </p>
        </div>
        <button className="text-xs text-neutral-400 hover:text-destructive transition-colors underline underline-offset-2">
          탈퇴하기
        </button>
      </div>
    </section>
  );
}
