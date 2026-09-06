import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function CtaSection() {
  return (
    <section className="bg-gradient-to-b from-[#FDF1DD] to-[#FBE6C6] px-5 py-6 text-center lg:px-[46px] lg:py-[30px]">
      <div className="font-heading text-base font-bold text-cb-ink lg:text-[19px]">
        さあ、新しい一歩を踏み出そう！
      </div>
      <Link
        href="/signup"
        className="mt-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-cb-accent px-5 py-3.5 text-[13.5px] font-bold text-white shadow-[0_4px_14px_rgba(180,110,20,.28)] hover:bg-cb-accent-hover lg:mt-4 lg:px-[34px] lg:py-3.5 lg:text-[14.5px]"
      >
        <span className="lg:hidden">今すぐ無料登録する</span>
        <span className="hidden lg:inline">今すぐ無料登録して、サークルを探す</span>
        <MaterialSymbol name="chevron_right" size={17} />
      </Link>
    </section>
  );
}
