import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { quickMenuDesktop, quickMenuMobile } from "@/lib/mypage-mock-data";

function QuickMenuTile({ item }: { item: (typeof quickMenuDesktop)[number] }) {
  return (
    <Link
      href={item.href}
      className="relative flex h-[82px] min-w-0 flex-col items-center justify-center gap-2.5 rounded-[11px] border border-cb-border bg-cb-surface transition-transform hover:-translate-y-0.5 hover:border-cb-accent lg:h-[82px]"
    >
      <MaterialSymbol name={item.icon} size={23} style={{ color: item.color }} />
      <span className="text-center text-[11px] font-medium text-[#463F35] lg:text-[11px]">{item.label}</span>
      {item.badge ? (
        <span className="absolute right-[11px] top-[11px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E04B3C] px-1 text-[9.5px] font-bold text-white">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

export function QuickMenu() {
  return (
    <div>
      <h2 className="mb-3 font-heading text-base font-bold text-cb-ink lg:mb-3">クイックメニュー</h2>
      <div className="hidden grid-cols-5 gap-3 lg:grid">
        {quickMenuDesktop.map((item) => (
          <QuickMenuTile key={item.label} item={item} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2.5 lg:hidden">
        {quickMenuMobile.map((item) => (
          <QuickMenuTile key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}
