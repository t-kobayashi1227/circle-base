"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function UnblockButton({ blockId }: { blockId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleUnblock() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from("blocks").delete().eq("id", blockId);
    setLoading(false);

    if (error) {
      window.alert("解除に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleUnblock}
      disabled={loading}
      className="rounded-lg border border-[#E0D6C6] bg-white px-4 py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark disabled:opacity-60"
    >
      {loading ? "解除中..." : "ブロックを解除"}
    </button>
  );
}
