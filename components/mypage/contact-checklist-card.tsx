import { MaterialSymbol } from "@/components/icons/material-symbol";
import { contactChecks } from "@/lib/contact-mock-data";

export function ContactChecklistCard() {
  return (
    <div className="hidden rounded-xl border border-cb-border bg-cb-surface p-[18px] lg:block">
      <h3 className="mb-3 font-heading text-[13.5px] font-bold text-cb-ink">お問い合わせ前にご確認ください</h3>
      <div className="flex flex-col gap-[11px]">
        {contactChecks.map((check) => (
          <div key={check} className="flex items-start gap-2.5 text-[11.5px] leading-[1.6] text-cb-ink-soft">
            <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded bg-cb-accent">
              <MaterialSymbol name="check" size={13} className="text-white" />
            </span>
            {check}
          </div>
        ))}
      </div>
    </div>
  );
}
