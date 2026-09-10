import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { getFeaturedCategories } from "@/lib/circles";
import { categoryIcon } from "@/lib/category-icons";

const iconColors = ["#E5731B", "#3E9E6A", "#D9536A", "#7B5FD1", "#3F7FD1", "#D9756A", "#6E7A86", "#9A9284"];
const MAX_PICKS = 6;

export async function CategoryGrid() {
  // 管理画面でカテゴリごとに「トップページに表示」を切り替えた分（is_featured）を表示する。
  const featured = await getFeaturedCategories();
  const picks = featured.slice(0, MAX_PICKS).map((c) => ({ slug: c.slug, name: c.name }));

  if (picks.length === 0) return null;

  return (
    <section className="px-3.5 pt-6 lg:px-[46px] lg:pt-[34px]">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-[15px] font-bold text-cb-ink lg:text-[19px]">
          <MaterialSymbol name="flag" filled size={18} className="text-cb-accent lg:hidden" />
          <MaterialSymbol name="flag" filled size={21} className="hidden text-cb-accent lg:inline-block" />
          <span className="lg:hidden">人気のカテゴリから探す</span>
          <span className="hidden lg:inline">人気のカテゴリから探す</span>
        </h2>
        <Link href="/circles" className="flex items-center gap-0.5 text-[11px] lg:text-xs">
          すべてのカテゴリを見る
          <MaterialSymbol name="chevron_right" size={15} />
        </Link>
      </div>

      <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1 lg:mt-4 lg:grid lg:grid-cols-6 lg:gap-3.5 lg:overflow-visible">
        {picks.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex h-14 w-14 shrink-0 flex-col items-center justify-center gap-2.5 rounded-2xl border border-cb-border bg-white shadow-[0_2px_6px_rgba(120,95,50,.07)] hover:border-cb-accent hover:-translate-y-0.5 lg:h-[100px] lg:w-full lg:rounded-[11px] lg:transition-transform"
          >
            <MaterialSymbol
              name={categoryIcon(cat.slug)}
              filled
              size={26}
              style={{ color: iconColors[i % iconColors.length] }}
              className="lg:hidden"
            />
            <MaterialSymbol
              name={categoryIcon(cat.slug)}
              filled
              size={25}
              style={{ color: iconColors[i % iconColors.length] }}
              className="hidden lg:inline-block"
            />
            <span className="hidden text-xs font-medium text-[#463F35] lg:inline">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
