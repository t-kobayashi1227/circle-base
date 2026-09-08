"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError || !data.user) {
      setSubmitting(false);
      setError("メールアドレスまたはパスワードが正しくありません。");
      return;
    }

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", data.user.id).maybeSingle();

    if (!profile?.is_admin) {
      await supabase.auth.signOut();
      setSubmitting(false);
      setError("このアカウントには管理者権限がありません。");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-[380px]">
      {error ? (
        <div className="mb-4 rounded-lg border border-[#F0B4AE] bg-[#FDECEA] px-3.5 py-3 text-[11.5px] text-[#D1453B]">
          {error}
        </div>
      ) : null}

      <label className="block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">メールアドレス</span>
        <div className="mt-2.5 flex items-center gap-2.5 rounded-lg border border-cb-input-border bg-white px-3.5 py-3.5">
          <MaterialSymbol name="mail" size={19} className="text-[#B3A996]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@example.com"
            className="w-full text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
          />
        </div>
      </label>

      <label className="mt-4 block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">パスワード</span>
        <div className="mt-2.5 flex items-center gap-2.5 rounded-lg border border-cb-input-border bg-white px-3.5 py-3.5">
          <MaterialSymbol name="lock" size={19} className="text-[#B3A996]" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="パスワードを入力"
            className="w-full text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full rounded-lg bg-cb-accent py-4 text-center text-[14.5px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover disabled:opacity-60"
      >
        {submitting ? "確認中..." : "管理者ログイン"}
      </button>
    </form>
  );
}
