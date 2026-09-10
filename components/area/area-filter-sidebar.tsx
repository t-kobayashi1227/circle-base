import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { CategoryNode } from "@/lib/circles";
import type { ListParams } from "@/lib/url-params";

export function AreaFilterSidebar({
  categoryTree,
  current,
  basePath,
}: {
  categoryTree: CategoryNode[];
  current: ListParams;
  basePath: string;
}) {
  return (
    <form method="get" action={basePath} className="rounded-xl border border-cb-border bg-cb-surface px-5 py-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-sm font-bold text-cb-ink">
          <MaterialSymbol name="search" size={17} className="text-cb-placeholder" />
          絞り込み検索
        </h2>
        <a
          href={basePath}
          className="flex items-center gap-1 rounded-2xl border border-[#E6DCCB] px-[11px] py-1.5 text-[10.5px] text-cb-muted-2 hover:border-cb-accent hover:text-cb-accent-dark"
        >
          <MaterialSymbol name="refresh" size={14} />
          リセット
        </a>
      </div>

      {current.sort ? <input type="hidden" name="sort" value={current.sort} /> : null}

      <div className="mt-4 text-[11.5px] font-bold text-[#3B352C]">フリーワード</div>
      <input
        type="text"
        name="q"
        defaultValue={current.q ?? ""}
        placeholder="サークル名・キーワード"
        className="mt-2.5 w-full rounded-lg border border-cb-input-border px-3 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none"
      />

      <div className="mt-[18px] text-[11.5px] font-bold text-[#3B352C]">活動カテゴリ</div>
      <div className="relative mt-2.5">
        <select
          name="category"
          defaultValue={current.category ?? ""}
          className="w-full appearance-none rounded-lg border border-cb-input-border px-3 py-3 text-xs text-cb-ink"
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
        <MaterialSymbol
          name="expand_more"
          size={17}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
        />
      </div>

      <button
        type="submit"
        className="mt-[18px] w-full rounded-lg border border-[#F0D9AF] bg-cb-accent-soft py-[11px] text-center text-xs font-bold text-cb-accent-dark hover:bg-[#FBEFDD]"
      >
        この条件で検索
      </button>
    </form>
  );
}
