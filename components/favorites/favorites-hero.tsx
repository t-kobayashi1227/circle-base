import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function FavoritesHero() {
  return (
    <div className="relative h-[130px] lg:h-[150px]">
      <PhotoPlaceholder caption="新潟市街と川辺のイラスト（青空・紅葉の街並み）" iconSize={20} />
      <div className="pointer-events-none absolute left-[18px] top-5 lg:left-7 lg:top-[26px]">
        <h1 className="m-0 font-heading text-[25px] font-bold text-[#2F2B24] lg:text-[26px]">お気に入り</h1>
        <div className="mt-[7px] font-heading text-[11px] font-bold tracking-[.06em] text-cb-accent lg:text-[11.5px]">
          FAVORITES
        </div>
      </div>
      <div className="pointer-events-none absolute right-4 top-[18px] text-right font-heading text-[10.5px] font-bold leading-[1.5] text-[#2F2B24] lg:right-8 lg:top-[22px] lg:text-[12.5px] lg:leading-[1.6]">
        好きなことで
        <br />
        つながる、
        <br />
        新潟の毎日
      </div>
    </div>
  );
}
