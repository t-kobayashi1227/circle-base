"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { circleOwnerMessageSchema, type CircleOwnerMessageInput } from "@/lib/validations/circle-schema";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:text-[12.5px]";

export function OwnerMessageForm({
  circleId,
  defaultValues,
  redirectTo,
}: {
  circleId: string;
  defaultValues: CircleOwnerMessageInput;
  redirectTo: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CircleOwnerMessageInput>({
    resolver: zodResolver(circleOwnerMessageSchema),
    defaultValues,
  });

  const messageValue = watch("ownerMessage") ?? "";

  async function onSubmit(data: CircleOwnerMessageInput) {
    setServerError(null);
    setSuccess(false);
    setSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase
      .from("circles")
      .update({ owner_message: data.ownerMessage ?? "" })
      .eq("id", circleId);

    setSubmitting(false);

    if (error) {
      setServerError("主催者からのメッセージの更新に失敗しました。時間をおいて再度お試しください。");
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError ? (
        <div className="mb-3.5 rounded-lg border border-[#F0B4AE] bg-[#FDECEA] px-3.5 py-3 text-[11.5px] text-[#D1453B]">
          {serverError}
        </div>
      ) : null}
      {success ? (
        <div className="mb-3.5 rounded-lg border border-[#B7DFC0] bg-[#EAF7EC] px-3.5 py-3 text-[11.5px] text-[#2F7D4F]">
          更新しました。
        </div>
      ) : null}

      <textarea
        rows={5}
        maxLength={500}
        placeholder="例）新潟の山の魅力を多くの人に知ってもらいたくて、このサークルを立ち上げました。初心者の方も大歓迎です！"
        className={`${inputClass} h-32 resize-none leading-[1.85]`}
        {...register("ownerMessage")}
      />
      <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-cb-placeholder">
        <span>未入力の場合はサークル詳細ページに表示されません</span>
        <span>{messageValue.length} / 500</span>
      </div>
      {errors.ownerMessage ? <p className="mt-1 text-[11px] text-[#D1453B]">{errors.ownerMessage.message}</p> : null}

      <div className="mt-4 flex items-center justify-end gap-3.5">
        <a
          href={redirectTo}
          className="rounded-[9px] border border-[#E0D6C6] bg-white px-6 py-2.5 text-[12.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
        >
          キャンセル
        </a>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-[9px] bg-cb-accent px-6 py-2.5 text-[12.5px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover disabled:opacity-60"
        >
          {submitting ? "保存中..." : "変更を保存"}
        </button>
      </div>
    </form>
  );
}
