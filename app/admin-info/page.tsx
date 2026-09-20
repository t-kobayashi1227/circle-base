import type { Metadata } from "next";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { AdminInfoHero } from "@/components/admin-info/admin-info-hero";
import { AdminInfoContent } from "@/components/admin-info/admin-info-content";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

export const metadata: Metadata = {
  title: "サイト管理者情報",
};

export default function AdminInfoPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader />

      <main className="flex-1 bg-white">
        <ListBreadcrumb items={[{ label: "ホーム", href: "/" }]} current="サイト管理者情報" />

        <AdminInfoHero />

        <div className="mt-4 lg:mt-5">
          <AdminInfoContent />
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
