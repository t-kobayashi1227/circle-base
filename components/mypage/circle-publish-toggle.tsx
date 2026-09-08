"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function CirclePublishToggle({ circleId, status }: { circleId: string; status: string }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const published = status === "published";

  async function handleToggle() {
    const nextStatus = published ? "unpublished" : "published";
    const confirmed = published
      ? window.confirm("このサークルを非公開にします。一覧・検索結果から表示されなくなります。よろしいですか？")
      : true;
    if (!confirmed) return;

    setUpdating(true);
    const supabase = createClient();
    const { error } = await supabase.from("circles").update({ status: nextStatus }).eq("id", circleId);
    setUpdating(false);

    if (error) {
      window.alert("更新に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`rounded-[5px] border px-2.5 py-1 text-[10.5px] font-bold ${
          published ? "border-[#F2E0C0] bg-cb-accent-soft text-[#C07E1B]" : "border-[#DDD5C6] bg-[#F3EFE6] text-cb-muted-2"
        }`}
      >
        {published ? "公開中" : "非公開"}
      </span>
      <button
        type="button"
        onClick={handleToggle}
        disabled={updating}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E6DCCB] bg-white px-3.5 py-2 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark disabled:opacity-60"
      >
        <MaterialSymbol name={published ? "visibility_off" : "visibility"} size={15} />
        {updating ? "更新中..." : published ? "非公開にする" : "公開する"}
      </button>
    </div>
  );
}
