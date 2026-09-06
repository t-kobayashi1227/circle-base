import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { activeThread } from "@/lib/messages-mock-data";

export function ChatHeader() {
  return (
    <div className="border-b border-cb-border bg-white">
      {/* デスクトップ */}
      <div className="hidden items-center gap-3.5 px-5 py-3.5 lg:flex">
        <div className="h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full">
          <PhotoPlaceholder caption="サークルの写真" iconSize={14} />
        </div>
        <div className="min-w-0">
          <div className="whitespace-nowrap font-heading text-base font-bold text-[#2F2B24]">
            {activeThread.name}
          </div>
          <div className="mt-1.5 text-[11px] text-cb-muted-3">{activeThread.meta}</div>
        </div>
        <div className="flex-1" />
        <div className="flex shrink-0 items-center gap-3.5 text-cb-muted-3">
          <button type="button" aria-label="お気に入り">
            <MaterialSymbol name="star_border" size={20} />
          </button>
          <button type="button" aria-label="サークル情報">
            <MaterialSymbol name="info" size={20} />
          </button>
          <button type="button" aria-label="その他のメニュー">
            <MaterialSymbol name="more_horiz" filled size={20} className="text-[#3B352C]" />
          </button>
        </div>
      </div>

      {/* モバイル */}
      <div className="grid grid-cols-[auto_42px_minmax(0,1fr)_auto] items-center gap-[11px] px-4 py-2 lg:hidden">
        <Link href="/mypage/messages" aria-label="戻る">
          <MaterialSymbol name="arrow_back_ios_new" size={24} className="text-[#3B352C]" />
        </Link>
        <div className="h-[42px] w-[42px] overflow-hidden rounded-full">
          <PhotoPlaceholder caption="サークルの写真" iconSize={12} />
        </div>
        <div className="min-w-0 font-heading text-[14.5px] font-bold leading-[1.45] text-[#2F2B24]">
          {activeThread.circleName}
          <br />
          （山田さん）
        </div>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="お気に入り">
            <MaterialSymbol name="star" filled size={21} className="text-cb-accent" />
          </button>
          <button type="button" aria-label="その他のメニュー">
            <MaterialSymbol name="more_horiz" filled size={21} className="text-[#3B352C]" />
          </button>
        </div>
      </div>
    </div>
  );
}
