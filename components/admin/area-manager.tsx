"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/slugify";
import type { AreaRow } from "@/lib/circles";

function AreaRowItem({ area, onChanged }: { area: AreaRow; onChanged: () => void }) {
  const [name, setName] = useState(area.name);
  const [saving, setSaving] = useState(false);
  const dirty = name.trim() !== area.name && name.trim().length > 0;

  async function save() {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("areas").update({ name: name.trim() }).eq("id", area.id);
    setSaving(false);
    if (error) {
      window.alert("更新に失敗しました。");
      return;
    }
    onChanged();
  }

  async function remove() {
    const confirmed = window.confirm(`「${area.name}」を削除します。よろしいですか？`);
    if (!confirmed) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("areas").delete().eq("id", area.id);
    setSaving(false);
    if (error) {
      window.alert("削除に失敗しました。このエリアを使用しているサークルが存在する可能性があります。");
      return;
    }
    onChanged();
  }

  return (
    <div className="flex items-center gap-2.5 border-b border-[#F5EFE5] py-2.5 last:border-b-0">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-cb-input-border bg-white px-3 py-2 text-[12px] text-cb-ink focus:border-cb-accent focus:outline-none"
      />
      <span className="hidden shrink-0 text-[10.5px] text-cb-muted-3 lg:inline">/{area.slug}</span>
      <button
        type="button"
        onClick={save}
        disabled={!dirty || saving}
        className="shrink-0 rounded-md border border-cb-accent px-3 py-2 text-[11px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft disabled:opacity-40"
      >
        保存
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={saving}
        aria-label="削除"
        className="shrink-0 rounded-md border border-[#E7B3AA] bg-white p-2 text-[#D9534F] hover:bg-[#FDECEA] disabled:opacity-60"
      >
        <MaterialSymbol name="delete" size={15} />
      </button>
    </div>
  );
}

export function AreaManager({ areas }: { areas: AreaRow[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function refresh() {
    router.refresh();
  }

  async function submit() {
    if (!name.trim()) return;
    setSubmitting(true);
    setError(null);
    const supabase = createClient();
    const slug = `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}`;
    const { error: insertError } = await supabase.from("areas").insert({ name: name.trim(), slug });
    setSubmitting(false);
    if (insertError) {
      setError("追加に失敗しました。");
      return;
    }
    setName("");
    refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-cb-border bg-cb-surface p-4">
        {areas.map((area) => (
          <AreaRowItem key={area.id} area={area} onChanged={refresh} />
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-cb-input-border bg-cb-surface p-4">
        <div className="text-[12px] font-bold text-cb-ink-soft">新しいエリアを追加</div>
        <div className="mt-2 flex items-center gap-2.5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="新しいエリア名"
            className="min-w-0 flex-1 rounded-lg border border-dashed border-cb-input-border bg-white px-3 py-2 text-[12px] text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={submit}
            disabled={submitting || !name.trim()}
            className="shrink-0 rounded-md bg-cb-accent px-3 py-2 text-[11px] font-bold text-white hover:bg-cb-accent-hover disabled:opacity-60"
          >
            追加
          </button>
          {error ? <span className="text-[10.5px] text-[#D1453B]">{error}</span> : null}
        </div>
      </div>
    </div>
  );
}
