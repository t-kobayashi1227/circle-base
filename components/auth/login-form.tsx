"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { loginSchema, type LoginInput } from "@/lib/validations/profile-schema";
import { StyledCheckbox } from "@/components/styled-checkbox";
import { createClient } from "@/lib/supabase/client";

const inputWrapClass =
  "flex items-center gap-2.5 rounded-lg border bg-white px-3.5 py-3.5 lg:py-[14px]";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  async function onSubmit(data: LoginInput) {
    setServerError(null);
    setSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setSubmitting(false);

    if (error) {
      setServerError("メールアドレスまたはパスワードが正しくありません。");
      return;
    }

    router.push("/mypage");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-5 pt-5 lg:px-0 lg:pt-6">
      {serverError ? (
        <div className="mb-4 rounded-lg border border-[#F0B4AE] bg-[#FDECEA] px-3.5 py-3 text-[11.5px] text-[#D1453B]">
          {serverError}
        </div>
      ) : null}

      <label className="block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">メールアドレス</span>
        <div className={`mt-2.5 ${inputWrapClass} ${errors.email ? "border-[#D1453B]" : "border-cb-input-border"}`}>
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

      <label className="mt-4 block lg:mt-[18px]">
        <span className="text-[12.5px] font-medium text-[#3B352C]">パスワード</span>
        <div className={`mt-2.5 ${inputWrapClass} ${errors.password ? "border-[#D1453B]" : "border-cb-input-border"}`}>
          <MaterialSymbol name="lock" size={19} className="text-[#B3A996]" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="パスワードを入力"
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

      <div className="mt-4 lg:flex lg:items-center lg:justify-between">
        <label className="flex items-center gap-2.5 text-xs text-cb-ink-soft">
          <StyledCheckbox defaultChecked {...register("remember")} />
          ログインしたままにする
        </label>
        <Link
          href="/reset-password"
          className="mt-2.5 block text-right text-[11.5px] font-bold text-cb-accent-dark underline decoration-cb-accent underline-offset-2 lg:mt-0 lg:inline lg:font-normal lg:text-cb-muted-2 lg:no-underline"
        >
          パスワードをお忘れの方
        </Link>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full rounded-lg bg-cb-accent py-4 text-center text-[14.5px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover disabled:opacity-60"
      >
        {submitting ? "ログイン中..." : "ログイン"}
      </button>

      <p className="mt-5 text-center text-xs text-cb-muted lg:mt-5">
        アカウントをお持ちでない方は
        <Link href="/signup" className="font-bold text-cb-accent-dark underline decoration-cb-accent underline-offset-2">
          会員登録はこちら
        </Link>
      </p>
    </form>
  );
}
