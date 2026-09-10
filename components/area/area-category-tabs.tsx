import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { categoryIcon } from "@/lib/category-icons";
import type { CategoryNode } from "@/lib/circles";
import { buildListHref, type ListParams } from "@/lib/url-params";

export function AreaCategoryTabs({
  categoryTree,
  current,
  basePath,
}: {
  categoryTree: CategoryNode[];
  current: ListParams;
  basePath: string;
}) {
  const tabs = [
    { slug: null, label: "すべて", icon: "check_circle" },
    ...categoryTree.map((c) => ({ slug: c.slug, label: c.name, icon: categoryIcon(c.slug) })),
  ];

  return (
    <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-[18px] pt-4 lg:gap-2.5 lg:px-7 lg:pt-4">
      {tabs.map((tab) => {
        const active = tab.slug === (current.category ?? null);
        return (
          <Link
            key={tab.label}
            href={buildListHref(basePath, current, { category: tab.slug, page: null })}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs lg:px-[15px] lg:py-[9px] lg:text-[12.5px] ${
              active
                ? "border border-cb-accent bg-cb-accent-soft font-bold text-cb-accent-dark"
                : "border border-[#E6DCCB] bg-white font-normal text-cb-ink-soft"
            }`}
          >
            <MaterialSymbol name={tab.icon} size={active ? 16 : 15} className={active ? "" : "text-cb-placeholder"} />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
