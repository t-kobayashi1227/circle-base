import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { buildDetailTabs } from "@/lib/circle-detail-mock-data";

// 実装済みのタブ（基本情報・活動の様子）のみリンクを有効化する。
const ENABLED_TAB_KEYS = new Set(["basic", "updates", "recruit", "messages", "owner"]);

export function TabNav({
  slug,
  active = "basic",
  updatesCount,
}: {
  slug: string;
  active?: string;
  updatesCount: number;
}) {
  const detailTabs = buildDetailTabs(updatesCount);
  const tabHref = (href: string | null) => (href ? `/circle/${slug}/${href}` : `/circle/${slug}`);

  return (
    <div className="border-t border-b border-cb-border bg-cb-header">
      {/* デスクトップ */}
      <div className="mx-8 hidden gap-[30px] lg:flex">
        {detailTabs.map((tab) => {
          const isActive = tab.key === active;
          const isEnabled = ENABLED_TAB_KEYS.has(tab.key);
          const content = (
            <>
              <MaterialSymbol
                name={tab.icon}
                filled={isActive}
                size={18}
                className={isActive ? "text-cb-accent-dark" : "text-cb-muted-3"}
              />
              {tab.label}
              {tab.count ? (
                <span
                  className={`rounded-full px-[7px] py-0.5 text-[10px] ${
                    tab.key === "messages" ? "bg-[#FDECD9] text-cb-accent-dark" : "bg-[#F3EDE2] text-cb-muted-2"
                  }`}
                >
                  {tab.count}
                </span>
              ) : null}
            </>
          );
          const className = `flex items-center gap-[7px] px-1 py-[15px] text-[13px] ${
            isActive
              ? "border-b-2 border-cb-accent font-bold text-cb-accent-dark"
              : "text-cb-muted disabled:cursor-default"
          }`;

          return isEnabled ? (
            <Link key={tab.key} href={tabHref(tab.href)} className={className}>
              {content}
            </Link>
          ) : (
            <button key={tab.key} type="button" disabled className={className}>
              {content}
            </button>
          );
        })}
      </div>

      {/* モバイル */}
      <div className="grid grid-cols-4 lg:hidden">
        {detailTabs
          .filter((tab) => tab.mobileLabel)
          .map((tab) => {
            const isActive = tab.key === active;
            const isEnabled = ENABLED_TAB_KEYS.has(tab.key);
            const content = (
              <>
                <MaterialSymbol
                  name={tab.mobileIcon ?? tab.icon}
                  filled={isActive}
                  size={19}
                  className={isActive ? "text-cb-accent" : "text-[#9A9284]"}
                />
                <span
                  className={`text-[10.5px] ${isActive ? "font-bold text-cb-accent-dark" : "text-cb-muted"}`}
                >
                  {tab.mobileLabel}
                </span>
              </>
            );
            const className = `flex flex-col items-center gap-1.5 py-[11px] ${isActive ? "border-b-2 border-cb-accent" : ""}`;

            return isEnabled ? (
              <Link key={tab.key} href={tabHref(tab.href)} className={className}>
                {content}
              </Link>
            ) : (
              <button key={tab.key} type="button" disabled className={className}>
                {content}
              </button>
            );
          })}
      </div>
    </div>
  );
}
