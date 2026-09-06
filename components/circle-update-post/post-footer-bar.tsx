import { MaterialSymbol } from "@/components/icons/material-symbol";

// フォーム本体（activity-post-step1-form）の外側に置かれる、モバイル専用の下部バー。
// デスクトップではフォームカード内右下にボタンが収まるため、ここでは非表示にする。
export function PostFooterBar() {
  return (
    <div className="lg:hidden">
      <div className="flex items-center gap-2 px-4 pb-3 text-[11px] text-cb-muted-2">
        <MaterialSymbol name="check_circle" filled size={16} className="text-[#3E9E7A]" />
        下書きが自動保存されています
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-3 border-t border-cb-border bg-cb-surface p-3">
        <button
          type="button"
          className="flex min-h-[52px] items-center justify-center rounded-[9px] border border-[#E0D6C6] px-5 text-[13px] font-medium text-cb-ink-soft"
        >
          下書き保存
        </button>
        <button
          type="submit"
          form="activity-post-step1-form"
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-[9px] bg-cb-accent text-[13.5px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)]"
        >
          次へ：確認画面へ
          <MaterialSymbol name="chevron_right" size={17} />
        </button>
      </div>
    </div>
  );
}
