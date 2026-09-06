import { MaterialSymbol } from "@/components/icons/material-symbol";
import { activeFilterChips } from "@/lib/circles-list-mock-data";

export function ActiveFilterChips() {
  return (
    <div className="mt-3.5 hidden items-center gap-2.5 text-[11.5px] text-cb-muted-2 lg:flex">
      <span>選択中の条件：</span>
      {activeFilterChips.map((chip) => (
        <button
          key={chip}
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-[#E6DCCB] bg-cb-surface px-[11px] py-1.5 text-[11.5px] text-cb-ink-soft hover:border-cb-accent"
        >
          {chip}
          <MaterialSymbol name="close" size={14} className="text-cb-placeholder" />
        </button>
      ))}
      <button type="button" className="text-[11.5px] text-cb-accent-dark hover:text-[#8E5606]">
        すべてクリア
      </button>
    </div>
  );
}
