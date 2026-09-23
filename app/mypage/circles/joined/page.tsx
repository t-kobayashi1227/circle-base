import { MaterialSymbol } from "@/components/icons/material-symbol";
import { OwnedCirclesHeader } from "@/components/mypage/owned-circles-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { JoinedCirclesPromoBox } from "@/components/mypage/joined-circles-promo-box";
import { JoinedCircleCard } from "@/components/mypage/joined-circle-card";
import { JoinedCirclesToolbar } from "@/components/mypage/joined-circles-toolbar";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getJoinedCircles, type JoinedCirclesSort } from "@/lib/circle-members";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "参加中のサークル" };

export default async function JoinedCirclesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const sp = await searchParams;
  const sort: JoinedCirclesSort = sp.sort === "name" ? "name" : "new";
  const user = await getCurrentUser();
  const circles = user ? await getJoinedCircles(user.id, undefined, sort) : [];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <OwnedCirclesHeader />

      <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[34px] border-r border-cb-border bg-cb-header py-4 lg:flex">
          <MypageNavSidebar activeHref="/mypage/circles/joined" />
          <JoinedCirclesPromoBox />
        </div>

        <div className="min-w-0 lg:px-7 lg:pb-8 lg:pt-[22px]">
          <div className="px-3.5 pt-3.5 lg:px-0 lg:pt-0">
            <h1 className="flex items-center gap-2 font-heading text-lg font-bold text-cb-ink lg:text-[19px]">
              <MaterialSymbol name="group" filled size={20} className="text-cb-accent lg:text-[22px]" />
              参加中のサークル
              <span className="text-sm font-medium text-cb-muted-2 lg:text-[15px]">{circles.length}件</span>
            </h1>
            <p className="mt-2.5 text-xs leading-[1.8] text-cb-muted-2">
              <span className="lg:hidden">現在参加しているサークルの一覧です。</span>
              <span className="hidden lg:inline">
                現在参加しているサークルの一覧です。開催予定のイベントを確認したり、メンバーとメッセージでやりとりできます。
              </span>
            </p>
          </div>

          {circles.length === 0 ? (
            <p className="mt-6 px-3.5 text-center text-[12.5px] text-cb-muted lg:px-0">
              まだ参加しているサークルがありません。「サークルを探す」から気になるサークルを見つけてみましょう。
            </p>
          ) : (
            <>
              <div className="mt-[22px] px-3.5 lg:mt-6 lg:px-0">
                <JoinedCirclesToolbar sort={sort} />
              </div>
              <div className="mt-3.5 flex flex-col gap-3.5 px-3.5 pb-6 lg:px-0 lg:pb-0">
                {circles.map((circle) => (
                  <JoinedCircleCard key={circle.id} circle={circle} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
