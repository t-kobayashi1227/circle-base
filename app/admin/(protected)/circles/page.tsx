import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNavSidebar } from "@/components/admin/admin-nav-sidebar";
import { AdminMobileBottomNav } from "@/components/admin/admin-mobile-bottom-nav";
import { AdminCircleRowItem } from "@/components/admin/admin-circle-row";
import { getAdminCircles } from "@/lib/admin";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "サークル管理",
};

const statusTabs = [
  { key: "", label: "すべて" },
  { key: "published", label: "公開中" },
  { key: "unpublished", label: "非公開" },
];

export default async function AdminCirclesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const user = await getCurrentUser();
  const supabase = await createClient();
  const [{ data: profile }, { circles, total }] = await Promise.all([
    user ? supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle() : Promise.resolve({ data: null }),
    getAdminCircles({ status: sp.status, q: sp.q }),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <AdminHeader adminName={profile?.display_name} />

      <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:items-start">
        <AdminNavSidebar activeHref="/admin/circles" />

        <div className="min-w-0">
          <div className="bg-cb-header px-4 pb-4 pt-3 lg:bg-transparent lg:px-6 lg:pb-0 lg:pt-6">
            <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-2xl">サークル管理</h1>
            <p className="mt-2 text-[11.5px] text-cb-muted-2 lg:mt-[9px] lg:text-xs">
              全{total}件。公開状態の変更・削除ができます。
            </p>
          </div>

          <div className="px-4 pt-4 lg:px-6 lg:pt-[18px]">
            <form method="get" className="flex flex-wrap items-center gap-2.5">
              {statusTabs.map((tab) => (
                <a
                  key={tab.key}
                  href={tab.key ? `/admin/circles?status=${tab.key}` : "/admin/circles"}
                  className={`whitespace-nowrap rounded-lg border px-3.5 py-2 text-[12px] ${
                    (sp.status ?? "") === tab.key
                      ? "border-cb-accent bg-cb-accent-soft font-bold text-cb-accent-dark"
                      : "border-cb-input-border bg-white text-cb-ink-soft"
                  }`}
                >
                  {tab.label}
                </a>
              ))}
              {sp.status ? <input type="hidden" name="status" value={sp.status} /> : null}
              <input
                type="text"
                name="q"
                defaultValue={sp.q ?? ""}
                placeholder="サークル名で検索"
                className="ml-auto min-w-0 flex-1 rounded-lg border border-cb-input-border bg-white px-3.5 py-2 text-[12px] text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:max-w-[240px]"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-cb-accent px-4 py-2 text-[12px] font-bold text-white hover:bg-cb-accent-hover"
              >
                検索
              </button>
            </form>
          </div>

          <div className="mt-3.5 px-4 pb-6 lg:px-6 lg:pb-7">
            {circles.length === 0 ? (
              <p className="mt-6 text-center text-[12.5px] text-cb-muted">該当するサークルはありません。</p>
            ) : (
              <div className="rounded-xl border border-cb-border bg-cb-surface px-2">
                {circles.map((circle) => (
                  <AdminCircleRowItem key={circle.id} circle={circle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AdminMobileBottomNav activeHref="/admin/circles" />
    </div>
  );
}
