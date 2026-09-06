import { MaterialSymbol } from "@/components/icons/material-symbol";

// アップロード予定の実写真が用意されるまでの差し替え可能なプレースホルダー。
// 実装時は next/image に置き換える想定。
export function PhotoPlaceholder({
  caption,
  className = "",
  iconSize = 24,
}: {
  caption: string;
  className?: string;
  iconSize?: number;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3] ${className}`}
    >
      <div className="flex flex-col items-center gap-1.5 px-2 text-center text-[#8E6A2E]">
        <MaterialSymbol name="photo_camera" size={iconSize} />
        <span className="text-[10px] leading-snug">{caption}</span>
      </div>
    </div>
  );
}
