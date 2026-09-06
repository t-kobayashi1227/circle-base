import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { upcomingEvents } from "@/lib/mypage-mock-data";

export function UpcomingEventsSection() {
  return (
    <div className="rounded-xl border border-cb-border bg-cb-surface px-4 py-4 lg:px-[18px] lg:py-4">
      <div className="flex items-center justify-between">
        <h2 className="whitespace-nowrap font-heading text-sm font-bold text-cb-ink lg:text-[14px]">
          参加予定のイベント
        </h2>
        <Link href="/mypage/events" className="flex shrink-0 items-center gap-px text-[11px] text-cb-muted-2 hover:text-cb-accent-dark lg:gap-px">
          すべて見る
          <MaterialSymbol name="chevron_right" size={14} />
        </Link>
      </div>

      {/* デスクトップ: テキストのみ */}
      <div className="mt-3.5 hidden flex-col gap-3 lg:flex">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-[9px] border border-cb-border p-3 hover:border-cb-accent"
          >
            <div className="flex flex-col items-center justify-center gap-[3px]">
              <span className="font-heading text-[15.5px] font-bold text-[#2F2B24]">{event.date}</span>
              <span className="text-[9.5px] text-[#D9534F]">{event.dow}</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold leading-[1.5] text-[#2F2B24]">{event.title}</div>
              <div className="mt-1.5 text-[10.5px] text-cb-muted-3">{event.time}</div>
              <div className="mt-1 text-[10.5px] text-cb-muted-3">{event.place}</div>
            </div>
          </div>
        ))}
      </div>

      {/* モバイル: 写真付き */}
      <div className="mt-3 flex flex-col gap-3 lg:hidden">
        {upcomingEvents.slice(0, 2).map((event) => (
          <div
            key={event.id}
            className="grid grid-cols-[62px_minmax(0,1fr)_66px] items-center gap-3 rounded-[11px] border border-cb-border p-3"
          >
            <div className="flex flex-col items-center gap-1 border-r border-[#F3ECE0] py-1.5">
              <span className="font-heading text-lg font-bold text-[#2F2B24]">{event.date}</span>
              <span className="text-[9.5px] text-[#D9534F]">{event.dow}</span>
            </div>
            <div className="min-w-0">
              <div className="text-[12.5px] font-bold leading-[1.5] text-[#2F2B24]">{event.title}</div>
              <div className="mt-1.5 text-[10.5px] text-cb-muted-3">{event.time}</div>
              <div className="mt-1 text-[10.5px] text-cb-muted-3">{event.place}</div>
            </div>
            <div className="h-14 overflow-hidden rounded-lg">
              <PhotoPlaceholder caption="イベント写真" iconSize={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
