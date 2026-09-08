import Link from "next/link";
import { LogoMark } from "@/components/icons/logo-mark";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function AdminHeader({ adminName }: { adminName?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-cb-border bg-cb-header">
      {/* デスクトップ */}
      <div className="hidden items-center gap-3.5 px-[22px] py-3.5 lg:flex">
        <Link href="/admin" className="flex shrink-0 items-center gap-2.5">
          <LogoMark size={32} />
          <span className="flex flex-col gap-px font-heading leading-none">
            <span className="text-[11.5px] font-medium tracking-wide text-cb-muted">にいがた</span>
            <span className="text-lg font-bold tracking-wide text-cb-ink">サークルベース</span>
          </span>
        </Link>
        <span className="whitespace-nowrap rounded-md border border-[#F0C98A] bg-cb-accent-soft px-3 py-1.5 text-[11.5px] font-bold text-cb-accent-dark">
          管理者画面
        </span>
        <div className="flex-1" />
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="h-[34px] w-[34px] overflow-hidden rounded-full bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3]" />
          <span className="whitespace-nowrap text-[12.5px] font-medium text-cb-ink-soft">{adminName ?? "管理者"}</span>
        </div>
      </div>

      {/* モバイル */}
      <div className="flex items-center gap-3 px-4 py-2 lg:hidden">
        <Link href="/admin" className="flex shrink-0 items-center gap-2">
          <LogoMark size={28} />
          <span className="flex flex-col font-heading leading-tight">
            <span className="text-[10px] font-medium text-cb-muted">にいがた</span>
            <span className="text-[15px] font-bold text-cb-ink">サークルベース</span>
          </span>
        </Link>
        <span className="shrink-0 whitespace-nowrap rounded border border-[#F0C98A] bg-cb-accent-soft px-[9px] py-1 text-[10.5px] font-bold text-cb-accent-dark">
          管理者画面
        </span>
        <div className="flex-1" />
        <MaterialSymbol name="account_circle" size={26} className="text-[#3B352C]" />
      </div>
    </header>
  );
}
