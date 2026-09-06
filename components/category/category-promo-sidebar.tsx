import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { getRelatedCategories, type CategoryInfo } from "@/lib/category-mock-data";

export function CategoryPromoSidebar({ category }: { category: CategoryInfo }) {
  const related = getRelatedCategories(category.slug);

  return (
    <aside className="hidden flex-col gap-4 lg:flex">
      <div className="rounded-xl border border-[#F2E0C0] bg-cb-accent-soft px-[18px] py-5">
        <MaterialSymbol name={category.icon} filled size={26} className="text-cb-accent" />
        <div className="mt-[11px] font-heading text-base font-bold leading-[1.5] text-[#2F2B24]">
          {category.label}でつながる新しい出会い
        </div>
        <div className="mt-2.5 text-[11px] leading-[1.85] text-[#6E6558]">
          自然の中でリフレッシュしながら、同じ趣味を持つ仲間と出会えます。初心者の方も安心して参加できるサークルがたくさんあります。
        </div>
        <Link
          href="/mypage/circles/new"
          className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-cb-accent py-3 text-[12.5px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover"
        >
          サークルを作成する
          <MaterialSymbol name="chevron_right" size={16} />
        </Link>

        <div className="mt-[18px] text-[11.5px] font-bold text-[#3B352C]">こんな方におすすめ</div>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {category.recommends.map((r) => (
            <div key={r} className="flex items-center gap-2 text-[11px] text-cb-ink-soft">
              <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded bg-cb-accent">
                <MaterialSymbol name="check" size={12} className="text-white" />
              </span>
              {r}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-cb-border bg-cb-surface px-4 pb-1.5 pt-4">
        <div className="font-heading text-[13.5px] font-bold text-cb-ink">関連カテゴリ</div>
        {related.map((r, i) => (
          <Link
            key={r.slug}
            href={`/category/${r.slug}`}
            className={`grid grid-cols-[52px_minmax(0,1fr)] items-center gap-[11px] py-3 ${
              i < related.length - 1 ? "border-b border-[#F5EFE5]" : ""
            }`}
          >
            <div className="h-[52px] w-[52px] overflow-hidden rounded-lg">
              <PhotoPlaceholder caption={`${r.label}を楽しむ様子`} iconSize={13} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#2F2B24]">{r.label}</div>
              <div className="mt-1 truncate text-[10.5px] text-cb-placeholder">{r.tagline.replace("\n", "")}</div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
