import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { CategoryInfo } from "@/lib/category-mock-data";

export function CategoryHero({ category }: { category: CategoryInfo }) {
  return (
    <>
      {/* デスクトップ: ヒーロー画像にパンくず・見出しを重ねる */}
      <div className="relative hidden h-[236px] lg:block">
        <PhotoPlaceholder caption={`${category.label}を楽しむ人々の写真`} iconSize={22} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg,rgba(20,16,10,.5) 0%,rgba(20,16,10,.18) 55%,rgba(20,16,10,0) 78%)" }}
        />
        <div className="pointer-events-none absolute left-7 top-4 flex items-center gap-1.5 text-[11.5px] text-white/92">
          <Link href="/" className="pointer-events-auto text-white/92 hover:text-white">
            ホーム
          </Link>
          <MaterialSymbol name="chevron_right" size={14} />
          <Link href="/circles" className="pointer-events-auto text-white/92 hover:text-white">
            カテゴリから探す
          </Link>
          <MaterialSymbol name="chevron_right" size={14} />
          <span className="font-medium text-white">{category.label}</span>
        </div>
        <div className="pointer-events-none absolute bottom-6 left-7">
          <h1 className="m-0 font-heading text-[34px] font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,.3)]">
            {category.label}
          </h1>
          <p className="mt-[11px] whitespace-pre-line text-[12.5px] leading-[1.8] text-white/92 [text-shadow:0_1px_8px_rgba(0,0,0,.3)]">
            {category.heroDesc}
          </p>
        </div>
        <div className="pointer-events-none absolute right-9 top-[26px] whitespace-pre-line text-right font-heading text-[15px] font-bold leading-[1.6] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.35)]">
          {category.tagline}
        </div>
      </div>

      {/* モバイル: ヒーロー画像＋パンくずは画像の下（見出しと重ならないようアイコンは上寄せ） */}
      <div className="relative h-[184px] lg:hidden">
        <div className="flex h-full w-full items-start justify-center bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3] pt-7">
          <MaterialSymbol name="photo_camera" size={20} className="text-[#8E6A2E]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg,rgba(20,16,10,.08) 0%,rgba(20,16,10,.55) 100%)" }}
        />
        <div className="pointer-events-none absolute right-4 top-3.5 whitespace-pre-line text-right font-heading text-xs font-bold leading-[1.6] text-white [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
          {category.tagline}
        </div>
        <div className="pointer-events-none absolute bottom-4 left-[18px]">
          <h1 className="m-0 font-heading text-2xl font-bold text-white [text-shadow:0_2px_10px_rgba(0,0,0,.35)]">
            {category.label}
          </h1>
          <p className="mt-2 whitespace-pre-line text-[11px] leading-[1.7] text-white/92 [text-shadow:0_1px_6px_rgba(0,0,0,.3)]">
            {category.heroDesc}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-[18px] py-2.5 text-[10.5px] text-cb-muted-3 lg:hidden">
        <Link href="/" className="text-cb-muted-3 hover:text-cb-accent">
          ホーム
        </Link>
        <MaterialSymbol name="chevron_right" size={13} />
        <Link href="/circles" className="text-cb-muted-3 hover:text-cb-accent">
          カテゴリから探す
        </Link>
        <MaterialSymbol name="chevron_right" size={13} />
        <span className="font-medium text-cb-ink-soft">{category.label}</span>
      </div>
    </>
  );
}
