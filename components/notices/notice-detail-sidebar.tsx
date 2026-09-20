import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { Notice } from "@/lib/microcms";

const OTHER_NOTICES_COUNT = 4;

export function NoticeDetailSidebar({ notices, currentSlug }: { notices: Notice[]; currentSlug: string }) {
  const others = notices.filter((n) => n.slug !== currentSlug).slice(0, OTHER_NOTICES_COUNT);

  return (
    <div className="rounded-xl border border-cb-border bg-white px-4 py-4 lg:px-[18px] lg:py-[18px]">
      <div className="flex items-center gap-2">
        <MaterialSymbol name="description" filled size={18} className="text-cb-accent lg:text-[19px]" />
        <span className="font-heading text-[13.5px] font-bold text-[#2F2B24] lg:text-sm">お知らせ一覧</span>
      </div>
      <div className="mt-2.5 flex flex-col">
        {others.map((n) => (
          <Link
            key={n.slug}
            href={`/notices/${n.slug}`}
            className="grid grid-cols-[minmax(0,1fr)_16px] items-start gap-2 border-b border-[#F5EFE5] py-3 hover:bg-[#FDF9F3]"
          >
            <div className="min-w-0">
              <div className="text-[11px] text-cb-muted-3">{n.date}</div>
              <div className="mt-[5px] text-xs leading-[1.6] text-[#3B352C]">{n.title}</div>
            </div>
            <MaterialSymbol name="chevron_right" size={16} className="mt-0.5 text-[#B3A996]" />
          </Link>
        ))}
      </div>
      <div className="mt-2.5 text-right">
        <Link
          href="/notices"
          className="inline-flex items-center gap-0.5 text-xs font-bold text-cb-accent-dark hover:text-cb-accent"
        >
          お知らせ一覧を見る
          <MaterialSymbol name="chevron_right" size={15} />
        </Link>
      </div>
    </div>
  );
}
