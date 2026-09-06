import { MaterialSymbol } from "@/components/icons/material-symbol";
import { notices } from "@/lib/mypage-mock-data";

export function NoticesCard() {
  return (
    <div className="hidden rounded-xl border border-cb-border bg-cb-surface px-5 pb-3.5 pt-[18px] lg:block">
      <h2 className="mb-3.5 font-heading text-[15px] font-bold text-cb-ink">お知らせ</h2>
      <div className="flex flex-col gap-3.5">
        {notices.map((notice) => (
          <div key={notice.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-2.5">
            <MaterialSymbol name={notice.icon} filled size={15} style={{ color: notice.iconColor }} className="mt-0.5" />
            <div className="min-w-0">
              <div className="text-[11.5px] font-medium text-cb-ink-soft">{notice.title}</div>
              <div className="mt-1.5 text-[10.5px] leading-[1.7] text-cb-muted-3">{notice.body}</div>
            </div>
            <span className="whitespace-nowrap text-[10px] text-cb-placeholder">{notice.ago}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-[#F3ECE0] pt-3 text-center">
        <a href="#" className="text-[11.5px] font-medium text-cb-accent-dark hover:text-[#8E5606]">
          すべてのお知らせを見る
        </a>
      </div>
    </div>
  );
}
