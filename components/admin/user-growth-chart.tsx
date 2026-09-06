import { MaterialSymbol } from "@/components/icons/material-symbol";
import {
  userGrowthChartLabels,
  userGrowthChartAreaPath,
  userGrowthChartLinePath,
} from "@/lib/admin-mock-data";

const yAxisTicks = ["120", "90", "60", "30", "0"];

export function UserGrowthChart() {
  return (
    <div className="hidden min-w-0 rounded-[11px] border border-cb-border bg-cb-surface px-5 pb-5 pt-[18px] lg:block">
      <div className="flex items-center justify-between gap-3">
        <h2 className="whitespace-nowrap font-heading text-[15.5px] font-bold text-cb-ink">
          ユーザー登録数の推移
        </h2>
        <div className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-cb-input-border px-3 py-2 text-[11.5px] text-cb-ink">
          過去30日間
          <MaterialSymbol name="expand_more" size={16} className="text-cb-placeholder" />
        </div>
      </div>

      <div className="mt-[18px] grid grid-cols-[34px_minmax(0,1fr)] gap-2.5">
        <div className="flex h-[236px] flex-col justify-between text-right text-[10.5px] text-cb-placeholder">
          {yAxisTicks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
        <div className="relative min-w-0" style={{ height: 236 }}>
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="h-px bg-[#F3ECE0]" />
            <div className="h-px bg-[#F3ECE0]" />
            <div className="h-px bg-[#F3ECE0]" />
            <div className="h-px bg-[#F3ECE0]" />
            <div className="h-px bg-[#EFE7DA]" />
          </div>
          <svg
            viewBox="0 0 560 236"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path d={userGrowthChartAreaPath} fill="#FDF0DE" />
            <path
              d={userGrowthChartLinePath}
              fill="none"
              stroke="#F08A1F"
              strokeWidth={2.4}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div />
        <div className="mt-2.5 flex min-w-0 justify-between text-[10.5px] text-cb-placeholder">
          {userGrowthChartLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
