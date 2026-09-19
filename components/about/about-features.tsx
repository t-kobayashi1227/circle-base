import Image from "next/image";
import { aboutFeatures } from "@/lib/about-mock-data";

export function AboutFeatures() {
  return (
    <section className="px-[18px] pt-[26px] text-center lg:px-7 lg:pt-11">
      <h2 className="m-0 font-heading text-[19px] font-bold text-[#2F2B24] lg:text-[23px]">
        にいがたサークルベースでできること
      </h2>
      <p className="mt-2.5 text-[11.5px] leading-[1.7] text-cb-muted-2 lg:mt-[11px] lg:text-[12.5px] lg:leading-normal">
        趣味を通じて、新しい出会いや体験がきっと見つかります。
      </p>

      {/* デスクトップ: 4列カード（イラスト付き） */}
      <div className="mt-6 hidden grid-cols-4 gap-4 text-left lg:grid">
        {aboutFeatures.map((f) => (
          <div
            key={f.title}
            className="min-w-0 overflow-hidden rounded-xl border border-cb-border bg-cb-surface pb-6"
          >
            <div className="h-[140px] w-full overflow-hidden">
              <Image
                src={f.image}
                alt={f.title}
                width={320}
                height={140}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="px-5 pt-3.5">
              <div className="font-heading text-[15px] font-bold text-[#2F2B24]">{f.title}</div>
              <div className="mt-2.5 text-[11.5px] leading-[1.8] text-[#6E6558]">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* モバイル: 縦積みリスト（画像付き） */}
      <div className="mt-5 flex flex-col gap-3 text-left lg:hidden">
        {aboutFeatures.map((f) => (
          <div
            key={f.title}
            className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3.5 rounded-xl border border-cb-border bg-cb-surface p-4"
          >
            <div className="h-[72px] w-[72px] overflow-hidden rounded-lg">
              <Image src={f.image} alt={f.title} width={72} height={72} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="font-heading text-[14.5px] font-bold text-[#2F2B24]">{f.title}</div>
              <div className="mt-[7px] text-[11px] leading-[1.75] text-[#6E6558]">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
