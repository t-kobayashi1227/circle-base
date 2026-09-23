// マイページ（ダッシュボード）向けのSupabaseデータアクセス層。
// Server Component からのみ呼び出す想定（lib/supabase/server.ts を使用）。

import { createClient } from "@/lib/supabase/server";
import type { CircleUpdateRow } from "@/lib/circles";

export interface MypageProfile {
  displayName: string;
  bio: string | null;
  avatarPath: string | null;
  ownedCircleCount: number;
  joinedCircleCount: number;
}

export async function getMypageProfile(userId: string): Promise<MypageProfile> {
  const supabase = await createClient();
  const [{ data: profile, error }, { count: ownedCount }, { count: joinedCount }] = await Promise.all([
    supabase.from("profiles").select("display_name, bio, avatar_path").eq("id", userId).single(),
    supabase.from("circles").select("id", { count: "exact", head: true }).eq("owner_id", userId),
    supabase.from("circle_members").select("circle_id", { count: "exact", head: true }).eq("user_id", userId),
  ]);
  if (error) throw error;

  return {
    displayName: profile.display_name,
    bio: profile.bio,
    avatarPath: profile.avatar_path,
    ownedCircleCount: ownedCount ?? 0,
    joinedCircleCount: joinedCount ?? 0,
  };
}

// ヘッダーのアバター表示専用。プロフィール全体は不要なので avatar_path だけ取得する。
export async function getAvatarPath(userId: string): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("avatar_path").eq("id", userId).single();
  if (error) throw error;
  return data.avatar_path;
}

export interface EditableProfile {
  displayName: string;
  gender: string | null;
  ageRange: string | null;
  area: string | null;
  bio: string | null;
  interests: string[];
  contactEmail: string | null;
  visibility: string;
  avatarPath: string | null;
}

export async function getProfileForEdit(userId: string): Promise<EditableProfile> {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name, gender, age_range, area, bio, interests, contact_email, visibility, avatar_path")
    .eq("id", userId)
    .single();
  if (error) throw error;

  return {
    displayName: profile.display_name,
    gender: profile.gender,
    ageRange: profile.age_range,
    area: profile.area,
    bio: profile.bio,
    interests: profile.interests,
    contactEmail: profile.contact_email,
    visibility: profile.visibility,
    avatarPath: profile.avatar_path,
  };
}

export interface AccountInfo {
  displayName: string;
  gender: string | null;
  birthdate: string;
}

export async function getAccountInfo(userId: string): Promise<AccountInfo> {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name, gender, birthdate")
    .eq("id", userId)
    .single();
  if (error) throw error;

  return {
    displayName: profile.display_name,
    gender: profile.gender,
    birthdate: profile.birthdate,
  };
}

// マイページ「お知らせ」: 参加中サークルの主催者メッセージ（circle_updates.kind = "message"）を横断表示する。
export type MypageNotice = CircleUpdateRow & {
  circle: { id: string; name: string; slug: string } | null;
};

export async function getMypageNotices(userId: string, limit = 5): Promise<MypageNotice[]> {
  const supabase = await createClient();
  const { data: memberships, error: memberError } = await supabase
    .from("circle_members")
    .select("circle_id")
    .eq("user_id", userId);
  if (memberError) throw memberError;

  const circleIds = [...new Set((memberships ?? []).map((m) => m.circle_id))];
  if (circleIds.length === 0) return [];

  const { data, error } = await supabase
    .from("circle_updates")
    .select("*, circle_update_images(*), circle:circles(id, name, slug)")
    .in("circle_id", circleIds)
    .eq("kind", "message")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as MypageNotice[];
}

export async function getNotificationSettings(userId: string): Promise<Record<string, boolean>> {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("notification_settings")
    .eq("id", userId)
    .single();
  if (error) throw error;

  return (profile.notification_settings as Record<string, boolean> | null) ?? {};
}
