import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNavSidebar } from "@/components/admin/admin-nav-sidebar";
import { AdminMobileBottomNav } from "@/components/admin/admin-mobile-bottom-nav";
import { AreaManager } from "@/components/admin/area-manager";
import { getAreas } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "エリア管理",
};

export default async function AdminAreasPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();
  const [{ data: profile }, areas] = await Promise.all([
    user ? supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle() : Promise.resolve({ data: null }),
    getAreas(),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <AdminHeader adminName={profile?.display_name} />

      <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:items-start">
        <AdminNavSidebar activeHref="/admin/areas" />

        <div className="min-w-0 px-4 pb-6 pt-3 lg:px-6 lg:pb-7 lg:pt-6">
          <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-2xl">エリア管理</h1>
          <p className="mt-2 text-[11.5px] text-cb-muted-2 lg:mt-[9px] lg:text-xs">
            エリア（区）の名称変更、追加、削除ができます。
          </p>

          <div className="mt-4 lg:mt-5">
            <AreaManager areas={areas} />
          </div>
        </div>
      </div>

      <AdminMobileBottomNav activeHref="/admin/areas" />
    </div>
  );
}
