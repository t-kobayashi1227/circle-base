import { MaterialSymbol } from "@/components/icons/material-symbol";
import { aboutStats } from "@/lib/about-mock-data";

export function AboutStats() {
  return (
    <section className="mx-[18px] mt-[26px] rounded-2xl bg-[#FDF6EA] px-[18px] pb-[22px] pt-5 lg:mx-7 lg:mt-11 lg:px-[30px] lg:pb-[30px] lg:pt-[26px]">
      <div className="text-center">
        <h2 className="m-0 inline-flex flex-col items-center gap-2 font-heading text-[15px] font-bold text-[#2F2B24] lg:gap-2.5 lg:text-[18px]">
          数字で見る にいがたサークルベース
          <span className="h-[3px] w-8 rounded-sm bg-cb-accent lg:w-9" />
        </h2>
      </div>

      <div className="mt-[18px] grid grid-cols-2 gap-x-3 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-5">
        {aboutStats.map((s) => (
          <div key={s.label} className="flex min-w-0 items-center gap-2.5 lg:gap-[13px]">
            <MaterialSymbol name={s.icon} filled size={24} className="shrink-0 text-cb-accent lg:text-[30px]" />
            <div className="min-w-0">
              <div className="whitespace-nowrap font-heading text-lg font-bold text-[#2F2B24] lg:text-[23px]">
                {s.value}
              </div>
              <div className="mt-[3px] whitespace-nowrap text-[10px] text-cb-muted-2 lg:mt-1 lg:text-[11px]">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3.5 text-right text-[9.5px] text-cb-placeholder lg:mt-4 lg:text-[10px]">
        ※ 2024年アンケート調査より
      </div>
    </section>
  );
}
