"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { circleTypeLabel, coverImagePath, formatDateJa } from "@/lib/circles-format";
import type { AdminCircleRow } from "@/lib/admin-types";
import { createClient } from "@/lib/supabase/client";

export function AdminCircleRowItem({ circle }: { circle: AdminCircleRow }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const published = circle.status === "published";

  async function toggleStatus() {
    const nextStatus = published ? "unpublished" : "published";
    if (published) {
      const confirmed = window.confirm(`「${circle.name}」を非公開にします。よろしいですか？`);
      if (!confirmed) return;
    }
    setUpdating(true);
    const supabase = createClient();
    const { error } = await supabase.from("circles").update({ status: nextStatus }).eq("id", circle.id);
    setUpdating(false);
    if (error) {
      window.alert("更新に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    router.refresh();
  }

  async function handleDelete() {
    const confirmed = window.confirm(`「${circle.name}」を削除します。元に戻せません。よろしいですか？`);
    if (!confirmed) return;
    setUpdating(true);
    const supabase = createClient();
    const { error } = await supabase.from("circles").delete().eq("id", circle.id);
    setUpdating(false);
    if (error) {
      window.alert("削除に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    router.refresh();
  }

  return (
    <div className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#F5EFE5] px-1.5 py-3 lg:grid-cols-[56px_minmax(0,1fr)_120px_140px_auto] lg:gap-3.5">
      <div className="h-[44px] w-[44px] overflow-hidden rounded-lg">
        <CircleImage path={coverImagePath(circle)} alt={circle.name} iconSize={12} />
      </div>
      <div className="min-w-0">
        <Link href={`/circle/${circle.slug}`} target="_blank" className="truncate text-[12.5px] font-bold text-[#2F2B24] hover:text-cb-accent-dark">
          {circle.name}
        </Link>
        <div className="mt-1 truncate text-[10.5px] text-cb-muted-3">
          主催：{circle.ownerDisplayName} ／ {circle.category?.name ?? ""}・{circle.area?.name ?? ""}
        </div>
      </div>
      <div className="hidden text-[11px] text-cb-ink-soft lg:block">{circleTypeLabel(circle.type)}</div>
      <div className="hidden text-[10.5px] text-cb-muted-3 lg:block">{formatDateJa(circle.created_at.slice(0, 10))}</div>
      <div className="flex items-center gap-2">
        <span
          className={`whitespace-nowrap rounded-[5px] border px-2 py-1 text-[10px] font-bold ${
            published ? "border-[#F2E0C0] bg-cb-accent-soft text-[#C07E1B]" : "border-[#DDD5C6] bg-[#F3EFE6] text-cb-muted-2"
          }`}
        >
          {published ? "公開中" : "非公開"}
        </span>
        <button
          type="button"
          onClick={toggleStatus}
          disabled={updating}
          className="rounded-md border border-cb-input-border bg-white px-2.5 py-1.5 text-[10.5px] text-cb-ink-soft hover:border-cb-accent disabled:opacity-60"
        >
          {published ? "非公開にする" : "公開する"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={updating}
          aria-label="削除"
          className="rounded-md border border-[#E7B3AA] bg-white p-1.5 text-[#D9534F] hover:bg-[#FDECEA] disabled:opacity-60"
        >
          <MaterialSymbol name="delete" size={16} />
        </button>
      </div>
    </div>
  );
}
