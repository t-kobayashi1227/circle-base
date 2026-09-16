"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { circleRecruitFormSchema, type CircleRecruitFormInput } from "@/lib/validations/circle-schema";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:text-[12.5px]";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="pt-0 text-[12.5px] font-medium text-[#3B352C] lg:pt-3">{children}</div>;
}

export function RecruitForm({
  circleId,
  circleType,
  defaultValues,
  redirectTo,
}: {
  circleId: string;
  circleType: string;
  defaultValues: CircleRecruitFormInput;
  redirectTo: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CircleRecruitFormInput>({
    resolver: zodResolver(circleRecruitFormSchema),
    defaultValues,
  });

  const isOngoing = circleType === "ongoing";

  async function onSubmit(data: CircleRecruitFormInput) {
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
      .from("circles")
      .update({
        recruit_tagline: data.recruitTagline ?? "",
        requirements: data.requirements ?? "",
        recruit_target: data.recruitTarget ?? "",
        recruit_capacity: data.recruitCapacity ?? "",
        recruit_cost: data.recruitCost ?? "",
        recruit_how_to_apply: data.recruitHowToApply ?? "",
      })
      .eq("id", circleId);

    if (error) {
      setServerError("募集内容の更新に失敗しました。時間をおいて再度お試しください。");
      setSubmitting(false);
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

      <div className="pb-5">
        <h2 className="font-heading text-[17px] font-bold text-cb-ink">メンバー募集</h2>
        <p className="mt-1.5 text-[11.5px] text-cb-muted-2">
          「メンバー募集内容」タブに表示される情報です。未入力の項目は表示されません。
        </p>
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start lg:gap-x-[22px] lg:gap-y-5">
        {/* 一言 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>一言</FieldLabel>
          <div>
            <input
              type="text"
              maxLength={100}
              placeholder="例）未経験者大歓迎！一緒に楽しく活動しましょう"
              className={inputClass}
              {...register("recruitTagline")}
            />
            {errors.recruitTagline ? (
              <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.recruitTagline.message}</p>
            ) : null}
          </div>
        </div>

        {isOngoing ? (
          <>
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>募集対象</FieldLabel>
              <div>
                <input
                  type="text"
                  placeholder="例）初心者・経験者問わずどなたでも"
                  className={inputClass}
                  {...register("recruitTarget")}
                />
                {errors.recruitTarget ? (
                  <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.recruitTarget.message}</p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>募集人数</FieldLabel>
              <div>
                <input
                  type="text"
                  placeholder="例）5名程度（先着順）"
                  className={`${inputClass} lg:max-w-[280px]`}
                  {...register("recruitCapacity")}
                />
                {errors.recruitCapacity ? (
                  <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.recruitCapacity.message}</p>
                ) : null}
              </div>
            </div>
          </>
        ) : null}

        {/* 求める方 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>求める方</FieldLabel>
          <div>
            <textarea
              rows={3}
              maxLength={500}
              placeholder="例）18歳以上の方、経験は問いません（未入力の場合は「どなたでも参加できます」と表示されます）"
              className={`${inputClass} h-20 resize-none leading-[1.8]`}
              {...register("requirements")}
            />
            {errors.requirements ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.requirements.message}</p> : null}
          </div>
        </div>

        {isOngoing ? (
          <>
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>参加費</FieldLabel>
              <div>
                <input
                  type="text"
                  placeholder="例）月500円（保険代・会場費として）"
                  className={`${inputClass} lg:max-w-[280px]`}
                  {...register("recruitCost")}
                />
                {errors.recruitCost ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.recruitCost.message}</p> : null}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>申し込み方法</FieldLabel>
              <div>
                <textarea
                  rows={3}
                  maxLength={500}
                  placeholder="例）メッセージ機能よりお気軽にご連絡ください。日程を調整のうえ、見学からご案内します。"
                  className={`${inputClass} h-20 resize-none leading-[1.8]`}
                  {...register("recruitHowToApply")}
                />
                {errors.recruitHowToApply ? (
                  <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.recruitHowToApply.message}</p>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <div className="lg:col-span-2">
            <p className="rounded-lg bg-cb-accent-soft px-3.5 py-3 text-[11.5px] leading-[1.8] text-cb-ink-soft">
              募集対象・募集人数・参加費・申し込み方法は継続団体（メンバーを継続的に募集するサークル）でのみ設定できます。
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3.5 border-t border-[#F3ECE0] pt-[22px]">
        <a
          href={redirectTo}
          className="rounded-[9px] border border-[#E0D6C6] bg-white px-10 py-3.5 text-[13.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
        >
          キャンセル
        </a>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-[9px] bg-cb-accent px-10 py-3.5 text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover disabled:opacity-60"
        >
          {submitting ? "保存中..." : "変更を保存"}
        </button>
      </div>
    </form>
  );
}
