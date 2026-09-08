import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// クッキー（ユーザーセッション）に依存しない匿名クライアント。
// sitemap.ts など、リクエストのCookieコンテキストを持たない/持つべきでない
// 公開データ専用の場所から利用する。
export function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
