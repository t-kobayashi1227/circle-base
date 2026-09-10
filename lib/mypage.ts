// マイページ（ダッシュボード）向けのSupabaseデータアクセス層。
// Server Component からのみ呼び出す想定（lib/supabase/server.ts を使用）。

import { createClient } from "@/lib/supabase/server";

export interface MypageProfile {
  displayName: string;
  bio: string | null;
  avatarPath: string | null;
  ownedCircleCount: number;
}

export async function getMypageProfile(userId: string): Promise<MypageProfile> {
  const supabase = await createClient();
  const [{ data: profile, error }, { count }] = await Promise.all([
    supabase.from("profiles").select("display_name, bio, avatar_path").eq("id", userId).single(),
    supabase.from("circles").select("id", { count: "exact", head: true }).eq("owner_id", userId),
  ]);
  if (error) throw error;

  return {
    displayName: profile.display_name,
    bio: profile.bio,
    avatarPath: profile.avatar_path,
    ownedCircleCount: count ?? 0,
  };
}

export interface EditableProfile {
  displayName: string;
  gender: string | null;
  ageRange: string | null;
  area: string | null;
  bio: string | null;
  interests: string[];
  visibility: string;
  avatarPath: string | null;
}

export async function getProfileForEdit(userId: string): Promise<EditableProfile> {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name, gender, age_range, area, bio, interests, visibility, avatar_path")
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
    visibility: profile.visibility,
    avatarPath: profile.avatar_path,
  };
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
