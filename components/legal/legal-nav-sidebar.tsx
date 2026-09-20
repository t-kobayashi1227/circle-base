import Image from "next/image";
import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { legalNavLinks } from "@/lib/legal-mock-data";

export function LegalNavSidebar({ activeHref }: { activeHref: string }) {
  return (
    <aside className="hidden flex-col gap-4 lg:flex">
      <div className="overflow-hidden rounded-xl border border-cb-border bg-cb-surface py-2.5">
        {legalNavLinks.map((link) => {
          const active = link.href === activeHref;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-[11px] py-3 pr-4 text-[12.5px] hover:bg-[#FDF7EE] ${
                active
                  ? "border-l-[3px] border-cb-accent bg-cb-accent-soft pl-[13px] font-bold text-cb-accent-dark"
                  : "pl-4 text-cb-ink-soft"
              }`}
            >
              <MaterialSymbol name={link.icon} size={18} className={active ? "text-cb-accent" : "text-cb-muted-3"} />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="rounded-xl bg-[#FDF6EA] px-[18px] py-5 text-center">
        <div className="relative h-[78px]">
          <Image
            src="/images/First-Time-Visitors.png"
            alt="はじめての方へ"
            fill
            sizes="188px"
            className="object-contain"
          />
        </div>
        <div className="mt-3 font-heading text-sm font-bold text-[#2F2B24]">はじめての方へ</div>
        <div className="mt-2 text-[10.5px] leading-[1.8] text-cb-muted-2">
          にいがたサークルベースの使い方や楽しみ方をご紹介しています。
        </div>
        <Link
          href="/about"
          className="mt-[13px] flex items-center justify-center gap-1.5 rounded-lg border border-[#E0D6C6] bg-white py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
        >
          はじめての方へ
          <MaterialSymbol name="chevron_right" size={15} className="text-cb-placeholder" />
        </Link>
      </div>
    </aside>
  );
}
