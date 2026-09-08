"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { ImageDropzone } from "@/components/image-dropzone";
import { circleFormSchema, type CircleFormInput } from "@/lib/validations/circle-schema";
import { citywideAreaId } from "@/lib/circle-form-options";
import { createClient } from "@/lib/supabase/client";
import { uploadCircleMedia } from "@/lib/storage";
import type { CategoryRow, AreaRow } from "@/lib/circles";

const inputClass =
  "w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:text-[12.5px]";
const selectClass = `${inputClass} appearance-none pr-9`;
const helpTip = "サークルの拠点・集合場所の大まかな区分です。実際の活動場所は下欄にご記入ください。";

function SelectChevron() {
  return (
    <MaterialSymbol
      name="expand_more"
      size={18}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
    />
  );
}

function RequiredMark() {
  return <span className="text-[#E5731B]"> ＊</span>;
}

function FieldLabel({ children, help }: { children: React.ReactNode; help?: boolean }) {
  return (
    <div className="flex items-center gap-1 pt-0 text-[12.5px] font-medium text-[#3B352C] lg:pt-3">
      {children}
      {help ? (
        <span title={helpTip}>
          <MaterialSymbol name="help" size={15} className="text-cb-placeholder" />
        </span>
      ) : null}
    </div>
  );
}

export function CircleForm({
  mode,
  circleId,
  categories,
  areas,
  defaultValues,
  existingImageLabel,
  redirectTo,
}: {
  mode: "create" | "edit";
  circleId?: string;
  categories: CategoryRow[];
  areas: AreaRow[];
  defaultValues?: Partial<CircleFormInput>;
  existingImageLabel?: string | null;
  redirectTo: string;
}) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageRequiredError, setImageRequiredError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CircleFormInput>({
    resolver: zodResolver(circleFormSchema),
    defaultValues: {
      type: "ongoing",
      name: "",
      categoryMajorId: "",
      categoryMinorId: "",
      isCitywide: false,
      areaId: "",
      location: "",
      schedule: "",
      eventDate: "",
      description: "",
      requirements: "",
      ...defaultValues,
    },
  });

  const nameValue = watch("name") ?? "";
  const descriptionValue = watch("description") ?? "";
  const type = watch("type");
  const majorId = watch("categoryMajorId");
  const isCitywide = watch("isCitywide");
  const majorCategories = useMemo(() => categories.filter((c) => c.parent_id === null), [categories]);
  const areaOptions = useMemo(() => areas.filter((a) => a.slug !== citywideAreaId), [areas]);
  const minorOptions = useMemo(() => {
    const major = majorCategories.find((c) => c.slug === majorId);
    return major ? categories.filter((c) => c.parent_id === major.id) : [];
  }, [categories, majorCategories, majorId]);

  async function onSubmit(data: CircleFormInput) {
    if (mode === "create" && !imageFile) {
      setImageRequiredError("メイン画像をアップロードしてください");
      return;
    }
    setImageRequiredError(null);
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

    const categoryId = categories.find((c) => c.slug === data.categoryMinorId)?.id;
    const areaSlug = data.isCitywide ? citywideAreaId : data.areaId;
    const areaId = areas.find((a) => a.slug === areaSlug)?.id;

    if (!categoryId || !areaId) {
      setServerError("カテゴリまたはエリアの情報取得に失敗しました。時間をおいて再度お試しください。");
      setSubmitting(false);
      return;
    }

    const payload = {
      name: data.name,
      type: data.type,
      event_date: data.type === "one_time" ? data.eventDate : null,
      category_id: categoryId,
      area_id: areaId,
      description: data.description,
      requirements: data.requirements ?? "",
      schedule: data.schedule,
      location: data.location,
    };

    if (mode === "edit" && !circleId) {
      setServerError("サークル情報が見つかりませんでした。");
      setSubmitting(false);
      return;
    }

    let targetCircleId = circleId;

    if (mode === "create") {
      const slug = `circle-${crypto.randomUUID().slice(0, 8)}`;
      const { data: inserted, error } = await supabase
        .from("circles")
        .insert({ ...payload, slug, owner_id: user.id, status: "published" })
        .select("id, slug")
        .single();

      if (error || !inserted) {
        setServerError("サークルの作成に失敗しました。時間をおいて再度お試しください。");
        setSubmitting(false);
        return;
      }
      targetCircleId = inserted.id;
    } else {
      const { error } = await supabase.from("circles").update(payload).eq("id", circleId!);
      if (error) {
        setServerError("サークルの更新に失敗しました。時間をおいて再度お試しください。");
        setSubmitting(false);
        return;
      }
    }

    if (imageFile && targetCircleId) {
      try {
        // メイン画像は1枚のみの想定のため、既存画像があれば置き換える（追加ではなく差し替え）。
        if (mode === "edit") {
          const { data: existingImages } = await supabase
            .from("circle_images")
            .select("id, storage_path")
            .eq("circle_id", targetCircleId);
          if (existingImages && existingImages.length > 0) {
            await supabase.storage.from("circle-media").remove(existingImages.map((img) => img.storage_path));
            await supabase
              .from("circle_images")
              .delete()
              .in("id", existingImages.map((img) => img.id));
          }
        }
        const path = await uploadCircleMedia(supabase, user.id, "circles", imageFile);
        await supabase.from("circle_images").insert({ circle_id: targetCircleId, storage_path: path, sort_order: 0 });
      } catch (err) {
        // 画像アップロードに失敗してもサークル本体の保存は成功しているため、致命的エラーにはしない。
        console.error("uploadCircleMedia failed", err);
      }
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

      <div className="flex items-baseline justify-between pb-5 lg:pb-5">
        <h2 className="font-heading text-[17px] font-bold text-cb-ink">
          {mode === "create" ? "基本情報" : "サークル情報"}
        </h2>
        <span className="text-[10.5px] text-cb-muted-3 lg:text-[11px]">
          <span className="text-[#E5731B]">＊</span> は必須項目です
        </span>
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start lg:gap-x-[22px] lg:gap-y-5">
        {/* 種別 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            サークルの種別
            <RequiredMark />
          </FieldLabel>
          <div>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <div className="grid max-w-[640px] grid-cols-2 gap-3 lg:gap-4">
                  {(
                    [
                      { value: "ongoing" as const, icon: "groups", title: "継続団体", desc: "メンバーを継続的に募集するサークルです" },
                      { value: "one_time" as const, icon: "calendar_month", title: "単発募集", desc: "1回限りのイベント・活動の参加者を募集します" },
                    ]
                  ).map((opt) => {
                    const selected = field.value === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => field.onChange(opt.value)}
                        className={`flex min-h-[62px] items-center justify-center gap-2.5 rounded-[9px] border px-4 py-4 text-left lg:justify-start lg:gap-[13px] lg:px-[18px] lg:py-4 ${
                          selected
                            ? "border-2 border-cb-accent bg-[#FFFCF6]"
                            : "border border-[#E6DCCB] bg-white hover:border-cb-accent"
                        }`}
                      >
                        <MaterialSymbol name={opt.icon} size={24} className={selected ? "text-cb-accent" : "text-cb-muted-3"} />
                        <span className="lg:hidden">
                          <span className={`text-[13px] font-bold ${selected ? "text-cb-accent-dark" : "text-cb-ink-soft"}`}>
                            {opt.title}
                          </span>
                        </span>
                        <span className="hidden lg:block">
                          <div className="text-[13px] font-bold text-cb-ink-soft">{opt.title}</div>
                          <div className="mt-1 text-[10.5px] leading-relaxed text-cb-muted-2">{opt.desc}</div>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.type ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.type.message}</p> : null}
          </div>
        </div>

        {/* 開催日（単発募集のみ） */}
        {type === "one_time" ? (
          <div className="flex flex-col gap-2.5 lg:contents">
            <FieldLabel>
              開催日
              <RequiredMark />
            </FieldLabel>
            <div>
              <input type="date" className={`${inputClass} lg:max-w-[220px]`} {...register("eventDate")} />
              {errors.eventDate ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.eventDate.message}</p> : null}
            </div>
          </div>
        ) : null}

        {/* サークル名 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            サークル名
            <RequiredMark />
          </FieldLabel>
          <div>
            <input type="text" placeholder="例）新潟山歩きの会" maxLength={40} className={inputClass} {...register("name")} />
            <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">{nameValue.length} / 40</div>
            {errors.name ? <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.name.message}</p> : null}
          </div>
        </div>

        {/* カテゴリ */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            カテゴリ
            <RequiredMark />
          </FieldLabel>
          <div>
            <div className="grid grid-cols-2 gap-2.5 lg:gap-[18px]">
              <div className="relative">
                <select className={selectClass} {...register("categoryMajorId")}>
                  <option value="">大カテゴリを選択</option>
                  {majorCategories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
              <div className="relative">
                <select className={selectClass} disabled={!majorId} {...register("categoryMinorId")}>
                  <option value="">小カテゴリを選択</option>
                  {minorOptions.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
            </div>
            {errors.categoryMajorId || errors.categoryMinorId ? (
              <p className="mt-1.5 text-[11px] text-[#D1453B]">
                {errors.categoryMajorId?.message ?? errors.categoryMinorId?.message}
              </p>
            ) : null}
          </div>
        </div>

        {/* 活動エリア */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel help>
            活動エリア（拠点）
            <RequiredMark />
          </FieldLabel>
          <div>
            <div className="flex items-center gap-3.5 lg:gap-[22px]">
              <div className="relative flex-1 lg:max-w-[300px] lg:flex-none">
                <select className={selectClass} disabled={isCitywide} {...register("areaId")}>
                  <option value="">エリア（区）を選択</option>
                  {areaOptions.map((a) => (
                    <option key={a.id} value={a.slug}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
              <label className="flex shrink-0 items-center gap-2 text-xs text-cb-ink-soft lg:gap-[9px] lg:text-[12.5px]">
                <input
                  type="checkbox"
                  className="h-[17px] w-[17px] rounded border-[1.5px] border-[#C9BFAD] text-cb-accent"
                  {...register("isCitywide")}
                  onChange={(e) => {
                    setValue("isCitywide", e.target.checked);
                    if (e.target.checked) setValue("areaId", "");
                  }}
                />
                市内全域
              </label>
            </div>
            {errors.areaId ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.areaId.message}</p> : null}
          </div>
        </div>

        {/* 活動場所・行き先 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel help>
            活動場所・行き先
            <RequiredMark />
          </FieldLabel>
          <div>
            <input
              type="text"
              placeholder="例）角田山・弥彦山・栗ヶ岳など県内の山、妙高山・八海山など県外の山"
              className={`${inputClass} truncate`}
              {...register("location")}
            />
            <div className="mt-1.5 text-[10.5px] text-cb-muted-3">実際の活動場所や行き先の詳細をご記入ください。</div>
            {errors.location ? <p className="mt-1 text-[11px] text-[#D1453B]">{errors.location.message}</p> : null}
          </div>
        </div>

        {/* 活動頻度・時間 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            活動頻度・時間
            <RequiredMark />
          </FieldLabel>
          <div>
            <input
              type="text"
              placeholder="例）月2〜3回、主に土日・祝日の日帰り"
              className={inputClass}
              {...register("schedule")}
            />
            {errors.schedule ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.schedule.message}</p> : null}
          </div>
        </div>

        {/* 紹介文 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            サークルの紹介文
            <RequiredMark />
          </FieldLabel>
          <div>
            <textarea
              rows={4}
              maxLength={500}
              className={`${inputClass} h-28 resize-none leading-[1.8]`}
              {...register("description")}
            />
            <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-cb-placeholder">
              <span>10文字以上・500文字以内</span>
              <span>{descriptionValue.length} / 500</span>
            </div>
            {errors.description ? <p className="text-[11px] text-[#D1453B]">{errors.description.message}</p> : null}
          </div>
        </div>

        {/* 応募資格 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>応募資格</FieldLabel>
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

        {/* メイン画像 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            サークルのメイン画像
            {mode === "create" ? <RequiredMark /> : null}
          </FieldLabel>
          <div>
            <ImageDropzone
              file={imageFile}
              onChange={setImageFile}
              existingLabel={existingImageLabel}
              hint="JPG / PNG形式（最大5MB）・1枚推奨"
            />
            {imageRequiredError ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{imageRequiredError}</p> : null}
          </div>
        </div>
      </div>

      {/* デスクトップ: フォーム内右下ボタン */}
      <div className="mt-6 hidden items-center justify-end gap-3.5 border-t border-[#F3ECE0] pt-[22px] lg:flex">
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
          {submitting ? "保存中..." : mode === "create" ? "サークルを作成する" : "変更を保存"}
        </button>
      </div>

      {/* モバイル: 下部固定バー相当（フォーム末尾に表示） */}
      <div className="mt-5 grid grid-cols-[auto_1fr] gap-3 lg:hidden">
        <a
          href={redirectTo}
          className="flex min-h-[52px] items-center justify-center rounded-[9px] border border-[#E0D6C6] px-6 text-[13.5px] font-medium text-cb-ink-soft"
        >
          キャンセル
        </a>
        <button
          type="submit"
          disabled={submitting}
          className="flex min-h-[52px] items-center justify-center rounded-[9px] bg-cb-accent text-[13.5px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] disabled:opacity-60"
        >
          {submitting ? "保存中..." : mode === "create" ? "作成する" : "変更を保存"}
        </button>
      </div>
    </form>
  );
}
