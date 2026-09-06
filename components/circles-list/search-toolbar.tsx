import { MaterialSymbol } from "@/components/icons/material-symbol";

export function SearchToolbar() {
  return (
    <>
      {/* デスクトップ */}
      <div className="hidden items-center gap-3 rounded-xl border border-cb-border bg-cb-surface p-[18px] lg:grid lg:grid-cols-[minmax(0,1fr)_158px_176px_auto]">
        <div className="flex min-w-0 items-center gap-2.5 rounded-lg border border-cb-input-border px-[13px] py-3">
          <MaterialSymbol name="search" size={18} className="text-cb-placeholder" />
          <input
            type="text"
            placeholder="キーワード（サークル名・活動内容など）"
            className="w-full min-w-0 truncate text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-cb-input-border px-[13px] py-3 text-xs text-cb-ink">
          中央区
          <MaterialSymbol name="expand_more" size={18} className="text-cb-placeholder" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-cb-input-border px-[13px] py-3 text-xs text-cb-ink">
          すべてのカテゴリ
          <MaterialSymbol name="expand_more" size={18} className="text-cb-placeholder" />
        </div>
        <button
          type="button"
          className="flex items-center gap-[7px] whitespace-nowrap rounded-lg bg-cb-accent px-5 py-3 text-[13px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover"
        >
          <MaterialSymbol name="search" size={17} />
          検索
        </button>
      </div>

      {/* モバイル */}
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[9px] border border-[#F0D9AF] bg-cb-surface text-[13.5px] font-bold text-cb-accent-dark lg:hidden"
      >
        <MaterialSymbol name="tune" size={18} />
        絞り込みを開く
      </button>
    </>
  );
}
