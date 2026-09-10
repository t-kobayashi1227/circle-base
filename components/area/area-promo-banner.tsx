import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function AreaPromoBanner() {
  return (
    <div className="flex flex-col items-center gap-3.5 rounded-xl border border-[#F2E6D2] bg-[#FDF6EA] p-5 text-center lg:grid lg:grid-cols-[150px_minmax(0,1fr)_auto] lg:items-center lg:gap-[22px] lg:p-[18px] lg:text-left">
      <div className="hidden h-[88px] w-full overflow-hidden rounded-[9px] lg:block">
        <PhotoPlaceholder caption="バックパックを背負う3人組のイラスト" iconSize={18} />
      </div>
      <div className="min-w-0 font-heading text-base font-bold text-[#2F2B24] lg:text-[16px]">
        新しい出会いで、
        <br />
        日常がもっと楽しくなる
      </div>
      <Link
        href="/mypage/circles/new"
        className="flex w-full items-center justify-center gap-2 rounded-[9px] bg-cb-accent px-6 py-[13px] text-[13px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover lg:w-auto lg:whitespace-nowrap lg:py-[14px] lg:text-[13.5px]"
      >
        サークルを作成する
        <MaterialSymbol name="chevron_right" size={17} />
      </Link>
    </div>
  );
}
