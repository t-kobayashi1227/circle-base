import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function NoticesInfoBox() {
  return (
    <div className="rounded-xl border border-[#F2E6D2] bg-[#FDF6EA] px-4 py-[18px] lg:px-5 lg:py-5">
      <div className="flex items-center gap-[9px]">
        <MaterialSymbol name="campaign" filled size={19} className="text-cb-accent" />
        <span className="font-heading text-[13.5px] font-bold text-[#2F2B24] lg:text-[14.5px]">
          お知らせについて
        </span>
      </div>
      <p className="mt-[11px] text-[11.5px] leading-[1.85] text-cb-muted-2 lg:mt-3 lg:leading-[1.9]">
        にいがたサークルベースからの大切なお知らせを掲載しています。システムのメンテナンス情報や新機能の追加、イベント情報などをお知らせします。
      </p>
      <Link
        href="/contact"
        className="mt-[15px] flex items-center justify-center gap-1.5 rounded-lg border border-cb-accent bg-white py-3 text-[12.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft lg:mt-4 lg:py-[11px] lg:text-xs"
      >
        お問い合わせはこちら
        <MaterialSymbol name="chevron_right" size={15} />
      </Link>
    </div>
  );
}
