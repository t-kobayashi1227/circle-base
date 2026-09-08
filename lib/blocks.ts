import { createClient } from "@/lib/supabase/server";

export interface BlockedUser {
  id: string;
  blockedId: string;
  displayName: string;
  avatarPath: string | null;
  blockedAt: string;
}

export async function getBlockedUsers(userId: string): Promise<BlockedUser[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blocks")
    .select("id, blocked_id, created_at")
    .eq("blocker_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  const rows = data ?? [];
  if (rows.length === 0) return [];

  const blockedIds = [...new Set(rows.map((b) => b.blocked_id))];
  const { data: profiles } = await supabase
    .from("profiles_public")
    .select("id, display_name, avatar_path")
    .in("id", blockedIds);
  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));

  return rows.map((b) => {
    const profile = profileMap.get(b.blocked_id);
    return {
      id: b.id,
      blockedId: b.blocked_id,
      displayName: profile?.display_name ?? "退会済みのユーザー",
      avatarPath: profile?.avatar_path ?? null,
      blockedAt: b.created_at,
    };
  });
}
