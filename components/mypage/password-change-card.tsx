"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import {
  passwordChangeSchema,
  type PasswordChangeInput,
} from "@/lib/validations/account-settings-schema";
import { createClient } from "@/lib/supabase/client";

const inputWrapClass =
  "mt-2.5 flex items-center justify-between gap-2.5 rounded-lg border bg-white px-3.5 py-3";

export function PasswordChangeCard() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<PasswordChangeInput>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: { currentPassword: "", newPassword: "", newPasswordConfirm: "" },
  });

  async function onSubmit(data: PasswordChangeInput) {
    setServerError(null);
    setSuccess(false);
    setSubmitting(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setServerError("パスワードの変更に失敗しました。時間をおいて再度お試しください。");
      setSubmitting(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: data.currentPassword,
    });

    if (signInError) {
      setError("currentPassword", { message: "現在のパスワードが正しくありません" });
      setSubmitting(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: data.newPassword });

    setSubmitting(false);

    if (updateError) {
      setServerError("パスワードの変更に失敗しました。時間をおいて再度お試しください。");
      return;
    }

    reset();
    setSuccess(true);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-xl border border-cb-border bg-cb-surface px-4 pb-5 pt-4 lg:px-6 lg:pb-6 lg:pt-[22px]"
    >
      <div className="flex items-center gap-2">
        <MaterialSymbol name="lock" filled size={19} className="text-cb-accent lg:text-[20px]" />
        <h2 className="font-heading text-[15px] font-bold text-cb-ink lg:text-base">パスワードの変更</h2>
      </div>
      <div className="mt-1.5 hidden text-[11.5px] text-cb-muted-3 lg:block">ログインパスワードを変更します。</div>

      {serverError ? (
        <div className="mt-4 rounded-lg border border-[#F0B4AE] bg-[#FDECEA] px-3.5 py-3 text-[11.5px] text-[#D1453B]">
          {serverError}
        </div>
      ) : null}
      {success ? (
        <div className="mt-4 rounded-lg border border-[#B7DFC0] bg-[#EAF7EC] px-3.5 py-3 text-[11.5px] text-[#2F7D4F]">
          パスワードを変更しました。
        </div>
      ) : null}

      <label className="mt-4 block lg:mt-5">
        <span className="text-xs font-medium text-[#3B352C] lg:text-[12.5px]">現在のパスワード</span>
        <div className={`${inputWrapClass} ${errors.currentPassword ? "border-[#D1453B]" : "border-cb-input-border"}`}>
          <input
            type={showCurrent ? "text" : "password"}
            className="w-full min-w-0 text-[15px] tracking-[2px] text-cb-ink focus:outline-none"
            {...register("currentPassword")}
          />
          <button type="button" onClick={() => setShowCurrent((v) => !v)} aria-label="表示切替">
            <MaterialSymbol name={showCurrent ? "visibility_off" : "visibility"} size={19} className="text-cb-placeholder" />
          </button>
        </div>
        {errors.currentPassword ? (
          <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.currentPassword.message}</p>
        ) : null}
      </label>

      <label className="mt-4 block">
        <span className="text-xs font-medium text-[#3B352C] lg:text-[12.5px]">新しいパスワード</span>
        <div className={`${inputWrapClass} ${errors.newPassword ? "border-[#D1453B]" : "border-cb-input-border"}`}>
          <input
            type={showNew ? "text" : "password"}
            className="w-full min-w-0 text-[15px] tracking-[2px] text-cb-ink focus:outline-none"
            {...register("newPassword")}
          />
          <button type="button" onClick={() => setShowNew((v) => !v)} aria-label="表示切替">
            <MaterialSymbol name={showNew ? "visibility_off" : "visibility"} size={19} className="text-cb-placeholder" />
          </button>
        </div>
        {errors.newPassword ? (
          <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.newPassword.message}</p>
        ) : (
          <p className="mt-[7px] text-[10.5px] text-cb-muted-3">半角英数字を含む8文字以上</p>
        )}
      </label>

      <label className="mt-4 block">
        <span className="text-xs font-medium text-[#3B352C] lg:text-[12.5px]">新しいパスワード（確認）</span>
        <div className={`${inputWrapClass} ${errors.newPasswordConfirm ? "border-[#D1453B]" : "border-cb-input-border"}`}>
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full min-w-0 text-[15px] tracking-[2px] text-cb-ink focus:outline-none"
            {...register("newPasswordConfirm")}
          />
          <button type="button" onClick={() => setShowConfirm((v) => !v)} aria-label="表示切替">
            <MaterialSymbol name={showConfirm ? "visibility_off" : "visibility"} size={19} className="text-cb-placeholder" />
          </button>
        </div>
        {errors.newPasswordConfirm ? (
          <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.newPasswordConfirm.message}</p>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full rounded-lg bg-cb-accent py-[15px] text-center text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover disabled:cursor-not-allowed disabled:opacity-60 lg:mt-[22px] lg:text-[14px]"
      >
        {submitting ? "変更中..." : "パスワードを変更する"}
      </button>
    </form>
  );
}
