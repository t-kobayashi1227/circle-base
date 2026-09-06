import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LogoMark } from "@/components/icons/logo-mark";

// メッセージ一覧画面（モバイル）専用のトップバー。
// 他ページのモバイルヘッダーと違い、既にメッセージ画面にいるためメッセージアイコンは表示しない。
export function MessagesMobileHeader() {
  return (
    <header className="flex items-center justify-between bg-cb-header px-[18px] py-2 lg:hidden">
      <Link href="/" className="flex items-center gap-[9px]">
        <LogoMark size={30} />
        <span className="flex flex-col font-heading leading-tight">
          <span className="text-[10.5px] font-medium text-cb-muted">にいがた</span>
          <span className="text-base font-bold text-cb-ink">サークルベース</span>
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <button type="button" aria-label="通知">
          <MaterialSymbol name="notifications" size={25} className="text-[#3B352C]" />
        </button>
        <button type="button" aria-label="メニュー">
          <MaterialSymbol name="menu" size={25} className="text-[#3B352C]" />
        </button>
      </div>
    </header>
  );
}
