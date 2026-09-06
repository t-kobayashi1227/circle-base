import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LogoMark } from "@/components/icons/logo-mark";
import { LoggedInHeaderNav } from "@/components/logged-in-header-nav";

export function MypageHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#F3ECE0] bg-cb-header">
      <LoggedInHeaderNav ctaLabel="サークルを作成する" ctaHref="/mypage/circles/new" />

      {/* モバイル */}
      <div className="flex items-center justify-between px-[18px] py-2 lg:hidden">
        <Link href="/" className="flex items-center gap-[9px]">
          <LogoMark size={30} />
          <span className="flex flex-col font-heading leading-tight">
            <span className="text-[10.5px] font-medium text-cb-muted">にいがた</span>
            <span className="text-base font-bold text-cb-ink">サークルベース</span>
          </span>
        </Link>
        <div className="flex items-center gap-[15px]">
          <button type="button" aria-label="通知">
            <MaterialSymbol name="notifications" size={25} className="text-[#3B352C]" />
          </button>
          <Link href="/mypage/messages" className="relative flex" aria-label="メッセージ">
            <MaterialSymbol name="forum" size={25} className="text-[#3B352C]" />
            <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E04B3C] px-1 text-[9.5px] font-bold text-white">
              3
            </span>
          </Link>
          <button type="button" aria-label="メニュー">
            <MaterialSymbol name="menu" size={25} className="text-[#3B352C]" />
          </button>
        </div>
      </div>
    </header>
  );
}
