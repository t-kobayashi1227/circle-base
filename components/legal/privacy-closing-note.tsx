import { PhotoPlaceholder } from "@/components/photo-placeholder";

// デザインではデスクトップ表示に含まれないため、モバイルのみ表示する
// （デスクトップは共通の LegalSkylineBanner を使用）。
export function PrivacyClosingNote() {
  return (
    <div className="my-[22px] flex items-center justify-center gap-3.5 lg:hidden">
      <div className="h-16 w-[70px] overflow-hidden rounded-lg">
        <PhotoPlaceholder caption="観葉植物のイラスト" iconSize={12} />
      </div>
      <span className="-rotate-2 font-heading text-[13.5px] font-bold leading-[1.7] text-[#4F6B54]">
        みんなが安心して
        <br />
        つながれる場所に。
      </span>
    </div>
  );
}
