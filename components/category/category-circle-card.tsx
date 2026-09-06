import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { categoryTagStyle, type CategoryCircle } from "@/lib/category-mock-data";

export function CategoryCircleCard({ circle }: { circle: CategoryCircle }) {
  const tag = categoryTagStyle[circle.tag];

  return (
    <Link
      href={`/circle/${circle.id}`}
      className="block min-w-0 overflow-hidden rounded-xl border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.06)] transition-[box-shadow,transform] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(120,95,50,.15)]"
    >
      <div className="relative h-[130px]">
        <PhotoPlaceholder caption={circle.photoCaption} iconSize={17} />
        {circle.isNew ? (
          <span className="pointer-events-none absolute left-[9px] top-[9px] rounded px-2.5 py-1 text-[10px] font-bold text-white" style={{ background: "#E5731B" }}>
            NEW
          </span>
        ) : null}
        <div className="absolute right-[9px] top-[9px] flex h-7 w-7 items-center justify-center rounded-full bg-white/92">
          <MaterialSymbol name="favorite_border" size={16} className="text-cb-muted-3" />
        </div>
      </div>
      <div className="px-[15px] pb-4 pt-3.5">
        <div className="font-heading text-[14.5px] font-bold text-[#2F2B24]">{circle.name}</div>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-cb-muted-2">
          <MaterialSymbol name="location_on" filled size={14} className="text-[#C9A15E]" />
          {circle.area}
        </div>
        <div className="mt-2 text-[11px] leading-[1.7] text-cb-ink-soft">{circle.desc}</div>
        <div className="mt-[11px] flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 whitespace-nowrap text-[10.5px] text-cb-muted-2">
            <MaterialSymbol name="group" size={14} className="text-cb-placeholder" />
            {circle.members}
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap text-[10.5px] text-cb-muted-2">
            <MaterialSymbol name="calendar_month" size={14} className="text-cb-placeholder" />
            {circle.freq}
          </span>
          <span
            className="ml-auto whitespace-nowrap rounded px-[9px] py-[3px] text-[10px] font-medium"
            style={{ background: tag.bg, color: tag.color }}
          >
            {tag.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
