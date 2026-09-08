import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { AreaRow, CategoryNode } from "@/lib/circles";
import { buildListHref, type ListParams } from "@/lib/url-params";

export function ActiveFilterChips({
  current,
  categoryTree,
  areas,
}: {
  current: ListParams;
  categoryTree: CategoryNode[];
  areas: AreaRow[];
}) {
  const chips: { key: keyof ListParams; label: string }[] = [];

  if (current.area) {
    const area = areas.find((a) => a.slug === current.area);
    if (area) chips.push({ key: "area", label: area.name });
  }
  if (current.category) {
    const all = categoryTree.flatMap((m) => [m as CategoryNode, ...m.children]);
    const category = all.find((c) => c.slug === current.category);
    if (category) chips.push({ key: "category", label: category.name });
  }
  if (current.q) {
    chips.push({ key: "q", label: `キーワード：${current.q}` });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mt-3.5 flex flex-wrap items-center gap-2.5 text-[11.5px] text-cb-muted-2">
      <span>選択中の条件：</span>
      {chips.map((chip) => (
        <Link
          key={chip.key}
          href={buildListHref("/circles", current, { [chip.key]: null, page: null })}
          className="flex items-center gap-1.5 rounded-md border border-[#E6DCCB] bg-cb-surface px-[11px] py-1.5 text-[11.5px] text-cb-ink-soft hover:border-cb-accent"
        >
          {chip.label}
          <MaterialSymbol name="close" size={14} className="text-cb-placeholder" />
        </Link>
      ))}
      <Link href="/circles" className="text-[11.5px] text-cb-accent-dark hover:text-[#8E5606]">
        すべてクリア
      </Link>
    </div>
  );
}
