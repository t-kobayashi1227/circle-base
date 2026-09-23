import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { coverImagePath, formatDateJa, type CircleWithRelations } from "@/lib/circles";

export function JoinedCircleCard({ circle }: { circle: CircleWithRelations }) {
  const detailPath = `/circle/${circle.slug}`;
  const meta =
    circle.type === "one_time" && circle.event_date
      ? { icon: "calendar_month", label: `次回の活動 ${formatDateJa(circle.event_date)}` }
      : { icon: "person_add", label: "メンバー募集中" };
  const imagePath = coverImagePath(circle);

  return (
    <div className="group overflow-hidden rounded-xl border border-cb-border bg-white shadow-[0_2px_8px_rgba(120,95,50,.06)] transition-[border-color,box-shadow] hover:border-cb-accent hover:shadow-[0_4px_14px_rgba(120,95,50,.14)]">
      {/* デスクトップ */}
      <Link
        href={detailPath}
        className="hidden grid-cols-[150px_minmax(0,1fr)_auto] items-center gap-[18px] p-4 lg:grid"
      >
        <div className="relative h-[100px] overflow-hidden rounded-[9px]">
          <CircleImage path={imagePath} alt={`${circle.name}の写真`} iconSize={16} />
          {circle.area ? (
            <span className="pointer-events-none absolute left-2 top-2 rounded bg-[#33302B]/80 px-2 py-[3px] text-[9.5px] font-bold text-white">
              {circle.area.name}
            </span>
          ) : null}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="whitespace-nowrap font-heading text-[15.5px] font-bold text-[#2F2B24] transition-colors group-hover:text-cb-accent-dark">
              {circle.name}
            </span>
            {circle.category ? (
              <span className="whitespace-nowrap rounded bg-cb-chip px-2.5 py-[3px] text-[10.5px] font-medium text-cb-muted">
                {circle.category.name}
              </span>
            ) : null}
          </div>
          <div className="mt-2 line-clamp-2 text-[11.5px] leading-[1.75] text-cb-muted">{circle.description}</div>
          <div className="mt-[11px] flex flex-wrap items-center gap-x-[18px] gap-y-1.5 text-[11px] text-cb-muted-2">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <MaterialSymbol name={meta.icon} size={15} className="text-cb-placeholder" />
              {meta.label}
            </span>
            {circle.location ? (
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <MaterialSymbol name="location_on" size={15} className="text-cb-placeholder" />
                {circle.location}
              </span>
            ) : null}
          </div>
        </div>
        <MaterialSymbol
          name="chevron_right"
          size={22}
          className="shrink-0 text-cb-placeholder transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-cb-accent-dark"
        />
      </Link>

      {/* モバイル */}
      <Link href={detailPath} className="grid grid-cols-[92px_minmax(0,1fr)_18px] items-center gap-3 p-3 lg:hidden">
        <div className="relative h-[88px] overflow-hidden rounded-lg">
          <CircleImage path={imagePath} alt={`${circle.name}の写真`} iconSize={13} />
          {circle.area ? (
            <span className="pointer-events-none absolute left-1.5 top-1.5 rounded bg-[#33302B]/80 px-[6px] py-[2px] text-[8.5px] font-bold text-white">
              {circle.area.name}
            </span>
          ) : null}
        </div>
        <div className="min-w-0">
          <div className="truncate font-heading text-[13.5px] font-bold text-[#2F2B24]">{circle.name}</div>
          {circle.category ? (
            <span className="mt-1.5 inline-block rounded bg-cb-chip px-2 py-[3px] text-[10px] font-medium text-cb-muted">
              {circle.category.name}
            </span>
          ) : null}
          <div className="mt-2 flex items-center gap-1.5 text-[10.5px] text-cb-muted-2">
            <MaterialSymbol name={meta.icon} size={13} className="text-cb-placeholder" />
            <span className="truncate">{meta.label}</span>
          </div>
        </div>
        <MaterialSymbol
          name="chevron_right"
          size={19}
          className="text-cb-placeholder transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-cb-accent-dark"
        />
      </Link>
    </div>
  );
}
