import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LogoMark } from "@/components/icons/logo-mark";
import { LoggedInHeaderNav } from "@/components/logged-in-header-nav";
import { GuestHeaderNav } from "@/components/guest-header-nav";

export function SiteHeader({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <header className="sticky top-0 z-20 border-b border-cb-border bg-cb-header">
      {/* デスクトップ */}
      {isLoggedIn ? (
        <LoggedInHeaderNav ctaLabel="サークルを作成する" ctaHref="/mypage/circles/new" />
      ) : (
        <GuestHeaderNav />
      )}

      {/* モバイル */}
      <div className="flex items-center justify-between border-b border-[#F3ECE0] px-[18px] py-2.5 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark size={30} />
          <span className="flex flex-col font-heading leading-tight">
            <span className="text-[10.5px] font-medium text-cb-muted">
              にいがた
            </span>
            <span className="text-base font-bold text-cb-ink">
              サークルベース
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/circles" aria-label="検索">
            <MaterialSymbol name="search" size={25} className="text-[#3B352C]" />
          </Link>
          <button type="button" aria-label="メニュー">
            <MaterialSymbol name="menu" size={25} className="text-[#3B352C]" />
          </button>
        </div>
      </div>
    </header>
  );
}
