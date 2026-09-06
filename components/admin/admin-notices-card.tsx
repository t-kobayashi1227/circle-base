import { MaterialSymbol } from "@/components/icons/material-symbol";
import { adminNotices } from "@/lib/admin-mock-data";

export function AdminNoticesCard() {
  return (
    <div className="hidden min-w-0 rounded-xl border border-cb-border bg-cb-surface px-5 pb-3 pt-[18px] lg:block">
      <div className="flex items-center justify-between gap-3">
        <h2 className="whitespace-nowrap font-heading text-[15px] font-bold text-cb-ink">お知らせ</h2>
        <a href="#" className="flex shrink-0 items-center gap-0.5 text-[11.5px] font-bold text-cb-accent-dark hover:text-[#8E5606]">
          すべて見る
          <MaterialSymbol name="chevron_right" size={15} />
        </a>
      </div>

      <div className="flex flex-col">
        {adminNotices.map((notice, i) => (
          <div
            key={notice.title}
            className={`grid grid-cols-[24px_minmax(0,1fr)_auto] items-start gap-3 py-4 ${
              i < adminNotices.length - 1 ? "border-b border-[#F5EFE5]" : ""
            }`}
          >
            <MaterialSymbol name={notice.icon} size={19} className="mt-px text-[#E0A759]" />
            <div className="min-w-0">
              <div className="text-[12.5px] font-bold text-[#2F2B24]">{notice.title}</div>
              <div className="mt-1.5 text-[11px] leading-[1.7] text-cb-muted-2">{notice.body}</div>
            </div>
            <span className="whitespace-nowrap text-[10.5px] text-cb-placeholder">{notice.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
