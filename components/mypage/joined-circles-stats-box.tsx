import { MaterialSymbol } from "@/components/icons/material-symbol";

export function JoinedCirclesStatsBox({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-3 rounded-[11px] border border-[#F2E6D2] bg-[#FDF8F0] px-4 py-[18px]">
      <MaterialSymbol name="group" filled size={22} className="shrink-0 text-cb-accent" />
      <div className="min-w-0">
        <div className="whitespace-nowrap text-[11px] text-cb-muted-2">現在の参加サークル数</div>
        <div className="mt-1.5 flex items-baseline gap-0.5 whitespace-nowrap font-heading text-[22px] font-bold text-[#2F2B24]">
          {count}
          <span className="text-xs font-medium">件</span>
        </div>
      </div>
    </div>
  );
}
