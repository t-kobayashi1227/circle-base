import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNavSidebar } from "@/components/admin/admin-nav-sidebar";
import { AdminMobileBottomNav } from "@/components/admin/admin-mobile-bottom-nav";
import { DateRangeFilter } from "@/components/admin/date-range-filter";
import { StatCards } from "@/components/admin/stat-cards";
import { UserGrowthChart } from "@/components/admin/user-growth-chart";
import { CircleApplicationsCard } from "@/components/admin/circle-applications-card";
import { ReportsCard } from "@/components/admin/reports-card";
import { AdminNoticesCard } from "@/components/admin/admin-notices-card";

export const metadata: Metadata = {
  title: "管理者ダッシュボード",
};

// 実運用では管理者権限のないユーザーをここでリダイレクトする（Supabase Auth接続後に実装）。
export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <AdminHeader />

      <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:items-start">
        <AdminNavSidebar activeHref="/admin" />

        <div className="min-w-0">
          <div className="bg-cb-header px-4 pb-4 pt-3 lg:bg-transparent lg:px-6 lg:pb-0 lg:pt-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h1 className="font-heading text-[23px] font-bold text-[#2F2B24] lg:text-[25px]">
                  ダッシュボード
                </h1>
                <p className="mt-2 text-xs text-cb-muted-2 lg:mt-[9px] lg:text-[12.5px]">
                  サイト全体の状況を確認できます。
                </p>
              </div>
              <div className="hidden lg:block">
                <DateRangeFilter />
              </div>
            </div>
            <div className="mt-4 lg:hidden">
              <DateRangeFilter />
            </div>
          </div>

          <div className="px-3.5 pt-4 lg:px-6 lg:pt-[18px]">
            <StatCards />
          </div>

          <div className="mt-3.5 grid grid-cols-1 gap-3.5 px-3.5 lg:mt-3.5 lg:grid-cols-2 lg:px-6">
            <UserGrowthChart />
            <CircleApplicationsCard />
          </div>

          <div className="mt-3.5 grid grid-cols-1 gap-3.5 px-3.5 pb-6 lg:mt-3.5 lg:grid-cols-2 lg:px-6 lg:pb-[22px]">
            <ReportsCard />
            <AdminNoticesCard />
          </div>

          <div className="hidden pb-[22px] text-center text-[11px] text-cb-muted-3 lg:block">
            © 2024 にいがたサークルベース
          </div>
        </div>
      </div>

      <AdminMobileBottomNav activeHref="/admin" />
    </div>
  );
}
