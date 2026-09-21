import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function FaqContactCta() {
  return (
    <div className="mt-6 rounded-xl border border-[#F2E4CB] bg-[#FDF6EA] px-[18px] py-4 lg:mt-6 lg:flex lg:items-center lg:gap-5 lg:px-[26px] lg:py-5">
      <div className="flex items-start gap-3 lg:flex-1 lg:items-center lg:gap-5">
        <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-cb-accent lg:h-11 lg:w-11 lg:rounded-[9px]">
          <MaterialSymbol name="mail" filled size={19} className="text-white lg:hidden" />
          <MaterialSymbol name="mail" filled size={22} className="hidden text-white lg:inline-block" />
        </span>
        <div className="min-w-0">
          <div className="text-[13px] font-bold leading-[1.4] text-[#2F2B24] lg:text-sm">
            解決しない場合は、お気軽にお問い合わせください
          </div>
          <div className="mt-1.5 text-[11px] text-cb-muted-2 lg:mt-[5px] lg:text-[11.5px]">
            内容を確認のうえ、担当者よりご連絡いたします。
          </div>
        </div>
      </div>
      <Link
        href="/contact"
        className="mt-3.5 flex items-center justify-center gap-1.5 rounded-full border border-cb-accent bg-white py-[13px] text-[12.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft lg:mt-0 lg:shrink-0 lg:px-[30px] lg:py-[14px] lg:text-[13px]"
      >
        お問い合わせフォームへ
        <MaterialSymbol name="chevron_right" size={16} />
      </Link>
    </div>
  );
}
