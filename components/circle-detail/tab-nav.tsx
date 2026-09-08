import { MaterialSymbol } from "@/components/icons/material-symbol";
import { buildDetailTabs } from "@/lib/circle-detail-mock-data";

export function TabNav({ updatesCount }: { updatesCount: number }) {
  const detailTabs = buildDetailTabs(updatesCount);

  return (
    <div className="border-t border-b border-cb-border bg-cb-header">
      {/* デスクトップ */}
      <div className="mx-8 hidden gap-[30px] lg:flex">
        {detailTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            disabled={tab.key !== "basic"}
            className={`flex items-center gap-[7px] px-1 py-[15px] text-[13px] ${
              tab.key === "basic"
                ? "border-b-2 border-cb-accent font-bold text-cb-accent-dark"
                : "text-cb-muted disabled:cursor-default"
            }`}
          >
            <MaterialSymbol
              name={tab.icon}
              filled={tab.key === "basic"}
              size={18}
              className={tab.key === "basic" ? "text-cb-accent-dark" : "text-cb-muted-3"}
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
          </button>
        ))}
      </div>

      {/* モバイル */}
      <div className="grid grid-cols-4 lg:hidden">
        {detailTabs
          .filter((tab) => tab.mobileLabel)
          .map((tab) => (
            <button
              key={tab.key}
              type="button"
              disabled={tab.key !== "basic"}
              className={`flex flex-col items-center gap-1.5 py-[11px] ${
                tab.key === "basic" ? "border-b-2 border-cb-accent" : ""
              }`}
            >
              <MaterialSymbol
                name={tab.mobileIcon ?? tab.icon}
                filled={tab.key === "basic"}
                size={19}
                className={tab.key === "basic" ? "text-cb-accent" : "text-[#9A9284]"}
              />
              <span
                className={`text-[10.5px] ${
                  tab.key === "basic" ? "font-bold text-cb-accent-dark" : "text-cb-muted"
                }`}
              >
                {tab.mobileLabel}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
}
