import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { AreaRow } from "@/lib/circles";

export function AreaAboutCard({ area }: { area: AreaRow }) {
  return (
    <div className="overflow-hidden rounded-xl border border-cb-border bg-white">
      <div className="h-[104px]">
        <PhotoPlaceholder caption={`${area.name}の施設の写真`} iconSize={17} />
      </div>
      <div className="px-4 py-4">
        <div className="font-heading text-[13.5px] font-bold text-cb-ink">{area.name}について</div>
        <p className="mt-2.5 text-[10.5px] leading-[1.85] text-cb-muted-2">
          {area.name}を拠点に活動するサークルが集まるエリアです。スポーツ、アウトドア、趣味の集まりなど、地域に密着したサークル活動が盛んに行われています。
        </p>
      </div>
    </div>
  );
}
