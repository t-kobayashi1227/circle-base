import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// SERVICE_ROLE_KEYを使うサーバー専用クライアント。RLSを迂回するため、
// Route Handler等のサーバーコードからのみ呼び出すこと（クライアントコンポーネントで使用禁止）。
export function createAdminClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
