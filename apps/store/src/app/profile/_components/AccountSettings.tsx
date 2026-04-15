<<<<<<< HEAD
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
=======
import { Skeleton } from "@livinglog/ui";
import { AccountInfoForm } from "./AccountInfoForm";
import { PasswordChangeForm } from "./PasswordChangeForm";
import { DeleteAccountSection } from "./DeleteAccountSection";
>>>>>>> main

export function AccountSettingsSkeleton() {
  return (
    <section className="w-full flex flex-col gap-6">
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
    </section>
  );
}

export function AccountSettings() {
  return (
    <section className="w-full flex flex-col gap-6">
      <h2 className="text-base font-bold text-brand">계정 설정</h2>
      <AccountInfoForm />
      <PasswordChangeForm />
      <DeleteAccountSection />
    </section>
  );
}
