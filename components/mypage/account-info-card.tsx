import { MaterialSymbol } from "@/components/icons/material-symbol";
import { accountFields } from "@/lib/account-settings-mock-data";

export function AccountInfoCard() {
  return (
    <div className="rounded-xl border border-cb-border bg-cb-surface px-4 pb-1 pt-4 lg:px-6 lg:pb-1 lg:pt-[22px]">
      <div className="flex items-center gap-2">
        <MaterialSymbol name="person" filled size={19} className="text-cb-accent lg:text-[20px]" />
        <h2 className="font-heading text-[15px] font-bold text-cb-ink lg:text-base">アカウント情報</h2>
      </div>
      <div className="mt-1.5 hidden text-[11.5px] text-cb-muted-3 lg:block">基本的なアカウント情報を管理します。</div>

      <div className="mt-1.5 flex flex-col lg:mt-3.5">
        {accountFields.map((field, i) => (
          <div
            key={field.label}
            className={`py-3.5 lg:grid lg:grid-cols-[96px_minmax(0,1fr)_auto] lg:items-center lg:gap-3.5 lg:py-4 ${
              i < accountFields.length - 1 ? "border-b border-[#F5EFE5]" : ""
            }`}
          >
            {/* デスクトップ: 1行グリッド */}
            <span className="hidden whitespace-nowrap text-xs text-cb-muted-2 lg:inline">{field.label}</span>
            <span className="hidden min-w-0 truncate text-[13px] font-medium text-[#2F2B24] lg:inline">
              {field.value}
            </span>
            <button
              type="button"
              className="hidden shrink-0 rounded-[7px] border border-cb-accent bg-white px-4 py-2 text-xs font-bold text-cb-accent-dark hover:bg-cb-accent-soft lg:block"
            >
              変更
            </button>

            {/* モバイル: ラベル+値の縦積み、右に変更ボタン */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 lg:hidden">
              <div className="min-w-0">
                <div className="text-[11px] text-cb-muted-3">{field.label}</div>
                <div className="mt-1.5 whitespace-pre-line break-words text-[12.5px] font-medium text-[#2F2B24]">
                  {field.mvalue}
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-[7px] border border-cb-accent bg-white px-3.5 py-2 text-[11.5px] font-bold text-cb-accent-dark"
              >
                変更
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
