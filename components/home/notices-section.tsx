import Image from "next/image";
import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { notices as allNotices } from "@/lib/notices-mock-data";

export function NoticesSection() {
  const notices = allNotices.slice(0, 3);
  return (
    <section className="px-3.5 pt-5 pb-6 lg:px-[46px] lg:pt-[26px] lg:pb-8">
      <div className="overflow-hidden rounded-xl border border-cb-border bg-white p-4 lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:items-stretch lg:gap-5 lg:p-5">
        <div className="min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 font-heading text-[14.5px] font-bold text-black lg:gap-2 lg:text-lg">
              <MaterialSymbol name="campaign" filled size={17} className="text-cb-accent lg:hidden" />
              <MaterialSymbol name="campaign" filled size={20} className="hidden text-cb-accent lg:inline-block" />
              お知らせ
            </h2>
            <Link
              href="/notices"
              className="flex items-center gap-0.5 whitespace-nowrap text-[11px] text-black lg:text-sm"
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
                <span className="whitespace-nowrap text-[10px] text-black lg:text-sm">{n.date}</span>
                <span
                  className="whitespace-nowrap rounded px-[7px] py-[3px] text-[9.5px] font-bold lg:px-[9px] lg:text-sm"
                  style={{ background: n.tagBg, color: n.tagColor }}
                >
                  {n.tag}
                </span>
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-black lg:text-base">
                  {n.title}
                </span>
                <MaterialSymbol name="chevron_right" size={16} className="hidden text-[#B3A996] lg:inline-block" />
              </Link>
            ))}
          </div>
        </div>

        <div className="relative hidden overflow-hidden lg:block lg:-my-5 lg:-mr-5 lg:rounded-r-xl">
          <Image
            src="/images/ChatGPT Image 2026年9月15日 21_46_54.png"
            alt="つながる。ひろがる。新潟のくらし。"
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
