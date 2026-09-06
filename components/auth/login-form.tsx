"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { loginSchema, type LoginInput } from "@/lib/validations/profile-schema";
import { StyledCheckbox } from "@/components/styled-checkbox";

const inputWrapClass =
  "flex items-center gap-2.5 rounded-lg border bg-white px-3.5 py-3.5 lg:py-[14px]";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  function onSubmit(data: LoginInput) {
    // TODO: Supabase Auth接続後、supabase.auth.signInWithPassword() に置き換える。
    console.info("login submitted", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-5 pt-5 lg:px-0 lg:pt-6">
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
        className="mt-5 w-full rounded-lg bg-cb-accent py-4 text-center text-[14.5px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover"
      >
        ログイン
      </button>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3.5 lg:mt-[22px]">
        <div className="h-px bg-[#EFE7DA]" />
        <span className="text-[11.5px] text-cb-muted-3">または</span>
        <div className="h-px bg-[#EFE7DA]" />
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-[11px] rounded-lg border border-[#E0D6C6] py-[15px] text-[13.5px] font-medium text-[#3B352C] hover:border-cb-accent lg:mt-[18px]"
      >
        <span className="text-[17px] font-bold text-[#4285F4]">G</span>
        Googleでログイン
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
