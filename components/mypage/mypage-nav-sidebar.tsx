import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { mypageNav } from "@/lib/mypage-mock-data";
import { LogoutButton } from "@/components/mypage/logout-button";

export function MypageNavSidebar({ activeHref = "/mypage" }: { activeHref?: string }) {
  return (
    <aside className="hidden rounded-xl border border-cb-border bg-cb-surface py-2.5 lg:block">
      {mypageNav.map((item) => {
        const active = item.href === activeHref;
        return active ? (
          <div
            key={item.label}
            className="flex items-center gap-[11px] border-l-[3px] border-cb-accent bg-cb-accent-soft py-[11px] pl-[13px] pr-4 text-[12.5px] font-bold text-cb-accent-dark"
          >
            <MaterialSymbol name={item.icon} size={18} />
            {item.label}
          </div>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-[11px] px-4 py-[11px] text-[12.5px] text-cb-ink-soft hover:bg-[#FDF7EE]"
          >
            <MaterialSymbol name={item.icon} size={18} className="text-cb-muted-3" />
            {item.label}
          </Link>
        );
      })}
      <div className="mt-1 border-t border-[#F5EFE5] pt-1">
        <LogoutButton />
      </div>
    </aside>
  );
}
