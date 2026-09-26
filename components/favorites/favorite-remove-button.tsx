"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

// お気に入り一覧のカード右上に置くハートボタン。押すとお気に入りから外して一覧を再取得する。
export function FavoriteRemoveButton({ circleId, circleName }: { circleId: string; circleName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!window.confirm(`「${circleName}」をお気に入りから削除しますか？`)) return;

    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("circle_favorites").delete().eq("circle_id", circleId).eq("user_id", user.id);
    setLoading(false);
    if (error) {
      window.alert("処理に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-label={`${circleName}をお気に入りから削除`}
      className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-cb-border bg-white/95 transition-transform hover:scale-110 disabled:opacity-60 lg:right-[9px] lg:top-[9px] lg:h-[26px] lg:w-[26px] lg:border-0"
    >
      <MaterialSymbol name="favorite" filled size={14} className="text-[#E04B3C]" />
    </button>
  );
}
