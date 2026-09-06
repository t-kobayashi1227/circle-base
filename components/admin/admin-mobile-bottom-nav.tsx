import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { adminBottomNavTabs } from "@/lib/admin-mock-data";

export function AdminMobileBottomNav({ activeHref = "/admin" }: { activeHref?: string }) {
  return (
    <nav className="grid grid-cols-5 border-t border-cb-border bg-cb-header pb-[env(safe-area-inset-bottom)] lg:hidden">
      {adminBottomNavTabs.map((tab) => {
        const active = tab.href === activeHref;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="flex min-h-12 flex-col items-center justify-center gap-1 py-2"
          >
            <MaterialSymbol
              name={tab.icon}
              filled={active}
              size={23}
              className={active ? "text-cb-accent" : "text-[#9A9284]"}
            />
            <span className={`text-center text-[9.5px] leading-tight ${active ? "font-bold text-cb-accent" : "text-[#9A9284]"}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
