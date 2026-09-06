"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import {
  profileUpdateSchema,
  type ProfileUpdateInput,
} from "@/lib/validations/profile-schema";
import {
  genderOptions,
  ageRangeOptions,
  areaOptions,
  interestOptions,
  defaultProfileValues,
  visibilityOptions,
} from "@/lib/profile-edit-mock-data";

const inputClass =
  "w-full rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:text-[12.5px]";

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

export function ProfileForm() {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: defaultProfileValues,
  });

  const bioValue = watch("bio") ?? "";

  function onSubmit(data: ProfileUpdateInput) {
    // TODO: Supabase接続後、profiles テーブルの update() に置き換える。
    console.info("profile update submitted", data);
  }

  return (
    <form id="profile-edit-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="rounded-xl border border-cb-border bg-cb-surface px-4 pb-6 pt-[18px] lg:px-6 lg:pb-[26px] lg:pt-[22px]">
        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-2 lg:gap-x-[22px] lg:gap-y-[18px]">
          <label className="block">
            <FieldLabel>
              ニックネーム
              <RequiredMark />
            </FieldLabel>
            <input type="text" maxLength={20} className={`${inputClass} mt-2.5`} {...register("displayName")} />
            <div className="mt-2 text-[10.5px] text-cb-placeholder">
              ※ 他のユーザーに表示される名前です（20文字以内）
            </div>
            {errors.displayName ? (
              <p className="mt-1 text-[11px] text-[#D1453B]">{errors.displayName.message}</p>
            ) : null}
          </label>

          <label className="block">
            <FieldLabel>性別</FieldLabel>
            <div className="relative mt-2.5">
              <select className={selectClass} {...register("gender")}>
                {genderOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </label>

          <label className="block">
            <FieldLabel>年齢</FieldLabel>
            <div className="relative mt-2.5">
              <select className={selectClass} {...register("ageRange")}>
                {ageRangeOptions.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </label>

          <label className="block">
            <FieldLabel>
              お住まいのエリア
              <RequiredMark />
            </FieldLabel>
            <div className="relative mt-2.5">
              <select className={selectClass} {...register("area")}>
                {areaOptions.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </label>
        </div>

        <div className="mt-[18px]">
          <FieldLabel>
            自己紹介
            <RequiredMark />
          </FieldLabel>
          <textarea
            rows={4}
            maxLength={200}
            className={`${inputClass} mt-2.5 h-24 resize-none leading-[1.85] lg:h-[76px]`}
            {...register("bio")}
          />
          <div className="mt-[7px] text-right text-[10.5px] text-cb-placeholder">{bioValue.length} / 200</div>
          {errors.bio ? <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.bio.message}</p> : null}
        </div>

        <div className="mt-3.5 lg:mt-[14px]">
          <div className="text-[12.5px] font-medium text-[#3B352C]">
            趣味・関心
            <RequiredMark />
            <span className="ml-1.5 text-[11px] font-normal text-cb-muted-3">（複数選択可）</span>
          </div>
          <Controller
            control={control}
            name="interests"
            render={({ field }) => (
              <div className="mt-3 grid grid-cols-2 gap-2.5 lg:flex lg:flex-wrap lg:gap-[11px]">
                {interestOptions.map((label) => {
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
                      className={`flex min-w-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-xs lg:px-[15px] ${
                        selected
                          ? "border-[1.5px] border-cb-accent bg-[#FFFCF6] font-bold text-cb-accent-dark"
                          : "border border-[#E6DCCB] bg-white text-cb-ink-soft hover:border-cb-accent"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${
                          selected ? "border-[1.5px] border-cb-accent bg-cb-accent" : "border-[1.5px] border-[#C9BFAD] bg-white"
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
          {errors.interests ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.interests.message}</p> : null}
        </div>

        <div className="mt-5">
          <FieldLabel>SNS・リンク（任意）</FieldLabel>
          <div className="mt-3 flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:items-end lg:gap-3.5">
            <div>
              <div className="hidden text-[10.5px] text-cb-muted-3 lg:block">&nbsp;</div>
              <div className="mt-1.5 flex items-center gap-2.5 rounded-lg border border-cb-input-border bg-white px-3.5 py-3 lg:mt-1.5">
                <MaterialSymbol name="photo_camera" size={18} className="shrink-0 text-[#C9528A]" />
                <input
                  type="text"
                  placeholder="@ユーザー名"
                  className="min-w-0 flex-1 truncate text-xs text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
                  {...register("instagram")}
                />
              </div>
            </div>
            <div>
              <div className="text-[10.5px] text-cb-muted-3">X（Twitter）</div>
              <div className="mt-1.5 flex items-center gap-2.5 rounded-lg border border-cb-input-border bg-white px-3.5 py-3">
                <span className="shrink-0 text-sm font-bold text-[#2F2B24]">X</span>
                <input
                  type="text"
                  placeholder="@ユーザー名"
                  className="min-w-0 flex-1 truncate text-xs text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
                  {...register("x")}
                />
              </div>
            </div>
            <div>
              <div className="text-[10.5px] text-cb-muted-3">ブログ・その他のリンク</div>
              <div className="mt-1.5 flex items-center gap-2.5 rounded-lg border border-cb-input-border bg-white px-3.5 py-3">
                <MaterialSymbol name="link" size={18} className="shrink-0 text-cb-placeholder" />
                <input
                  type="text"
                  placeholder="https://"
                  className="min-w-0 flex-1 truncate text-xs text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
                  {...register("link")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[22px]">
          <div className="text-[12.5px] font-medium text-[#3B352C]">非公開設定</div>
          <div className="mt-1.5 text-[10.5px] text-cb-muted-3">プロフィールの公開範囲を設定できます。</div>
          <Controller
            control={control}
            name="visibility"
            render={({ field }) => (
              <div className="mt-3.5 flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-4">
                {visibilityOptions.map((opt) => {
                  const selected = field.value === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => field.onChange(opt.id)}
                      className={`rounded-[9px] p-3.5 text-left lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 ${
                        selected ? "border-[1.5px] border-cb-accent bg-[#FFFCF6] lg:bg-transparent" : "border border-[#E6DCCB] bg-white lg:bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-[12.5px] text-[#3B352C]">
                        <span
                          className={`h-4 w-4 shrink-0 rounded-full bg-white box-border ${
                            selected ? "border-[5px] border-cb-accent" : "border-[1.5px] border-[#C9BFAD]"
                          }`}
                        />
                        <span className={selected ? "font-bold" : "font-normal"}>{opt.label}</span>
                      </div>
                      <div className="mt-[7px] pl-[26px] text-[10.5px] leading-[1.7] text-cb-muted-3">
                        {opt.note}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>
      </div>
    </form>
  );
}
