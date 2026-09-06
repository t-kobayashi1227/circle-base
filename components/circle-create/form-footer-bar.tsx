import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

// フォーム本体（circle-step1-form）の外側に置かれる、ページ全幅のアクションバー。
// ボタンは form="circle-step1-form" 属性でフォームに紐付ける。
export function FormFooterBar() {
  return (
    <div className="border-t border-cb-border bg-cb-surface">
      {/* デスクトップ */}
      <div className="hidden items-center justify-between px-7 py-[18px] lg:flex">
        <div className="flex items-center gap-2 text-xs text-cb-muted-2">
          <MaterialSymbol name="check_circle" filled size={17} className="text-[#3E9E7A]" />
          下書きが自動保存されています
        </div>
        <div className="flex items-center gap-3.5">
          <Link
            href="/mypage"
            className="rounded-[9px] border border-[#E0D6C6] bg-white px-10 py-3.5 text-[13.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            form="circle-step1-form"
            className="flex items-center gap-2 rounded-[9px] bg-cb-accent px-[34px] py-3.5 text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover"
          >
            次へ：詳細情報へ
            <MaterialSymbol name="chevron_right" size={18} />
          </button>
        </div>
      </div>

      {/* モバイル */}
      <div className="grid grid-cols-[auto_1fr] gap-3 p-3 lg:hidden">
        <Link
          href="/mypage"
          className="flex min-h-[52px] items-center justify-center rounded-[9px] border border-[#E0D6C6] px-6 text-[13.5px] font-medium text-cb-ink-soft"
        >
          キャンセル
        </Link>
        <button
          type="submit"
          form="circle-step1-form"
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-[9px] bg-cb-accent text-[13.5px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)]"
        >
          次へ：詳細情報へ
          <MaterialSymbol name="chevron_right" size={17} />
        </button>
      </div>
    </div>
  );
}
