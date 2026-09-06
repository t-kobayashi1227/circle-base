import { MaterialSymbol } from "@/components/icons/material-symbol";

const pageNumbers = [2, 3, 4, 5];

export function ListPagination() {
  return (
    <>
      {/* デスクトップ: ページ番号 */}
      <div className="mt-[26px] hidden items-center justify-center gap-[9px] lg:flex">
        <button
          type="button"
          aria-label="前のページ"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white hover:border-cb-accent"
        >
          <MaterialSymbol name="chevron_left" size={18} className="text-cb-placeholder" />
        </button>
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-cb-accent text-[12.5px] font-bold text-white">
          1
        </button>
        {pageNumbers.map((n) => (
          <button
            key={n}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white text-[12.5px] text-cb-muted hover:border-cb-accent hover:text-cb-accent-dark"
          >
            {n}
          </button>
        ))}
        <span className="w-[22px] text-center text-[12.5px] text-cb-placeholder">…</span>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white text-[12.5px] text-cb-muted hover:border-cb-accent hover:text-cb-accent-dark"
        >
          7
        </button>
        <button
          type="button"
          aria-label="次のページ"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white hover:border-cb-accent"
        >
          <MaterialSymbol name="chevron_right" size={18} className="text-cb-muted-2" />
        </button>
      </div>

      {/* モバイル: もっと見る */}
      <button
        type="button"
        className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#E6DCCB] bg-white text-[13px] font-medium text-cb-ink-soft lg:hidden"
      >
        もっと見る
        <MaterialSymbol name="chevron_right" size={17} className="text-cb-accent" />
      </button>
    </>
  );
}
