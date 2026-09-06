import { MaterialSymbol } from "@/components/icons/material-symbol";
import { dashboardStats } from "@/lib/admin-mock-data";

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-3.5">
      {dashboardStats.map((stat) => (
        <div
          key={stat.label}
          className="min-w-0 rounded-[11px] border border-cb-border bg-cb-surface p-3.5 lg:p-[18px_18px_16px]"
        >
          <div className="flex items-center gap-2.5 lg:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-cb-accent-soft lg:h-[38px] lg:w-[38px]">
              <MaterialSymbol name={stat.icon} filled size={19} className="text-cb-accent lg:text-[21px]" />
            </span>
            <span className="min-w-0 text-[10.5px] text-cb-muted lg:text-xs">{stat.label}</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1 lg:mt-3 lg:gap-1">
            <span className="font-heading text-2xl font-bold leading-none text-[#2F2B24] lg:text-[30px]">
              {stat.value}
            </span>
            <span className="text-[11.5px] text-cb-ink-soft lg:text-[12.5px]">{stat.unit}</span>
          </div>
          <div className="mt-2.5 text-[11px] text-[#3E9E6A] lg:mt-3">
            <span className="lg:hidden">{stat.shortDelta}</span>
            <span className="hidden lg:inline">{stat.delta}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
