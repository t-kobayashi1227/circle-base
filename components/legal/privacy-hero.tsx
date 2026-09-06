import { PhotoPlaceholder } from "@/components/photo-placeholder";

// デスクトップは見出しを画像に重ねるが、モバイルは画像の下に見出しを分離して配置する
// （デザイン上、他の法務系ページ（利用規約など）とはモバイルのレイアウトが異なる）。
export function PrivacyHero({ title, description }: { title: string; description: string }) {
  return (
    <>
      {/* デスクトップ */}
      <div className="relative mx-7 mt-3.5 hidden h-[180px] overflow-hidden rounded-xl lg:block">
        <PhotoPlaceholder caption="萬代橋と新潟市のビル群の写真" iconSize={20} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg,rgba(20,16,10,.34) 0%,rgba(20,16,10,.06) 50%,rgba(20,16,10,0) 78%)" }}
        />
        <div className="pointer-events-none absolute bottom-5 left-7">
          <h1 className="m-0 font-heading text-[30px] font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,.3)]">
            {title}
          </h1>
          <p className="mt-2.5 whitespace-pre-line text-[12.5px] leading-[1.8] text-white/94 [text-shadow:0_1px_8px_rgba(0,0,0,.3)]">
            {description}
          </p>
        </div>
        <div className="pointer-events-none absolute right-8 top-5 text-right font-heading text-sm font-bold leading-[1.6] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.35)]">
          好きなことで
          <br />
          つながる、
          <br />
          新しい新潟の毎日
        </div>
      </div>

      {/* モバイル: 画像と見出しを分離 */}
      <div className="relative mt-2.5 h-[170px] lg:hidden">
        <PhotoPlaceholder caption="萬代橋と新潟市のビル群の写真" iconSize={17} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg,rgba(20,16,10,.06) 0%,rgba(20,16,10,.34) 100%)" }}
        />
        <div className="pointer-events-none absolute right-4 top-3.5 text-right font-heading text-[11.5px] font-bold leading-[1.6] text-white [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
          好きなことで
          <br />
          つながる、
          <br />
          新しい新潟の毎日
        </div>
      </div>
      <div className="px-[18px] pt-4 lg:hidden">
        <h1 className="m-0 font-heading text-2xl font-bold text-[#2F2B24]">{title}</h1>
        <p className="mt-[11px] whitespace-pre-line text-xs leading-[1.8] text-[#544C41]">{description}</p>
      </div>
    </>
  );
}
