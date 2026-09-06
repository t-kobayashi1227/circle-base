import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { circleApplications } from "@/lib/admin-mock-data";

// モバイルは先頭3件、デスクトップは4件すべて表示する。
export function CircleApplicationsCard() {
  return (
    <div className="min-w-0 rounded-xl border border-cb-border bg-cb-surface px-3.5 pb-1 pt-4 lg:px-5 lg:pb-3 lg:pt-[18px]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="whitespace-nowrap font-heading text-sm font-bold text-cb-ink lg:text-[15.5px]">
          新着サークル申請（承認待ち）
        </h2>
        <a href="#" className="flex shrink-0 items-center gap-px text-[11px] font-bold text-cb-accent-dark hover:text-[#8E5606] lg:gap-0.5 lg:text-[11.5px]">
          すべて見る
          <MaterialSymbol name="chevron_right" size={14} className="lg:hidden" />
          <MaterialSymbol name="chevron_right" size={15} className="hidden lg:inline-block" />
        </a>
      </div>

      <div className="flex flex-col">
        {circleApplications.map((app, i) => {
          const isLastMobile = i === 2;
          const isLastDesktop = i === circleApplications.length - 1;
          return (
            <div
              key={app.id}
              className={`grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-[11px] py-3.5 lg:grid-cols-[48px_minmax(0,1fr)_auto] lg:gap-3.5 lg:py-4 ${
                i === 3 ? "hidden lg:grid" : ""
              } ${isLastMobile ? "" : "border-b border-[#F5EFE5]"} ${isLastDesktop ? "lg:border-b-0" : "lg:border-b lg:border-[#F5EFE5]"}`}
            >
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full lg:h-12 lg:w-12">
                <PhotoPlaceholder caption={app.photoCaption} iconSize={12} />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-[#2F2B24] lg:text-[13.5px]">{app.name}</div>
                <div className="mt-[5px] text-[10.5px] text-cb-muted-2 lg:mt-1.5 lg:text-[11px]">{app.category}</div>
                <div className="mt-[3px] text-[10.5px] text-cb-muted-3 lg:mt-1">申請日：{app.date}</div>
              </div>
              <button
                type="button"
                className="shrink-0 whitespace-nowrap rounded-md border border-cb-accent px-3.5 py-2.5 text-[11.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft lg:rounded-[7px] lg:px-[18px] lg:py-2.5 lg:text-xs"
              >
                確認する
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
