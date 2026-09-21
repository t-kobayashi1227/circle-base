"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleImage } from "@/components/circle-image";
import { createClient } from "@/lib/supabase/client";
import type { CircleMemberWithUser } from "@/lib/circle-members";

export function MemberRow({ member }: { member: CircleMemberWithUser }) {
  const router = useRouter();
  const [removing, setRemoving] = useState(false);

  async function handleRemove() {
    const confirmed = window.confirm(
      `${member.user?.display_name ?? "このメンバー"}をサークルから除名します。よろしいですか？`,
    );
    if (!confirmed) return;

    setRemoving(true);
    const supabase = createClient();
    const { error } = await supabase.from("circle_members").delete().eq("id", member.id);
    setRemoving(false);

    if (error) {
      window.alert("処理に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-cb-border bg-white p-3.5">
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
        <CircleImage
          path={member.user?.avatar_path ?? null}
          alt={`${member.user?.display_name ?? "メンバー"}さんの顔写真`}
          iconSize={14}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-bold text-cb-ink">
          {member.user?.display_name ?? "退会済みユーザー"}
        </div>
      </div>
      <button
        type="button"
        onClick={handleRemove}
        disabled={removing}
        className="shrink-0 rounded-lg border border-[#E7B3AA] bg-white px-3.5 py-2 text-[11.5px] font-bold text-[#D9534F] hover:bg-[#FDECEA] disabled:opacity-60"
      >
        {removing ? "処理中..." : "除名する"}
      </button>
    </div>
  );
}
