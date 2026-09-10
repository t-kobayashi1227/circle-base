import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function NoticesHero() {
  return (
    <>
      {/* デスクトップ */}
      <div className="relative mx-7 mt-3.5 hidden h-[180px] overflow-hidden rounded-xl lg:block">
        <PhotoPlaceholder caption="信濃川と萬代橋、新潟市街のイラスト" iconSize={20} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg,rgba(20,16,10,.34) 0%,rgba(20,16,10,.06) 50%,rgba(20,16,10,0) 78%)" }}
        />
        <div className="pointer-events-none absolute bottom-5 left-7">
          <h1 className="m-0 font-heading text-[30px] font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,.3)]">
            お知らせ
          </h1>
          <div className="mt-2 font-heading text-[13px] font-bold tracking-[.08em] text-cb-accent [text-shadow:0_1px_8px_rgba(0,0,0,.3)]">
            NEWS
          </div>
        </div>
        <div className="pointer-events-none absolute right-8 top-5 text-right font-heading text-sm font-bold leading-[1.6] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.35)]">
          好きなことで
          <br />
          つながる、
          <br />
          新潟の毎日
        </div>
      </div>

      {/* モバイル */}
      <div className="relative h-[172px] lg:hidden">
        <PhotoPlaceholder caption="信濃川と萬代橋、新潟市街のイラスト" iconSize={19} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg,rgba(20,16,10,.06) 0%,rgba(20,16,10,.55) 100%)" }}
        />
        <div className="pointer-events-none absolute right-4 top-3.5 text-right font-heading text-[11.5px] font-bold leading-[1.6] text-white [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
          好きなことで
          <br />
          つながる、
          <br />
          新潟の毎日
        </div>
        <div className="pointer-events-none absolute bottom-3.5 left-5">
          <h1 className="m-0 font-heading text-2xl font-bold text-white [text-shadow:0_2px_10px_rgba(0,0,0,.35)]">
            お知らせ
          </h1>
          <div className="mt-1.5 font-heading text-[11px] font-bold tracking-[.08em] text-cb-accent [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
            NEWS
          </div>
        </div>
      </div>
    </>
  );
}
