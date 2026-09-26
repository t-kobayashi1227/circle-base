import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { AreaRow, CategoryNode } from "@/lib/circles";
import { HEADER_SEARCH_LINKS, type ListParams } from "@/lib/url-params";

export function FilterSidebar({
  categoryTree,
  areas,
  current,
}: {
  categoryTree: CategoryNode[];
  areas: AreaRow[];
  current: ListParams;
}) {
  return (
    <div className="hidden lg:block">
      <form method="get" action="/circles" className="rounded-xl border border-cb-border bg-cb-surface px-5 py-5 pb-[22px]">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-cb-ink">絞り込み</h2>
          <a
            href="/circles"
            className="flex items-center gap-1 rounded-2xl border border-[#E6DCCB] px-[11px] py-1.5 text-[10.5px] text-cb-muted-2 hover:border-cb-accent hover:text-cb-accent-dark"
          >
            <MaterialSymbol name="refresh" size={14} />
            条件をリセット
          </a>
        </div>

        {current.q ? <input type="hidden" name="q" value={current.q} /> : null}
        {current.sort ? <input type="hidden" name="sort" value={current.sort} /> : null}

        <div className="mt-[18px] text-[12.5px] font-bold text-[#3B352C]">種別</div>
        <div className="relative mt-2.5">
          <select
            name="type"
            defaultValue={current.type ?? ""}
            className="w-full appearance-none rounded-lg border border-cb-input-border px-[13px] py-3 text-xs text-cb-ink"
          >
            <option value="">サークル・イベントすべて</option>
            {HEADER_SEARCH_LINKS.map((link) => (
              <option key={link.type} value={link.type}>
                {link.label}
              </option>
            ))}
          </select>
          <MaterialSymbol
            name="expand_more"
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
          />
        </div>

        <div className="mt-5 text-[12.5px] font-bold text-[#3B352C]">エリア（区）</div>
        <div className="relative mt-2.5">
          <select
            name="area"
            defaultValue={current.area ?? ""}
            className="w-full appearance-none rounded-lg border border-cb-input-border px-[13px] py-3 text-xs text-cb-ink"
          >
            <option value="">すべてのエリア</option>
            {areas.map((area) => (
              <option key={area.id} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
          <MaterialSymbol
            name="expand_more"
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
          />
        </div>

        <div className="mt-5 text-[12.5px] font-bold text-[#3B352C]">カテゴリ</div>
        <div className="relative mt-2.5">
          <select
            name="category"
            defaultValue={current.category ?? ""}
            className="w-full appearance-none rounded-lg border border-cb-input-border px-[13px] py-3 text-xs text-cb-ink"
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
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
          />
        </div>

        <button
          type="submit"
          className="mt-[22px] w-full rounded-lg border border-[#F0D9AF] bg-cb-accent-soft py-[13px] text-center text-[12.5px] font-bold text-cb-accent-dark hover:bg-[#FBEFDD]"
        >
          この条件で検索する
        </button>
      </form>
    </div>
  );
}
