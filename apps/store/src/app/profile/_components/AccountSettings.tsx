"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Input, Separator, Skeleton } from "@livinglog/ui";

export function AccountSettingsSkeleton() {
  return (
    <section className="flex flex-col gap-6">
      <Skeleton className="h-5 w-20" />
      <div className="rounded-3xl border border-neutral-100 p-6 flex flex-col gap-5">
        <Skeleton className="h-4 w-16" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
          <Skeleton className="h-8 w-20 rounded-2xl self-end" />
        </div>
      </div>
      <Separator />
      <div className="rounded-3xl border border-neutral-100 p-6 flex flex-col gap-5">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
          <Skeleton className="h-8 w-28 rounded-2xl self-end" />
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-4 w-12 rounded" />
      </div>
    </section>
  );
}

const MOCK_USER = {
  name: "김민준",
  email: "minjun.kim@example.com",
  phone: "010-1234-5678",
};

export function AccountSettings() {
  const [name, setName] = useState(MOCK_USER.name);
  const [phone, setPhone] = useState(MOCK_USER.phone);
  const [isSaved, setIsSaved] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordSaved, setIsPasswordSaved] = useState(false);
  const passwordTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (passwordTimeoutRef.current) clearTimeout(passwordTimeoutRef.current);
    };
  }, []);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    setIsSaved(true);
    saveTimeoutRef.current = setTimeout(() => setIsSaved(false), 2000);
  }

  function handleDeleteClick() {
    setShowDeleteConfirm(true);
  }

  function handleCancelDelete() {
    setShowDeleteConfirm(false);
  }

  function handleConfirmDelete() {
    // TODO: 서버 연결 후 deleteAccount mutation 호출
    setShowDeleteConfirm(false);
  }

  function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (passwordTimeoutRef.current) {
      clearTimeout(passwordTimeoutRef.current);
      passwordTimeoutRef.current = null;
    }
    setIsPasswordSaved(false);
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
    if (passwordTimeoutRef.current) clearTimeout(passwordTimeoutRef.current);
    setIsPasswordSaved(true);
    passwordTimeoutRef.current = setTimeout(() => setIsPasswordSaved(false), 2000);
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
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요 (8자 이상)"
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
            {isPasswordSaved ? "변경완료 ✓" : "비밀번호 변경"}
          </Button>
        </form>
      </div>
      <Separator />
      {showDeleteConfirm ? (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-5 flex flex-col gap-3">
          <p className="text-sm font-semibold text-brand">정말 탈퇴하시겠습니까?</p>
          <p className="text-xs text-neutral-400">탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.</p>
          <div className="flex gap-2 self-end">
            <Button
              variant="outline"
              size="sm"
              className="rounded-2xl px-4 h-8 text-xs"
              onClick={handleCancelDelete}
            >
              취소
            </Button>
            <Button
              size="sm"
              className="rounded-2xl px-4 h-8 text-xs bg-destructive hover:bg-destructive/90 text-white"
              onClick={handleConfirmDelete}
            >
              탈퇴 확인
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-neutral-500">회원 탈퇴</p>
            <p className="text-xs text-neutral-400">탈퇴 시 모든 데이터가 삭제됩니다</p>
          </div>
          <button
            onClick={handleDeleteClick}
            className="text-xs text-neutral-400 hover:text-destructive transition-colors underline underline-offset-2"
          >
            탈퇴하기
          </button>
        </div>
      )}
    </section>
  );
}
