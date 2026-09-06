import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LogoMark } from "@/components/icons/logo-mark";

const navLinks = [
  { label: "サークルを探す", href: "/circles" },
  { label: "エリアから探す", href: "/circles" },
  { label: "カテゴリから探す", href: "/circles" },
  { label: "はじめての方へ", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-cb-border bg-cb-header">
      {/* デスクトップ */}
      <div className="mx-auto hidden items-center gap-6 px-6 py-5 lg:flex">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoMark size={34} />
          <span className="flex flex-col gap-px font-heading leading-none">
            <span className="text-xs font-medium tracking-wide text-cb-muted">
              にいがた
            </span>
            <span className="text-[19px] font-bold tracking-wide text-cb-ink">
              サークルベース
            </span>
          </span>
        </Link>
        <nav className="ml-4 flex shrink-0 items-center gap-[18px] text-xs font-medium text-cb-ink-soft">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="whitespace-nowrap text-cb-ink-soft hover:text-cb-accent">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <div className="flex shrink-0 items-center gap-3.5">
          <Link href="/circles" className="flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-[#5A5348] hover:text-cb-accent">
            <MaterialSymbol name="search" size={19} />
            検索
          </Link>
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
