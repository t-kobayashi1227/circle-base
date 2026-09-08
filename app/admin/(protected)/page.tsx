import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNavSidebar } from "@/components/admin/admin-nav-sidebar";
import { AdminMobileBottomNav } from "@/components/admin/admin-mobile-bottom-nav";
import { StatCards } from "@/components/admin/stat-cards";
import { ReportsCard } from "@/components/admin/reports-card";
import { getAdminStats, getAdminReports } from "@/lib/admin";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "管理者ダッシュボード",
};

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();
  const [{ data: profile }, stats, reports] = await Promise.all([
    user
      ? supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle()
      : Promise.resolve({ data: null }),
    getAdminStats(),
    getAdminReports(),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <AdminHeader adminName={profile?.display_name} />

      <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:items-start">
        <AdminNavSidebar activeHref="/admin" />

        <div className="min-w-0">
          <div className="bg-cb-header px-4 pb-4 pt-3 lg:bg-transparent lg:px-6 lg:pb-0 lg:pt-6">
            <h1 className="font-heading text-[23px] font-bold text-[#2F2B24] lg:text-[25px]">ダッシュボード</h1>
            <p className="mt-2 text-xs text-cb-muted-2 lg:mt-[9px] lg:text-[12.5px]">サイト全体の状況を確認できます。</p>
          </div>

          <div className="px-3.5 pt-4 lg:px-6 lg:pt-[18px]">
            <StatCards stats={stats} />
          </div>

          <div className="mt-3.5 px-3.5 pb-6 lg:mt-3.5 lg:max-w-[520px] lg:px-6 lg:pb-[22px]">
            <ReportsCard reports={reports} />
          </div>

          <div className="hidden pb-[22px] text-center text-[11px] text-cb-muted-3 lg:block">
            © にいがたサークルベース
          </div>
        </div>
      </div>

      <AdminMobileBottomNav activeHref="/admin" />
    </div>
  );
}
