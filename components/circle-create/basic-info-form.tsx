"use client";

import { useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import {
  circleStep1Schema,
  type CircleStep1Input,
} from "@/lib/validations/circle-schema";
import {
  areaOptions,
  categoryOptions,
  citywideAreaId,
  frequencyOptions,
  timeSlotOptions,
} from "@/lib/circle-form-options";

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

export function BasicInfoForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CircleStep1Input>({
    resolver: zodResolver(circleStep1Schema),
    defaultValues: {
      type: "ongoing",
      name: "",
      categoryMajorId: "",
      categoryMinorId: "",
      isCitywide: false,
      areaId: "",
      location: "",
      frequency: "",
      timeSlots: [],
      timeSlotsOther: "",
    },
  });

  const nameValue = watch("name") ?? "";
  const majorId = watch("categoryMajorId");
  const isCitywide = watch("isCitywide");
  const minorOptions = useMemo(
    () => categoryOptions.find((c) => c.id === majorId)?.children ?? [],
    [majorId],
  );

  function handleFileSelect(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("画像ファイルを選択してください");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("ファイルサイズは5MB以内にしてください");
      return;
    }
    setImageError(null);
    setImageFile(file);
  }

  function onSubmit(data: CircleStep1Input) {
    if (!imageFile) {
      setImageError("メイン画像をアップロードしてください");
      return;
    }
    // TODO: ステップ2（詳細情報）実装後、フォーム状態を引き継いで遷移する。
    // 現時点ではSupabase未接続のため、下書き保存・送信は行わずログのみ。
    console.info("circle create step1 submitted", { ...data, mainImage: imageFile.name });
  }

  return (
    <form id="circle-step1-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex items-baseline justify-between pb-5 lg:pb-5">
        <h2 className="font-heading text-[17px] font-bold text-cb-ink">基本情報</h2>
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
                        <MaterialSymbol
                          name={opt.icon}
                          size={24}
                          className={selected ? "text-cb-accent" : "text-cb-muted-3"}
                        />
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

        {/* サークル名 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            サークル名
            <RequiredMark />
          </FieldLabel>
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="例）新潟山歩きの会"
                maxLength={40}
                className={inputClass}
                {...register("name")}
              />
            </div>
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
                  {categoryOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
              <div className="relative">
                <select className={selectClass} disabled={!majorId} {...register("categoryMinorId")}>
                  <option value="">小カテゴリを選択</option>
                  {minorOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
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
                    <option key={a.id} value={a.id}>
                      {a.label}
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
                    setValue("areaId", e.target.checked ? citywideAreaId : "");
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
            <div className="mt-1.5 text-[10.5px] text-cb-muted-3">
              実際の活動場所や行き先の詳細をご記入ください。
            </div>
            {errors.location ? <p className="mt-1 text-[11px] text-[#D1453B]">{errors.location.message}</p> : null}
          </div>
        </div>

        {/* 活動頻度 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            活動頻度
            <RequiredMark />
          </FieldLabel>
          <div>
            <div className="relative lg:max-w-[300px]">
              <select className={selectClass} {...register("frequency")}>
                <option value="">頻度を選択</option>
                {frequencyOptions.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
            {errors.frequency ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.frequency.message}</p> : null}
          </div>
        </div>

        {/* 主な活動時間 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            主な活動時間
            <RequiredMark />
          </FieldLabel>
          <div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 lg:flex lg:flex-wrap lg:items-center lg:gap-3">
              <Controller
                control={control}
                name="timeSlots"
                render={({ field }) => (
                  <>
                    {timeSlotOptions.map((slot) => {
                      const checked = field.value.includes(slot);
                      return (
                        <label
                          key={slot}
                          className="flex shrink-0 items-center gap-2 text-xs text-cb-ink-soft lg:gap-[7px] lg:text-[12.5px] lg:text-cb-ink"
                        >
                          <input
                            type="checkbox"
                            className="h-[17px] w-[17px] shrink-0 rounded border-[1.5px] border-[#C9BFAD] text-cb-accent"
                            checked={checked}
                            onChange={(e) => {
                              field.onChange(
                                e.target.checked
                                  ? [...field.value, slot]
                                  : field.value.filter((v) => v !== slot),
                              );
                            }}
                          />
                          {slot}
                        </label>
                      );
                    })}
                  </>
                )}
              />
              <input
                type="text"
                placeholder="例）不定期、季節限定など"
                className={`${inputClass} col-span-2 truncate lg:min-w-[140px] lg:flex-1`}
                {...register("timeSlotsOther")}
              />
            </div>
            {errors.timeSlots ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.timeSlots.message}</p> : null}
          </div>
        </div>

        {/* メイン画像 */}
        <div className="flex flex-col gap-2.5 lg:contents">
          <FieldLabel>
            サークルのメイン画像
            <RequiredMark />
          </FieldLabel>
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFileSelect(e.dataTransfer.files?.[0]);
              }}
              className={`flex min-h-[126px] w-full flex-col items-center justify-center gap-2.5 rounded-[9px] border-[1.5px] border-dashed bg-cb-surface px-4 text-center ${
                dragOver ? "border-cb-accent bg-cb-accent-soft" : "border-[#DFD4C2]"
              }`}
            >
              {imageFile ? (
                <div className="flex items-center gap-2.5 text-[12.5px] text-cb-ink-soft">
                  <MaterialSymbol name="check_circle" filled size={22} className="text-[#3E9E7A]" />
                  {imageFile.name}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <MaterialSymbol name="cloud_upload" size={30} className="text-[#D9B98A]" />
                  <div className="text-left">
                    <div className="text-[12.5px] text-cb-muted">
                      クリックまたはドラッグ＆ドロップで画像をアップロード
                    </div>
                    <div className="mt-1.5 text-[10.5px] text-cb-placeholder">
                      JPG / PNG形式（最大5MB）・1枚推奨
                    </div>
                  </div>
                </div>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />
            {imageError ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{imageError}</p> : null}
          </div>
        </div>
      </div>
    </form>
  );
}
