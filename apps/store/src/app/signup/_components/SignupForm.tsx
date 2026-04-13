"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@livinglog/ui";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: 서버 연결 시 register 뮤테이션 호출
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-brand">이름</label>
        <Input
          id="name"
          type="text"
          placeholder="홍길동"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-brand">이메일</label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-brand">비밀번호</label>
        <Input
          id="password"
          type="password"
          placeholder="6자 이상 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" size="lg" className="w-full rounded-2xl mt-2">
        회원가입
      </Button>

      <p className="text-center text-sm text-neutral-400">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-brand font-medium hover:underline underline-offset-4">
          로그인
        </Link>
      </p>
    </form>
  );
}
