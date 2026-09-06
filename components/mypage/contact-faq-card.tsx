import { MaterialSymbol } from "@/components/icons/material-symbol";
import { faqs } from "@/lib/contact-mock-data";

export function ContactFaqCard() {
  return (
    <div className="rounded-xl border border-cb-border bg-cb-surface px-4 pb-1 pt-4 lg:px-[18px] lg:pb-2 lg:pt-[18px]">
      <h3 className="mb-1 font-heading text-sm font-bold text-cb-ink lg:text-[14.5px]">よくあるご質問</h3>

      {/* デスクトップ: 全件表示 */}
      <div className="hidden lg:block">
        {faqs.map((faq, i) => (
          <button
            key={faq.q}
            type="button"
            className={`grid w-full grid-cols-[22px_minmax(0,1fr)_16px] items-start gap-2.5 py-3.5 text-left hover:opacity-80 ${
              i < faqs.length - 1 ? "border-b border-[#F5EFE5]" : ""
            }`}
          >
            <MaterialSymbol name="help" size={16} className="mt-px text-cb-accent" />
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#2F2B24]">{faq.q}</div>
              <div className="mt-1.5 text-[10.5px] leading-[1.7] text-cb-muted-3">{faq.a}</div>
            </div>
            <MaterialSymbol name="chevron_right" size={16} className="mt-px text-cb-placeholder" />
          </button>
        ))}
      </div>

      {/* モバイル: 先頭1件のみ */}
      <div className="lg:hidden">
        <button
          type="button"
          className="grid w-full grid-cols-[20px_minmax(0,1fr)_16px] items-start gap-2.5 py-3.5 text-left"
        >
          <MaterialSymbol name="help" size={16} className="mt-px text-cb-accent" />
          <div className="min-w-0">
            <div className="text-[12.5px] font-bold leading-[1.5] text-[#2F2B24]">{faqs[0].q}</div>
            <div className="mt-1.5 text-[10.5px] leading-[1.7] text-cb-muted-3">{faqs[0].a}</div>
          </div>
          <MaterialSymbol name="chevron_right" size={16} className="mt-px text-cb-placeholder" />
        </button>
      </div>
    </div>
  );
}
