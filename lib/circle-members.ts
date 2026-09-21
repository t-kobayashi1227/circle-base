// サークル参加者管理（招待制）向けのSupabaseデータアクセス層。
// Server Component からのみ呼び出す想定（lib/supabase/server.ts を使用）。
// 参加希望者が自分で申請するのではなく、主催者がメッセージでのやり取りを経て
// 「参加者にする」を実行することでメンバーとして登録される。

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import type { CircleWithRelations } from "@/lib/circles";

export type CircleMemberRow = Database["public"]["Tables"]["circle_members"]["Row"];
type ProfilePublicRow = Database["public"]["Views"]["profiles_public"]["Row"];

export type CircleMemberWithUser = CircleMemberRow & { user: ProfilePublicRow | null };

export async function getMembershipForUser(circleId: string, userId: string): Promise<CircleMemberRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circle_members")
    .select("*")
    .eq("circle_id", circleId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getCircleMembers(circleId: string): Promise<CircleMemberWithUser[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circle_members")
    .select("*, user:profiles_public(*)")
    .eq("circle_id", circleId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as CircleMemberWithUser[];
}

export async function getJoinedCircles(userId: string, limit?: number): Promise<CircleWithRelations[]> {
  const supabase = await createClient();
  let query = supabase
    .from("circle_members")
    .select("created_at, circle:circles(*, category:categories(*), area:areas(*), circle_images(*))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;

  return ((data ?? []) as unknown as { circle: CircleWithRelations | null }[])
    .map((row) => row.circle)
    .filter((circle): circle is CircleWithRelations => circle !== null);
}
