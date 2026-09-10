"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/slugify";
import type { CategoryRow } from "@/lib/circles";

function CategoryRowItem({ category, onChanged }: { category: CategoryRow; onChanged: () => void }) {
  const [name, setName] = useState(category.name);
  const [saving, setSaving] = useState(false);
  const [togglingFeatured, setTogglingFeatured] = useState(false);
  const dirty = name.trim() !== category.name && name.trim().length > 0;
  const isChild = category.parent_id !== null;

  async function save() {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("categories").update({ name: name.trim() }).eq("id", category.id);
    setSaving(false);
    if (error) {
      window.alert("更新に失敗しました。");
      return;
    }
    onChanged();
  }

  async function toggleFeatured() {
    setTogglingFeatured(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("categories")
      .update({ is_featured: !category.is_featured })
      .eq("id", category.id);
    setTogglingFeatured(false);
    if (error) {
      window.alert("更新に失敗しました。");
      return;
    }
    onChanged();
  }

  async function remove() {
    const confirmed = window.confirm(`「${category.name}」を削除します。よろしいですか？`);
    if (!confirmed) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("categories").delete().eq("id", category.id);
    setSaving(false);
    if (error) {
      window.alert("削除に失敗しました。このカテゴリを使用しているサークルまたは中カテゴリが存在する可能性があります。");
      return;
    }
    onChanged();
  }

  return (
    <div className="flex items-center gap-2.5 py-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-cb-input-border bg-white px-3 py-2 text-[12px] text-cb-ink focus:border-cb-accent focus:outline-none"
      />
      <span className="hidden shrink-0 text-[10.5px] text-cb-muted-3 lg:inline">/{category.slug}</span>
      {isChild ? (
        <label className="flex shrink-0 items-center gap-1.5 text-[11px] text-cb-muted-2">
          <input
            type="checkbox"
            checked={category.is_featured}
            onChange={toggleFeatured}
            disabled={togglingFeatured}
          />
          トップページに表示
        </label>
      ) : null}
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

function AddCategoryForm({ parentId, onAdded }: { parentId: string | null; onAdded: () => void }) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!name.trim()) return;
    setSubmitting(true);
    setError(null);
    const supabase = createClient();
    const slug = `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}`;
    const { error: insertError } = await supabase.from("categories").insert({ name: name.trim(), slug, parent_id: parentId });
    setSubmitting(false);
    if (insertError) {
      setError("追加に失敗しました。");
      return;
    }
    setName("");
    onAdded();
  }

  return (
    <div className="mt-2 flex items-center gap-2.5">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={parentId ? "新しい中カテゴリ名" : "新しい大カテゴリ名"}
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
  );
}

export function CategoryManager({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const majors = categories.filter((c) => c.parent_id === null);

  function refresh() {
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      {majors.map((major) => {
        const children = categories.filter((c) => c.parent_id === major.id);
        return (
          <div key={major.id} className="rounded-xl border border-cb-border bg-cb-surface p-4">
            <div className="font-heading text-[13.5px] font-bold text-cb-ink">
              <CategoryRowItem category={major} onChanged={refresh} />
            </div>
            <div className="ml-4 mt-1.5 flex flex-col divide-y divide-[#F5EFE5] border-l border-[#F0E7D6] pl-4">
              {children.map((child) => (
                <CategoryRowItem key={child.id} category={child} onChanged={refresh} />
              ))}
            </div>
            <div className="ml-4 border-l border-transparent pl-4">
              <AddCategoryForm parentId={major.id} onAdded={refresh} />
            </div>
          </div>
        );
      })}

      <div className="rounded-xl border border-dashed border-cb-input-border bg-cb-surface p-4">
        <div className="text-[12px] font-bold text-cb-ink-soft">新しい大カテゴリを追加</div>
        <AddCategoryForm parentId={null} onAdded={refresh} />
      </div>
    </div>
  );
}
