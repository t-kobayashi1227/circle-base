"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  visibilityOptions,
} from "@/lib/profile-edit-mock-data";
import { createClient } from "@/lib/supabase/client";
import { uploadCircleMedia, publicMediaUrl } from "@/lib/storage";
import type { EditableProfile } from "@/lib/mypage";
import { ProfilePhotoCard } from "@/components/mypage/profile-photo-card";
import { ProfileFormFooter } from "@/components/mypage/profile-form-footer";

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

export function ProfileForm({
  userId,
  initialProfile,
}: {
  userId: string;
  initialProfile: EditableProfile;
}) {
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      displayName: initialProfile.displayName,
      gender: initialProfile.gender ?? genderOptions[genderOptions.length - 1],
      ageRange: initialProfile.ageRange ?? ageRangeOptions[0],
      area: initialProfile.area ?? "",
      bio: initialProfile.bio ?? "",
      interests: initialProfile.interests,
      contactEmail: initialProfile.contactEmail ?? "",
      visibility: (initialProfile.visibility as ProfileUpdateInput["visibility"]) ?? "public",
    },
  });

  const bioValue = watch("bio") ?? "";

  async function onSubmit(data: ProfileUpdateInput) {
    setServerError(null);
    setSuccess(false);
    setSubmitting(true);

    const supabase = createClient();

    let avatarPath: string | undefined;
    if (avatarFile) {
      try {
        avatarPath = await uploadCircleMedia(supabase, userId, "avatar", avatarFile);
      } catch (err) {
        console.error("uploadCircleMedia failed", err);
        setServerError("写真のアップロードに失敗しました。時間をおいて再度お試しください。");
        setSubmitting(false);
        return;
      }
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: data.displayName,
        gender: data.gender,
        age_range: data.ageRange,
        area: data.area,
        bio: data.bio,
        interests: data.interests,
        contact_email: data.contactEmail || null,
        visibility: data.visibility,
        ...(avatarPath ? { avatar_path: avatarPath } : {}),
      })
      .eq("id", userId);

    setSubmitting(false);

    if (error) {
      setServerError("プロフィールの更新に失敗しました。時間をおいて再度お試しください。");
      return;
    }

    setAvatarFile(null);
    setSuccess(true);
    router.refresh();
  }

  return (
    <>
      {serverError ? (
        <div className="mb-[18px] rounded-lg border border-[#F0B4AE] bg-[#FDECEA] px-3.5 py-3 text-[11.5px] text-[#D1453B]">
          {serverError}
        </div>
      ) : null}
      {success ? (
        <div className="mb-[18px] rounded-lg border border-[#B7DFC0] bg-[#EAF7EC] px-3.5 py-3 text-[11.5px] text-[#2F7D4F]">
          プロフィールを更新しました。
        </div>
      ) : null}

      <form id="profile-edit-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-[18px] lg:grid lg:grid-cols-[196px_minmax(0,1fr)] lg:items-start lg:gap-5">
          <ProfilePhotoCard
            file={avatarFile}
            currentAvatarUrl={initialProfile.avatarPath ? publicMediaUrl(initialProfile.avatarPath) : null}
            onFileChange={setAvatarFile}
          />

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
                    <option value="">エリアを選択</option>
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

            <div className="mt-3.5 lg:mt-[14px]">
              <FieldLabel>連絡先メールアドレス</FieldLabel>
              <input
                type="email"
                placeholder="例）example@circle-base.jp"
                className={`${inputClass} mt-2.5`}
                {...register("contactEmail")}
              />
              <div className="mt-2 text-[10.5px] text-cb-placeholder">
                ※ 「主催者情報」タブの連絡先に表示されます。未入力の場合は表示されません。
              </div>
              {errors.contactEmail ? (
                <p className="mt-1 text-[11px] text-[#D1453B]">{errors.contactEmail.message}</p>
              ) : null}
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
        </div>
      </form>

      <ProfileFormFooter submitting={submitting} />
    </>
  );
}
