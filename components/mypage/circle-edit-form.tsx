"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import {
  circleEditSchema,
  type CircleEditInput,
} from "@/lib/validations/circle-schema";
import { categoryOptions, areaOptions, frequencyOptions } from "@/lib/circle-form-options";
import {
  activityTagOptions,
  dayOptions,
  recruitingStatusOptions,
  visibilityOptions,
  defaultCircleEditValues,
} from "@/lib/circle-edit-mock-data";

const inputClass =
  "w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-[13px] text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none";

const selectClass = `${inputClass} appearance-none pr-9`;

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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[12.5px] font-medium text-[#3B352C]">{children}</div>;
}

export function CircleEditForm() {
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CircleEditInput>({
    resolver: zodResolver(circleEditSchema),
    defaultValues: defaultCircleEditValues,
  });

  const descriptionValue = watch("description") ?? "";

  function onSubmit(data: CircleEditInput) {
    // TODO: Supabase接続後、circles テーブルの update() に置き換える。
    console.info("circle edit submitted", { ...data, image: imageFileName });
  }

  return (
    <form id="circle-edit-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-5">
        {/* 左カラム: 画像＋公開設定 */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-[12.5px] font-bold text-[#3B352C]">サークル画像</div>
            <div className="relative mt-2.5 h-[172px] overflow-hidden rounded-[9px] lg:h-[150px]">
              <PhotoPlaceholder caption={imageFileName ?? "稜線を歩く2人組の写真"} iconSize={20} />
              <div className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(60,45,20,.2)] lg:h-8 lg:w-8">
                <MaterialSymbol name="photo_camera" size={18} className="text-cb-ink-soft" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 flex min-h-12 w-full items-center justify-center rounded-lg border border-cb-accent text-[13px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft lg:min-h-0 lg:py-2.5"
            >
              画像を変更
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => setImageFileName(e.target.files?.[0]?.name ?? null)}
            />
            <div className="mt-2.5 text-center text-[10.5px] leading-[1.7] text-cb-placeholder">
              JPG / PNG（5MB以内）
              <br />
              推奨サイズ：1200×800px
            </div>
          </div>

          <div>
            <div className="text-[12.5px] font-bold text-[#3B352C]">サークルの公開設定</div>
            <Controller
              control={control}
              name="visibility"
              render={({ field }) => (
                <div className="mt-[11px] flex flex-col gap-[11px]">
                  {visibilityOptions.map((opt) => {
                    const selected = field.value === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => field.onChange(opt.id)}
                        className="flex items-start gap-[11px] text-left"
                      >
                        <span
                          className={`mt-0.5 h-[17px] w-[17px] shrink-0 rounded-full bg-white box-border ${
                            selected ? "border-[5px] border-cb-accent" : "border-[1.5px] border-[#C9BFAD]"
                          }`}
                        />
                        <div>
                          <div className={`text-[12.5px] ${selected ? "font-bold" : "font-medium"} text-[#3B352C]`}>
                            {opt.label}
                          </div>
                          <div className="mt-1 text-[10.5px] text-cb-placeholder">{opt.note}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>
        </div>

        {/* 右カラム: フォーム本体 */}
        <div className="flex flex-col gap-4 lg:gap-[18px]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-[18px]">
            <label className="block">
              <FieldLabel>
                サークル名
                <RequiredMark />
              </FieldLabel>
              <input type="text" maxLength={20} className={`${inputClass} mt-2.5`} {...register("name")} />
              <div className="mt-1.5 text-[10.5px] text-cb-placeholder">20文字以内</div>
              {errors.name ? <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.name.message}</p> : null}
            </label>

            <label className="block">
              <FieldLabel>
                カテゴリ
                <RequiredMark />
              </FieldLabel>
              <div className="relative mt-2.5">
                <select className={selectClass} {...register("categoryId")}>
                  {categoryOptions.map((major) => (
                    <optgroup key={major.id} label={major.label}>
                      {major.children.map((minor) => (
                        <option key={minor.id} value={minor.id}>
                          {minor.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <SelectChevron />
              </div>
              {errors.categoryId ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.categoryId.message}</p> : null}
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-[18px]">
            <label className="block">
              <FieldLabel>
                活動エリア
                <RequiredMark />
              </FieldLabel>
              <div className="relative mt-2.5">
                <select className={selectClass} {...register("areaId")}>
                  {areaOptions.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
              {errors.areaId ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.areaId.message}</p> : null}
            </label>

            <label className="block">
              <FieldLabel>活動場所（主な活動エリアや場所）</FieldLabel>
              <input
                type="text"
                maxLength={30}
                className={`${inputClass} mt-2.5 truncate`}
                {...register("location")}
              />
              <div className="mt-1.5 text-[10.5px] text-cb-placeholder">30文字以内</div>
              {errors.location ? <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.location.message}</p> : null}
            </label>
          </div>

          <label className="block">
            <FieldLabel>
              サークルの紹介文
              <RequiredMark />
            </FieldLabel>
            <textarea
              rows={4}
              maxLength={500}
              className={`${inputClass} mt-2.5 h-28 resize-none leading-[1.8] lg:h-[78px]`}
              {...register("description")}
            />
            <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-cb-placeholder">
              <span>10文字以上・500文字以内</span>
              <span>{descriptionValue.length} / 500</span>
            </div>
            {errors.description ? <p className="text-[11px] text-[#D1453B]">{errors.description.message}</p> : null}
          </label>

          <div>
            <FieldLabel>活動内容（複数選択可）</FieldLabel>
            <Controller
              control={control}
              name="activityTags"
              render={({ field }) => (
                <div className="mt-[11px] grid grid-cols-2 gap-x-3.5 gap-y-3 lg:grid-cols-6">
                  {activityTagOptions.map((label) => {
                    const selected = field.value.includes(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          field.onChange(
                            selected ? field.value.filter((v) => v !== label) : [...field.value, label],
                          )
                        }
                        className="flex items-center gap-2 whitespace-nowrap text-left text-xs text-[#4B453C]"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${
                            selected ? "border border-cb-accent bg-cb-accent" : "border-[1.5px] border-[#C9BFAD] bg-white"
                          }`}
                        >
                          {selected ? <MaterialSymbol name="check" size={13} className="text-white" /> : null}
                        </span>
                        <span className="truncate">{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-[18px]">
            <label className="block">
              <FieldLabel>
                活動頻度
                <RequiredMark />
              </FieldLabel>
              <div className="relative mt-2.5">
                <select className={selectClass} {...register("frequency")}>
                  {frequencyOptions.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
              {errors.frequency ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.frequency.message}</p> : null}
            </label>

            <div>
              <FieldLabel>
                主な活動日
                <RequiredMark />
              </FieldLabel>
              <Controller
                control={control}
                name="days"
                render={({ field }) => (
                  <div className="mt-2.5 flex gap-2.5">
                    {dayOptions.map((label) => {
                      const selected = field.value.includes(label);
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() =>
                            field.onChange(
                              selected ? field.value.filter((v) => v !== label) : [...field.value, label],
                            )
                          }
                          className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-[15px] py-2.5 text-xs ${
                            selected
                              ? "border border-cb-accent bg-cb-accent-soft text-cb-accent-dark"
                              : "border border-[#E6DCCB] bg-white text-cb-ink-soft"
                          }`}
                        >
                          <span
                            className={`flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[3px] ${
                              selected ? "border border-cb-accent bg-cb-accent" : "border-[1.5px] border-[#C9BFAD] bg-white"
                            }`}
                          >
                            {selected ? <MaterialSymbol name="check" size={11} className="text-white" /> : null}
                          </span>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.days ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.days.message}</p> : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-[18px]">
            <label className="block">
              <FieldLabel>
                メンバー募集
                <RequiredMark />
              </FieldLabel>
              <div className="relative mt-2.5 lg:max-w-[220px]">
                <select className={selectClass} {...register("recruitingStatus")}>
                  {recruitingStatusOptions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
            </label>

            <label className="block">
              <FieldLabel>募集するメンバーの条件や一言</FieldLabel>
              <input
                type="text"
                maxLength={30}
                className={`${inputClass} mt-2.5 truncate`}
                {...register("recruitingNote")}
              />
              <div className="mt-1.5 text-[10.5px] text-cb-placeholder">30文字以内</div>
              {errors.recruitingNote ? (
                <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.recruitingNote.message}</p>
              ) : null}
            </label>
          </div>

          {/* デスクトップ: フォーム内右下ボタン */}
          <div className="mt-2 hidden items-center justify-end gap-3.5 lg:flex">
            <Link
              href="/mypage/circles/owned"
              className="rounded-[9px] border border-[#E0D6C6] bg-white px-[34px] py-3.5 text-[13.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
            >
              キャンセル
            </Link>
            <button
              type="submit"
              className="rounded-[9px] bg-cb-accent px-10 py-3.5 text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover"
            >
              変更を保存
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
