import { MaterialSymbol } from "@/components/icons/material-symbol";

interface Stat {
  icon: string;
  label: string;
  shortLabel: string;
  value: number;
  noteColor: string;
}

const green = "#3E9E6A";
const muted = "#8B8375";

export function OwnedStatsCards({ total, published }: { total: number; published: number }) {
  const stats: Stat[] = [
    { icon: "groups", label: "主催中のサークル数", shortLabel: "主催中の\nサークル数", value: total, noteColor: muted },
    { icon: "public", label: "公開中のサークル数", shortLabel: "公開中の\nサークル数", value: published, noteColor: green },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:gap-3.5">
      {stats.map((stat) => (
        <div key={stat.label} className="min-w-0 rounded-[11px] border border-cb-border bg-cb-surface p-3.5 lg:p-[18px]">
          {/* デスクトップ */}
          <div className="hidden lg:grid lg:grid-cols-[44px_minmax(0,1fr)] lg:items-start lg:gap-[13px]">
            <span className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-cb-accent-soft">
              <MaterialSymbol name={stat.icon} filled size={23} className="text-cb-accent" />
            </span>
            <div className="min-w-0">
              <div className="whitespace-nowrap text-[11.5px] text-cb-muted">{stat.label}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-heading text-[27px] font-bold leading-none text-[#2F2B24]">{stat.value}</span>
                <span className="text-xs text-cb-ink-soft">件</span>
              </div>
            </div>
          </div>

          {/* モバイル */}
          <div className="lg:hidden">
            <div className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-2.5">
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-cb-accent-soft">
                <MaterialSymbol name={stat.icon} filled size={19} className="text-cb-accent" />
              </span>
              <span className="min-w-0 whitespace-pre-line text-[10.5px] leading-[1.5] text-cb-muted">{stat.shortLabel}</span>
            </div>
            <div className="mt-2.5 flex items-baseline justify-end gap-1">
              <span className="font-heading text-2xl font-bold leading-none text-[#2F2B24]">{stat.value}</span>
              <span className="text-[11.5px] text-cb-ink-soft">件</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
