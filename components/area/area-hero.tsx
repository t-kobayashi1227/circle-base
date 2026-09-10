import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { AreaRow } from "@/lib/circles";

export function AreaHero({ area }: { area: AreaRow }) {
  return (
    <>
      {/* デスクトップ */}
      <div className="relative mx-7 mt-3 hidden h-[210px] overflow-hidden rounded-xl lg:block">
        <PhotoPlaceholder caption={`${area.name}の街並みの写真`} iconSize={20} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg,rgba(20,16,10,.42) 0%,rgba(20,16,10,.1) 55%,rgba(20,16,10,0) 78%)" }}
        />
        <div className="pointer-events-none absolute bottom-[22px] left-7">
          <h1 className="m-0 font-heading text-[32px] font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,.3)]">
            {area.name}
          </h1>
          <p className="mt-2.5 text-[12.5px] leading-[1.8] text-white/92 [text-shadow:0_1px_8px_rgba(0,0,0,.3)]">
            {area.name}で活動するサークルを集めました。
            <br />
            スポーツ・趣味・イベントなど、好きなことでつながる仲間が見つかります。
          </p>
        </div>
        <div className="pointer-events-none absolute right-8 top-[22px] text-right font-heading text-[14.5px] font-bold leading-[1.6] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.35)]">
          好きなことで
          <br />
          つながる、
          <br />
          新しい新潟の毎日
        </div>
      </div>

      {/* モバイル */}
      <div className="relative h-[184px] lg:hidden">
        <PhotoPlaceholder caption={`${area.name}の街並みの写真`} iconSize={19} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg,rgba(20,16,10,.06) 0%,rgba(20,16,10,.55) 100%)" }}
        />
        <div className="pointer-events-none absolute right-4 top-3.5 text-right font-heading text-xs font-bold leading-[1.6] text-white [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
          好きなことで
          <br />
          つながる、
          <br />
          新しい新潟の毎日
        </div>
        <div className="pointer-events-none absolute bottom-4 left-[18px]">
          <h1 className="m-0 font-heading text-2xl font-bold text-white [text-shadow:0_2px_10px_rgba(0,0,0,.35)]">
            {area.name}
          </h1>
          <p className="mt-2 text-[11px] leading-[1.7] text-white/92 [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
            {area.name}で活動するサークルを集めました。
            <br />
            好きなことでつながる仲間が見つかります。
          </p>
        </div>
      </div>
    </>
  );
}
