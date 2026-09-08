import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { coverImagePath, formatDateJa, type CircleWithRelations } from "@/lib/circles";

const badgeStyle = {
  ongoing: { label: "メンバー募集中", bg: "#FDF3E4", border: "#F2E0C0", color: "#C07E1B" },
  one_time: { label: "単発イベント", bg: "#EDF3F9", border: "#D3E2EF", color: "#4D6B8A" },
};

function freqLabel(circle: CircleWithRelations): string {
  if (circle.type === "one_time" && circle.event_date) {
    return formatDateJa(circle.event_date);
  }
  return circle.schedule || "活動頻度：随時お知らせ";
}

export function CircleListCard({ circle }: { circle: CircleWithRelations }) {
  const badge = badgeStyle[circle.type === "one_time" ? "one_time" : "ongoing"];
  const meta = [circle.area?.name, circle.category?.name].filter(Boolean).join("・");
  const photoCaption = `${circle.name}の写真`;
  const imagePath = coverImagePath(circle);

  return (
    <Link href={`/circle/${circle.slug}`}>
      {/* デスクトップ: グリッドカード */}
      <div className="hidden min-w-0 flex-col overflow-hidden rounded-[11px] border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.06)] transition-[box-shadow,transform] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(120,95,50,.16)] lg:flex">
        <div className="relative h-[118px]">
          <CircleImage path={imagePath} alt={photoCaption} iconSize={18} />
          <span
            className="pointer-events-none absolute left-[9px] top-[9px] rounded px-[9px] py-1 text-[10px] font-bold"
            style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}
          >
            {badge.label}
          </span>
        </div>
        <div className="flex flex-col gap-[7px] px-[13px] pb-[14px] pt-[13px]">
          <div className="font-heading text-sm font-bold leading-[1.4] text-[#2F2B24]">{circle.name}</div>
          <div className="text-[10.5px] text-cb-muted-3">{meta}</div>
          <div className="line-clamp-2 text-[11px] leading-[1.7] text-cb-muted">{circle.description}</div>
          <div className="mt-[5px] flex items-center gap-1 border-t border-[#F3ECE0] pt-[11px] text-[10.5px] text-cb-muted-2">
            <MaterialSymbol name={circle.type === "one_time" ? "calendar_month" : "event_repeat"} size={14} className="text-cb-placeholder" />
            <span className="truncate">{freqLabel(circle)}</span>
          </div>
        </div>
      </div>

      {/* モバイル: 横並びカード */}
      <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 rounded-xl border border-cb-border bg-cb-surface p-3 shadow-[0_2px_8px_rgba(120,95,50,.06)] lg:hidden">
        <div className="h-[124px] min-w-0 overflow-hidden rounded-lg">
          <CircleImage path={imagePath} alt={photoCaption} iconSize={16} />
        </div>
        <div className="flex min-w-0 flex-col">
          <span
            className="self-start rounded px-[9px] py-1 text-[10px] font-bold"
            style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}
          >
            {badge.label}
          </span>
          <div className="mt-2 font-heading text-[14.5px] font-bold leading-[1.4] text-[#2F2B24]">{circle.name}</div>
          <div className="mt-1.5 text-[10.5px] text-cb-muted-3">{meta}</div>
          <div className="mt-[7px] line-clamp-2 text-[11px] leading-[1.7] text-cb-muted">{circle.description}</div>
          <div className="min-h-2 flex-1" />
          <div className="flex items-center gap-1 text-[10.5px] text-cb-muted-2">
            <MaterialSymbol name={circle.type === "one_time" ? "calendar_month" : "event_repeat"} size={14} className="text-cb-placeholder" />
            <span className="truncate">{freqLabel(circle)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
