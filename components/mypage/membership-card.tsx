export function MembershipCard() {
  return (
    <div className="hidden rounded-xl border border-cb-border bg-cb-surface px-[18px] py-4 lg:block">
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-bold text-cb-ink">会員ステータス</div>
        <span className="rounded border border-[#C9E3D4] bg-[#EEF7F1] px-[9px] py-1 text-[10px] font-medium text-[#3E8E68]">
          一般会員
        </span>
      </div>
      <div className="mt-[11px] text-[10.5px] leading-[1.8] text-cb-muted-2">
        メッセージのやり取りやイベント参加ができるプランです。
      </div>
      <button
        type="button"
        className="mt-3.5 flex w-full items-center justify-center rounded-lg border border-[#E0D6C6] py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        プランを確認する
      </button>
    </div>
  );
}
