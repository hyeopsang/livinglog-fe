"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@livinglog/ui";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: 서버 연결 시 useLoginMutation 호출
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-brand">
          이메일
        </label>
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
        <label htmlFor="password" className="text-sm font-medium text-brand">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          placeholder="6자 이상 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      <Button type="submit" size="lg" className="w-full rounded-2xl mt-2">
        로그인
      </Button>

      <p className="text-center text-sm text-neutral-400">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="text-brand font-medium hover:underline underline-offset-4">
          회원가입
        </Link>
      </p>
    </form>
  );
}
