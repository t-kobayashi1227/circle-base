import { MaterialSymbol } from "@/components/icons/material-symbol";

export function OwnedCirclesToolbar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="whitespace-nowrap font-heading text-sm font-bold text-cb-ink lg:text-[17px]">
        主催中のサークル一覧
      </h2>
      <button
        type="button"
        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-cb-input-border bg-white px-3 py-2.5 text-[11.5px] text-cb-ink lg:gap-2 lg:px-[15px] lg:py-[11px] lg:text-xs"
      >
        <span className="hidden lg:inline">並び替え：新しい順</span>
        <span className="lg:hidden">新しい順</span>
        <MaterialSymbol name="expand_more" size={17} className="text-cb-placeholder lg:text-[18px]" />
      </button>
    </div>
  );
}
