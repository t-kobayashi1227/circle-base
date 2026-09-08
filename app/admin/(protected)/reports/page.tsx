import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNavSidebar } from "@/components/admin/admin-nav-sidebar";
import { AdminMobileBottomNav } from "@/components/admin/admin-mobile-bottom-nav";
import { ReportManagement } from "@/components/admin/reports/report-management";
import { getAdminReports } from "@/lib/admin";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "通報管理",
};

export default async function AdminReportsPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();
  const [{ data: profile }, reports] = await Promise.all([
    user ? supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle() : Promise.resolve({ data: null }),
    getAdminReports(),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <AdminHeader adminName={profile?.display_name} />

      <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:items-start">
        <AdminNavSidebar activeHref="/admin/reports" />

        <div className="min-w-0">
          <div className="px-4 pb-6 pt-3 lg:px-6 lg:pb-0 lg:pt-6">
            <ReportManagement reports={reports} />
          </div>

          <div className="hidden pb-[22px] pt-6 text-center text-[11px] text-cb-muted-3 lg:block">
            © にいがたサークルベース
          </div>
        </div>
      </div>

      <AdminMobileBottomNav activeHref="/admin/reports" />
    </div>
  );
}
