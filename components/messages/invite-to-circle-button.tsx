"use client";

import { useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function InviteToCircleButton({
  circleId,
  userId,
  initialIsMember,
  className = "",
}: {
  circleId: string;
  userId: string;
  initialIsMember: boolean;
  className?: string;
}) {
  const [isMember, setIsMember] = useState(initialIsMember);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleInvite() {
    const confirmed = window.confirm("このユーザーをサークルの参加者にします。よろしいですか？");
    if (!confirmed) return;

    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: insertError } = await supabase.from("circle_members").insert({ circle_id: circleId, user_id: userId });
    setLoading(false);

    if (insertError) {
      setError("処理に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    setIsMember(true);
  }

  if (isMember) {
    return (
      <span className={`flex items-center gap-1.5 text-[11.5px] font-medium text-[#3E8E68] ${className}`}>
        <MaterialSymbol name="check_circle" filled size={15} />
        参加者です
      </span>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleInvite}
        disabled={loading}
        className="flex items-center gap-1.5 text-[11.5px] font-bold text-cb-accent-dark hover:underline disabled:opacity-60"
      >
        <MaterialSymbol name="person_add" size={15} />
        {loading ? "処理中..." : "参加者にする"}
      </button>
      {error ? <p className="mt-1 text-[10.5px] text-[#D1453B]">{error}</p> : null}
    </div>
  );
}
