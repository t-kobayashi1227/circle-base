import type { Metadata } from "next";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { NoticesHero } from "@/components/notices/notices-hero";
import { NoticesList } from "@/components/notices/notices-list";
import { NoticesInfoBox } from "@/components/notices/notices-info-box";
import { LegalSkylineBanner } from "@/components/legal/legal-skyline-banner";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getAllNotices } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "お知らせ",
};

export default async function NoticesPage() {
  const notices = await getAllNotices();
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader />

      <main className="flex-1 bg-white">
        <ListBreadcrumb items={[{ label: "ホーム", href: "/" }]} current="お知らせ" />

        <NoticesHero />

        <div className="px-[18px] pb-2 pt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-5 lg:px-7 lg:pb-2 lg:pt-[18px]">
          <NoticesList notices={notices} />
          <div className="mt-4 lg:mt-0">
            <NoticesInfoBox />
          </div>
        </div>

        <LegalSkylineBanner />
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/notices" />
    </div>
  );
}
