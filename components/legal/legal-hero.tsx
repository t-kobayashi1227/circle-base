import Image from "next/image";

export function LegalHero({
  title,
  description,
  kicker,
}: {
  title: string;
  description?: string;
  kicker?: string;
}) {
  return (
    <>
      {/* デスクトップ */}
      <div className="relative mx-7 mt-3.5 hidden h-[180px] overflow-hidden rounded-xl lg:block">
        <Image
          src="/images/about-top.png"
          alt="萬代橋を眺める4人組の後ろ姿の写真"
          fill
          priority
          sizes="(min-width: 1024px) calc(100vw - 56px)"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg,rgba(20,16,10,.34) 0%,rgba(20,16,10,.06) 50%,rgba(20,16,10,0) 78%)" }}
        />
        <div className="pointer-events-none absolute bottom-5 left-7">
          <h1 className="m-0 font-heading text-[30px] font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,.3)]">
            {title}
          </h1>
          {kicker && (
            <div className="mt-2 font-heading text-sm font-bold tracking-[0.06em] text-cb-accent [text-shadow:0_1px_8px_rgba(0,0,0,.3)]">
              {kicker}
            </div>
          )}
          {description && (
            <p className="mt-2.5 whitespace-pre-line text-[12.5px] leading-[1.8] text-white/94 [text-shadow:0_1px_8px_rgba(0,0,0,.3)]">
              {description}
            </p>
          )}
        </div>
        <div className="pointer-events-none absolute right-8 top-5 text-right font-heading text-sm font-bold leading-[1.6] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.35)]">
          好きなことで
          <br />
          つながる、
          <br />
          新しい新潟の毎日
        </div>
      </div>

      {/* モバイル: 見出しと重ならないようアイコンは上寄せ */}
      <div className="relative h-[220px] lg:hidden">
        <Image
          src="/images/about-top.png"
          alt="萬代橋を眺める4人組の後ろ姿の写真"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg,rgba(20,16,10,.08) 0%,rgba(20,16,10,.6) 100%)" }}
        />
        <div className="pointer-events-none absolute right-4 top-3.5 text-right font-heading text-[11.5px] font-bold leading-[1.6] text-white [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
          好きなことで
          <br />
          つながる、
          <br />
          新しい新潟の毎日
        </div>
        <div className="pointer-events-none absolute bottom-4 left-[18px]">
          <h1 className="m-0 font-heading text-2xl font-bold text-white [text-shadow:0_2px_10px_rgba(0,0,0,.35)]">
            {title}
          </h1>
          {kicker && (
            <div className="mt-1.5 font-heading text-[11px] font-bold tracking-[0.06em] text-cb-accent [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
              {kicker}
            </div>
          )}
          {description && (
            <p className="mt-2 whitespace-pre-line text-[11px] leading-[1.75] text-white/94 [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
