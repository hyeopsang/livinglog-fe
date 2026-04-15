import { Skeleton } from "@livinglog/ui";
import { AccountInfoForm } from "./AccountInfoForm";
import { PasswordChangeForm } from "./PasswordChangeForm";
import { DeleteAccountSection } from "./DeleteAccountSection";

/**
 * Renders skeleton placeholders for the Account Settings page layout.
 *
 * @returns A section element containing grouped skeletons that mirror the account info, password change, and account deletion sections for loading state.
 */
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

/**
 * Render the account settings section with account information, password change, and account deletion areas.
 *
 * @returns A JSX element containing the Korean heading "계정 설정" and the composed AccountInfoForm, PasswordChangeForm, and DeleteAccountSection components.
 */
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
