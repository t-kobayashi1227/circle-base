import Image from "next/image";

// デザインではモバイル表示に含まれないため、デスクトップのみ表示する。
export function LegalSkylineBanner() {
  return (
    <div className="relative mt-9 hidden h-[112px] overflow-hidden lg:block">
      <Image
        src="/images/footer-back.png"
        alt="緑の丘と新潟市街のイラスト帯"
        fill
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <div className="pointer-events-none absolute inset-0 bg-white/25 backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-heading text-[15px] font-bold text-white [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
          好きなことでつながる、新しい新潟の毎日
        </span>
      </div>
    </div>
  );
}
