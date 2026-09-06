import { MypageHeader } from "@/components/mypage/mypage-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { FirstTimeBox } from "@/components/mypage/first-time-box";
import { ProfileCard } from "@/components/mypage/profile-card";
import { MembershipCard } from "@/components/mypage/membership-card";
import { QuickMenu } from "@/components/mypage/quick-menu";
import { JoinedCirclesSection } from "@/components/mypage/joined-circles-section";
import { UpcomingEventsSection } from "@/components/mypage/upcoming-events-section";
import { NoticesCard } from "@/components/mypage/notices-card";
import { ActivitiesCard } from "@/components/mypage/activities-card";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

export default function MypagePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <MypageHeader />

      <main className="flex-1 lg:grid lg:grid-cols-[212px_minmax(0,1fr)] lg:gap-[18px] lg:p-[18px] lg:pb-[30px]">
        <div className="hidden flex-col gap-4 lg:flex">
          <MypageNavSidebar />
          <FirstTimeBox />
        </div>

        <div className="flex min-w-0 flex-col gap-4 pb-6 pt-3.5 lg:gap-4 lg:pb-0 lg:pt-0">
          <div className="px-3.5 lg:grid lg:grid-cols-[minmax(0,1fr)_232px] lg:items-start lg:gap-3.5 lg:px-0">
            <ProfileCard />
            <div className="mt-3.5 lg:mt-0">
              <MembershipCard />
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_232px] lg:items-start lg:gap-3.5">
            <div className="flex min-w-0 flex-col gap-4 lg:gap-4">
              <div className="px-3.5 lg:px-0">
                <QuickMenu />
              </div>
              <JoinedCirclesSection />
            </div>
            <div className="mt-4 px-3.5 lg:mt-0 lg:px-0">
              <UpcomingEventsSection />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 px-3.5 lg:grid-cols-2 lg:px-0">
            <NoticesCard />
            <ActivitiesCard />
          </div>
        </div>
      </main>

      <MobileBottomNav activeHref="/mypage" messageBadge={3} />
    </div>
  );
}
