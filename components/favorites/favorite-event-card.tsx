import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { FavoriteRemoveButton } from "@/components/favorites/favorite-remove-button";
import { coverImagePath, type CircleWithRelations } from "@/lib/circles";

// event_date（YYYY-MM-DD, JST）を日付バッジ用の「月・日・曜日」に分解する。
function eventDateParts(dateStr: string) {
  const date = new Date(`${dateStr}T00:00:00+09:00`);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", ...options }).format(date);
  return {
    month: part({ month: "long" }),
    day: part({ day: "numeric" }).replace("日", ""),
    dow: `(${part({ weekday: "short" })})`,
  };
}

// お気に入りの単発イベント（type = one_time のサークル）用カード。左に写真、右に日付と概要の横型。
export function FavoriteEventCard({ circle }: { circle: CircleWithRelations }) {
  const imagePath = coverImagePath(circle);
  const date = circle.event_date ? eventDateParts(circle.event_date) : null;

  return (
    <div className="group relative min-w-0 overflow-hidden rounded-xl border border-cb-border bg-white transition-[box-shadow,transform] hover:shadow-[0_8px_20px_rgba(120,95,50,.14)] lg:hover:-translate-y-0.5">
      <Link
        href={`/circle/${circle.slug}`}
        className="grid h-full grid-cols-[104px_minmax(0,1fr)] lg:grid-cols-[150px_minmax(0,1fr)]"
      >
        <div className="relative min-h-[120px]">
          <CircleImage path={imagePath} alt={`${circle.name}の写真`} iconSize={16} />
          <span className="pointer-events-none absolute left-2 top-2 rounded-[5px] bg-cb-accent px-2 py-[3px] text-[9px] font-bold text-white lg:left-[9px] lg:top-[9px] lg:px-[9px] lg:py-1 lg:text-[9.5px]">
            イベント
          </span>
        </div>
        <div className="flex min-w-0 flex-col px-3.5 py-3 lg:px-[15px] lg:py-[13px]">
          {date ? (
            <div className="flex items-center gap-2">
              <div className="flex shrink-0 flex-col items-center rounded-md bg-cb-accent-soft px-[9px] py-[5px] text-cb-accent-dark">
                <span className="text-[9.5px]">{date.month}</span>
                <span className="text-sm font-bold leading-[1.1]">{date.day}</span>
              </div>
              <span className="text-[10.5px] text-cb-muted-2">{date.dow}</span>
            </div>
          ) : null}
          <div className="mt-[9px] pr-8 font-heading text-[13px] font-bold text-[#2F2B24] transition-colors group-hover:text-cb-accent-dark lg:pr-0">
            {circle.name}
          </div>
          {circle.area ? (
            <div className="mt-1.5 flex items-center gap-[5px] text-[10.5px] text-cb-muted-2">
              <MaterialSymbol name="location_on" filled size={13} className="text-[#C9A15E]" />
              {circle.area.name}
            </div>
          ) : null}
          {circle.description ? (
            <div className="mt-1.5 line-clamp-2 text-[10.5px] leading-[1.6] text-cb-muted">{circle.description}</div>
          ) : null}
          <div className="hidden min-h-[9px] flex-1 lg:block" />
          <span className="hidden items-center justify-center rounded-[7px] border border-[#E0D6C6] p-2 text-[10.5px] font-medium text-cb-ink-soft transition-colors group-hover:border-cb-accent group-hover:text-cb-accent-dark lg:flex">
            詳細を見る
          </span>
        </div>
      </Link>
      <FavoriteRemoveButton circleId={circle.id} circleName={circle.name} />
    </div>
  );
}
