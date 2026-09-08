import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { CircleDetailView } from "@/lib/circles";

export function DetailSidebar({ circle }: { circle: CircleDetailView }) {
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      <div className="rounded-xl border border-cb-border bg-cb-surface px-[22px] py-5">
        <h3 className="font-heading text-[14.5px] font-bold text-cb-ink">活動エリア</h3>
        <div className="mt-3 text-[12.5px] font-medium text-[#3B352C]">{circle.area}</div>
        <div className="mt-2 text-[11.5px] leading-[1.8] text-cb-muted-2">{circle.locationPrimary}</div>
        <button
          type="button"
          className="mt-3.5 flex w-full items-center justify-center gap-[7px] rounded-lg border border-[#E0D6C6] py-[11px] text-xs font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
        >
          <MaterialSymbol name="location_on" filled size={16} className="text-cb-accent" />
          地図で見る
        </button>
      </div>

      <div className="rounded-xl border border-cb-border bg-cb-surface px-[22px] py-5">
        <h3 className="mb-3.5 font-heading text-[14.5px] font-bold text-cb-ink">応募資格</h3>
        <div className="flex flex-col gap-[11px]">
          {circle.requirements.map((req) => (
            <div key={req} className="flex items-start gap-2.5 text-xs text-cb-ink-soft">
              <MaterialSymbol name="check" size={15} className="mt-px shrink-0 text-cb-accent" />
              {req}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-cb-border bg-cb-surface px-[22px] py-5">
        <div className="mb-3.5 flex items-center justify-between">
          <h3 className="font-heading text-[14.5px] font-bold text-cb-ink">活動頻度・時間</h3>
          <MaterialSymbol name="calendar_month" size={26} className="text-[#E7C79A]" />
        </div>
        <div className="flex flex-col gap-2.5 text-xs text-cb-ink-soft">
          {circle.scheduleDetail.map((item) => (
            <span key={item.label}>
              {item.label}：{item.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
