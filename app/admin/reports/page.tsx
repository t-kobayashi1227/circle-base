import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNavSidebar } from "@/components/admin/admin-nav-sidebar";
import { AdminMobileBottomNav } from "@/components/admin/admin-mobile-bottom-nav";
import { ReportManagement } from "@/components/admin/reports/report-management";

export const metadata: Metadata = {
  title: "通報管理",
};

// 実運用では管理者権限のないユーザーをここでリダイレクトする（Supabase Auth接続後に実装）。
export default function AdminReportsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <AdminHeader />

      <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:items-start">
        <AdminNavSidebar activeHref="/admin/reports" />

        <div className="min-w-0">
          <div className="px-4 pb-6 pt-3 lg:px-6 lg:pb-0 lg:pt-6">
            <ReportManagement />
          </div>

          <div className="hidden pb-[22px] pt-6 text-center text-[11px] text-cb-muted-3 lg:block">
            © 2024 にいがたサークルベース
          </div>
        </div>
      </div>

      <AdminMobileBottomNav activeHref="/admin/reports" />
    </div>
  );
}
