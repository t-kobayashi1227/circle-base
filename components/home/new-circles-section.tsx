import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { getLatestCircles } from "@/lib/circles";
import { CircleCard } from "./circle-card";

export async function NewCirclesSection() {
  const circles = await getLatestCircles(6);

  if (circles.length === 0) return null;

  const spCircles = circles.slice(0, 3);

  return (
    <section className="px-3.5 pt-6 lg:px-[46px] lg:pt-8">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-[15px] font-bold text-cb-ink lg:text-[19px]">
          <MaterialSymbol name="fiber_new" filled size={18} className="text-cb-accent lg:hidden" />
          <MaterialSymbol name="fiber_new" filled size={21} className="hidden text-cb-accent lg:inline-block" />
          新着サークル
        </h2>
        <Link href="/circles" className="flex items-center gap-0.5 text-[11px] lg:text-xs">
          すべて見る
          <MaterialSymbol name="chevron_right" size={15} />
        </Link>
      </div>

      {/* モバイル: 横スクロール（3件） */}
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1.5 lg:hidden">
        {spCircles.map((circle) => (
          <CircleCard key={circle.id} circle={circle} className="w-[158px] shrink-0" />
        ))}
      </div>

      {/* デスクトップ: グリッド（最大6件） */}
      <div className="mt-4 hidden grid-cols-6 gap-x-5 gap-y-6 lg:grid">
        {circles.map((circle) => (
          <CircleCard key={circle.id} circle={circle} />
        ))}
      </div>
    </section>
  );
}
