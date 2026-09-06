import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { popularCategories } from "@/lib/home-mock-data";

export function CategoryGrid() {
  return (
    <section className="px-3.5 pt-6 lg:px-[46px] lg:pt-[34px]">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-[15px] font-bold text-cb-ink lg:text-[19px]">
          <MaterialSymbol name="flag" filled size={18} className="text-cb-accent lg:hidden" />
          <MaterialSymbol name="flag" filled size={21} className="hidden text-cb-accent lg:inline-block" />
          <span className="lg:hidden">人気のカテゴリ</span>
          <span className="hidden lg:inline">人気のカテゴリから探す</span>
        </h2>
        <Link href="/circles" className="flex items-center gap-0.5 text-[11px] text-cb-muted-2 lg:text-xs">
          すべて見る
          <MaterialSymbol name="chevron_right" size={15} />
        </Link>
      </div>

      <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1 lg:mt-4 lg:grid lg:grid-cols-8 lg:gap-3.5 lg:overflow-visible">
        {popularCategories.map((cat) => (
          <Link
            key={cat.label}
            href="/circles"
            className="flex h-14 w-14 shrink-0 flex-col items-center justify-center gap-2.5 rounded-2xl border border-cb-border bg-cb-surface shadow-[0_2px_6px_rgba(120,95,50,.07)] hover:border-cb-accent hover:-translate-y-0.5 lg:h-[76px] lg:w-full lg:rounded-[11px] lg:transition-transform"
          >
            <MaterialSymbol name={cat.icon} filled size={26} style={{ color: cat.color }} className="lg:hidden" />
            <MaterialSymbol name={cat.icon} filled size={25} style={{ color: cat.color }} className="hidden lg:inline-block" />
            <span className="hidden text-xs font-medium text-[#463F35] lg:inline">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
