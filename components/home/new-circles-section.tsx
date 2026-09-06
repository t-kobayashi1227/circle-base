import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { newCircles } from "@/lib/home-mock-data";
import { CircleCard } from "./circle-card";

export function NewCirclesSection() {
  const spCircles = newCircles.slice(0, 3);

  return (
    <section className="px-3.5 pt-6 lg:px-[46px] lg:pt-8">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-[15px] font-bold text-cb-ink lg:text-[19px]">
          <MaterialSymbol name="fiber_new" filled size={18} className="text-cb-accent lg:hidden" />
          <MaterialSymbol name="fiber_new" filled size={21} className="hidden text-cb-accent lg:inline-block" />
          新着サークル
        </h2>
        <Link href="/circles" className="flex items-center gap-0.5 text-[11px] text-cb-muted-2 lg:text-xs">
          すべて見る
          <MaterialSymbol name="chevron_right" size={15} />
        </Link>
      </div>

      {/* モバイル: 横スクロール（3件） */}
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1.5 lg:hidden">
        {spCircles.map((circle) => (
          <CircleCard key={circle.slug} circle={circle} className="w-[158px] shrink-0" />
        ))}
      </div>

      {/* デスクトップ: グリッド（6件） */}
      <div className="mt-4 hidden grid-cols-6 gap-3.5 lg:grid">
        {newCircles.map((circle) => (
          <CircleCard key={circle.slug} circle={circle} showMeta2 />
        ))}
      </div>
    </section>
  );
}
