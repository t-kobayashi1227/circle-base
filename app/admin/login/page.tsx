import type { Metadata } from "next";
import { LogoMark } from "@/components/icons/logo-mark";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "管理者ログイン",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-cb-bg px-4 py-16">
      <div className="flex items-center gap-2.5">
        <LogoMark size={36} />
        <span className="flex flex-col gap-px font-heading leading-none">
          <span className="text-xs font-medium tracking-wide text-cb-muted">にいがた</span>
          <span className="text-[20px] font-bold tracking-wide text-cb-ink">サークルベース</span>
        </span>
      </div>
      <span className="mt-3 whitespace-nowrap rounded-md border border-[#F0C98A] bg-cb-accent-soft px-3 py-1.5 text-[11.5px] font-bold text-cb-accent-dark">
        管理者画面
      </span>

      <div className="mt-8 w-full max-w-[380px] rounded-[14px] border border-cb-border bg-white px-[30px] py-8 shadow-[0_14px_40px_rgba(120,90,40,.12)]">
        <AdminLoginForm />
      </div>
    </div>
  );
}
