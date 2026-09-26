import { MypageHeader } from "@/components/mypage/mypage-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { ProfileCard } from "@/components/mypage/profile-card";
import { QuickMenu } from "@/components/mypage/quick-menu";
import { JoinedCirclesSection } from "@/components/mypage/joined-circles-section";
import { NoticesCard } from "@/components/mypage/notices-card";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getCurrentUser } from "@/lib/auth";
import { getMypageProfile } from "@/lib/mypage";

export default async function MypagePage() {
  const user = await getCurrentUser();
  const profile = user
    ? await getMypageProfile(user.id)
    : { displayName: "ゲスト", bio: null, avatarPath: null, ownedCircleCount: 0, joinedCircleCount: 0 };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <MypageHeader />

      <main className="flex-1 lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[34px] border-r border-cb-border bg-cb-header py-4 lg:flex">
          <MypageNavSidebar />
        </div>

        <div className="flex min-w-0 flex-col gap-4 pb-6 pt-3.5 lg:gap-4 lg:pb-[30px] lg:pl-[18px] lg:pr-[18px] lg:pt-[18px]">
          <div className="px-3.5 lg:px-0">
            <ProfileCard profile={profile} />
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:gap-4">
            <div className="px-3.5 lg:px-0">
              <QuickMenu />
            </div>
            <JoinedCirclesSection />
          </div>

          <div className="px-3.5 lg:px-0">
            <NoticesCard />
          </div>
        </div>
      </main>

      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
