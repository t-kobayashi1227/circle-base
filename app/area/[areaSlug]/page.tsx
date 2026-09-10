import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { AreaHero } from "@/components/area/area-hero";
import { AreaCategoryTabs } from "@/components/area/area-category-tabs";
import { AreaFilterSidebar } from "@/components/area/area-filter-sidebar";
import { AreaMapCard } from "@/components/area/area-map-card";
import { AreaAboutCard } from "@/components/area/area-about-card";
import { AreaNearbyList } from "@/components/area/area-nearby-list";
import { AreaPromoBanner } from "@/components/area/area-promo-banner";
import { SortBar } from "@/components/circles-list/sort-bar";
import { CircleListCard } from "@/components/circles-list/circle-list-card";
import { ListPagination } from "@/components/circles-list/list-pagination";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getAreaBySlug, getAreas, getCategoryTree, getCircles } from "@/lib/circles";
import { buildOpenGraph } from "@/lib/seo";
import { getCurrentUser } from "@/lib/auth";
import type { ListParams } from "@/lib/url-params";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ areaSlug: string }>;
}): Promise<Metadata> {
  const { areaSlug } = await params;
  const area = await getAreaBySlug(areaSlug);
  if (!area) return { title: "エリアが見つかりません" };
  const title = `${area.name}のサークル一覧`;
  const description = `新潟市${area.name}を拠点に活動するサークル・イベントの一覧です。カテゴリやキーワードで絞り込んで探せます。`;
  return {
    title,
    description,
    openGraph: buildOpenGraph({ title, description }),
  };
}

export default async function AreaPage({
  params,
  searchParams,
}: {
  params: Promise<{ areaSlug: string }>;
  searchParams: Promise<ListParams>;
}) {
  const { areaSlug } = await params;
  const sp = await searchParams;
  const area = await getAreaBySlug(areaSlug);
  if (!area) notFound();

  const sort = sp.sort === "updated" ? "updated" : "new";
  const page = Number(sp.page) > 0 ? Number(sp.page) : 1;
  const basePath = `/area/${areaSlug}`;

  const [{ circles, total, pageCount }, categoryTree, areas, user] = await Promise.all([
    getCircles({ areaSlug, categorySlug: sp.category, keyword: sp.q, sort, page }),
    getCategoryTree(),
    getAreas(),
    getCurrentUser(),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader isLoggedIn={!!user} />

      <main className="flex-1">
        <ListBreadcrumb items={[{ label: "ホーム", href: "/" }, { label: "エリアから探す", href: "/circles" }]} current={area.name} />

        <AreaHero area={area} />

        <AreaCategoryTabs categoryTree={categoryTree} current={sp} basePath={basePath} />

        <div className="px-[18px] pb-6 pt-4 lg:grid lg:grid-cols-[224px_minmax(0,1fr)_224px] lg:items-start lg:gap-[22px] lg:px-7 lg:pb-[30px] lg:pt-[22px]">
          <div className="hidden flex-col gap-4 lg:flex">
            <AreaFilterSidebar categoryTree={categoryTree} current={sp} basePath={basePath} />
            <AreaMapCard area={area} />
          </div>

          <div className="min-w-0">
            <div className="mt-4 lg:hidden">
              <AreaFilterSidebar categoryTree={categoryTree} current={sp} basePath={basePath} />
            </div>

            <h2 className="mt-4 font-heading text-lg font-bold text-[#2F2B24] lg:mt-0 lg:text-[18px]">
              {area.name}のサークル一覧
            </h2>
            <p className="mt-2 text-[11.5px] text-cb-muted-2 lg:text-xs">
              {area.name}を拠点に活動するサークルが{total}件見つかりました
            </p>

            <SortBar current={sp} sort={sort} basePath={basePath} />

            {circles.length === 0 ? (
              <p className="mt-10 text-center text-[12.5px] text-cb-muted">
                現在、{area.name}で公開中のサークルはありません。
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-3.5 lg:grid-cols-3">
                {circles.map((circle) => (
                  <CircleListCard key={circle.id} circle={circle} />
                ))}
              </div>
            )}

            <div className="mt-4 lg:mt-[18px]">
              <AreaPromoBanner />
            </div>

            <div className="mt-4 lg:mt-6">
              <ListPagination current={sp} page={page} pageCount={pageCount} basePath={basePath} />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 lg:mt-0">
            <AreaAboutCard area={area} />
            <AreaNearbyList areas={areas} currentSlug={areaSlug} />
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/circles" />
    </div>
  );
}
