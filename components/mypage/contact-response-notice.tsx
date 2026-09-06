import { MaterialSymbol } from "@/components/icons/material-symbol";

export function ContactResponseNotice() {
  return (
    <div className="hidden gap-3.5 rounded-[11px] border border-[#F2E6D2] bg-[#FDF7EE] px-5 py-[18px] lg:flex">
      <MaterialSymbol name="mail" size={22} className="shrink-0 text-[#D9902B]" />
      <div>
        <div className="text-[13px] font-bold text-[#3B352C]">回答について</div>
        <div className="mt-2 text-[11.5px] leading-[1.85] text-cb-muted-2">
          通常、3営業日以内にご登録のメールアドレスへご返信いたします。内容によってはお時間をいただく場合がございますので、予めご了承ください。
        </div>
      </div>
    </div>
  );
}
