// サークルのお気に入り機能向けのSupabaseデータアクセス層。
// Server Component からのみ呼び出す想定（lib/supabase/server.ts を使用）。
// circle_membersと異なり、本人が自由に追加・削除できる（比較検討用）。

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import type { CircleWithRelations } from "@/lib/circles";

export type CircleFavoriteRow = Database["public"]["Tables"]["circle_favorites"]["Row"];

export async function getFavoriteForUser(circleId: string, userId: string): Promise<CircleFavoriteRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circle_favorites")
    .select("*")
    .eq("circle_id", circleId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getFavoriteCircles(userId: string, limit?: number): Promise<CircleWithRelations[]> {
  const supabase = await createClient();
  let query = supabase
    .from("circle_favorites")
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
