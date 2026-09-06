import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function AboutHero() {
  return (
    <>
      {/* デスクトップ */}
      <section className="hidden items-center gap-8 px-7 pt-[22px] lg:grid lg:grid-cols-[minmax(0,1fr)_620px]">
        <div className="min-w-0">
          <h1 className="m-0 font-heading text-[32px] font-bold leading-[1.5] text-[#2F2B24]">
            好きなことでつながる、
            <br />
            新潟の毎日をもっと楽しく。
          </h1>
          <p className="mt-[18px] text-[13px] leading-[1.95] text-[#544C41]">
            にいがたサークルベースは、新潟で活動するサークル・イベント・趣味の仲間を見つけられる地域密着型のコミュニティサイトです。
          </p>
        </div>
        <div className="relative h-[262px] overflow-hidden rounded-xl">
          <PhotoPlaceholder caption="萬代橋を眺める4人組の後ろ姿の写真" iconSize={22} />
          <div className="pointer-events-none absolute right-6 top-5 text-right font-heading text-sm font-bold leading-[1.7] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.35)]">
            つながる。
            <br />
            ひろがる。
            <br />
            新しい新潟の楽しみ方。
          </div>
        </div>
      </section>

      {/* モバイル */}
      <section className="bg-gradient-to-b from-[#EAF2F7] to-[#F5F8F3] px-[18px] pb-[22px] pt-5 lg:hidden">
        <h1 className="m-0 font-heading text-[23px] font-bold leading-[1.5] text-[#2F2B24]">
          好きなことでつながる、
          <br />
          新潟の毎日をもっと楽しく。
        </h1>
        <p className="mt-[13px] text-xs leading-[1.85] text-[#544C41]">
          にいがたサークルベースは、新潟で活動するサークル・イベント・趣味の仲間を見つけられる地域密着型のコミュニティサイトです。
        </p>
        <div className="relative mt-4 h-[150px] overflow-hidden rounded-xl">
          <PhotoPlaceholder caption="萬代橋を眺める4人組の後ろ姿の写真" iconSize={19} />
          <div className="pointer-events-none absolute right-3.5 top-3 text-right font-heading text-[11px] font-bold leading-[1.7] text-white [text-shadow:0_1px_6px_rgba(0,0,0,.35)]">
            つながる。
            <br />
            ひろがる。
            <br />
            新しい新潟の楽しみ方。
          </div>
        </div>
      </section>
    </>
  );
}
