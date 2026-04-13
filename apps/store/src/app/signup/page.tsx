import Logo from "@/assets/Logo.svg";
import { SignupForm } from "./_components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <Logo />
          <p className="text-sm text-neutral-400">일상을 담는 공간</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
