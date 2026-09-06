import { MaterialSymbol } from "@/components/icons/material-symbol";

export function DateRangeFilter() {
  return (
    <button
      type="button"
      className="flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-[9px] border border-cb-border bg-cb-surface px-4 py-3 text-[12.5px] text-cb-ink lg:justify-start"
    >
      <MaterialSymbol name="refresh" size={17} className="text-cb-placeholder" />
      2024/05/01 - 2024/05/31
      <MaterialSymbol name="calendar_month" size={17} className="text-cb-muted-3" />
    </button>
  );
}
