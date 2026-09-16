"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { genderOptions } from "@/lib/profile-edit-mock-data";
import { createClient } from "@/lib/supabase/client";

type FieldKey = "displayName" | "email" | "gender" | "birthdate";

const FIELD_LABELS: Record<FieldKey, string> = {
  displayName: "ユーザー名",
  email: "メールアドレス",
  gender: "性別",
  birthdate: "生年月日",
};

function formatBirthdate(birthdate: string) {
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(`${birthdate}T00:00:00`),
  );
}

export function AccountInfoCard({
  userId,
  displayName,
  email,
  gender,
  birthdate,
}: {
  userId: string;
  displayName: string;
  email: string;
  gender: string | null;
  birthdate: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState({ displayName, email, gender: gender ?? "", birthdate });
  const [editing, setEditing] = useState<FieldKey | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function openEditor(key: FieldKey) {
    setEditing(key);
    setDraft(values[key]);
    setError(null);
  }

  function closeEditor() {
    setEditing(null);
    setError(null);
  }

  async function handleSave() {
    if (!editing) return;
    const trimmed = draft.trim();

    if (editing === "displayName") {
      if (!trimmed) return setError("ユーザー名を入力してください");
      if (trimmed.length > 20) return setError("20文字以内で入力してください");
    }
    if (editing === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return setError("正しいメールアドレスを入力してください");
    }
    if (editing === "gender" && !trimmed) {
      return setError("性別を選択してください");
    }
    if (editing === "birthdate") {
      if (!trimmed) return setError("生年月日を入力してください");
      if (trimmed > new Date().toISOString().slice(0, 10)) return setError("未来の日付は指定できません");
    }

    setSubmitting(true);
    setError(null);
    const supabase = createClient();

    if (editing === "email") {
      const { error: updateError } = await supabase.auth.updateUser({ email: trimmed });
      setSubmitting(false);
      if (updateError) {
        setError("メールアドレスの変更に失敗しました。時間をおいて再度お試しください。");
        return;
      }
      setEditing(null);
      setNotice("確認メールを送信しました。新しいメールアドレス宛のリンクから変更を完了してください。");
      return;
    }

    const { error: updateError } =
      editing === "displayName"
        ? await supabase.from("profiles").update({ display_name: trimmed }).eq("id", userId)
        : editing === "gender"
          ? await supabase.from("profiles").update({ gender: trimmed }).eq("id", userId)
          : await supabase.from("profiles").update({ birthdate: trimmed }).eq("id", userId);

    setSubmitting(false);
    if (updateError) {
      setError("更新に失敗しました。時間をおいて再度お試しください。");
      return;
    }

    setValues((v) => ({ ...v, [editing]: trimmed }));
    setNotice(null);
    setEditing(null);
    router.refresh();
  }

  const rows: { key: FieldKey; label: string; value: string; mvalue: string; editable: boolean }[] = [
    { key: "displayName", label: "ユーザー名", value: values.displayName, mvalue: values.displayName, editable: true },
    { key: "email", label: "メールアドレス", value: values.email, mvalue: values.email, editable: true },
    {
      key: "birthdate",
      label: "生年月日",
      value: formatBirthdate(values.birthdate),
      mvalue: formatBirthdate(values.birthdate),
      editable: true,
    },
    {
      key: "gender",
      label: "性別",
      value: values.gender || "未設定",
      mvalue: values.gender || "未設定",
      editable: true,
    },
  ];

  return (
    <div className="rounded-xl border border-cb-border bg-cb-surface px-4 pb-1 pt-4 lg:px-6 lg:pb-1 lg:pt-[22px]">
      <div className="flex items-center gap-2">
        <MaterialSymbol name="person" filled size={19} className="text-cb-accent lg:text-[20px]" />
        <h2 className="font-heading text-[15px] font-bold text-cb-ink lg:text-base">アカウント情報</h2>
      </div>
      <div className="mt-1.5 hidden text-[11.5px] text-cb-muted-3 lg:block">基本的なアカウント情報を管理します。</div>

      {notice ? (
        <div className="mt-3 rounded-lg border border-[#B7DFC0] bg-[#EAF7EC] px-3.5 py-3 text-[11.5px] leading-[1.7] text-[#2F7D4F]">
          {notice}
        </div>
      ) : null}

      <div className="mt-1.5 flex flex-col lg:mt-3.5">
        {rows.map((field, i) => (
          <div
            key={field.label}
            className={`py-3.5 lg:grid lg:grid-cols-[96px_minmax(0,1fr)_auto] lg:items-center lg:gap-3.5 lg:py-4 ${
              i < rows.length - 1 ? "border-b border-[#F5EFE5]" : ""
            }`}
          >
            {/* デスクトップ: 1行グリッド */}
            <span className="hidden whitespace-nowrap text-xs text-cb-muted-2 lg:inline">{field.label}</span>
            <span className="hidden min-w-0 truncate text-[13px] font-medium text-[#2F2B24] lg:inline">
              {field.value}
            </span>
            {field.editable ? (
              <button
                type="button"
                onClick={() => openEditor(field.key)}
                className="hidden shrink-0 rounded-[7px] border border-cb-accent bg-white px-4 py-2 text-xs font-bold text-cb-accent-dark hover:bg-cb-accent-soft lg:block"
              >
                変更
              </button>
            ) : (
              <span className="hidden lg:block" />
            )}

            {/* モバイル: ラベル+値の縦積み、右に変更ボタン */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 lg:hidden">
              <div className="min-w-0">
                <div className="text-[11px] text-cb-muted-3">{field.label}</div>
                <div className="mt-1.5 whitespace-pre-line break-words text-[12.5px] font-medium text-[#2F2B24]">
                  {field.mvalue}
                </div>
              </div>
              {field.editable ? (
                <button
                  type="button"
                  onClick={() => openEditor(field.key)}
                  className="shrink-0 rounded-[7px] border border-cb-accent bg-white px-3.5 py-2 text-[11.5px] font-bold text-cb-accent-dark"
                >
                  変更
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={closeEditor}>
          <div className="w-full max-w-[380px] rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-[14px] font-bold text-cb-ink">{FIELD_LABELS[editing]}の変更</h3>
              <button type="button" onClick={closeEditor} aria-label="閉じる">
                <MaterialSymbol name="close" size={20} className="text-cb-muted-3" />
              </button>
            </div>

            <div className="mt-3.5">
              {editing === "gender" ? (
                <select
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-[12.5px] text-cb-ink focus:border-cb-accent focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {genderOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={editing === "email" ? "email" : editing === "birthdate" ? "date" : "text"}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={editing === "displayName" ? 20 : undefined}
                  max={editing === "birthdate" ? new Date().toISOString().slice(0, 10) : undefined}
                  className="w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none"
                />
              )}
              {error ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{error}</p> : null}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-lg border border-[#E0D6C6] bg-white py-3 text-[12.5px] font-medium text-cb-ink-soft"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={submitting}
                className="rounded-lg bg-cb-accent py-3 text-[12.5px] font-bold text-white hover:bg-cb-accent-hover disabled:opacity-60"
              >
                {submitting ? "保存中..." : "保存する"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
