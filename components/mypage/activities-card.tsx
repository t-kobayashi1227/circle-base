import { MaterialSymbol } from "@/components/icons/material-symbol";
import { activities } from "@/lib/mypage-mock-data";

export function ActivitiesCard() {
  return (
    <div className="hidden rounded-xl border border-cb-border bg-cb-surface px-5 pb-3.5 pt-[18px] lg:block">
      <h2 className="mb-3.5 font-heading text-[15px] font-bold text-cb-ink">最近のアクティビティ</h2>
      <div className="flex flex-col gap-3.5">
        {activities.map((activity) => (
          <div key={activity.text} className="grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-[11px]">
            <div className="h-[26px] w-[26px] overflow-hidden rounded-full bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3]" />
            <div className="min-w-0 text-[11.5px] text-cb-ink-soft">{activity.text}</div>
            <span className="whitespace-nowrap text-[10px] text-cb-placeholder">{activity.date}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-[#F3ECE0] pt-3 text-center">
        <a href="#" className="inline-flex items-center gap-0.5 text-[11.5px] font-medium text-cb-accent-dark hover:text-[#8E5606]">
          すべてのアクティビティを見る
          <MaterialSymbol name="chevron_right" size={15} />
        </a>
      </div>
    </div>
  );
}
