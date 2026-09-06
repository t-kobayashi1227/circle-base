import { MaterialSymbol } from "@/components/icons/material-symbol";
import { recentReports, reportTagStyle } from "@/lib/admin-mock-data";

// モバイルは先頭2件、デスクトップは4件すべて表示する。
export function ReportsCard() {
  return (
    <div className="min-w-0 rounded-xl border border-cb-border bg-cb-surface px-3.5 pb-1 pt-4 lg:px-5 lg:pb-3 lg:pt-[18px]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="whitespace-nowrap font-heading text-sm font-bold text-cb-ink lg:text-[15.5px]">
          最近の通報（対応が必要）
        </h2>
        <a href="#" className="flex shrink-0 items-center gap-px text-[11px] font-bold text-cb-accent-dark hover:text-[#8E5606] lg:gap-0.5 lg:text-[11.5px]">
          すべて見る
          <MaterialSymbol name="chevron_right" size={14} className="lg:hidden" />
          <MaterialSymbol name="chevron_right" size={15} className="hidden lg:inline-block" />
        </a>
      </div>

      <div className="flex flex-col">
        {recentReports.map((report, i) => {
          const tag = reportTagStyle[report.tag];
          const isLastMobile = i === 1;
          const isLastDesktop = i === recentReports.length - 1;

          return (
            <div
              key={report.id}
              className={`py-3.5 lg:py-4 ${i >= 2 ? "hidden lg:block" : ""} ${
                isLastMobile ? "" : "border-b border-[#F5EFE5]"
              } ${isLastDesktop ? "lg:border-b-0" : "lg:border-b lg:border-[#F5EFE5]"}`}
            >
              {/* デスクトップ: 1行グリッド */}
              <div className="hidden lg:grid lg:grid-cols-[92px_minmax(0,1fr)_auto_auto] lg:items-center lg:gap-2.5">
                <span
                  className="whitespace-nowrap rounded px-1.5 py-1 text-center text-[10px] font-bold"
                  style={{ background: tag.bg, color: tag.color }}
                >
                  {tag.label}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold leading-[1.5] text-[#2F2B24]">{report.title}</div>
                  <div className="mt-1.5 text-[10.5px] text-cb-muted-3">通報者：{report.by}</div>
                </div>
                <span className="whitespace-nowrap text-[10px] text-cb-placeholder">{report.ago}</span>
                <button
                  type="button"
                  className="whitespace-nowrap rounded-md border border-cb-accent px-[11px] py-[7px] text-[10.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
                >
                  確認する
                </button>
              </div>

              {/* モバイル: タグ→タイトル行の縦積み */}
              <div className="lg:hidden">
                <span
                  className="inline-block rounded px-2 py-1 text-[10px] font-bold"
                  style={{ background: tag.bg, color: tag.color }}
                >
                  {tag.label}
                </span>
                <div className="mt-2.5 grid grid-cols-[14px_minmax(0,1fr)_auto] items-start gap-2.5">
                  <MaterialSymbol name="arrow_drop_down" size={14} className="mt-0.5 text-[#C99A3E]" />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-[#2F2B24]">{report.title}</div>
                    <div className="mt-1.5 text-[10.5px] text-cb-muted-3">通報者：{report.by}</div>
                  </div>
                  <span className="whitespace-nowrap text-[10.5px] text-cb-placeholder">{report.ago}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
