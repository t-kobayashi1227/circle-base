"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function CircleDeleteButton({ circleId, className = "" }: { circleId: string; className?: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "このサークルを削除します。活動の様子の投稿も含めてすべて削除され、元に戻せません。よろしいですか？",
    );
    if (!confirmed) return;

    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("circles").delete().eq("id", circleId);
    setDeleting(false);

    if (error) {
      window.alert("削除に失敗しました。時間をおいて再度お試しください。");
      return;
    }

    router.push("/mypage/circles/owned");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className={`flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E7B3AA] bg-white px-[18px] py-[11px] text-[12.5px] font-bold text-[#D9534F] hover:bg-[#FDECEA] disabled:opacity-60 ${className}`}
    >
      <MaterialSymbol name="delete" size={17} />
      {deleting ? "削除中..." : "サークルを削除する"}
    </button>
  );
}
