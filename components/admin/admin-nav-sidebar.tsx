import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { adminNavGroups } from "@/lib/admin-mock-data";

export function AdminNavSidebar({ activeHref = "/admin" }: { activeHref?: string }) {
  return (
    <aside className="hidden flex-col border-r border-cb-border bg-cb-header px-3 py-4 lg:flex">
      {activeHref === "/admin" ? (
        <div className="flex items-center gap-[11px] rounded-r-lg border-l-[3px] border-cb-accent bg-cb-accent-soft px-3.5 py-3 text-[12.5px] font-bold text-cb-accent-dark">
          <MaterialSymbol name="home" size={18} />
          ダッシュボード
        </div>
      ) : (
        <Link
          href="/admin"
          className="flex items-center gap-[11px] rounded-lg px-3.5 py-3 text-[12.5px] text-cb-ink-soft hover:bg-[#FDF7EE]"
        >
          <MaterialSymbol name="home" size={18} className="text-cb-muted-3" />
          ダッシュボード
        </Link>
      )}

      {adminNavGroups.map((group) => (
        <div key={group.title} className="mt-5">
          <div className="px-3.5 pb-1 text-[11.5px] font-bold text-[#3B352C]">{group.title}</div>
          {group.items.map((item) => {
            const active = item.href === activeHref;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-[11px] text-xs hover:bg-[#FDF7EE] ${
                  active ? "font-bold text-cb-accent-dark" : "text-cb-ink-soft"
                }`}
              >
                <MaterialSymbol name={item.icon} size={18} className={active ? "text-cb-accent" : "text-cb-muted-3"} />
                <span className="flex-1 whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      <div className="min-h-10 flex-1" />
      <Link
        href="/"
        className="flex items-center justify-center gap-2 rounded-[9px] border border-[#E0D6C6] py-3.5 text-[12.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        サイトを表示
        <MaterialSymbol name="open_in_new" size={16} />
      </Link>
    </aside>
  );
}
