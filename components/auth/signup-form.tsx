"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { signupSchema, isMinor, type SignupInput } from "@/lib/validations/profile-schema";
import { StyledCheckbox } from "@/components/styled-checkbox";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "mt-2.5 w-full rounded-lg border bg-white px-3.5 py-3.5 text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none lg:py-[14px]";

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      realName: "",
      displayName: "",
      email: "",
      password: "",
      guardianConsent: false,
    },
  });

  const birthdateValue = watch("birthdate");
  const minor = birthdateValue ? isMinor(new Date(birthdateValue)) : false;

  async function onSubmit(data: SignupInput) {
    setServerError(null);
    setSubmitting(true);

    const supabase = createClient();
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          real_name: data.realName,
          display_name: data.displayName,
          birthdate: data.birthdate,
          guardian_consent: data.guardianConsent,
        },
      },
    });

    setSubmitting(false);

    if (error) {
      setServerError(
        error.message === "User already registered"
          ? "このメールアドレスはすでに登録されています。"
          : "会員登録に失敗しました。時間をおいて再度お試しください。",
      );
      return;
    }

    if (signUpData.session) {
      router.push("/mypage");
      router.refresh();
      return;
    }

    setConfirmationSent(true);
  }

  if (confirmationSent) {
    return (
      <div className="px-5 pt-5 lg:px-0 lg:pt-6">
        <div className="rounded-lg border border-cb-border bg-cb-accent-soft px-4 py-5 text-center text-[12.5px] leading-[1.7] text-cb-ink-soft">
          <MaterialSymbol name="mail" size={28} className="mx-auto mb-2 text-cb-accent-dark" />
          確認メールを送信しました。メール内のリンクを開いて会員登録を完了してください。
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-5 pt-5 lg:px-0 lg:pt-6">
      {serverError ? (
        <div className="mb-4 rounded-lg border border-[#F0B4AE] bg-[#FDECEA] px-3.5 py-3 text-[11.5px] text-[#D1453B]">
          {serverError}
        </div>
      ) : null}

      <label className="block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">
          氏名 <span className="text-[#E5731B]">＊</span>
        </span>
        <input
          type="text"
          placeholder="例）新潟 花子"
          className={`${inputClass} ${errors.realName ? "border-[#D1453B]" : "border-cb-input-border"}`}
          {...register("realName")}
        />
        <p className="mt-1.5 text-[10.5px] text-cb-muted-3">非公開項目です。管理者のみ確認できます。</p>
        {errors.realName ? <p className="mt-1 text-[11px] text-[#D1453B]">{errors.realName.message}</p> : null}
      </label>

      <label className="mt-4 block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">
          表示名（ニックネーム） <span className="text-[#E5731B]">＊</span>
        </span>
        <input
          type="text"
          placeholder="例）はなちゃん"
          className={`${inputClass} ${errors.displayName ? "border-[#D1453B]" : "border-cb-input-border"}`}
          {...register("displayName")}
        />
        {errors.displayName ? <p className="mt-1 text-[11px] text-[#D1453B]">{errors.displayName.message}</p> : null}
      </label>

      <label className="mt-4 block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">
          メールアドレス <span className="text-[#E5731B]">＊</span>
        </span>
        <div className={`mt-2.5 flex items-center gap-2.5 rounded-lg border bg-white px-3.5 py-3.5 lg:py-[14px] ${errors.email ? "border-[#D1453B]" : "border-cb-input-border"}`}>
          <MaterialSymbol name="mail" size={19} className="text-[#B3A996]" />
          <input
            type="email"
            placeholder="メールアドレスを入力"
            className="w-full text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
            {...register("email")}
          />
        </div>
        {errors.email ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.email.message}</p> : null}
      </label>

      <label className="mt-4 block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">
          パスワード <span className="text-[#E5731B]">＊</span>
        </span>
        <div className={`mt-2.5 flex items-center gap-2.5 rounded-lg border bg-white px-3.5 py-3.5 lg:py-[14px] ${errors.password ? "border-[#D1453B]" : "border-cb-input-border"}`}>
          <MaterialSymbol name="lock" size={19} className="text-[#B3A996]" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="8文字以上のパスワード"
            className="w-full text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
          >
            <MaterialSymbol name={showPassword ? "visibility_off" : "visibility"} size={19} className="text-cb-placeholder" />
          </button>
        </div>
        {errors.password ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.password.message}</p> : null}
      </label>

      <label className="mt-4 block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">
          生年月日 <span className="text-[#E5731B]">＊</span>
        </span>
        <input
          type="date"
          className={`${inputClass} ${errors.birthdate ? "border-[#D1453B]" : "border-cb-input-border"}`}
          {...register("birthdate")}
        />
        {errors.birthdate ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.birthdate.message}</p> : null}
      </label>

      {minor ? (
        <label className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#F2E0C0] bg-cb-accent-soft px-3.5 py-3.5 text-xs text-cb-ink-soft">
          <span className="mt-px">
            <StyledCheckbox {...register("guardianConsent")} />
          </span>
          <span>
            18歳未満のため、保護者の同意が必要です。保護者の同意を得た上でチェックしてください。
            {errors.guardianConsent ? (
              <span className="mt-1 block text-[11px] text-[#D1453B]">{errors.guardianConsent.message}</span>
            ) : null}
          </span>
        </label>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full rounded-lg bg-cb-accent py-4 text-center text-[14.5px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover disabled:opacity-60"
      >
        {submitting ? "登録中..." : "会員登録する"}
      </button>

      <p className="mt-5 text-center text-xs text-cb-muted">
        すでにアカウントをお持ちの方は
        <Link href="/login" className="font-bold text-cb-accent-dark underline decoration-cb-accent underline-offset-2">
          ログインはこちら
        </Link>
      </p>
    </form>
  );
}
