// メッセージ機能向けのSupabaseデータアクセス層（Server Componentから利用）。

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type ConversationRow = Database["public"]["Tables"]["conversations"]["Row"];
export type MessageRow = Database["public"]["Tables"]["messages"]["Row"];

export interface ConversationSummary {
  id: string;
  circleId: string | null;
  circleName: string | null;
  circleSlug: string | null;
  isCircleOwner: boolean;
  otherUserId: string;
  otherDisplayName: string;
  otherAvatarPath: string | null;
  lastMessage: string | null;
  lastMessageAt: string;
}

export async function getConversations(userId: string): Promise<ConversationSummary[]> {
  const supabase = await createClient();
  const { data: convs, error } = await supabase
    .from("conversations")
    .select("*, circle:circles(id, name, slug, owner_id)")
    .or(`participant_a.eq.${userId},participant_b.eq.${userId}`)
    .order("updated_at", { ascending: false });
  if (error) throw error;

  const rows = (convs ?? []) as (ConversationRow & {
    circle: { id: string; name: string; slug: string; owner_id: string } | null;
  })[];
  if (rows.length === 0) return [];

  const otherUserIds = [...new Set(rows.map((c) => (c.participant_a === userId ? c.participant_b : c.participant_a)))];
  const conversationIds = rows.map((c) => c.id);

  const [{ data: profiles }, { data: messages }] = await Promise.all([
    supabase.from("profiles_public").select("id, display_name, avatar_path").in("id", otherUserIds),
    supabase
      .from("messages")
      .select("conversation_id, content, created_at")
      .in("conversation_id", conversationIds)
      .order("created_at", { ascending: false }),
  ]);

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
  const lastMessageMap = new Map<string, { content: string; created_at: string }>();
  for (const m of messages ?? []) {
    if (!lastMessageMap.has(m.conversation_id)) {
      lastMessageMap.set(m.conversation_id, m);
    }
  }

  return rows.map((c) => {
    const otherUserId = c.participant_a === userId ? c.participant_b : c.participant_a;
    const profile = profileMap.get(otherUserId);
    const lastMsg = lastMessageMap.get(c.id);
    return {
      id: c.id,
      circleId: c.circle?.id ?? null,
      circleName: c.circle?.name ?? null,
      circleSlug: c.circle?.slug ?? null,
      isCircleOwner: c.circle?.owner_id === userId,
      otherUserId,
      otherDisplayName: profile?.display_name ?? "退会済みのユーザー",
      otherAvatarPath: profile?.avatar_path ?? null,
      lastMessage: lastMsg?.content ?? null,
      lastMessageAt: lastMsg?.created_at ?? c.updated_at,
    };
  });
}

export async function getConversationSummary(
  conversationId: string,
  userId: string,
): Promise<ConversationSummary | null> {
  const all = await getConversations(userId);
  return all.find((c) => c.id === conversationId) ?? null;
}

export async function getMessages(conversationId: string): Promise<MessageRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
