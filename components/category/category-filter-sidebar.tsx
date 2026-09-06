import { MaterialSymbol } from "@/components/icons/material-symbol";
import { categoryFreqChecks, categoryTargetChecks, type CategoryInfo } from "@/lib/category-mock-data";

export function CategoryFilterSidebar({ category }: { category: CategoryInfo }) {
  return (
    <aside className="hidden flex-col gap-4 lg:flex">
      <div className="rounded-xl border border-cb-border bg-cb-surface px-[18px] pb-5 pt-[18px]">
        <div className="flex items-center gap-2 text-[13px] font-bold text-cb-ink">
          <MaterialSymbol name="search" size={17} className="text-cb-placeholder" />
          絞り込み検索
        </div>

        <div className="mt-4 text-[11.5px] font-bold text-[#3B352C]">エリア</div>
        <div className="mt-2.5 flex items-center justify-between rounded-lg border border-cb-input-border px-3 py-[11px] text-xs text-[#3B352C]">
          すべてのエリア
          <MaterialSymbol name="expand_more" size={17} className="text-cb-placeholder" />
        </div>

        <div className="mt-[18px] text-[11.5px] font-bold text-[#3B352C]">開催頻度</div>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {categoryFreqChecks.map((freq) => (
            <label key={freq} className="flex items-center gap-2.5 text-[11.5px] text-cb-ink-soft">
              <input type="checkbox" className="h-[15px] w-[15px] rounded border-[1.5px] border-[#C9BFAD] text-cb-accent" />
              {freq}
            </label>
          ))}
        </div>

        <div className="mt-[18px] text-[11.5px] font-bold text-[#3B352C]">対象</div>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {categoryTargetChecks.map((target) => (
            <label key={target} className="flex items-center gap-2.5 text-[11.5px] text-cb-ink-soft">
              <input type="checkbox" className="h-[15px] w-[15px] rounded border-[1.5px] border-[#C9BFAD] text-cb-accent" />
              {target}
            </label>
          ))}
        </div>

        <button
          type="button"
          className="mt-[18px] flex w-full items-center justify-center rounded-lg border border-cb-accent bg-white py-[11px] text-xs font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
        >
          この条件で検索
        </button>
      </div>

      <div className="rounded-xl border border-cb-border bg-cb-surface px-[18px] pb-5 pt-[18px]">
        <div className="flex items-center gap-2 text-[12.5px] font-bold text-cb-ink">
          <MaterialSymbol name="landscape" filled size={18} className="text-[#3E9E6A]" />
          カテゴリについて
        </div>
        <div className="mt-2.5 text-[10.5px] leading-[1.85] text-cb-muted-2">{category.about}</div>
        <button
          type="button"
          className="mt-[13px] flex w-full items-center justify-center rounded-lg border border-[#E0D6C6] bg-white py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
        >
          カテゴリの魅力を見る
          <MaterialSymbol name="chevron_right" size={15} className="ml-1" />
        </button>
      </div>
    </aside>
  );
}
