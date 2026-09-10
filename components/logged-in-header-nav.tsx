import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LogoMark } from "@/components/icons/logo-mark";

// ログイン中ユーザー向けヘッダーの共通デスクトップナビゲーション。
// サークル詳細ページ・サークル作成ページなど、右端CTAだけが異なる複数ページで再利用する。
export function LoggedInHeaderNav({
  ctaLabel,
  ctaHref,
  activeMessages = false,
}: {
  ctaLabel: string;
  ctaHref: string;
  activeMessages?: boolean;
}) {
  return (
    <div className="hidden items-center gap-6 px-6 py-3.5 lg:flex">
      <Link href="/" className="flex shrink-0 items-center gap-2.5">
        <LogoMark size={34} />
        <span className="flex flex-col gap-px font-heading leading-none">
          <span className="text-xs font-medium tracking-wide text-cb-muted">にいがた</span>
          <span className="text-[19px] font-bold tracking-wide text-cb-ink">サークルベース</span>
        </span>
      </Link>
      <nav className="flex shrink-0 items-center gap-[18px] text-[13px] font-medium text-cb-ink-soft">
        <Link href="/circles" className="whitespace-nowrap hover:text-cb-accent">
          サークルを探す
        </Link>
        <Link href="/circles" className="whitespace-nowrap hover:text-cb-accent">
          エリアから探す
        </Link>
        <Link href="/circles" className="whitespace-nowrap hover:text-cb-accent">
          カテゴリから探す
        </Link>
        <Link href="/about" className="whitespace-nowrap hover:text-cb-accent">
          はじめての方へ
        </Link>
      </nav>
      <div className="flex-1" />
      <div className="flex shrink-0 items-center gap-[11px]">
        <Link href="/circles" aria-label="検索">
          <MaterialSymbol name="search" size={21} className="text-[#5A5348]" />
        </Link>
        <Link
          href="/mypage/messages"
          className={`flex items-center gap-1.5 whitespace-nowrap text-[12.5px] hover:text-cb-accent ${
            activeMessages ? "font-bold text-cb-accent-dark" : "text-[#5A5348]"
          }`}
        >
          <MaterialSymbol name="forum" filled={activeMessages} size={19} />
          メッセージ
        </Link>
        <button type="button" className="flex items-center" aria-label="通知">
          <MaterialSymbol name="notifications" size={21} className="text-[#5A5348]" />
        </button>
        <Link href="/mypage" className="flex items-center gap-1">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3]" />
          <MaterialSymbol name="expand_more" size={18} className="text-cb-muted-3" />
        </Link>
        <Link
          href={ctaHref}
          className="whitespace-nowrap rounded-lg bg-cb-accent px-3.5 py-2.5 text-[13px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
