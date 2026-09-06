import { MaterialSymbol } from "@/components/icons/material-symbol";

export function CircleEditTipsBox() {
  return (
    <div className="mx-4 hidden rounded-[11px] border border-[#F2E6D2] bg-[#FDF8F0] px-4 py-[18px] lg:block">
      <div className="flex items-center gap-2.5">
        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#FBE6C6]">
          <MaterialSymbol name="tips_and_updates" filled size={16} className="text-cb-accent" />
        </span>
        <span className="text-[12.5px] font-bold text-[#3B352C]">サークル編集のポイント</span>
      </div>
      <div className="mt-2.5 text-[10.5px] leading-[1.85] text-cb-muted-2">
        サークルの魅力が伝わるように、写真や紹介文を工夫してみましょう！定期的に情報を更新すると、新しいメンバーが見つかりやすくなります。
      </div>
      <button
        type="button"
        className="mt-3.5 flex w-full items-center justify-between rounded-lg border border-[#E0D6C6] bg-white px-3.5 py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        詳細を見る
        <MaterialSymbol name="chevron_right" size={15} className="text-cb-placeholder" />
      </button>
    </div>
  );
}
