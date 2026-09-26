import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LogoMark } from "@/components/icons/logo-mark";
import { HEADER_SEARCH_LINKS, type ListType } from "@/lib/url-params";

// 未ログイン時のデスクトップヘッダーナビゲーション。
// ログイン中は LoggedInHeaderNav（components/logged-in-header-nav.tsx）を使う。
export function GuestHeaderNav({ activeType }: { activeType?: ListType }) {
  return (
    <div className="mx-auto hidden items-center gap-6 px-6 py-5 lg:flex">
      <Link href="/" className="flex shrink-0 items-center gap-2.5">
        <LogoMark size={34} />
        <span className="flex flex-col gap-px font-heading leading-none">
          <span className="text-xs font-medium tracking-wide text-cb-muted">にいがた</span>
          <span className="text-[19px] font-bold tracking-wide text-cb-ink">サークルベース</span>
        </span>
      </Link>
      <nav className="ml-4 flex shrink-0 items-center gap-[18px] text-xs font-medium text-cb-ink-soft">
        {HEADER_SEARCH_LINKS.map((link) => {
          const active = link.type === activeType;
          return (
            <Link
              key={link.type}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap hover:text-cb-accent ${active ? "font-bold text-cb-accent-dark" : "text-cb-ink-soft"}`}
            >
              {link.label}
            </Link>
          );
        })}
        <Link href="/about" className="whitespace-nowrap text-cb-ink-soft hover:text-cb-accent">
          はじめての方へ
        </Link>
      </nav>
      <div className="flex-1" />
      <div className="flex shrink-0 items-center gap-3.5">
        <Link href="/login" className="flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-[#5A5348] hover:text-cb-accent">
          <MaterialSymbol name="login" size={19} />
          ログイン
        </Link>
        <Link
          href="/signup"
          className="whitespace-nowrap rounded-lg bg-cb-accent px-3.5 py-2.5 text-[13.5px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover"
        >
          新規登録（無料）
        </Link>
      </div>
    </div>
  );
}
