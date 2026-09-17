"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiImageDropzone } from "@/components/multi-image-dropzone";
import { PhotoNotice } from "./photo-notice";
import { circleActivityPostSchema, type CircleActivityPostInput } from "@/lib/validations/circle-schema";
import { createClient } from "@/lib/supabase/client";
import { uploadCircleMedia } from "@/lib/storage";

const inputClass =
  "w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:text-[12.5px]";

function RequiredMark() {
  return <span className="text-[#E5731B]"> ＊</span>;
}

// 「活動の様子」投稿: 写真での活動報告が主目的のため、写真を必須にした一般的な投稿UI。
export function ActivityPostForm({ circleId, redirectTo }: { circleId: string; redirectTo: string }) {
  const router = useRouter();
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CircleActivityPostInput>({
    resolver: zodResolver(circleActivityPostSchema),
    defaultValues: { content: "" },
  });

  const contentValue = watch("content") ?? "";

  async function onSubmit(data: CircleActivityPostInput) {
    if (photos.length === 0) {
      setPhotoError("写真を1枚以上追加してください");
      return;
    }
    setPhotoError(null);
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

    let imagePaths: string[] = [];
    try {
      imagePaths = await Promise.all(photos.map((file) => uploadCircleMedia(supabase, user.id, "updates", file)));
    } catch (err) {
      console.error("uploadCircleMedia failed", err);
      setServerError("画像のアップロードに失敗しました。時間をおいて再度お試しください。");
      setSubmitting(false);
      return;
    }

    const { data: inserted, error } = await supabase
      .from("circle_updates")
      .insert({ circle_id: circleId, content: data.content, kind: "activity" })
      .select("id")
      .single();

    if (error || !inserted) {
      setSubmitting(false);
      setServerError("投稿に失敗しました。時間をおいて再度お試しください。");
      return;
    }

    await supabase.from("circle_update_images").insert(
      imagePaths.map((path, index) => ({
        circle_update_id: inserted.id,
        storage_path: path,
        sort_order: index,
      })),
    );

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
        <h2 className="font-heading text-[17px] font-bold text-cb-ink">活動の様子を投稿</h2>
        <span className="text-[10.5px] text-cb-muted-3 lg:text-[11px]">
          <span className="text-[#E5731B]">＊</span> は必須項目です
        </span>
      </div>

      <div className="mt-[18px] flex flex-col gap-5 lg:mt-5 lg:grid lg:grid-cols-[132px_minmax(0,1fr)] lg:items-start lg:gap-x-[22px] lg:gap-y-5">
        {/* 写真 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <div className="text-[12.5px] font-medium text-[#3B352C] lg:pt-3">
            写真
            <RequiredMark />
          </div>
          <div>
            <MultiImageDropzone files={photos} onChange={setPhotos} />
            {photoError ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{photoError}</p> : null}
          </div>
        </div>

        {/* 投稿内容 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <div className="text-[12.5px] font-medium text-[#3B352C] lg:pt-3">
            内容
            <RequiredMark />
          </div>
          <div>
            <textarea
              placeholder={"1行目がタイトルとして表示されます。\n活動の様子（活動報告・感想）を自由に記入してください。"}
              maxLength={2000}
              rows={6}
              className={`${inputClass} h-[160px] resize-none leading-[1.8]`}
              {...register("content")}
            />
            <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">{contentValue.length} / 2000</div>
            {errors.content ? <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.content.message}</p> : null}
          </div>
        </div>

        <div className="lg:hidden">
          <PhotoNotice />
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
