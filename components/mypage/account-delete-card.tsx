import { MaterialSymbol } from "@/components/icons/material-symbol";
import { deleteWarnings } from "@/lib/account-settings-mock-data";

// デザインではモバイル表示に含まれないため、デスクトップのみ表示する。
export function AccountDeleteCard() {
  return (
    <div className="hidden rounded-xl border border-cb-border bg-cb-surface px-6 pb-6 pt-[22px] lg:block">
      <div className="flex items-center gap-2">
        <MaterialSymbol name="warning" size={20} className="text-[#D9534F]" />
        <h2 className="font-heading text-base font-bold text-cb-ink">アカウントの削除</h2>
      </div>
      <div className="mt-1.5 text-[11.5px] text-cb-muted-3">
        アカウントを削除すると、すべてのデータが削除されます。
      </div>

      <div className="mt-4 flex flex-col gap-2.5 rounded-[9px] bg-cb-bg px-[18px] py-4">
        {deleteWarnings.map((warning) => (
          <div key={warning} className="flex items-start gap-2.5 text-[11.5px] leading-[1.6] text-cb-ink-soft">
            <span className="mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full bg-cb-muted-3" />
            {warning}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center rounded-lg border border-[#D9534F] bg-white py-3.5 text-[13.5px] font-bold text-[#D9534F] hover:bg-[#FDECEA]"
      >
        アカウントを削除する
      </button>
    </div>
  );
}
