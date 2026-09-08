"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function BlockUserButton({ userId, className = "" }: { userId: string; className?: string }) {
  const router = useRouter();
  const [blocking, setBlocking] = useState(false);

  async function handleBlock() {
    const confirmed = window.confirm(
      "このユーザーをブロックします。以後、このユーザーからメッセージを受け取らなくなります。よろしいですか？",
    );
    if (!confirmed) return;

    setBlocking(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setBlocking(false);
      return;
    }

    const { error } = await supabase.from("blocks").insert({ blocker_id: user.id, blocked_id: userId });
    setBlocking(false);

    if (error) {
      window.alert("ブロックに失敗しました。時間をおいて再度お試しください。");
      return;
    }

    router.push("/mypage/blocked-users");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleBlock}
      disabled={blocking}
      className={`flex items-center gap-2.5 text-left text-[11.5px] text-[#D9534F] disabled:opacity-60 ${className}`}
    >
      <MaterialSymbol name="block" size={17} />
      {blocking ? "処理中..." : "ブロックする"}
    </button>
  );
}
