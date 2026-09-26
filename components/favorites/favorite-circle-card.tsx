import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { FavoriteRemoveButton } from "@/components/favorites/favorite-remove-button";
import { coverImagePath, type CircleWithRelations } from "@/lib/circles";

// お気に入りの継続サークル用カード。デスクトップは縦型（4列グリッド）、モバイルは横型。
export function FavoriteCircleCard({ circle }: { circle: CircleWithRelations }) {
  const imagePath = coverImagePath(circle);

  return (
    <div className="group relative min-w-0 overflow-hidden rounded-xl border border-cb-border bg-white transition-[box-shadow,transform] hover:shadow-[0_8px_20px_rgba(120,95,50,.14)] lg:hover:-translate-y-0.5">
      <Link
        href={`/circle/${circle.slug}`}
        className="grid grid-cols-[104px_minmax(0,1fr)] lg:flex lg:h-full lg:flex-col"
      >
        <div className="relative min-h-[112px] lg:h-[110px] lg:min-h-0">
          <CircleImage path={imagePath} alt={`${circle.name}の写真`} iconSize={16} />
          <span className="pointer-events-none absolute left-2 top-2 rounded-[5px] bg-[#4D6B8A] px-2 py-[3px] text-[9px] font-bold text-white lg:left-[9px] lg:top-[9px] lg:px-[9px] lg:py-1 lg:text-[9.5px]">
            サークル
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col px-3.5 py-3 lg:pb-[15px] lg:pt-[13px]">
          <div className="pr-8 font-heading text-[13.5px] font-bold text-[#2F2B24] transition-colors group-hover:text-cb-accent-dark lg:pr-0">
            {circle.name}
          </div>
          {circle.area ? (
            <div className="mt-1.5 flex items-center gap-[5px] text-[10.5px] text-cb-muted-2 lg:mt-[7px]">
              <MaterialSymbol name="location_on" filled size={13} className="text-[#C9A15E]" />
              {circle.area.name}
            </div>
          ) : null}
          {circle.description ? (
            <div className="mt-1.5 line-clamp-2 text-[10.5px] leading-[1.65] text-cb-muted lg:mt-[7px] lg:leading-[1.7]">
              {circle.description}
            </div>
          ) : null}
          {circle.member_count || circle.schedule_frequency ? (
            <div className="mt-2 flex flex-wrap items-center gap-x-[11px] gap-y-1 lg:mt-[9px] lg:gap-x-3">
              {circle.member_count ? (
                <span className="flex items-center gap-1 whitespace-nowrap text-[9.5px] text-cb-muted-2 lg:text-[10px]">
                  <MaterialSymbol name="group" size={13} className="text-cb-placeholder" />
                  {circle.member_count}
                </span>
              ) : null}
              {circle.schedule_frequency ? (
                <span className="flex items-center gap-1 whitespace-nowrap text-[9.5px] text-cb-muted-2 lg:text-[10px]">
                  <MaterialSymbol name="calendar_month" size={13} className="text-cb-placeholder" />
                  {circle.schedule_frequency}
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="hidden min-h-[11px] flex-1 lg:block" />
          <span className="hidden items-center justify-center rounded-[7px] border border-[#E0D6C6] p-[9px] text-[11px] font-medium text-cb-ink-soft transition-colors group-hover:border-cb-accent group-hover:text-cb-accent-dark lg:flex">
            詳細を見る
          </span>
        </div>
      </Link>
      <FavoriteRemoveButton circleId={circle.id} circleName={circle.name} />
    </div>
  );
}
