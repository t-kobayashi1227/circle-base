import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { notices as allNotices } from "@/lib/notices-mock-data";

export function NoticesSection() {
  const notices = allNotices.slice(0, 3);
  return (
    <section className="px-3.5 pt-5 lg:px-[46px] lg:pt-[26px]">
      <div className="rounded-xl border border-cb-border bg-white p-4 lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center lg:gap-5 lg:p-5">
        <div className="min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 font-heading text-[14.5px] font-bold text-cb-ink lg:gap-2 lg:text-[17px]">
              <MaterialSymbol name="campaign" filled size={17} className="text-cb-accent lg:hidden" />
              <MaterialSymbol name="campaign" filled size={20} className="hidden text-cb-accent lg:inline-block" />
              お知らせ
            </h2>
            <Link
              href="/notices"
              className="flex items-center gap-0.5 whitespace-nowrap text-[11px] text-cb-muted-2 lg:text-[11.5px]"
            >
              <span className="lg:hidden">一覧を見る</span>
              <span className="hidden lg:inline">お知らせ一覧を見る</span>
              <MaterialSymbol name="chevron_right" size={14} className="lg:hidden" />
              <MaterialSymbol name="chevron_right" size={15} className="hidden lg:inline-block" />
            </Link>
          </div>
          <div className="mt-2.5 flex flex-col lg:mt-3">
            {notices.map((n) => (
              <Link
                key={n.slug}
                href={`/notices/${n.slug}`}
                className="grid grid-cols-[68px_auto_minmax(0,1fr)] items-center gap-2 border-b border-[#F5EFE5] py-2.5 lg:grid-cols-[76px_auto_minmax(0,1fr)_16px] lg:gap-3 lg:py-[11px]"
              >
                <span className="whitespace-nowrap text-[10px] text-cb-muted-3 lg:text-[11px]">{n.date}</span>
                <span
                  className="whitespace-nowrap rounded px-[7px] py-[3px] text-[9.5px] font-bold lg:px-[9px] lg:text-[10px]"
                  style={{ background: n.tagBg, color: n.tagColor }}
                >
                  {n.tag}
                </span>
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-cb-ink-soft">
                  {n.title}
                </span>
                <MaterialSymbol name="chevron_right" size={16} className="hidden text-[#B3A996] lg:inline-block" />
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mt-1 hidden h-24 overflow-hidden rounded-lg bg-gradient-to-br from-[#EAF1EC] to-[#DCEAE0] lg:block">
          <div className="pointer-events-none absolute left-1.5 top-0.5 font-heading text-[11.5px] font-bold leading-relaxed text-[#4F6B54]">
            つながる。
            <br />
            ひろがる。
            <br />
            新潟のくらし。
          </div>
        </div>
      </div>
    </section>
  );
}
