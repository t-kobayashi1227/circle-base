import { ListHeader } from "@/components/circles-list/list-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { FilterSidebar } from "@/components/circles-list/filter-sidebar";
import { SearchToolbar } from "@/components/circles-list/search-toolbar";
import { ActiveFilterChips } from "@/components/circles-list/active-filter-chips";
import { SortBar } from "@/components/circles-list/sort-bar";
import { CircleListCard } from "@/components/circles-list/circle-list-card";
import { ListPagination } from "@/components/circles-list/list-pagination";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { listCircles } from "@/lib/circles-list-mock-data";

export default function CirclesPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ListHeader />

      <main className="flex-1">
        <ListBreadcrumb items={[{ label: "ホーム", href: "/" }, { label: "サークルを探す", href: "/circles" }]} current="検索結果" />

        <div className="px-[18px] pt-3.5 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start lg:gap-[26px] lg:px-7 lg:pt-1.5 lg:pb-[34px]">
          <FilterSidebar />

          <div className="min-w-0">
            <h1 className="font-heading text-[25px] font-bold text-[#2F2B24]">サークル一覧</h1>
            <p className="mt-[9px] text-[11.5px] text-cb-muted-2 lg:text-[12.5px]">
              128件のサークルが見つかりました
            </p>

            <div className="mt-4 lg:mt-[22px]">
              <SearchToolbar />
            </div>

            <ActiveFilterChips />

            <SortBar />

            {/* デスクトップ: 全件グリッド */}
            <div className="mt-4 hidden lg:grid lg:grid-cols-4 lg:gap-3.5">
              {listCircles.map((circle) => (
                <CircleListCard key={circle.id} circle={circle} />
              ))}
            </div>

            {/* モバイル: 先頭4件（「もっと見る」で追加読み込み） */}
            <div className="mt-4 flex flex-col gap-3.5 lg:hidden">
              {listCircles.slice(0, 4).map((circle) => (
                <CircleListCard key={circle.id} circle={circle} />
              ))}
            </div>

            <div className="mt-4 lg:mt-0">
              <ListPagination />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/circles" messageBadge={3} />
    </div>
  );
}
