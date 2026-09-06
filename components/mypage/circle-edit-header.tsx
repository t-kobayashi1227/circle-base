import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LogoMark } from "@/components/icons/logo-mark";
import { LoggedInHeaderNav } from "@/components/logged-in-header-nav";

// このページのモバイルヘッダーはメニュー（左）／ロゴ（中央）／アバターのみ（右）で、
// 通知アイコンを含まない点が他のマイページ系ヘッダーと異なる。
export function CircleEditHeader() {
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
        <div className="h-[30px] w-[30px] overflow-hidden rounded-full bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3]" />
      </div>
    </header>
  );
}
