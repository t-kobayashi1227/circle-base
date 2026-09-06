"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { contactSchema, type ContactInput } from "@/lib/validations/contact-schema";
import { contactTypeOptions } from "@/lib/contact-mock-data";

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

export function ContactForm() {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: "", subject: "", message: "", email: "" },
  });

  const messageValue = watch("message") ?? "";

  function onSubmit(data: ContactInput) {
    // TODO: 送信API接続後、Resend等を使ったメール送信処理に置き換える。
    console.info("contact form submitted", { ...data, attachment: fileName });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-xl border border-cb-border bg-cb-surface px-4 pb-6 pt-[18px] lg:px-[26px] lg:pb-7 lg:pt-6">
      <h2 className="font-heading text-base font-bold text-cb-ink lg:text-[17px]">お問い合わせフォーム</h2>

      <label className="mt-[18px] block lg:mt-[22px]">
        <span className="text-[12.5px] font-medium text-[#3B352C]">
          お問い合わせの種類
          <RequiredMark />
        </span>
        <div className="relative mt-2.5 max-w-[340px]">
          <select className={selectClass} {...register("type")}>
            <option value="">選択してください</option>
            {contactTypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <SelectChevron />
        </div>
        {errors.type ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.type.message}</p> : null}
      </label>

      <label className="mt-5 block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">
          件名
          <RequiredMark />
        </span>
        <input
          type="text"
          placeholder="例）サークルの作成について"
          className={`${inputClass} mt-2.5 truncate`}
          {...register("subject")}
        />
        {errors.subject ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{errors.subject.message}</p> : null}
      </label>

      <label className="mt-5 block">
        <span className="text-[12.5px] font-medium text-[#3B352C]">
          お問い合わせ内容
          <RequiredMark />
        </span>
        <textarea
          rows={4}
          maxLength={1000}
          placeholder="具体的にご記入ください（できるだけ詳しくご記入いただけるとスムーズに対応できます）"
          className={`${inputClass} mt-2.5 h-[120px] resize-none leading-[1.7] lg:h-[104px]`}
          {...register("message")}
        />
        <div className="mt-1.5 text-right text-[10.5px] text-cb-placeholder">{messageValue.length} / 1000</div>
        {errors.message ? <p className="-mt-1 text-[11px] text-[#D1453B]">{errors.message.message}</p> : null}
      </label>

      <label className="mt-3.5 block lg:mt-[14px]">
        <span className="text-[12.5px] font-medium text-[#3B352C]">
          連絡先メールアドレス
          <RequiredMark />
        </span>
        <input
          type="email"
          placeholder="例）yamada.taro@example.com"
          className={`${inputClass} mt-2.5`}
          {...register("email")}
        />
        <div className="mt-[7px] text-[10.5px] text-cb-muted-3">ご登録のメールアドレスに返信いたします</div>
        {errors.email ? <p className="mt-1 text-[11px] text-[#D1453B]">{errors.email.message}</p> : null}
      </label>

      <div className="mt-5">
        <span className="text-[12.5px] font-medium text-[#3B352C]">添付ファイル（任意）</span>
        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="whitespace-nowrap rounded-[7px] border border-[#E0D6C6] bg-[#F7F3EB] px-4 py-2.5 text-xs font-medium text-cb-ink-soft hover:border-cb-accent"
          >
            ファイルを選択
          </button>
          <span className="text-[11px] text-cb-muted-3">{fileName ?? "選択されていません"}</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        <div className="mt-[7px] text-[10.5px] leading-[1.6] text-cb-muted-3">
          画像や資料がある場合は添付してください（最大5MBまで）
        </div>
      </div>

      <button
        type="submit"
        className="mt-[22px] w-full rounded-lg bg-cb-accent py-[15px] text-center text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover lg:mt-6 lg:text-[14px]"
      >
        送信する
      </button>
    </form>
  );
}
