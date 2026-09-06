import type { Metadata } from "next";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { SiteSearchHeader } from "@/components/site-search-header";
import { CategoryHero } from "@/components/category/category-hero";
import { CategoryTabs } from "@/components/category/category-tabs";
import { CategoryFilterSidebar } from "@/components/category/category-filter-sidebar";
import { CategoryMobileFilterBar } from "@/components/category/category-mobile-filter-bar";
import { CategoryCircleCard } from "@/components/category/category-circle-card";
import { CategoryPromoSidebar } from "@/components/category/category-promo-sidebar";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { categories, categoryCircles, getCategoryBySlug } from "@/lib/category-mock-data";

export function generateStaticParams() {
  return categories.map((c) => ({ categorySlug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  return { title: `${category.label}のサークル一覧` };
}

// 実データ接続まではカテゴリに関わらず同じモックのサークル一覧を表示する。
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader />
      <CategoryHero category={category} />
      <CategoryTabs activeSlug={category.slug} />
      <CategoryMobileFilterBar />

      <div className="px-[18px] pb-6 pt-3.5 lg:grid lg:grid-cols-[224px_minmax(0,1fr)_224px] lg:items-start lg:gap-[22px] lg:px-7 lg:pb-[30px] lg:pt-[22px]">
        <CategoryFilterSidebar category={category} />

        <div className="min-w-0">
          <div className="mt-3.5 flex items-center justify-between gap-4 lg:mt-0">
            <h2 className="whitespace-nowrap font-heading text-[15.5px] font-bold text-cb-ink lg:text-[18px]">
              {category.label}のサークル一覧
            </h2>
            <div className="hidden shrink-0 items-center gap-3.5 lg:flex">
              <span className="whitespace-nowrap text-xs text-cb-muted-2">全24件</span>
              <div className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-cb-input-border bg-white px-3 py-2 text-xs text-[#3B352C]">
                新着順
                <MaterialSymbol name="expand_more" size={16} className="text-cb-placeholder" />
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between lg:hidden">
            <span className="text-[11.5px] text-cb-muted-2">全24件</span>
            <div className="flex items-center gap-1.5 rounded-md border border-cb-input-border bg-white px-3 py-2 text-[11.5px] text-[#3B352C]">
              新着順
              <MaterialSymbol name="expand_more" size={16} className="text-cb-placeholder" />
            </div>
          </div>

          {/* デスクトップ: 3列グリッド（全件） */}
          <div className="mt-4 hidden grid-cols-3 gap-4 lg:grid">
            {categoryCircles.map((circle) => (
              <CategoryCircleCard key={circle.id} circle={circle} />
            ))}
          </div>

          {/* モバイル: 先頭3件 */}
          <div className="mt-3 flex flex-col gap-3.5 lg:hidden">
            {categoryCircles.slice(0, 3).map((circle) => (
              <CategoryCircleCard key={circle.id} circle={circle} />
            ))}
          </div>
        </div>

        <CategoryPromoSidebar category={category} />
      </div>

      <MobileBottomNav activeHref="/circles" messageBadge={3} />
    </div>
  );
}
