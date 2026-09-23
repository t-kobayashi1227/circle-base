import Link from "next/link";
import { OwnedCirclesHeader } from "@/components/mypage/owned-circles-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { OwnerHintBox } from "@/components/mypage/owner-hint-box";
import { OwnedStatsCards } from "@/components/mypage/owned-stats-cards";
import { OwnedCirclesToolbar } from "@/components/mypage/owned-circles-toolbar";
import { OwnedCircleCard } from "@/components/mypage/owned-circle-card";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getOwnedCircles, type OwnedCirclesSort } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "主催中のサークル" };

export default async function OwnedCirclesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const sp = await searchParams;
  const sort: OwnedCirclesSort = sp.sort === "name" ? "name" : "new";
  const user = await getCurrentUser();
  const circles = user ? await getOwnedCircles(user.id, sort) : [];
  const publishedCount = circles.filter((c) => c.status === "published").length;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <OwnedCirclesHeader />

      <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[34px] border-r border-cb-border bg-cb-header py-4 lg:flex">
          <MypageNavSidebar activeHref="/mypage/circles/owned" />
          <OwnerHintBox />
        </div>

        <div className="min-w-0">
          <div className="bg-cb-header px-[18px] pb-4 pt-3 lg:bg-transparent lg:px-6 lg:pb-0 lg:pt-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-[26px]">
                  主催中のサークル管理
                </h1>
                <p className="mt-2 text-xs text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px]">
                  <span className="lg:hidden">あなたが主催しているサークルの一覧です。</span>
                  <span className="hidden lg:inline">
                    あなたが主催しているサークルの一覧です。サークルの編集や活動投稿ができます。
                  </span>
                </p>
              </div>
              <Link
                href="/mypage/circles/new"
                className="hidden shrink-0 whitespace-nowrap rounded-lg border border-cb-accent bg-white px-5 py-[13px] text-[13px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft lg:block"
              >
                新しいサークルを作成
              </Link>
            </div>
            <Link
              href="/mypage/circles/new"
              className="mt-4 flex min-h-[50px] items-center justify-center rounded-[9px] border border-cb-accent text-[13.5px] font-bold text-cb-accent-dark lg:hidden"
            >
              新しいサークルを作成
            </Link>
          </div>

          <div className="px-3.5 pt-4 lg:px-6 lg:pt-[18px]">
            <OwnedStatsCards total={circles.length} published={publishedCount} />
          </div>

          <div className="mt-[22px] px-3.5 lg:mt-6 lg:px-6">
            <OwnedCirclesToolbar sort={sort} />
          </div>

          {circles.length === 0 ? (
            <p className="mt-6 px-3.5 pb-6 text-center text-[12.5px] text-cb-muted lg:px-6 lg:pb-7">
              まだサークルを作成していません。「新しいサークルを作成」から最初のサークルを掲載してみましょう。
            </p>
          ) : (
            <div className="mt-3.5 flex flex-col gap-3 px-3.5 pb-6 lg:mt-3.5 lg:gap-3.5 lg:px-6 lg:pb-7">
              {circles.map((circle) => (
                <OwnedCircleCard key={circle.id} circle={circle} />
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
