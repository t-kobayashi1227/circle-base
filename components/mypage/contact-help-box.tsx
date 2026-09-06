import { MaterialSymbol } from "@/components/icons/material-symbol";

export function ContactHelpBox() {
  return (
    <div className="mx-4 hidden rounded-[11px] border border-[#F2E6D2] bg-[#FDF8F0] px-4 py-[18px] lg:block">
      <div className="text-[12.5px] font-bold text-[#3B352C]">お困りのときは</div>
      <div className="mt-2.5 text-[10.5px] leading-[1.85] text-cb-muted-2">
        ご不明な点やお困りごとがありましたら、お気軽にお問い合わせください。
      </div>
      <button
        type="button"
        className="mt-3.5 flex w-full items-center justify-between rounded-lg border border-[#E0D6C6] bg-white px-3.5 py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        ヘルプページを見る
        <MaterialSymbol name="chevron_right" size={15} className="text-cb-placeholder" />
      </button>
    </div>
  );
}
