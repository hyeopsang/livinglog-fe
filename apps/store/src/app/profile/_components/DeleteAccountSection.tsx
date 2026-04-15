"use client";

import { useState } from "react";
import { Button } from "@livinglog/ui";

export function DeleteAccountSection() {
  const [showConfirm, setShowConfirm] = useState(false);

  function handleConfirm() {
    // TODO: 서버 연결 후 deleteAccount mutation 호출
    setShowConfirm(false);
  }

  if (showConfirm) {
    return (
      <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-5 flex flex-col gap-3">
        <p className="text-sm font-semibold text-brand">정말 탈퇴하시겠습니까?</p>
        <p className="text-xs text-neutral-400">
          탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
        </p>
        <div className="flex gap-2 self-end">
          <Button
            variant="outline"
            size="sm"
            className="rounded-2xl px-4 h-8 text-xs"
            onClick={() => setShowConfirm(false)}
          >
            취소
          </Button>
          <Button
            size="sm"
            className="rounded-2xl px-4 h-8 text-xs bg-destructive hover:bg-destructive/90 text-white"
            onClick={handleConfirm}
          >
            탈퇴 확인
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-neutral-500">회원 탈퇴</p>
        <p className="text-xs text-neutral-400">탈퇴 시 모든 데이터가 삭제됩니다</p>
      </div>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-xs text-neutral-400 hover:text-destructive transition-colors underline underline-offset-2"
      >
        탈퇴하기
      </button>
    </div>
  );
}
