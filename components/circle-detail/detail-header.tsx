import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LoggedInHeaderNav } from "@/components/logged-in-header-nav";

// 主催者アカウントでログイン中を想定したヘッダー（サークル詳細ページ専用デザイン）。
// トップページのゲスト向けヘッダー（components/home/site-header.tsx）とは表示が異なる。
export function DetailHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-cb-border bg-cb-header">
      <LoggedInHeaderNav ctaLabel="サークルを作成する" ctaHref="/mypage/circles/new" />

      {/* モバイル: 詳細ビュー用ナビゲーションバー */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-[#F3ECE0] px-4 py-2.5 lg:hidden">
        <Link href="/circles" aria-label="戻る">
          <MaterialSymbol name="arrow_back_ios_new" size={22} className="text-[#3B352C]" />
        </Link>
        <span className="text-center font-heading text-[15px] font-bold text-cb-ink">
          サークル詳細
        </span>
        <div className="flex items-center gap-3.5">
          <button type="button" aria-label="共有">
            <MaterialSymbol name="ios_share" size={21} className="text-[#3B352C]" />
          </button>
          <button type="button" aria-label="その他のメニュー">
            <MaterialSymbol name="more_horiz" filled size={21} className="text-[#3B352C]" />
          </button>
        </div>
      </div>
    </header>
  );
}
