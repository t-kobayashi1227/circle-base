import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { AreaRow } from "@/lib/circles";

export function AreaMapCard({ area }: { area: AreaRow }) {
  return (
    <div className="rounded-xl border border-cb-border bg-cb-surface px-4 py-4">
      <div className="font-heading text-[12.5px] font-bold text-cb-ink">{area.name}の場所</div>
      <div className="relative mt-3 h-[110px] overflow-hidden rounded-lg">
        <PhotoPlaceholder caption={`${area.name}の地図`} iconSize={16} />
      </div>
      <Link
        href="/circles"
        className="mt-3 flex items-center justify-center rounded-lg border border-[#E0D6C6] bg-white py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        他のエリアから探す
      </Link>
    </div>
  );
}
