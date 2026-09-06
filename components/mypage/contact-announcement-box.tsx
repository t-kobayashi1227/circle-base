import { MaterialSymbol } from "@/components/icons/material-symbol";

export function ContactAnnouncementBox() {
  return (
    <div className="hidden gap-[11px] rounded-[11px] border border-[#F2E6D2] bg-[#FDF7EE] p-4 lg:flex">
      <MaterialSymbol name="campaign" size={19} className="shrink-0 text-[#D9902B]" />
      <div>
        <div className="text-xs font-bold text-[#3B352C]">運営からのお知らせ</div>
        <div className="mt-[7px] text-[10.5px] leading-[1.8] text-cb-muted-2">
          お問い合わせ窓口の混雑状況により、通常より返信にお時間をいただく場合がございます。
        </div>
      </div>
    </div>
  );
}
