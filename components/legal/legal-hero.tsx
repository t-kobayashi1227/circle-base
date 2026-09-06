import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function LegalHero({ title, description }: { title: string; description: string }) {
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

      {/* モバイル: 見出しと重ならないようアイコンは上寄せ */}
      <div className="relative h-[220px] lg:hidden">
        <div className="flex h-full w-full items-start justify-center bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3] pt-8">
          <MaterialSymbol name="photo_camera" size={20} className="text-[#8E6A2E]" />
        </div>
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
          <p className="mt-2 whitespace-pre-line text-[11px] leading-[1.75] text-white/94 [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}
