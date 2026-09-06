import { MaterialSymbol } from "@/components/icons/material-symbol";
import { freqFilterOptions, timeSlotFilterOptions } from "@/lib/circles-list-mock-data";

function SelectField({ value }: { value: string }) {
  return (
    <div className="mt-2.5 flex items-center justify-between rounded-lg border border-cb-input-border px-[13px] py-3 text-xs text-cb-ink">
      {value}
      <MaterialSymbol name="expand_more" size={18} className="text-cb-placeholder" />
    </div>
  );
}

export function FilterSidebar() {
  return (
    <div className="hidden lg:block">
      <div className="rounded-xl border border-cb-border bg-cb-surface px-5 py-5 pb-[22px]">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-cb-ink">絞り込み</h2>
          <button
            type="button"
            className="flex items-center gap-1 rounded-2xl border border-[#E6DCCB] px-[11px] py-1.5 text-[10.5px] text-cb-muted-2 hover:border-cb-accent hover:text-cb-accent-dark"
          >
            <MaterialSymbol name="refresh" size={14} />
            条件をリセット
          </button>
        </div>

        <div className="mt-[18px] text-[12.5px] font-bold text-[#3B352C]">エリア（区）</div>
        <SelectField value="中央区" />
        <label className="mt-3 flex items-center gap-2.5 text-xs text-cb-ink-soft">
          <input type="checkbox" className="h-4 w-4 rounded border-[1.5px] border-[#C9BFAD] text-cb-accent" />
          市内全域を含む
        </label>

        <div className="mt-5 text-[12.5px] font-bold text-[#3B352C]">カテゴリ</div>
        <SelectField value="登山・ハイキング" />

        <div className="mt-5 text-[12.5px] font-bold text-[#3B352C]">活動頻度</div>
        <div className="mt-3 flex flex-col gap-3">
          {freqFilterOptions.map((freq) => (
            <label key={freq} className="flex items-center gap-2.5 text-xs text-cb-ink-soft">
              <input type="checkbox" className="h-4 w-4 rounded border-[1.5px] border-[#C9BFAD] text-cb-accent" />
              {freq}
            </label>
          ))}
        </div>

        <div className="mt-5 text-[12.5px] font-bold text-[#3B352C]">活動時間帯</div>
        <div className="mt-3 flex flex-col gap-3">
          {timeSlotFilterOptions.map((slot) => (
            <label key={slot.label} className="flex items-center gap-2.5 text-xs text-cb-ink-soft">
              <input
                type="checkbox"
                defaultChecked={slot.defaultChecked}
                className="h-4 w-4 rounded border-[1.5px] border-[#C9BFAD] text-cb-accent"
              />
              {slot.label}
            </label>
          ))}
        </div>

        <button
          type="button"
          className="mt-[22px] w-full rounded-lg border border-[#F0D9AF] bg-cb-accent-soft py-[13px] text-center text-[12.5px] font-bold text-cb-accent-dark hover:bg-[#FBEFDD]"
        >
          この条件で検索する
        </button>
      </div>
    </div>
  );
}
