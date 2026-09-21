"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function FavoriteButton({
  circleId,
  isLoggedIn,
  initialFavorited,
}: {
  circleId: string;
  isLoggedIn: boolean;
  initialFavorited: boolean;
}) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

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

    const { error } = favorited
      ? await supabase.from("circle_favorites").delete().eq("circle_id", circleId).eq("user_id", user.id)
      : await supabase.from("circle_favorites").insert({ circle_id: circleId, user_id: user.id });

    setLoading(false);
    if (error) {
      window.alert("処理に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    setFavorited(!favorited);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-pressed={favorited}
      aria-label={favorited ? "お気に入りから削除" : "お気に入りに追加"}
      className={`flex min-h-[52px] w-[52px] items-center justify-center rounded-[9px] border disabled:opacity-60 lg:w-auto lg:gap-2 lg:px-[26px] lg:py-4 ${
        favorited
          ? "border-cb-accent bg-cb-accent/5 text-cb-accent-dark"
          : "border-[#E0D6C6] bg-white text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      }`}
    >
      <MaterialSymbol name="bookmark" filled={favorited} size={20} className="lg:hidden" />
      <MaterialSymbol name="bookmark" filled={favorited} size={18} className="hidden lg:inline-block" />
      <span className="hidden text-[13.5px] font-medium lg:inline">
        {favorited ? "お気に入り済み" : "お気に入り"}
      </span>
    </button>
  );
}
