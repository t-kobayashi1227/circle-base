import { PhotoPlaceholder } from "@/components/photo-placeholder";

// デザインではモバイル表示に含まれないため、デスクトップのみ表示する。
export function PrivacyPlantDecoration() {
  return (
    <div className="pointer-events-none absolute right-0 top-[70px] hidden h-[110px] w-[150px] overflow-hidden rounded-lg opacity-90 lg:block">
      <PhotoPlaceholder caption="観葉植物のイラスト" iconSize={16} />
    </div>
  );
}
