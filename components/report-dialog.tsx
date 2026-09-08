"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function ReportDialog({
  targetType,
  targetId,
  triggerLabel,
  triggerClassName,
  triggerIcon = "flag",
}: {
  targetType: "circle" | "user";
  targetId: string;
  triggerLabel: string;
  triggerClassName?: string;
  triggerIcon?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit() {
    if (!reason.trim()) {
      setError("通報理由を入力してください");
      return;
    }
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error: insertError } = await supabase.from("reports").insert({
      reporter_id: user.id,
      target_type: targetType,
      target_id: targetId,
      reason: reason.trim(),
    });

    setSubmitting(false);

    if (insertError) {
      setError("通報の送信に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    setDone(true);
  }

  function close() {
    setOpen(false);
    setReason("");
    setError(null);
    setDone(false);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        <MaterialSymbol name={triggerIcon} size={15} />
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={close}>
          <div className="w-full max-w-[420px] rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            {done ? (
              <div className="py-4 text-center">
                <MaterialSymbol name="check_circle" filled size={32} className="mx-auto text-[#3E9E7A]" />
                <p className="mt-3 text-[13px] font-bold text-[#2F2B24]">通報を受け付けました</p>
                <p className="mt-1.5 text-[11.5px] leading-[1.7] text-cb-muted-2">
                  内容を確認の上、運営が対応します。ご協力ありがとうございます。
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-4 w-full rounded-lg bg-cb-accent py-3 text-[12.5px] font-bold text-white hover:bg-cb-accent-hover"
                >
                  閉じる
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-[15px] font-bold text-cb-ink">
                    {targetType === "circle" ? "このサークルを通報する" : "このユーザーを通報する"}
                  </h2>
                  <button type="button" onClick={close} aria-label="閉じる">
                    <MaterialSymbol name="close" size={20} className="text-cb-muted-3" />
                  </button>
                </div>
                <p className="mt-2 text-[11px] leading-[1.7] text-cb-muted-2">
                  通報内容は運営が確認し、必要に応じて対応します。虚偽の通報はご遠慮ください。
                </p>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  maxLength={1000}
                  placeholder="通報理由を具体的にご記入ください"
                  className="mt-3.5 h-28 w-full resize-none rounded-lg border border-cb-input-border px-3.5 py-3 text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none"
                />
                {error ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{error}</p> : null}
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-lg border border-[#E0D6C6] bg-white py-3 text-[12.5px] font-medium text-cb-ink-soft"
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="rounded-lg bg-[#D9534F] py-3 text-[12.5px] font-bold text-white hover:bg-[#C5453A] disabled:opacity-60"
                  >
                    {submitting ? "送信中..." : "通報する"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
