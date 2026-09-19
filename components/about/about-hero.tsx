import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative h-[230px] w-full overflow-hidden lg:h-[320px]">
      <Image
        src="/images/about-top.png"
        alt="萬代橋を眺める4人組の後ろ姿の写真"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative isolate flex h-full max-w-[420px] flex-col justify-center px-[18px] lg:max-w-[560px] lg:px-[46px]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/75 to-white/10" />
        <h1 className="font-heading text-[21px] font-bold leading-[1.5] text-[#2F2B24] lg:text-[32px]">
          好きなことでつながる、
          <br />
          新潟の毎日をもっと楽しく。
        </h1>
        <p className="mt-[13px] text-[11.5px] leading-[1.85] text-[#544C41] lg:mt-[18px] lg:text-[13px] lg:leading-[1.95]">
          にいがたサークルベースは、新潟で活動するサークル・イベント・趣味の仲間を見つけられる地域密着型のコミュニティサイトです。
        </p>
      </div>

      <div className="pointer-events-none absolute right-4 top-4 text-right font-heading text-[11px] font-bold leading-[1.7] text-white [text-shadow:0_1px_6px_rgba(0,0,0,.35)] lg:right-9 lg:top-6 lg:text-sm">
        つながる。
        <br />
        ひろがる。
        <br />
        新しい新潟の楽しみ方。
      </div>
    </section>
  );
}
