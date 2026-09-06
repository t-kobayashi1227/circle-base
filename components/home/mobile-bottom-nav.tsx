import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

const tabs = [
  { label: "ホーム", icon: "home", href: "/" },
  { label: "探す", icon: "search", href: "/circles" },
  { label: "メッセージ", icon: "chat_bubble", href: "/mypage/messages" },
  { label: "マイページ", icon: "person", href: "/mypage" },
];

export function MobileBottomNav({
  activeHref = "/",
  messageBadge,
}: {
  activeHref?: string;
  messageBadge?: number;
}) {
  return (
    <nav className="grid grid-cols-4 border-t border-cb-border bg-cb-header pb-[env(safe-area-inset-bottom)] lg:hidden">
      {tabs.map((tab) => {
        const active = tab.href === activeHref;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="relative flex min-h-12 flex-col items-center justify-center gap-1 py-2"
          >
            <MaterialSymbol
              name={tab.icon}
              filled={active}
              size={24}
              className={active ? "text-cb-accent" : "text-[#9A9284]"}
            />
            {tab.href === "/mypage/messages" && messageBadge ? (
              <span className="absolute left-[calc(50%+6px)] top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E04B3C] px-1 text-[9.5px] font-bold text-white">
                {messageBadge}
              </span>
            ) : null}
            <span className={`text-[10px] ${active ? "font-bold text-cb-accent" : "text-[#9A9284]"}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
