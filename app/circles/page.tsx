import { ListHeader } from "@/components/circles-list/list-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { FilterSidebar } from "@/components/circles-list/filter-sidebar";
import { SearchToolbar } from "@/components/circles-list/search-toolbar";
import { ActiveFilterChips } from "@/components/circles-list/active-filter-chips";
import { SortSelect } from "@/components/circles-list/sort-select";
import { CircleListCard } from "@/components/circles-list/circle-list-card";
import { ListPagination } from "@/components/circles-list/list-pagination";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getAreas, getCategoryTree, getCircles } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";
import { LIST_TYPES, parseListType, type ListParams } from "@/lib/url-params";

export const metadata = {
  title: "サークルを探す",
  description: "新潟市内のサークル・イベントをエリア・カテゴリ・キーワードで検索できます。",
};

export default async function CirclesPage({
  searchParams,
}: {
  searchParams: Promise<ListParams>;
}) {
  const sp = await searchParams;
  const sort = sp.sort === "updated" ? "updated" : "new";
  const page = Number(sp.page) > 0 ? Number(sp.page) : 1;
  const type = parseListType(sp.type);
  const noun = type ? LIST_TYPES[type].label : "サークル・イベント";

  const [{ circles, total, pageCount }, categoryTree, areas, user] = await Promise.all([
    getCircles({ type: type && LIST_TYPES[type].dbType, categorySlug: sp.category, areaSlug: sp.area, keyword: sp.q, sort, page }),
    getCategoryTree(),
    getAreas(),
    getCurrentUser(),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ListHeader isLoggedIn={!!user} activeType={type} />

      <main className="flex-1">
        <ListBreadcrumb items={[{ label: "ホーム", href: "/" }, { label: "サークルを探す", href: "/circles" }]} current="検索結果" />

        <div className="px-[18px] pt-3.5 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start lg:gap-[26px] lg:px-7 lg:pt-1.5 lg:pb-[34px]">
          <FilterSidebar categoryTree={categoryTree} areas={areas} current={sp} />

          <div className="min-w-0">
            <h1 className="font-heading text-[25px] font-bold text-[#2F2B24]">{noun}一覧</h1>
            <p className="mt-[9px] text-[11.5px] text-cb-muted-2 lg:text-[12.5px]">{total}件の{noun}が見つかりました</p>

            <div className="mt-4 lg:mt-[22px]">
              <SearchToolbar current={sp} categoryTree={categoryTree} areas={areas} />
            </div>

            <ActiveFilterChips current={sp} categoryTree={categoryTree} areas={areas} />

            <SortSelect current={sp} sort={sort} />

            {circles.length === 0 ? (
              <p className="mt-10 text-center text-[12.5px] text-cb-muted">
                条件に一致する{noun}が見つかりませんでした。条件を変えて検索してみてください。
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-3.5 lg:grid-cols-4">
                {circles.map((circle) => (
                  <CircleListCard key={circle.id} circle={circle} />
                ))}
              </div>
            )}

            <div className="mt-4 lg:mt-6">
              <ListPagination current={sp} page={page} pageCount={pageCount} />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/circles" />
    </div>
  );
}
