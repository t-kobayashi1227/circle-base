import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { AdminReportRow } from "@/lib/admin-types";

const targetTypeStyle: Record<string, { bg: string; color: string; label: string }> = {
  circle: { bg: "#FDF3E4", color: "#C07E1B", label: "サークル" },
  user: { bg: "#FDECEA", color: "#C5453A", label: "ユーザー" },
};

function formatAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "1時間以内";
  if (hours < 24) return `${hours}時間前`;
  return `${Math.floor(hours / 24)}日前`;
}

export function ReportsCard({ reports }: { reports: AdminReportRow[] }) {
  const pending = reports.filter((r) => r.status === "pending").slice(0, 4);

  return (
    <div className="min-w-0 rounded-xl border border-cb-border bg-cb-surface px-3.5 pb-1 pt-4 lg:px-5 lg:pb-3 lg:pt-[18px]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="whitespace-nowrap font-heading text-sm font-bold text-cb-ink lg:text-[15.5px]">
          最近の通報（未対応）
        </h2>
        <Link
          href="/admin/reports"
          className="flex shrink-0 items-center gap-px text-[11px] font-bold text-cb-accent-dark hover:text-[#8E5606] lg:gap-0.5 lg:text-[11.5px]"
        >
          すべて見る
          <MaterialSymbol name="chevron_right" size={15} />
        </Link>
      </div>

      {pending.length === 0 ? (
        <p className="py-6 text-center text-[11.5px] text-cb-muted">未対応の通報はありません。</p>
      ) : (
        <div className="flex flex-col">
          {pending.map((report, i) => {
            const tag = targetTypeStyle[report.targetType] ?? targetTypeStyle.circle;
            return (
              <Link
                key={report.id}
                href="/admin/reports"
                className={`block py-3.5 lg:py-4 ${i < pending.length - 1 ? "border-b border-[#F5EFE5]" : ""}`}
              >
                <span
                  className="inline-block rounded px-2 py-1 text-[10px] font-bold"
                  style={{ background: tag.bg, color: tag.color }}
                >
                  {tag.label}
                </span>
                <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2.5">
                  <div className="min-w-0">
                    <div className="truncate text-xs font-bold text-[#2F2B24]">{report.targetLabel}</div>
                    <div className="mt-1.5 truncate text-[10.5px] text-cb-muted-3">通報者：{report.reporterDisplayName}</div>
                  </div>
                  <span className="whitespace-nowrap text-[10px] text-cb-placeholder">{formatAgo(report.createdAt)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
