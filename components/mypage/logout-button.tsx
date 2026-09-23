"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        disabled={loading}
        className="flex w-full items-center gap-[11px] px-4 py-[11px] text-left text-[12.5px] text-cb-ink-soft hover:bg-[#FDF7EE] disabled:opacity-60"
      >
        <MaterialSymbol name="logout" size={18} className="text-cb-muted-3" />
        {loading ? "ログアウト中..." : "ログアウト"}
      </button>

      {confirmOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            className="w-full max-w-[360px] rounded-xl bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-heading text-[15px] font-bold text-cb-ink">ログアウトしますか？</h2>
            <p className="mt-2 text-[11.5px] leading-[1.7] text-cb-muted-2">
              現在のアカウントからログアウトします。
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-lg border border-[#E0D6C6] bg-white py-3 text-[12.5px] font-medium text-cb-ink-soft"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="rounded-lg bg-[#D9534F] py-3 text-[12.5px] font-bold text-white hover:bg-[#C5453A] disabled:opacity-60"
              >
                {loading ? "ログアウト中..." : "ログアウトする"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
