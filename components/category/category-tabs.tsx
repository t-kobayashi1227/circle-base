import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { categories } from "@/lib/category-mock-data";

export function CategoryTabs({ activeSlug }: { activeSlug: string }) {
  return (
    <>
      {/* デスクトップ: 全カテゴリ */}
      <div className="hidden gap-2.5 overflow-x-auto border-b border-cb-border bg-cb-surface px-7 py-4 [scrollbar-width:none] lg:flex [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-[15px] py-2.5 text-[12.5px] ${
                active
                  ? "border-cb-accent bg-cb-accent-soft font-bold text-cb-accent-dark"
                  : "border-[#E6DCCB] bg-white font-normal text-cb-ink-soft"
              }`}
            >
              <MaterialSymbol
                name={active ? "check_circle" : c.icon}
                size={16}
                className={active ? "" : "text-cb-placeholder"}
              />
              {c.label}
            </Link>
          );
        })}
      </div>

      {/* モバイル: 先頭3カテゴリのみ */}
      <div className="flex gap-2 overflow-x-auto px-[18px] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {categories.slice(0, 3).map((c) => {
          const active = c.slug === activeSlug;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[18px] border px-[13px] py-2 text-xs ${
                active
                  ? "border-cb-accent bg-cb-accent-soft font-bold text-cb-accent-dark"
                  : "border-[#E6DCCB] bg-white font-normal text-cb-ink-soft"
              }`}
            >
              <MaterialSymbol
                name={active ? "local_fire_department" : c.icon}
                size={15}
                className={active ? "" : "text-cb-placeholder"}
              />
              {c.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
