"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { circleMessagePostSchema, type CircleMessagePostInput } from "@/lib/validations/circle-schema";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:text-[12.5px]";

function RequiredMark() {
  return <span className="text-[#E5731B]"> ＊</span>;
}

// 「メッセージ」投稿: 次回の予定連絡やお知らせ程度の、写真を伴わない短いテキスト投稿。
export function MessagePostForm({ circleId, redirectTo }: { circleId: string; redirectTo: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CircleMessagePostInput>({
    resolver: zodResolver(circleMessagePostSchema),
    defaultValues: { content: "" },
  });

  const contentValue = watch("content") ?? "";

  async function onSubmit(data: CircleMessagePostInput) {
    setServerError(null);
    setSubmitting(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setServerError("ログイン状態を確認できませんでした。再度ログインしてください。");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("circle_updates")
      .insert({ circle_id: circleId, content: data.content, kind: "message" });

    if (error) {
      setSubmitting(false);
      setServerError("投稿に失敗しました。時間をおいて再度お試しください。");
      return;
    }

    setSubmitting(false);
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError ? (
        <div className="mb-4 rounded-lg border border-[#F0B4AE] bg-[#FDECEA] px-3.5 py-3 text-[11.5px] text-[#D1453B]">
          {serverError}
        </div>
      ) : null}

      <div className="flex items-baseline justify-between lg:border-b lg:border-[#F3ECE0] lg:pb-[18px]">
        <h2 className="font-heading text-[17px] font-bold text-cb-ink">メッセージを投稿</h2>
        <span className="text-[10.5px] text-cb-muted-3 lg:text-[11px]">
          <span className="text-[#E5731B]">＊</span> は必須項目です
        </span>
      </div>

      <div className="mt-[18px] flex flex-col gap-2.5 lg:mt-5">
        <div className="text-[12.5px] font-medium text-[#3B352C]">
          メッセージ
          <RequiredMark />
        </div>
        <div>
          <textarea
            placeholder={"1行目がタイトルとして表示されます。\n次回の活動予定や、メンバーへのお知らせなどを入力してください。"}
            maxLength={500}
            rows={5}
            className={`${inputClass} h-[130px] resize-none leading-[1.8]`}
            {...register("content")}
          />
          <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">{contentValue.length} / 500</div>
          {errors.content ? <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.content.message}</p> : null}
        </div>
      </div>

      <div className="mt-[26px] flex items-center justify-end gap-3.5 border-t border-[#F3ECE0] pt-[22px]">
        <a
          href={redirectTo}
          className="rounded-[9px] border border-[#E0D6C6] bg-white px-[26px] py-3.5 text-[13.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
        >
          キャンセル
        </a>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-[9px] bg-cb-accent px-10 py-3.5 text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover disabled:opacity-60"
        >
          {submitting ? "投稿中..." : "投稿する"}
        </button>
      </div>
    </form>
  );
}
