"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function LeaveCircleButton({ circleId }: { circleId: string }) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  async function handleLeave() {
    const confirmed = window.confirm("このサークルから退会します。よろしいですか？");
    if (!confirmed) return;

    setLeaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("circle_members").delete().eq("circle_id", circleId);
    setLeaving(false);

    if (error) {
      window.alert("処理に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLeave}
      disabled={leaving}
      className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[9px] border border-[#C9E3D4] bg-[#EEF7F1] text-sm font-bold text-[#3E8E68] hover:bg-[#E3F1E8] disabled:opacity-60 lg:min-h-0 lg:gap-2.5 lg:px-4 lg:py-4 lg:text-[14.5px]"
    >
      <MaterialSymbol name="check_circle" filled size={18} className="lg:text-[19px]" />
      {leaving ? "処理中..." : "参加中（退会する）"}
    </button>
  );
}
