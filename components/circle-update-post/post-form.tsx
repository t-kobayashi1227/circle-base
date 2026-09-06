"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoUploader } from "./photo-uploader";
import { PhotoNotice } from "./photo-notice";
import {
  activityPostStep1Schema,
  type ActivityPostStep1Input,
} from "@/lib/validations/circle-schema";
import { postCategoryOptions, visibilityOptions } from "@/lib/circle-post-form-options";

const inputClass =
  "w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:text-[12.5px]";

function RequiredMark() {
  return <span className="text-[#E5731B]"> ＊</span>;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export function PostForm() {
  const [photos, setPhotos] = useState<File[]>([]);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityPostStep1Input>({
    resolver: zodResolver(activityPostStep1Schema),
    defaultValues: {
      title: "",
      category: postCategoryOptions[0],
      activityDate: todayIsoDate(),
      body: "",
      visibility: "public",
    },
  });

  const titleValue = watch("title") ?? "";
  const bodyValue = watch("body") ?? "";

  function onSubmit(data: ActivityPostStep1Input) {
    // TODO: ステップ2（写真・動画の並び替え等）実装後、フォーム状態を引き継いで遷移する。
    // 現時点ではSupabase未接続のため、下書き保存・送信は行わずログのみ。
    console.info("activity post step1 submitted", {
      ...data,
      photos: photos.map((f) => f.name),
    });
  }

  return (
    <form id="activity-post-step1-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex items-baseline justify-between lg:border-b lg:border-[#F3ECE0] lg:pb-[18px]">
        <h2 className="font-heading text-[17px] font-bold text-cb-ink">内容入力</h2>
        <span className="text-[10.5px] text-cb-muted-3 lg:text-[11px]">
          <span className="text-[#E5731B]">＊</span> は必須項目です
        </span>
      </div>

      <div className="mt-[18px] flex flex-col gap-5 lg:mt-5 lg:grid lg:grid-cols-[132px_minmax(0,1fr)] lg:items-start lg:gap-x-[22px] lg:gap-y-5">
        {/* タイトル */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <div className="text-[12.5px] font-medium text-[#3B352C] lg:pt-3">
            活動のタイトル
            <RequiredMark />
          </div>
          <div>
            <input
              type="text"
              placeholder="例）角田山ハイキングに行ってきました！"
              maxLength={40}
              className={`${inputClass} truncate`}
              {...register("title")}
            />
            <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">{titleValue.length} / 40</div>
            {errors.title ? <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.title.message}</p> : null}
          </div>
        </div>

        {/* カテゴリ */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <div className="text-[12.5px] font-medium text-[#3B352C] lg:pt-[9px]">
            カテゴリ
            <RequiredMark />
          </div>
          <div>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2.5 lg:gap-2.5">
                  {postCategoryOptions.map((cat) => {
                    const selected = field.value === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => field.onChange(cat)}
                        className={`whitespace-nowrap rounded-lg px-3.5 py-2.5 text-xs lg:px-[15px] lg:py-2.5 lg:text-xs ${
                          selected
                            ? "border-2 border-cb-accent bg-[#FFFCF6] font-bold text-cb-accent-dark"
                            : "border border-[#E6DCCB] bg-white text-cb-ink-soft hover:border-cb-accent"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.category ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.category.message}</p> : null}
          </div>
        </div>

        {/* 活動日 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <div className="text-[12.5px] font-medium text-[#3B352C] lg:pt-3">
            活動日
            <RequiredMark />
          </div>
          <div>
            <input
              type="date"
              className={`${inputClass} lg:w-[200px]`}
              {...register("activityDate")}
            />
            {errors.activityDate ? (
              <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.activityDate.message}</p>
            ) : null}
          </div>
        </div>

        {/* 活動内容 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <div className="text-[12.5px] font-medium text-[#3B352C] lg:pt-3">
            活動内容
            <RequiredMark />
          </div>
          <div>
            <textarea
              placeholder="活動の内容や感想を自由に記入してください。"
              maxLength={2000}
              rows={5}
              className={`${inputClass} h-[120px] resize-none lg:h-[104px]`}
              {...register("body")}
            />
            <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">{bodyValue.length} / 2000</div>
            {errors.body ? <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.body.message}</p> : null}
          </div>
        </div>

        {/* 写真・動画 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <div className="text-[12.5px] font-medium text-[#3B352C] lg:pt-3">写真・動画</div>
          <PhotoUploader files={photos} onChange={setPhotos} />
        </div>

        {/* 公開範囲 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <div className="text-[12.5px] font-medium text-[#3B352C] lg:pt-3">
            公開範囲
            <RequiredMark />
          </div>
          <div>
            <Controller
              control={control}
              name="visibility"
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  {visibilityOptions.map((opt) => {
                    const selected = field.value === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => field.onChange(opt.id)}
                        className={`flex items-start gap-3 rounded-[9px] px-4 py-3.5 text-left ${
                          selected ? "border-2 border-cb-accent bg-[#FFFCF6]" : "border border-[#E6DCCB] bg-white hover:border-cb-accent"
                        }`}
                      >
                        <span
                          className={`mt-0.5 h-[17px] w-[17px] shrink-0 rounded-full bg-white ${
                            selected ? "border-[5px] border-cb-accent" : "border-[1.5px] border-[#C9BFAD]"
                          }`}
                        />
                        <div>
                          <div className={`text-[12.5px] ${selected ? "font-bold text-[#3B352C]" : "font-medium text-[#3B352C]"}`}>
                            {opt.title}
                          </div>
                          <div className="mt-1 text-[11px] text-cb-muted-2">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>
        </div>

        {/* 写真の注意（モバイルのみフォーム内に表示） */}
        <div className="lg:hidden">
          <PhotoNotice />
        </div>
      </div>

      {/* デスクトップ: カード内右下ボタン */}
      <div className="hidden items-center justify-end gap-3.5 border-t border-[#F3ECE0] pt-[22px] lg:mt-[26px] lg:flex">
        <button
          type="button"
          className="rounded-[9px] border border-[#E0D6C6] bg-white px-[34px] py-3.5 text-[13.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
        >
          下書き保存
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-[9px] bg-cb-accent px-10 py-3.5 text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover"
        >
          次へ：確認画面へ
          <MaterialSymbol name="chevron_right" size={18} />
        </button>
      </div>
    </form>
  );
}
