import { MaterialSymbol } from "@/components/icons/material-symbol";

export function CircleDeleteButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E7B3AA] bg-white px-[18px] py-[11px] text-[12.5px] font-bold text-[#D9534F] hover:bg-[#FDECEA] ${className}`}
    >
      <MaterialSymbol name="delete" size={17} />
      サークルを削除する
    </button>
  );
}
