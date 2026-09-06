import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { badgeStyle, type ListCircle } from "@/lib/circles-list-mock-data";

function StatsRow({ circle }: { circle: ListCircle }) {
  return (
    <div className="flex items-center gap-2.5 text-[10.5px] text-cb-muted-2 lg:gap-[11px]">
      <span className="flex items-center gap-1 whitespace-nowrap">
        <MaterialSymbol name="group" size={14} className="text-cb-placeholder" />
        {circle.members}
      </span>
      <span className="flex items-center gap-1 whitespace-nowrap">
        <MaterialSymbol name="calendar_month" size={14} className="text-cb-placeholder" />
        {circle.freq}
      </span>
      <div className="flex-1" />
      <span className="flex items-center gap-1 whitespace-nowrap">
        <MaterialSymbol name="favorite_border" size={14} className="text-[#C99A3E]" />
        {circle.likes}
      </span>
    </div>
  );
}

export function CircleListCard({ circle }: { circle: ListCircle }) {
  const badge = badgeStyle[circle.badge];

  return (
    <Link href={`/circle/${circle.id}`}>
      {/* デスクトップ: グリッドカード */}
      <div className="hidden min-w-0 flex-col overflow-hidden rounded-[11px] border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.06)] transition-[box-shadow,transform] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(120,95,50,.16)] lg:flex">
        <div className="relative h-[118px]">
          <PhotoPlaceholder caption={circle.photoCaption} iconSize={18} />
          <span
            className="pointer-events-none absolute left-[9px] top-[9px] rounded px-[9px] py-1 text-[10px] font-bold"
            style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}
          >
            {badge.label}
          </span>
        </div>
        <div className="flex flex-col gap-[7px] px-[13px] pb-[14px] pt-[13px]">
          <div className="font-heading text-sm font-bold leading-[1.4] text-[#2F2B24]">{circle.name}</div>
          <div className="text-[10.5px] text-cb-muted-3">{circle.meta}</div>
          <div className="text-[11px] leading-[1.7] text-cb-muted">{circle.desc}</div>
          <div className="mt-[5px] border-t border-[#F3ECE0] pt-[11px]">
            <StatsRow circle={circle} />
          </div>
        </div>
      </div>

      {/* モバイル: 横並びカード */}
      <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 rounded-xl border border-cb-border bg-cb-surface p-3 shadow-[0_2px_8px_rgba(120,95,50,.06)] lg:hidden">
        <div className="h-[124px] min-w-0 overflow-hidden rounded-lg">
          <PhotoPlaceholder caption={circle.photoCaption} iconSize={16} />
        </div>
        <div className="flex min-w-0 flex-col">
          <span
            className="self-start rounded px-[9px] py-1 text-[10px] font-bold"
            style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}
          >
            {badge.label}
          </span>
          <div className="mt-2 font-heading text-[14.5px] font-bold leading-[1.4] text-[#2F2B24]">{circle.name}</div>
          <div className="mt-1.5 text-[10.5px] text-cb-muted-3">{circle.meta}</div>
          <div className="mt-[7px] text-[11px] leading-[1.7] text-cb-muted">{circle.desc}</div>
          <div className="min-h-2 flex-1" />
          <StatsRow circle={circle} />
        </div>
      </div>
    </Link>
  );
}
