"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center gap-[11px] px-4 py-[11px] text-left text-[12.5px] text-cb-ink-soft hover:bg-[#FDF7EE] disabled:opacity-60"
    >
      <MaterialSymbol name="logout" size={18} className="text-cb-muted-3" />
      {loading ? "ログアウト中..." : "ログアウト"}
    </button>
  );
}
