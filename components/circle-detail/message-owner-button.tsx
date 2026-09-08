"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function MessageOwnerButton({ circleId, ownerId }: { circleId: string; ownerId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      router.push("/login");
      return;
    }

    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("circle_id", circleId)
      .or(
        `and(participant_a.eq.${user.id},participant_b.eq.${ownerId}),and(participant_a.eq.${ownerId},participant_b.eq.${user.id})`,
      )
      .maybeSingle();

    if (existing) {
      setLoading(false);
      router.push(`/mypage/messages/${existing.id}`);
      return;
    }

    const { data: created, error: insertError } = await supabase
      .from("conversations")
      .insert({ circle_id: circleId, participant_a: user.id, participant_b: ownerId })
      .select("id")
      .single();

    if (insertError || !created) {
      setError("メッセージ画面を開けませんでした。時間をおいて再度お試しください。");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push(`/mypage/messages/${created.id}`);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[9px] bg-cb-accent text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover disabled:opacity-60 lg:min-h-0 lg:gap-2.5 lg:px-4 lg:py-4 lg:text-[14.5px]"
      >
        <MaterialSymbol name="mail" size={18} className="lg:text-[19px]" />
        {loading ? "準備中..." : "メッセージを送る（無料）"}
      </button>
      {error ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{error}</p> : null}
    </div>
  );
}
