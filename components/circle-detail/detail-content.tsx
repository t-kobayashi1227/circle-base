import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { CircleDetail } from "@/lib/circle-detail-mock-data";

export function DetailContent({ circle }: { circle: CircleDetail }) {
  return (
    <div className="rounded-xl bg-cb-surface px-4 pb-1.5 pt-[18px] lg:border lg:border-cb-border lg:px-[26px] lg:py-6">
      <h2 className="font-heading text-[15px] font-bold text-cb-ink lg:text-base">
        サークルの紹介
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-xs leading-[1.9] text-[#544C41] lg:mt-3 lg:gap-2 lg:text-[12.5px]">
        {circle.description.map((paragraph) => (
          <p key={paragraph} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 lg:border-b lg:border-cb-border lg:pb-[22px]">
        {circle.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-[#F0D6DE] bg-[#FDF5F7] px-[11px] py-1.5 text-[11px] text-[#B7607F] lg:border-[#DCE6F2] lg:bg-[#F6FAFE] lg:px-3 lg:text-[#4E6E93]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 活動内容: デスクトップのみ */}
      <div className="hidden lg:block">
        <h2 className="mt-[22px] font-heading text-base font-bold text-cb-ink">活動内容</h2>
        <div className="mt-3.5 flex flex-col gap-3 border-b border-cb-border pb-[22px]">
          {circle.activities.map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-[12.5px] text-cb-ink-soft">
              <MaterialSymbol name="check" size={16} className="mt-px shrink-0 text-cb-accent" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <h2 className="mt-[22px] font-heading text-[15px] font-bold text-cb-ink lg:text-base">
        主な活動場所
      </h2>
      <div className="mt-3.5 flex items-end gap-5">
        <div className="flex flex-col gap-2.5 text-xs leading-[1.8] text-[#544C41] lg:text-[12.5px]">
          <span>{circle.locationPrimary}</span>
          <span>{circle.locationSecondary}</span>
          <span className="hidden text-[11.5px] text-cb-muted-3 lg:inline">{circle.locationNote}</span>
        </div>
        <div className="hidden h-[78px] w-[170px] shrink-0 overflow-hidden rounded-lg lg:block">
          <PhotoPlaceholder caption="活動エリアのイラスト" iconSize={20} />
        </div>
      </div>
    </div>
  );
}
