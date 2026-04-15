"use client";

import { useRef, useState } from "react";
import { Button, Input } from "@livinglog/ui";

export function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError("현재 비밀번호를 입력해주세요.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("새 비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // TODO: 서버 연결 후 실제 비밀번호 변경 API 호출
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsSaved(true);
    timeoutRef.current = setTimeout(() => setIsSaved(false), 2000);
  }

  return (
    <div className="rounded-3xl border border-neutral-100 p-6 flex flex-col gap-5">
      <h3 className="text-sm font-semibold text-brand">비밀번호 변경</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-500" htmlFor="current-password">
            현재 비밀번호
          </label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력하세요"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-500" htmlFor="new-password">
            새 비밀번호
          </label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호를 입력하세요 (8자 이상)"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-500" htmlFor="confirm-password">
            새 비밀번호 확인
          </label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호를 다시 입력하세요"
          />
        </div>
        {passwordError && (
          <p className="text-xs text-destructive">{passwordError}</p>
        )}
        <Button
          type="submit"
          variant="outline"
          className="self-end rounded-2xl px-6"
          size="sm"
        >
          {isSaved ? "변경완료 ✓" : "비밀번호 변경"}
        </Button>
      </form>
    </div>
  );
}
