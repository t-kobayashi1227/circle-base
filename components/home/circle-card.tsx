import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { circleTypeLabel, coverImagePath, formatDateJa, type CircleWithRelations } from "@/lib/circles";

const typeColor: Record<string, string> = {
  ongoing: "#4D6B8A",
  one_time: "#D9762B",
};

export function CircleCard({
  circle,
  className = "",
}: {
  circle: CircleWithRelations;
  className?: string;
}) {
  const meta =
    circle.type === "one_time" && circle.event_date
      ? { icon: "calendar_month", label: `${formatDateJa(circle.event_date)}開催` }
      : { icon: "person_add", label: "メンバー募集中" };

  return (
    <Link
      href={`/circle/${circle.slug}`}
      className={`block overflow-hidden rounded-xl border border-cb-border bg-white shadow-[0_2px_8px_rgba(120,95,50,.07)] transition-[box-shadow,transform] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(120,95,50,.16)] ${className}`}
    >
      <div className="relative aspect-[4/3]">
        <CircleImage path={coverImagePath(circle)} alt={`${circle.name}の写真`} iconSize={16} />
        <span
          className="pointer-events-none absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ background: typeColor[circle.type] ?? typeColor.ongoing }}
        >
          {circleTypeLabel(circle.type)}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 pb-3.5 pt-2.5">
        <div className="font-heading text-[13px] font-bold leading-[1.4] text-cb-ink">{circle.name}</div>
        <div className="text-[10.5px] text-cb-muted-3">{circle.area?.name ?? ""}</div>
        <div className="line-clamp-2 text-[11px] leading-[1.65] text-cb-muted">{circle.description}</div>
        <div className="mt-0.5 flex flex-wrap gap-1.5">
          <span className="flex items-center gap-1 rounded bg-cb-chip px-2 py-1 text-[10px] text-cb-muted">
            <MaterialSymbol name={meta.icon} size={13} className="text-[#C99A3E]" />
            {meta.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
