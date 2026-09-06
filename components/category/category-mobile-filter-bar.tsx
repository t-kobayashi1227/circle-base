import { MaterialSymbol } from "@/components/icons/material-symbol";

export function CategoryMobileFilterBar() {
  return (
    <button
      type="button"
      className="mx-[18px] mt-3.5 flex items-center gap-2.5 rounded-lg border border-cb-input-border bg-white px-3.5 py-3 text-xs text-cb-placeholder lg:hidden"
    >
      <MaterialSymbol name="search" size={18} className="text-cb-placeholder" />
      エリア・開催頻度で絞り込む
      <span className="flex-1" />
      <MaterialSymbol name="tune" size={19} className="text-cb-muted-3" />
    </button>
  );
}
