import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LogoMark } from "@/components/icons/logo-mark";
import { HEADER_SEARCH_LINKS } from "@/lib/url-params";

// ログイン／会員登録ページ専用のヘッダー。ゲスト状態だがサークル管理機能への導線があるため、
// 他ページのSiteHeader/LoggedInHeaderNavとは異なる独自レイアウト。
export function AuthHeader() {
  return (
    <header className="border-b border-[#F3ECE0] bg-cb-header">
      {/* デスクトップ */}
      <div className="hidden items-center gap-5 px-6 py-3.5 lg:flex">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoMark size={34} />
          <span className="flex flex-col gap-px font-heading leading-none">
            <span className="text-xs font-medium tracking-wide text-cb-muted">にいがた</span>
            <span className="text-[19px] font-bold tracking-wide text-cb-ink">サークルベース</span>
          </span>
        </Link>
        <nav className="ml-3.5 flex shrink-0 items-center gap-[22px] text-[13px] font-medium text-cb-ink-soft">
          {HEADER_SEARCH_LINKS.map((link) => (
            <Link key={link.type} href={link.href} className="hover:text-cb-accent">
              {link.label}
            </Link>
          ))}
          <Link href="/about" className="hover:text-cb-accent">
            はじめての方へ
          </Link>
        </nav>
        <div className="flex-1" />
        <div className="flex shrink-0 items-center gap-4">
          <Link href="/mypage/messages" className="flex items-center gap-1.5 text-[12.5px] text-[#5A5348] hover:text-cb-accent">
            <MaterialSymbol name="forum" size={19} />
            メッセージ
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E04B3C] px-1 text-[9.5px] font-bold text-white">
              3
            </span>
          </Link>
          <Link
            href="/mypage/circles/new"
            className="whitespace-nowrap rounded-lg border-[1.5px] border-cb-accent px-5 py-2.5 text-[13px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
          >
            サークルを作成する
          </Link>
        </div>
      </div>

      {/* モバイル */}
      <div className="flex items-center justify-between px-[18px] py-2 lg:hidden">
        <Link href="/" className="flex items-center gap-[9px]">
          <LogoMark size={30} />
          <span className="flex flex-col font-heading leading-tight">
            <span className="text-[10.5px] font-medium text-cb-muted">にいがた</span>
            <span className="text-base font-bold text-cb-ink">サークルベース</span>
          </span>
        </Link>
        <Link href="/" aria-label="閉じる">
          <MaterialSymbol name="close" size={26} className="text-[#3B352C]" />
        </Link>
      </div>
    </header>
  );
}
