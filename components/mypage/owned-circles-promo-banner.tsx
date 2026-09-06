import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { promoChecks } from "@/lib/owned-circles-mock-data";

export function OwnedCirclesPromoBanner() {
  return (
    <div className="rounded-xl border border-[#F2E6D2] bg-[#FDF6EA] p-[18px] text-center lg:grid lg:grid-cols-[132px_minmax(0,1fr)_auto] lg:items-center lg:gap-5 lg:p-5 lg:text-left">
      <div className="hidden h-24 overflow-hidden rounded-[9px] lg:block">
        <PhotoPlaceholder caption="投稿をすすめるイラスト" iconSize={18} />
      </div>
      <div className="min-w-0">
        <div className="font-heading text-[15.5px] font-bold text-[#2F2B24] lg:text-[17px]">
          もっとサークルを盛り上げよう！
        </div>
        <div className="mt-[9px] text-[11.5px] leading-[1.8] text-cb-muted-2 lg:mt-2.5 lg:text-xs">
          定期的に活動の様子を投稿すると、新しいメンバーとの出会いが増えます。
        </div>
        <div className="mt-3.5 hidden gap-6 lg:flex">
          {promoChecks.map((check) => (
            <div key={check} className="flex items-center gap-2.5 whitespace-nowrap text-xs text-cb-ink-soft">
              <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded bg-cb-accent">
                <MaterialSymbol name="check" size={14} className="text-white" />
              </span>
              {check}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="mt-3.5 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[9px] bg-cb-accent text-[13px] font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover lg:mt-0 lg:w-auto lg:shrink-0 lg:px-6 lg:py-[15px] lg:text-[13.5px]"
      >
        活動の様子を投稿する
        <MaterialSymbol name="chevron_right" size={17} className="lg:text-[18px]" />
      </button>
    </div>
  );
}
