"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, type FieldErrors, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleGalleryDropzone, type GalleryItem } from "@/components/circle-gallery-dropzone";
import { buildCircleFormSchema, type CircleFormInput } from "@/lib/validations/circle-schema";
import { activityDayOptions, citywideAreaId } from "@/lib/circle-form-options";
import { createClient } from "@/lib/supabase/client";
import { uploadCircleMedia } from "@/lib/storage";
import type { CategoryRow, AreaRow } from "@/lib/circles";

const inputClass =
  "w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:text-[12.5px]";
const selectClass = `${inputClass} appearance-none pr-9`;
const helpTip = "サークルの拠点・集合場所の大まかな区分です。実際の活動場所は下欄にご記入ください。";
const fieldGridClass =
  "flex flex-col gap-5 lg:grid lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start lg:gap-x-[22px] lg:gap-y-5";

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

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{message}</p> : null;
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div className="mt-8 border-t border-[#F3ECE0] pb-5 pt-8">
        <h2 className="font-heading text-[17px] font-bold text-cb-ink">{title}</h2>
      </div>
      <div className={fieldGridClass}>{children}</div>
    </>
  );
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
  defaultActivities,
  defaultImages,
  redirectTo,
}: {
  mode: "create" | "edit";
  circleId?: string;
  categories: CategoryRow[];
  areas: AreaRow[];
  defaultValues?: Partial<CircleFormInput>;
  defaultActivities?: string[];
  defaultImages?: { id: string; path: string }[];
  redirectTo: string;
}) {
  const router = useRouter();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(
    (defaultImages ?? []).map((img) => ({ kind: "existing" as const, id: img.id, path: img.path })),
  );
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [activities, setActivities] = useState<string[]>(
    defaultActivities && defaultActivities.length > 0 ? defaultActivities : ["", "", ""],
  );

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CircleFormInput>({
    resolver: zodResolver(buildCircleFormSchema(mode)),
    defaultValues: {
      type: "ongoing",
      status: "published",
      name: "",
      tagline: "",
      categoryMajorId: "",
      categoryMinorId: "",
      isCitywide: false,
      areaId: "",
      location: "",
      locationAccess: "",
      scheduleFrequency: "",
      scheduleTime: "",
      memberCount: "",
      foundedAt: "",
      activityDays: [],
      eventDate: "",
      eventStartTime: "",
      eventEndNote: "",
      applicationDeadline: "",
      paymentMethod: "",
      belongings: "",
      description: "",
      recruitTagline: "",
      requirements: "",
      recruitTarget: "",
      recruitCapacity: "",
      recruitCost: "",
      recruitHowToApply: "",
      ownerMessage: "",
      ...defaultValues,
    },
  });

  const nameValue = watch("name") ?? "";
  const taglineValue = watch("tagline") ?? "";
  const descriptionValue = watch("description") ?? "";
  const recruitTaglineValue = watch("recruitTagline") ?? "";
  const ownerMessageValue = watch("ownerMessage") ?? "";
  const type = watch("type");
  // 作成時にイベントを選んだ場合は、イベント専用の入力項目（日時・定員・持ち物など）に切り替える。
  const isEventForm = mode === "create" && type === "one_time";
  const majorId = watch("categoryMajorId");
  const isCitywide = watch("isCitywide");
  const majorCategories = useMemo(() => categories.filter((c) => c.parent_id === null), [categories]);
  const areaOptions = useMemo(() => areas.filter((a) => a.slug !== citywideAreaId), [areas]);
  const minorOptions = useMemo(() => {
    const major = majorCategories.find((c) => c.slug === majorId);
    return major ? categories.filter((c) => c.parent_id === major.id) : [];
  }, [categories, majorCategories, majorId]);

  function updateActivity(index: number, value: string) {
    setActivities((prev) => prev.map((item, i) => (i === index ? value : item)));
  }

  function addActivity() {
    setActivities((prev) => [...prev, ""]);
  }

  function removeActivity(index: number) {
    setActivities((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : [""]));
  }

  async function onSubmit(data: CircleFormInput) {
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

    const isEvent = mode === "create" && data.type === "one_time";
    const payload = {
      name: data.name,
      tagline: data.tagline,
      type: data.type,
      event_date: data.type === "one_time" ? data.eventDate : null,
      category_id: categoryId,
      area_id: areaId,
      description: data.description,
      activities: activities.map((item) => item.trim()).filter(Boolean).join("\n"),
      schedule_frequency: data.scheduleFrequency,
      schedule_time: data.scheduleTime ?? "",
      member_count: data.memberCount ?? "",
      founded_at: data.foundedAt ?? "",
      activity_days: data.type === "ongoing" ? (data.activityDays ?? []) : [],
      location: data.location,
      location_access: data.locationAccess ?? "",
      ...(mode === "create"
        ? {
            recruit_tagline: data.recruitTagline ?? "",
            requirements: data.requirements ?? "",
            recruit_target: data.recruitTarget ?? "",
            recruit_capacity: isEvent ? `${data.recruitCapacity}名` : (data.recruitCapacity ?? ""),
            recruit_cost: data.recruitCost ?? "",
            recruit_how_to_apply: data.recruitHowToApply ?? "",
            payment_method: data.paymentMethod ?? "",
            owner_message: data.ownerMessage ?? "",
          }
        : {}),
      ...(isEvent
        ? {
            event_start_time: data.eventStartTime ?? "",
            event_end_note: data.eventEndNote ?? "",
            application_deadline: data.applicationDeadline || null,
            belongings: data.belongings ?? "",
          }
        : {}),
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
        .insert({ ...payload, slug, owner_id: user.id, status: data.status ?? "published" })
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

    if (targetCircleId) {
      try {
        const removedImages = (defaultImages ?? []).filter(
          (img) => !galleryItems.some((item) => item.kind === "existing" && item.id === img.id),
        );
        if (removedImages.length > 0) {
          await supabase.storage.from("circle-media").remove(removedImages.map((img) => img.path));
          await supabase
            .from("circle_images")
            .delete()
            .in("id", removedImages.map((img) => img.id));
        }

        for (const [index, item] of galleryItems.entries()) {
          if (item.kind === "existing") {
            await supabase.from("circle_images").update({ sort_order: index }).eq("id", item.id);
          } else {
            const path = await uploadCircleMedia(supabase, user.id, "circles", item.file);
            await supabase
              .from("circle_images")
              .insert({ circle_id: targetCircleId, storage_path: path, sort_order: index });
          }
        }
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
          {mode === "create" ? (isEventForm ? "① 基本情報" : "基本情報") : "サークル情報"}
        </h2>
        <span className="text-[10.5px] text-cb-muted-3 lg:text-[11px]">
          <span className="text-[#E5731B]">＊</span> は必須項目です
        </span>
      </div>

      <div className={fieldGridClass}>
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
                      { value: "ongoing" as const, icon: "groups", title: "サークル", desc: "メンバーを継続的に募集するサークルです" },
                      { value: "one_time" as const, icon: "calendar_month", title: "イベント", desc: "1回限りのイベント・活動の参加者を募集します" },
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

        {/* 公開設定 */}
        {mode === "create" ? (
          <div className="flex flex-col gap-2.5 lg:contents">
            <FieldLabel>
              公開設定
              <RequiredMark />
            </FieldLabel>
            <div>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <div className="grid max-w-[640px] grid-cols-2 gap-3 lg:gap-4">
                    {(
                      [
                        { value: "published" as const, icon: "visibility", title: "公開", desc: "作成後すぐに一覧・検索結果に表示されます" },
                        { value: "unpublished" as const, icon: "visibility_off", title: "非公開", desc: "下書きとして保存し、あとで公開できます" },
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
              {errors.status ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.status.message}</p> : null}
            </div>
          </div>
        ) : null}
      </div>

      {isEventForm ? (
        <EventFields
          register={register}
          setValue={setValue}
          errors={errors}
          nameLength={nameValue.length}
          taglineLength={taglineValue.length}
          descriptionLength={descriptionValue.length}
          majorId={majorId}
          isCitywide={isCitywide}
          majorCategories={majorCategories}
          minorOptions={minorOptions}
          areaOptions={areaOptions}
          galleryItems={galleryItems}
          onGalleryChange={setGalleryItems}
        />
      ) : (
        <>
          <div className={`mt-5 ${fieldGridClass}`}>
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

            {/* 紹介文（一覧カードに表示される要約） */}
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>
                紹介文
                <RequiredMark />
              </FieldLabel>
              <div>
                <input
                  type="text"
                  placeholder="例）自然を楽しみ、仲間とつながる登山サークル"
                  maxLength={60}
                  className={inputClass}
                  {...register("tagline")}
                />
                <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-cb-placeholder">
                  <span>一覧カードに表示される短い要約です</span>
                  <span>{taglineValue.length} / 60</span>
                </div>
                {errors.tagline ? <p className="text-[11px] text-[#D1453B]">{errors.tagline.message}</p> : null}
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

            {/* 主な活動場所 */}
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel help>
                主な活動場所
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

            {/* 行き方・集合方法 */}
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>行き方・集合方法</FieldLabel>
              <div>
                <textarea
                  rows={3}
                  maxLength={300}
                  placeholder="例）〇〇駐車場に集合、公共交通機関でお越しの場合は△△駅からバスで15分など"
                  className={`${inputClass} h-20 resize-none leading-[1.8]`}
                  {...register("locationAccess")}
                />
                {errors.locationAccess ? (
                  <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.locationAccess.message}</p>
                ) : null}
              </div>
            </div>

            {/* 活動頻度・活動時間 */}
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>
                活動頻度
                <RequiredMark />
              </FieldLabel>
              <div>
                <input
                  type="text"
                  placeholder="例）月2〜3回"
                  className={`${inputClass} lg:max-w-[300px]`}
                  {...register("scheduleFrequency")}
                />
                {errors.scheduleFrequency ? (
                  <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.scheduleFrequency.message}</p>
                ) : null}
              </div>
            </div>

            {type === "ongoing" ? (
              <div className="flex flex-col gap-2.5 lg:contents">
                <FieldLabel>主な活動曜日</FieldLabel>
                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-3 lg:gap-x-4 lg:pt-3">
                  {activityDayOptions.map((day) => (
                    <label
                      key={day}
                      className="flex shrink-0 items-center gap-2 text-xs text-cb-ink-soft lg:gap-[7px] lg:text-[12.5px]"
                    >
                      <input
                        type="checkbox"
                        value={day}
                        className="h-[17px] w-[17px] rounded border-[1.5px] border-[#C9BFAD] text-cb-accent"
                        {...register("activityDays")}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>主な活動時間</FieldLabel>
              <div>
                <input
                  type="text"
                  placeholder="例）主に土日・祝日の日帰り、朝8時集合〜夕方解散"
                  className={`${inputClass} lg:max-w-[400px]`}
                  {...register("scheduleTime")}
                />
                {errors.scheduleTime ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.scheduleTime.message}</p> : null}
              </div>
            </div>

            {/* サークルメンバー数・設立時期 */}
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>サークルメンバー数</FieldLabel>
              <div>
                <input
                  type="text"
                  placeholder="例）現在15名"
                  className={`${inputClass} lg:max-w-[260px]`}
                  {...register("memberCount")}
                />
                {errors.memberCount ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.memberCount.message}</p> : null}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>設立時期</FieldLabel>
              <div>
                <input
                  type="text"
                  placeholder="例）2019年4月"
                  className={`${inputClass} lg:max-w-[260px]`}
                  {...register("foundedAt")}
                />
                {errors.foundedAt ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.foundedAt.message}</p> : null}
              </div>
            </div>

            {/* 詳細説明 */}
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>
                詳細説明
                <RequiredMark />
              </FieldLabel>
              <div>
                <textarea
                  rows={5}
                  maxLength={500}
                  placeholder="活動の具体的な内容や雰囲気、これまでの実績などをまとめてご記入ください。"
                  className={`${inputClass} h-[130px] resize-none leading-[1.8]`}
                  {...register("description")}
                />
                <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">
                  10文字以上・500文字以内　{descriptionValue.length} / 500
                </div>
                {errors.description ? <p className="text-[11px] text-[#D1453B]">{errors.description.message}</p> : null}
              </div>
            </div>

            {/* 活動内容・活動目標（箇条書き） */}
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>
                <span>
                  活動内容・活動目標
                  <span className="text-[11px] font-normal text-[#B3A996]">（推奨）</span>
                </span>
              </FieldLabel>
              <div>
                <div className="mb-2 text-[10.5px] text-cb-muted-3 lg:pt-3">タグを追加すると検索されやすくなります。</div>
                <div className="flex flex-col gap-2">
                  {activities.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-cb-accent" />
                      <input
                        type="text"
                        placeholder="例）登山、トレッキング、山道具のメンテナンス講習"
                        maxLength={100}
                        className={inputClass}
                        value={item}
                        onChange={(e) => updateActivity(index, e.target.value)}
                      />
                      <button
                        type="button"
                        aria-label="この項目を削除"
                        onClick={() => removeActivity(index)}
                        className="shrink-0 rounded-lg p-2 text-cb-muted-3 hover:bg-[#FDF7EE] hover:text-[#D1453B]"
                      >
                        <MaterialSymbol name="close" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addActivity}
                  className="mt-2.5 flex items-center gap-1.5 text-[11.5px] font-medium text-cb-accent-dark hover:underline lg:text-xs"
                >
                  <MaterialSymbol name="add" size={17} />
                  項目を追加
                </button>
              </div>
            </div>

            {/* サークルの画像 */}
            <div className="flex flex-col gap-2.5 lg:contents">
              <FieldLabel>
                <span>
                  サークルの画像
                  <span className="text-[11px] font-normal text-[#B3A996]">（推奨・最大5枚）</span>
                </span>
              </FieldLabel>
              <div className="lg:pt-3">
                <CircleGalleryDropzone items={galleryItems} onChange={setGalleryItems} maxFiles={5} />
              </div>
            </div>
          </div>

          {mode === "create" ? (
            <>
              <div className="mt-8 flex items-baseline justify-between border-t border-[#F3ECE0] pb-5 pt-8">
                <div>
                  <h2 className="font-heading text-[17px] font-bold text-cb-ink">メンバー募集</h2>
                  <p className="mt-1.5 text-[11.5px] text-cb-muted-2">
                    「メンバー募集内容」タブに表示される情報です。未入力の項目は表示されません。作成後にいつでも編集できます。
                  </p>
                </div>
              </div>

              <div className={fieldGridClass}>
                {/* 募集メッセージ */}
                <div className="flex flex-col gap-2.5 lg:contents">
                  <FieldLabel>募集メッセージ</FieldLabel>
                  <div>
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="例）未経験者大歓迎！一緒に楽しく活動しましょう"
                      className={inputClass}
                      {...register("recruitTagline")}
                    />
                    <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">{recruitTaglineValue.length} / 100</div>
                    {errors.recruitTagline ? (
                      <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.recruitTagline.message}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 lg:contents">
                  <FieldLabel>募集対象</FieldLabel>
                  <div>
                    <input
                      type="text"
                      maxLength={200}
                      placeholder="例）初心者・経験者問わずどなたでも"
                      className={inputClass}
                      {...register("recruitTarget")}
                    />
                    <FieldError message={errors.recruitTarget?.message} />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 lg:contents">
                  <FieldLabel>募集人数</FieldLabel>
                  <div>
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="例）5名程度（先着順）"
                      className={`${inputClass} lg:max-w-[300px]`}
                      {...register("recruitCapacity")}
                    />
                    <FieldError message={errors.recruitCapacity?.message} />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 lg:contents">
                  <FieldLabel>求める方</FieldLabel>
                  <div>
                    <input
                      type="text"
                      maxLength={500}
                      placeholder="例）18歳以上の方、経験は問いません"
                      className={inputClass}
                      {...register("requirements")}
                    />
                    <FieldError message={errors.requirements?.message} />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 lg:contents">
                  <FieldLabel>会費</FieldLabel>
                  <div>
                    <input
                      type="text"
                      maxLength={200}
                      placeholder="例）月500円（保険代・会場費として）"
                      className={`${inputClass} lg:max-w-[300px]`}
                      {...register("recruitCost")}
                    />
                    <FieldError message={errors.recruitCost?.message} />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 lg:contents">
                  <FieldLabel>
                    <span>
                      会費の支払い方法
                      <span className="text-[11px] font-normal text-[#B3A996]">（会費入力時は必須）</span>
                    </span>
                  </FieldLabel>
                  <div>
                    <input
                      type="text"
                      maxLength={200}
                      placeholder="例）活動当日に現地で集金"
                      className={inputClass}
                      {...register("paymentMethod")}
                    />
                    <FieldError message={errors.paymentMethod?.message} />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 lg:contents">
                  <FieldLabel>申し込み方法</FieldLabel>
                  <div>
                    <input
                      type="text"
                      maxLength={500}
                      placeholder="例）メッセージ機能よりお気軽にご連絡ください。日程を調整のうえ、見学からご案内します。"
                      className={`${inputClass} truncate`}
                      {...register("recruitHowToApply")}
                    />
                    <div className="mt-1.5 text-[10.5px] text-cb-muted-3">
                      未入力の場合「まずはメッセージでご連絡ください」と表示されます。
                    </div>
                    <FieldError message={errors.recruitHowToApply?.message} />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#F3ECE0] pb-5 pt-8">
                <h2 className="font-heading text-[17px] font-bold text-cb-ink">主催者からのメッセージ</h2>
                <p className="mt-1.5 text-[11.5px] text-cb-muted-2">
                  サークル詳細ページの「主催者情報」タブに表示される、このサークル向けのメッセージです。作成後にいつでも編集できます。
                </p>
              </div>

              <div className={fieldGridClass}>
                <div className="flex flex-col gap-2.5 lg:contents">
                  <FieldLabel>主催者からのメッセージ</FieldLabel>
                  <div>
                    <textarea
                      rows={4}
                      maxLength={500}
                      placeholder="例）新潟の山の魅力を多くの人に知ってもらいたくて、このサークルを立ち上げました。初心者の方も大歓迎です！"
                      className={`${inputClass} h-[100px] resize-none leading-[1.85]`}
                      {...register("ownerMessage")}
                    />
                    <div className="mt-1.5 flex items-center justify-between gap-3 text-[10.5px] text-cb-muted-3">
                      <span>未入力の場合はサークル詳細ページに表示されません</span>
                      <span className="shrink-0">{ownerMessageValue.length} / 500</span>
                    </div>
                    <FieldError message={errors.ownerMessage?.message} />
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      )}

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
          {submitting
            ? "保存中..."
            : mode === "create"
              ? isEventForm
                ? "イベントを作成する"
                : "サークルを作成する"
              : "変更を保存"}
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

type EventFieldsProps = {
  register: UseFormRegister<CircleFormInput>;
  setValue: UseFormSetValue<CircleFormInput>;
  errors: FieldErrors<CircleFormInput>;
  nameLength: number;
  taglineLength: number;
  descriptionLength: number;
  majorId: string;
  isCitywide: boolean;
  majorCategories: CategoryRow[];
  minorOptions: CategoryRow[];
  areaOptions: AreaRow[];
  galleryItems: GalleryItem[];
  onGalleryChange: (items: GalleryItem[]) => void;
};

// イベント（単発募集）作成時の入力項目。基本情報・日時と場所・参加条件と定員・詳細と画像の4区分で構成する。
function EventFields({
  register,
  setValue,
  errors,
  nameLength,
  taglineLength,
  descriptionLength,
  majorId,
  isCitywide,
  majorCategories,
  minorOptions,
  areaOptions,
  galleryItems,
  onGalleryChange,
}: EventFieldsProps) {
  return (
    <>
      <div className={`mt-5 ${fieldGridClass}`}>
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            イベント名
            <RequiredMark />
          </FieldLabel>
          <div>
            <input
              type="text"
              placeholder="例）秋のフットサルでいい汗！"
              maxLength={40}
              className={inputClass}
              {...register("name")}
            />
            <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">{nameLength} / 40</div>
            <FieldError message={errors.name?.message} />
          </div>
        </div>

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
            <FieldError message={errors.categoryMajorId?.message ?? errors.categoryMinorId?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            紹介文
            <RequiredMark />
          </FieldLabel>
          <div>
            <textarea
              rows={2}
              maxLength={100}
              placeholder="例）気持ちのいい秋晴れの下、初心者歓迎でフットサルを楽しむイベントです。運動不足解消にもぴったり！"
              className={`${inputClass} h-[70px] resize-none leading-[1.8]`}
              {...register("tagline")}
            />
            <div className="mt-1.5 flex items-center justify-between gap-3 text-[10.5px] text-cb-muted-3">
              <span>一覧カードに表示される短い要約です（50〜100文字目安）</span>
              <span className="shrink-0">{taglineLength} / 100</span>
            </div>
            <FieldError message={errors.tagline?.message} />
          </div>
        </div>
      </div>

      <FormSection title="② 日時・場所">
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            開催日
            <RequiredMark />
          </FieldLabel>
          <div>
            <input type="date" className={`${inputClass} lg:max-w-[300px]`} {...register("eventDate")} />
            <FieldError message={errors.eventDate?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            開催時間（開始）
            <RequiredMark />
          </FieldLabel>
          <div>
            <input type="time" className={`${inputClass} lg:max-w-[300px]`} {...register("eventStartTime")} />
            <FieldError message={errors.eventStartTime?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>終了時刻／所要時間の目安</FieldLabel>
          <div>
            <input
              type="text"
              maxLength={100}
              placeholder="例）12:00終了、または所要時間 約2時間"
              className={`${inputClass} lg:max-w-[400px]`}
              {...register("eventEndNote")}
            />
            <FieldError message={errors.eventEndNote?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>応募締切</FieldLabel>
          <div>
            <input type="date" className={`${inputClass} lg:max-w-[300px]`} {...register("applicationDeadline")} />
            <div className="mt-1.5 text-[10.5px] text-cb-muted-3">未入力の場合、開催日当日が締切になります</div>
            <FieldError message={errors.applicationDeadline?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            エリア（拠点・集合エリア）
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
            <FieldError message={errors.areaId?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            開催場所
            <RequiredMark />
          </FieldLabel>
          <div>
            <input
              type="text"
              placeholder="例）新潟市スポーツ公園 フットサルコート"
              className={`${inputClass} truncate`}
              {...register("location")}
            />
            <FieldError message={errors.location?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>行き方・集合方法</FieldLabel>
          <div>
            <textarea
              rows={2}
              maxLength={300}
              placeholder="例）〇〇駐車場に集合、公共交通機関でお越しの場合は△△駅からバスで15分など"
              className={`${inputClass} h-[70px] resize-none leading-[1.8]`}
              {...register("locationAccess")}
            />
            <FieldError message={errors.locationAccess?.message} />
          </div>
        </div>
      </FormSection>

      <FormSection title="③ 参加条件・定員">
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            募集人数（定員）
            <RequiredMark />
          </FieldLabel>
          <div>
            <div className="relative max-w-[160px] lg:max-w-[200px]">
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="例）12"
                className={`${inputClass} pr-9`}
                {...register("recruitCapacity")}
              />
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-cb-muted-2 lg:text-[12.5px]">
                名
              </span>
            </div>
            <FieldError message={errors.recruitCapacity?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>募集対象</FieldLabel>
          <div>
            <input
              type="text"
              maxLength={200}
              placeholder="例）初心者歓迎、女性限定など"
              className={inputClass}
              {...register("recruitTarget")}
            />
            <FieldError message={errors.recruitTarget?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>求める方</FieldLabel>
          <div>
            <input
              type="text"
              maxLength={500}
              placeholder="例）経験者限定など、参加にあたって必須の条件"
              className={inputClass}
              {...register("requirements")}
            />
            <FieldError message={errors.requirements?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>参加費</FieldLabel>
          <div>
            <input
              type="text"
              maxLength={200}
              placeholder="例）500円（未入力の場合は「無料」と表示されます）"
              className={`${inputClass} lg:max-w-[300px]`}
              {...register("recruitCost")}
            />
            <FieldError message={errors.recruitCost?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            <span>
              参加費の支払い方法
              <span className="text-[11px] font-normal text-[#B3A996]">（参加費入力時は必須）</span>
            </span>
          </FieldLabel>
          <div>
            <input
              type="text"
              maxLength={200}
              placeholder="例）当日現地払い（オンライン決済は未対応です）"
              className={inputClass}
              {...register("paymentMethod")}
            />
            <FieldError message={errors.paymentMethod?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>持ち物・服装</FieldLabel>
          <div>
            <textarea
              rows={2}
              maxLength={500}
              placeholder="例）運動しやすい服装、フットサルシューズ、タオル、飲み物など"
              className={`${inputClass} h-[70px] resize-none leading-[1.8]`}
              {...register("belongings")}
            />
            <FieldError message={errors.belongings?.message} />
          </div>
        </div>
      </FormSection>

      <FormSection title="④ 詳細・画像">
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            詳細情報
            <RequiredMark />
          </FieldLabel>
          <div>
            <textarea
              rows={5}
              maxLength={1000}
              placeholder="活動内容や目標、主催者からのメッセージなどをまとめてご記入ください。参加者がイベントの雰囲気をイメージできるような内容がおすすめです。"
              className={`${inputClass} h-[130px] resize-none leading-[1.8]`}
              {...register("description")}
            />
            <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">
              10文字以上・1000文字以内　{descriptionLength} / 1000
            </div>
            <FieldError message={errors.description?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>イベントの画像</FieldLabel>
          <div className="lg:pt-3">
            <CircleGalleryDropzone items={galleryItems} onChange={onGalleryChange} maxFiles={5} />
          </div>
        </div>
      </FormSection>
    </>
  );
}
