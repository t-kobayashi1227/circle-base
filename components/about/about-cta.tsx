import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

// デザインではモバイル表示に含まれないため、デスクトップのみ表示する。
export function AboutCta() {
  return (
    <section className="relative mt-11 hidden overflow-hidden px-7 pb-10 pt-11 lg:block">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#EAF3E9 55%,#DCEBDD 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[118px]"
        style={{ background: "linear-gradient(180deg,rgba(220,235,221,0),#CFE3D2)" }}
      />
      <div className="pointer-events-none absolute bottom-[34px] left-9 -rotate-2 font-heading text-[15px] font-bold leading-[1.7] text-[#4F6B54]">
        新しい出会いが、
        <br />
        きっとここにある。
      </div>
      <div className="relative text-center">
        <h2 className="m-0 font-heading text-xl font-bold text-[#2F2B24]">さあ、あなたもはじめてみませんか？</h2>
        <p className="mt-2.5 text-xs text-[#5A6B5C]">趣味でつながる新しい新潟のコミュニティ</p>
        <div className="mt-5 flex items-center justify-center gap-3.5">
          <Link
            href="/circles"
            className="flex items-center gap-2 rounded-[9px] bg-cb-accent px-7 py-3.5 text-[13.5px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover"
          >
            サークルを探す
            <MaterialSymbol name="chevron_right" size={17} />
          </Link>
          <Link
            href="/mypage/circles/new"
            className="flex items-center gap-2 rounded-[9px] border border-[#C9BFAD] bg-white px-7 py-3.5 text-[13.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
          >
            サークルを作成する
            <MaterialSymbol name="chevron_right" size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
