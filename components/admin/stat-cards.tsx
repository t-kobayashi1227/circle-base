import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { AdminStats } from "@/lib/admin-types";

export function StatCards({ stats }: { stats: AdminStats }) {
  const cards = [
    { icon: "group", label: "総ユーザー数", value: stats.totalUsers, unit: "人", color: "#4D6B8A" },
    { icon: "groups", label: "公開中サークル数", value: stats.publishedCircles, unit: "件", color: "#3E9E6A" },
    { icon: "visibility_off", label: "非公開サークル数", value: stats.unpublishedCircles, unit: "件", color: "#8B8375" },
    { icon: "flag", label: "未対応の通報", value: stats.pendingReports, unit: "件", color: "#D9534F" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-3.5">
      {cards.map((stat) => (
        <div key={stat.label} className="min-w-0 rounded-[11px] border border-cb-border bg-cb-surface p-3.5 lg:p-[18px_18px_16px]">
          <div className="flex items-center gap-2.5 lg:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-cb-accent-soft lg:h-[38px] lg:w-[38px]">
              <MaterialSymbol name={stat.icon} filled size={19} className="lg:text-[21px]" style={{ color: stat.color }} />
            </span>
            <span className="min-w-0 text-[10.5px] text-cb-muted lg:text-xs">{stat.label}</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1 lg:mt-3 lg:gap-1">
            <span className="font-heading text-2xl font-bold leading-none text-[#2F2B24] lg:text-[30px]">{stat.value}</span>
            <span className="text-[11.5px] text-cb-ink-soft lg:text-[12.5px]">{stat.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
