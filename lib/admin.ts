// 管理画面向けのSupabaseデータアクセス層（Server Componentから利用）。
// 各クエリはRLSの is_admin() 判定に依存するため、呼び出し前に管理者であることを
// レイアウト側（app/admin/(protected)/layout.tsx）で保証すること。
// 型・定数は lib/admin-types.ts に分離済み（クライアントコンポーネントからの参照用）。

import { createClient } from "@/lib/supabase/server";
import type { CircleWithRelations } from "@/lib/circles";
import type { AdminStats, AdminCircleRow, AdminReportRow } from "@/lib/admin-types";

export type { AdminStats, AdminCircleRow, AdminReportRow };

export async function isCurrentUserAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("is_admin").eq("id", userId).maybeSingle();
  return data?.is_admin ?? false;
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient();
  const [usersRes, publishedRes, unpublishedRes, reportsRes] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("circles").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("circles").select("*", { count: "exact", head: true }).eq("status", "unpublished"),
    supabase.from("reports").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  return {
    totalUsers: usersRes.count ?? 0,
    publishedCircles: publishedRes.count ?? 0,
    unpublishedCircles: unpublishedRes.count ?? 0,
    pendingReports: reportsRes.count ?? 0,
  };
}

export async function getAdminCircles(
  filters: { status?: string; q?: string } = {},
): Promise<{ circles: AdminCircleRow[]; total: number }> {
  const supabase = await createClient();
  let query = supabase
    .from("circles")
    .select("*, category:categories(*), area:areas(*), circle_images(*)", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters.status === "published" || filters.status === "unpublished") {
    query = query.eq("status", filters.status);
  }
  const keyword = filters.q?.trim();
  if (keyword) {
    const escaped = keyword.replace(/[%_\\]/g, (m) => `\\${m}`);
    query = query.ilike("name", `%${escaped}%`);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  const circles = (data ?? []) as unknown as CircleWithRelations[];
  const ownerIds = [...new Set(circles.map((c) => c.owner_id))];
  const owners = new Map<string, string>();
  await Promise.all(
    ownerIds.map(async (id) => {
      const { data: profile } = await supabase.from("profiles_public").select("display_name").eq("id", id).maybeSingle();
      owners.set(id, profile?.display_name ?? "不明なユーザー");
    }),
  );

  return {
    circles: circles.map((c) => ({ ...c, ownerDisplayName: owners.get(c.owner_id) ?? "不明なユーザー" })),
    total: count ?? 0,
  };
}

export async function getAdminReports(): Promise<AdminReportRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("reports").select("*").order("created_at", { ascending: false });
  if (error) throw error;

  const results = await Promise.all(
    (data ?? []).map(async (r): Promise<AdminReportRow> => {
      const { data: reporter } = await supabase
        .from("profiles_public")
        .select("display_name")
        .eq("id", r.reporter_id)
        .maybeSingle();

      let targetLabel = "不明";
      let targetHref: string | null = null;
      let targetCircleId: string | null = null;
      let targetCircleStatus: string | null = null;

      if (r.target_type === "circle") {
        const { data: circle } = await supabase
          .from("circles")
          .select("id, name, slug, status")
          .eq("id", r.target_id)
          .maybeSingle();
        targetLabel = circle?.name ?? "削除されたサークル";
        targetHref = circle?.slug ? `/circle/${circle.slug}` : null;
        targetCircleId = circle?.id ?? null;
        targetCircleStatus = circle?.status ?? null;
      } else {
        const { data: profile } = await supabase
          .from("profiles_public")
          .select("display_name")
          .eq("id", r.target_id)
          .maybeSingle();
        targetLabel = profile?.display_name ?? "退会済みのユーザー";
      }

      return {
        id: r.id,
        targetType: r.target_type,
        targetId: r.target_id,
        reason: r.reason,
        status: r.status,
        createdAt: r.created_at,
        reporterDisplayName: reporter?.display_name ?? "不明なユーザー",
        targetLabel,
        targetHref,
        targetCircleId,
        targetCircleStatus,
      };
    }),
  );
  return results;
}
