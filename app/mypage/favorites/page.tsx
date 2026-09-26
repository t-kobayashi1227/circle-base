import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { OwnedCirclesHeader } from "@/components/mypage/owned-circles-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { FavoritesHero } from "@/components/favorites/favorites-hero";
import { FavoritesToolbar } from "@/components/favorites/favorites-toolbar";
import { favoritesHref, type FavoritesFilter } from "@/components/favorites/favorites-href";
import { FavoriteCircleCard } from "@/components/favorites/favorite-circle-card";
import { FavoriteEventCard } from "@/components/favorites/favorite-event-card";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getFavoriteCircles, type FavoritesSort } from "@/lib/circle-favorites";
import { getCurrentUser } from "@/lib/auth";
import type { CircleWithRelations } from "@/lib/circles";

export const metadata = { title: "お気に入り" };

// 「すべて」タブで各セクションに表示する上限。超えた分は「すべて見る」で種別タブへ誘導する。
const CIRCLE_PREVIEW_LIMIT = 8;
const EVENT_PREVIEW_LIMIT = 4;

function SectionHeading({ label, count, moreHref }: { label: string; count: number; moreHref?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h2 className="flex items-center gap-[7px] font-heading text-[15px] font-bold text-cb-ink lg:gap-2 lg:text-[17px]">
        <MaterialSymbol name="favorite" filled size={17} className="text-cb-accent lg:text-[19px]" />
        {label}（{count}）
      </h2>
      {moreHref ? (
        <Link
          href={moreHref}
          className="flex items-center gap-[3px] text-[11px] font-medium text-cb-accent-dark hover:text-[#8E5606] lg:gap-1 lg:text-xs"
        >
          すべて見る
          <MaterialSymbol name="chevron_right" size={15} />
        </Link>
      ) : null}
    </div>
  );
}

function CircleGrid({ circles }: { circles: CircleWithRelations[] }) {
  return (
    <div className="mt-3 flex flex-col gap-3.5 lg:mt-3.5 lg:grid lg:grid-cols-4">
      {circles.map((circle) => (
        <FavoriteCircleCard key={circle.id} circle={circle} />
      ))}
    </div>
  );
}

function EventGrid({ events }: { events: CircleWithRelations[] }) {
  return (
    <div className="mt-3 flex flex-col gap-3.5 lg:mt-3.5 lg:grid lg:grid-cols-2">
      {events.map((circle) => (
        <FavoriteEventCard key={circle.id} circle={circle} />
      ))}
    </div>
  );
}

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const filter: FavoritesFilter = sp.type === "circle" || sp.type === "event" ? sp.type : "all";
  const sort: FavoritesSort = sp.sort === "old" ? "old" : "new";

  const user = await getCurrentUser();
  const favorites = user ? await getFavoriteCircles(user.id, undefined, sort) : [];
  const circles = favorites.filter((c) => c.type !== "one_time");
  const events = favorites.filter((c) => c.type === "one_time");
  const counts = { all: favorites.length, circle: circles.length, event: events.length };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <OwnedCirclesHeader />
      <FavoritesHero />

      <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[34px] border-r border-cb-border bg-cb-header py-4 lg:flex">
          <MypageNavSidebar activeHref="/mypage/favorites" />
        </div>

        <div className="min-w-0 px-[18px] pb-6 lg:px-7 lg:pb-8 lg:pt-[18px]">
          <nav
            aria-label="パンくずリスト"
            className="flex items-center gap-1.5 py-3 text-[10.5px] text-cb-muted-3 lg:gap-2 lg:pb-3 lg:pt-0 lg:text-[11.5px]"
          >
            <Link href="/" className="hover:text-cb-accent">
              ホーム
            </Link>
            <MaterialSymbol name="chevron_right" size={14} />
            <Link href="/mypage" className="hover:text-cb-accent">
              マイページ
            </Link>
            <MaterialSymbol name="chevron_right" size={14} />
            <span className="font-medium text-cb-ink-soft">お気に入り</span>
          </nav>

          <div className="flex gap-3 rounded-xl border border-[#F2E4CB] bg-[#FDF6EA] px-4 py-[15px] lg:gap-3.5 lg:px-5 lg:py-[18px]">
            <MaterialSymbol name="favorite" filled size={19} className="shrink-0 text-cb-accent lg:text-[22px]" />
            <p className="text-[11.5px] leading-[1.85] text-cb-ink-soft lg:text-[12.5px] lg:leading-[1.9]">
              気になるサークルやイベントをお気に入りに登録できます。
              <br className="hidden lg:inline" />
              また参加したいサークルや、気になるイベントを見つけたときに、すぐに確認できます。
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-cb-border bg-white px-5 py-10 text-center">
              <p className="text-[12.5px] leading-[1.8] text-cb-muted">
                まだお気に入りに登録したサークル・イベントはありません。
                <br />
                サークル詳細ページの「お気に入り」ボタンから登録できます。
              </p>
              <Link
                href="/circles"
                className="rounded-lg bg-cb-accent px-5 py-2.5 text-[13px] font-bold text-white hover:bg-cb-accent-hover"
              >
                サークルを探す
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-4 lg:mt-[18px]">
                <FavoritesToolbar filter={filter} sort={sort} counts={counts} />
              </div>

              {filter === "all" ? (
                <>
                  {circles.length > 0 ? (
                    <section className="mt-[22px] lg:mt-[26px]">
                      <SectionHeading
                        label="サークル"
                        count={circles.length}
                        moreHref={circles.length > CIRCLE_PREVIEW_LIMIT ? favoritesHref("circle", sort) : undefined}
                      />
                      <CircleGrid circles={circles.slice(0, CIRCLE_PREVIEW_LIMIT)} />
                    </section>
                  ) : null}
                  {events.length > 0 ? (
                    <section className="mt-[22px] lg:mt-[26px]">
                      <SectionHeading
                        label="イベント"
                        count={events.length}
                        moreHref={events.length > EVENT_PREVIEW_LIMIT ? favoritesHref("event", sort) : undefined}
                      />
                      <EventGrid events={events.slice(0, EVENT_PREVIEW_LIMIT)} />
                    </section>
                  ) : null}
                </>
              ) : (
                <section className="mt-[22px] lg:mt-[26px]">
                  <SectionHeading label={filter === "circle" ? "サークル" : "イベント"} count={counts[filter]} />
                  {counts[filter] === 0 ? (
                    <p className="mt-4 text-center text-[12.5px] text-cb-muted">
                      お気に入りに登録した{filter === "circle" ? "サークル" : "イベント"}はありません。
                    </p>
                  ) : filter === "circle" ? (
                    <CircleGrid circles={circles} />
                  ) : (
                    <EventGrid events={events} />
                  )}
                </section>
              )}
            </>
          )}
        </div>
      </div>

      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
