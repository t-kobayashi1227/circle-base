import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function FirstTimeBox() {
  return (
    <div className="hidden rounded-[11px] border border-[#F2E6D2] bg-[#FDF8F0] p-4 lg:block">
      <div className="flex items-center gap-2 text-[12.5px] font-bold text-[#3B352C]">
        <MaterialSymbol name="volunteer_activism" filled size={17} className="text-cb-accent" />
        はじめての方へ
      </div>
      <div className="mt-[9px] text-[10.5px] leading-[1.8] text-cb-muted-2">
        使い方ガイドやよくある質問をご用意しています。
      </div>
      <Link
        href="/about"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-[#E0D6C6] bg-white py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        使い方ガイドを見る
        <MaterialSymbol name="chevron_right" size={15} />
      </Link>
    </div>
  );
}
