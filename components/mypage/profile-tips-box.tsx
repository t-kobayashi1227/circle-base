import { MaterialSymbol } from "@/components/icons/material-symbol";

export function ProfileTipsBox() {
  return (
    <div className="mx-4 hidden rounded-[11px] border border-[#F2E6D2] bg-[#FDF8F0] px-4 py-[18px] lg:block">
      <div className="flex justify-end">
        <MaterialSymbol name="send" filled size={30} className="text-cb-accent" />
      </div>
      <div className="mt-3 text-[12.5px] font-bold text-[#3B352C]">つながりがもっと広がる！</div>
      <div className="mt-2 text-[10.5px] leading-[1.8] text-cb-muted-2">
        プロフィールを充実させると、共通の趣味を持つ仲間から見つけてもらいやすくなります。
      </div>
      <button
        type="button"
        className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#F0D9AF] bg-white py-2.5 text-[11.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
      >
        プロフィールのコツを見る
        <MaterialSymbol name="chevron_right" size={15} />
      </button>
    </div>
  );
}
