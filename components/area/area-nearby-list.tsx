import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { AreaRow } from "@/lib/circles";

export function AreaNearbyList({ areas, currentSlug }: { areas: AreaRow[]; currentSlug: string }) {
  const others = areas.filter((a) => a.slug !== currentSlug).slice(0, 4);
  if (others.length === 0) return null;

  return (
    <div className="rounded-xl border border-cb-border bg-white px-4 py-4">
      <div className="font-heading text-[13.5px] font-bold text-cb-ink">他のエリア</div>
      <div className="mt-1 flex flex-col">
        {others.map((area) => (
          <Link
            key={area.slug}
            href={`/area/${area.slug}`}
            className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-2.5 border-b border-[#F5EFE5] py-2.5 last:border-b-0 hover:bg-[#FDF9F3]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3]">
              <MaterialSymbol name="location_on" size={20} className="text-[#8E6A2E]" />
            </div>
            <span className="truncate text-xs font-bold text-[#2F2B24]">{area.name}</span>
          </Link>
        ))}
      </div>
      <Link
        href="/circles"
        className="mt-2.5 flex items-center justify-center rounded-lg border border-[#E0D6C6] bg-white py-2.5 text-[11px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        すべてのエリアから探す
      </Link>
    </div>
  );
}
