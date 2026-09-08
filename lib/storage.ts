import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const BUCKET = "circle-media";

function extensionOf(file: File): string {
  const fromName = file.name.split(".").pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  return file.type === "image/png" ? "png" : "jpg";
}

// アップロードパスは必ず `{アップロード者のuid}/...` から始める
// （supabase/migrations/20260907000001_storage.sql のRLSがパス先頭のuidで書き込み権限を判定するため）。
export async function uploadCircleMedia(
  supabase: SupabaseClient<Database>,
  userId: string,
  folder: "circles" | "updates" | "avatar",
  file: File,
): Promise<string> {
  const path = `${userId}/${folder}/${crypto.randomUUID()}.${extensionOf(file)}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  return path;
}

// 公開バケットのため署名不要。Server/Client どちらからも呼べる純粋関数として提供する。
export function publicMediaUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
