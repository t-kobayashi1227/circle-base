import { Fragment } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";

const features = [
  { icon: "favorite", color: "#E4736A", title: "地域密着", desc: "新潟市限定だから、近くでつながれる" },
  { icon: "verified_user", color: "#3E9E7A", title: "安心・安全", desc: "通報・ブロック機能で安心して利用できる" },
  { icon: "forum", color: "#4A87C4", title: "メッセージ機能", desc: "気になるサークルに直接メッセージできる" },
  { icon: "emoji_people", color: "#D96AA0", title: "はじめてでも安心", desc: "初心者・ひとり参加も大歓迎" },
];

const steps = [
  { label: "STEP 1", title: "サークルを探す", desc: "エリアやカテゴリから気になるサークルを検索" },
  { label: "STEP 2", title: "メッセージを送る", desc: "気になるサークルにメッセージを送信" },
  { label: "STEP 3", title: "仲間とつながる", desc: "一緒に活動して、新しい仲間を作ろう！" },
];

const safety = [
  { icon: "report", title: "通報機能" },
  { icon: "block", title: "ブロック機能" },
  { icon: "lock", title: "実名は非公開" },
];

export function FeaturesSection() {
  return (
    <section className="px-3.5 pt-6 lg:grid lg:grid-cols-[1.15fr_1fr_.9fr] lg:gap-4 lg:px-[46px] lg:pt-8 lg:pb-10">
      {/* 特徴 */}
      <div className="rounded-xl border border-cb-border bg-cb-surface p-[18px] lg:p-5">
        <h3 className="mb-4 font-heading text-sm font-bold text-cb-ink">
          にいがたサークルベースの特徴
        </h3>
        <div className="grid grid-cols-4 gap-2 text-center lg:grid-cols-2 lg:gap-4 lg:text-left">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center gap-2 rounded-[10px] bg-[#FDF8F0] px-1 py-3 lg:flex-row lg:items-start lg:gap-2.5 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0"
            >
              <MaterialSymbol name={f.icon} size={24} style={{ color: f.color }} className="lg:hidden" />
              <MaterialSymbol name={f.icon} size={22} style={{ color: f.color }} className="hidden shrink-0 lg:inline-block" />
              <div>
                <div className="text-[10px] font-medium text-cb-ink-soft lg:text-[12.5px] lg:font-bold lg:text-[#3B352C]">
                  {f.title}
                </div>
                <div className="mt-1 hidden text-[10.5px] leading-relaxed text-cb-muted-2 lg:block">
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* はじめての方へ（デスクトップのみ） */}
      <div className="mt-4 hidden flex-col rounded-xl border border-cb-border bg-cb-surface p-5 lg:mt-0 lg:flex">
        <h3 className="text-center font-heading text-[15px] font-bold text-cb-ink">
          はじめての方へ
        </h3>
        <p className="mt-1.5 mb-4 text-center text-[10.5px] text-cb-muted-3">
          簡単3ステップで、仲間との出会いが見つかります
        </p>
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-2">
          {steps.map((step, i) => (
            <Fragment key={step.label}>
              <div className="rounded-[9px] bg-[#FDF7EC] p-3">
                <div className="inline-block rounded-full bg-cb-accent px-1.5 py-0.5 text-[8.5px] font-bold text-white">
                  {step.label}
                </div>
                <div className="mt-2 text-[11.5px] font-bold text-[#3B352C]">{step.title}</div>
                <div className="mt-1 text-[9.5px] leading-relaxed text-cb-muted-2">{step.desc}</div>
              </div>
              {i < steps.length - 1 ? (
                <MaterialSymbol
                  name="chevron_right"
                  size={18}
                  className="self-center text-[#E0B978]"
                />
              ) : null}
            </Fragment>
          ))}
        </div>
        <div className="flex-1" />
        <div className="mx-auto mt-4 flex items-center gap-1.5 rounded-full border border-cb-accent px-[26px] py-2.5 text-xs font-bold text-cb-accent-dark hover:bg-cb-accent-soft">
          詳しく見る
          <MaterialSymbol name="chevron_right" size={16} />
        </div>
      </div>

      {/* 安心してご利用いただくために（デスクトップのみ） */}
      <div className="mt-4 hidden flex-col rounded-xl border border-cb-border bg-cb-surface p-5 lg:mt-0 lg:flex">
        <h3 className="mb-[18px] text-center font-heading text-[15px] font-bold text-cb-ink">
          安心してご利用いただくために
        </h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          {safety.map((s) => (
            <div key={s.title} className="flex flex-col items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cb-accent-soft">
                <MaterialSymbol name={s.icon} size={22} className="text-[#D98A2B]" />
              </div>
              <span className="text-[10.5px] text-cb-muted">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="flex-1" />
        <div className="mx-auto mt-[18px] flex items-center gap-1.5 rounded-full border border-cb-accent px-[26px] py-2.5 text-xs font-bold text-cb-accent-dark hover:bg-cb-accent-soft">
          利用ガイドを見る
          <MaterialSymbol name="chevron_right" size={16} />
        </div>
      </div>
    </section>
  );
}
