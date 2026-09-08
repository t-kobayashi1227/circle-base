import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { AreaRow, CategoryNode } from "@/lib/circles";
import type { ListParams } from "@/lib/url-params";

export function SearchToolbar({
  current,
  categoryTree,
  areas,
}: {
  current: ListParams;
  categoryTree: CategoryNode[];
  areas: AreaRow[];
}) {
  return (
    <form method="get" action="/circles">
      {current.sort ? <input type="hidden" name="sort" value={current.sort} /> : null}

      {/* デスクトップ: キーワードのみ（エリア・カテゴリは左サイドバー） */}
      <div className="hidden items-center gap-3 rounded-xl border border-cb-border bg-cb-surface p-[18px] lg:grid lg:grid-cols-[minmax(0,1fr)_auto]">
        {current.area ? <input type="hidden" name="area" value={current.area} /> : null}
        {current.category ? <input type="hidden" name="category" value={current.category} /> : null}
        <div className="flex min-w-0 items-center gap-2.5 rounded-lg border border-cb-input-border px-[13px] py-3">
          <MaterialSymbol name="search" size={18} className="text-cb-placeholder" />
          <input
            type="text"
            name="q"
            defaultValue={current.q ?? ""}
            placeholder="キーワード（サークル名・活動内容など）"
            className="w-full min-w-0 truncate text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-[7px] whitespace-nowrap rounded-lg bg-cb-accent px-5 py-3 text-[13px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover"
        >
          <MaterialSymbol name="search" size={17} />
          検索
        </button>
      </div>

      {/* モバイル: キーワード＋エリア＋カテゴリ（左サイドバーが非表示のため） */}
      <div className="flex flex-col gap-2.5 lg:hidden">
        <div className="flex items-center gap-2.5 rounded-lg border border-cb-input-border bg-cb-surface px-[13px] py-3">
          <MaterialSymbol name="search" size={18} className="text-cb-placeholder" />
          <input
            type="text"
            name="q"
            defaultValue={current.q ?? ""}
            placeholder="キーワードで探す"
            className="w-full min-w-0 text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <select
            name="area"
            defaultValue={current.area ?? ""}
            className="rounded-lg border border-cb-input-border bg-white px-3 py-3 text-xs text-cb-ink"
          >
            <option value="">すべてのエリア</option>
            {areas.map((area) => (
              <option key={area.id} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
          <select
            name="category"
            defaultValue={current.category ?? ""}
            className="rounded-lg border border-cb-input-border bg-white px-3 py-3 text-xs text-cb-ink"
          >
            <option value="">すべてのカテゴリ</option>
            {categoryTree.map((major) => (
              <optgroup key={major.id} label={major.name}>
                <option value={major.slug}>{major.name}（すべて）</option>
                {major.children.map((minor) => (
                  <option key={minor.id} value={minor.slug}>
                    {minor.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[9px] bg-cb-accent text-[13.5px] font-bold text-white"
        >
          <MaterialSymbol name="search" size={18} />
          検索する
        </button>
      </div>
    </form>
  );
}
