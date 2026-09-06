import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LogoMark } from "@/components/icons/logo-mark";
import { LoggedInHeaderNav } from "@/components/logged-in-header-nav";

// マイページ系ページの一部で使われるモバイルヘッダー構成：
// メニュー（左）／ロゴ（中央）／通知＋アバター（右）。
export function MenuAvatarHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#F3ECE0] bg-cb-header">
      <LoggedInHeaderNav ctaLabel="サークルを作成する" ctaHref="/mypage/circles/new" />

      {/* モバイル */}
      <div className="flex items-center justify-between px-[18px] py-2 lg:hidden">
        <button type="button" aria-label="メニュー">
          <MaterialSymbol name="menu" size={26} className="text-[#3B352C]" />
        </button>
        <Link href="/" className="flex items-center gap-[9px]">
          <LogoMark size={30} />
          <span className="flex flex-col font-heading leading-tight">
            <span className="text-[10.5px] font-medium text-cb-muted">にいがた</span>
            <span className="text-base font-bold text-cb-ink">サークルベース</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button type="button" className="relative flex" aria-label="通知">
            <MaterialSymbol name="notifications" size={23} className="text-[#3B352C]" />
            <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E04B3C] px-1 text-[9.5px] font-bold text-white">
              3
            </span>
          </button>
          <div className="h-[30px] w-[30px] overflow-hidden rounded-full bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3]" />
        </div>
      </div>
    </header>
  );
}
