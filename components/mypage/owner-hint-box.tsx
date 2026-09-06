import { MaterialSymbol } from "@/components/icons/material-symbol";

export function OwnerHintBox() {
  return (
    <div className="mx-4 hidden rounded-[11px] border border-[#F2E6D2] bg-[#FDF8F0] px-4 py-[18px] lg:block">
      <div className="flex items-center gap-2.5">
        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#FBE6C6]">
          <MaterialSymbol name="star" filled size={16} className="text-cb-accent" />
        </span>
        <span className="text-[12.5px] font-bold text-[#3B352C]">主催者のヒント</span>
      </div>
      <div className="mt-2.5 text-[10.5px] leading-[1.85] text-cb-muted-2">
        サークルの魅力を伝える写真や活動の様子を定期的に投稿して、新しい仲間を増やしましょう！
      </div>
      <button
        type="button"
        className="mt-3.5 flex w-full items-center justify-between rounded-lg border border-[#E0D6C6] bg-white px-3.5 py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        詳しく見る
        <MaterialSymbol name="chevron_right" size={15} className="text-cb-placeholder" />
      </button>
    </div>
  );
}
