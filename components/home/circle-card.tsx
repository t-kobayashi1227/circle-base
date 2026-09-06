import { MaterialSymbol } from "@/components/icons/material-symbol";
import { circleBadge, type MockCircle } from "@/lib/home-mock-data";

export function CircleCard({
  circle,
  showMeta2 = false,
  className = "",
}: {
  circle: MockCircle;
  showMeta2?: boolean;
  className?: string;
}) {
  const badge = circleBadge(circle.type);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.07)] transition-[box-shadow,transform] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(120,95,50,.16)] ${className}`}
    >
      <div className="relative h-[98px] bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3]">
        <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] leading-snug text-[#8E6A2E]">
          {circle.photoCaption}
        </div>
        <span
          className="pointer-events-none absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ background: badge.color }}
        >
          {badge.label}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 pb-3.5 pt-2.5">
        <div className="font-heading text-[13px] font-bold leading-[1.4] text-cb-ink">
          {circle.name}
        </div>
        <div className="text-[10.5px] text-cb-muted-3">{circle.area}</div>
        <div className="text-[11px] leading-[1.65] text-cb-muted">{circle.desc}</div>
        <div className="mt-0.5 flex flex-wrap gap-1.5">
          <span className="flex items-center gap-1 rounded bg-cb-chip px-2 py-1 text-[10px] text-cb-muted">
            <MaterialSymbol name={circle.metaIcon} size={13} className="text-[#C99A3E]" />
            {circle.meta}
          </span>
          {showMeta2 && circle.meta2 ? (
            <span className="flex items-center gap-1 rounded bg-cb-chip px-2 py-1 text-[10px] text-cb-muted">
              <MaterialSymbol name="sentiment_satisfied" size={13} className="text-[#C99A3E]" />
              {circle.meta2}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
