"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { createClient } from "@/lib/supabase/client";
import { reportStatusLabel, type AdminReportRow } from "@/lib/admin-types";
import { formatDateJa } from "@/lib/circles-format";

const statusStyle: Record<string, { bg: string; color: string }> = {
  pending: { bg: "#FDECEA", color: "#C5453A" },
  in_progress: { bg: "#FDF3E4", color: "#C07E1B" },
  resolved: { bg: "#EEF7F1", color: "#3E8E68" },
};

const statusOrder = ["pending", "in_progress", "resolved"];

function StatusBadge({ status, className = "" }: { status: string; className?: string }) {
  const style = statusStyle[status] ?? statusStyle.pending;
  return (
    <span
      className={`whitespace-nowrap rounded-[5px] px-2.5 py-1 text-[10.5px] font-bold ${className}`}
      style={{ background: style.bg, color: style.color }}
    >
      {reportStatusLabel[status] ?? status}
    </span>
  );
}

export function ReportManagement({ reports }: { reports: AdminReportRow[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(reports[0]?.id ?? null);
  const [updating, setUpdating] = useState(false);

  const tabs = useMemo(
    () => [
      { key: "all", label: "すべて", count: reports.length },
      ...statusOrder.map((s) => ({ key: s, label: reportStatusLabel[s], count: reports.filter((r) => r.status === s).length })),
    ],
    [reports],
  );

  const byTab = activeTab === "all" ? reports : reports.filter((r) => r.status === activeTab);
  const trimmedKeyword = keyword.trim().toLowerCase();
  const filtered = trimmedKeyword
    ? byTab.filter(
        (r) => r.reason.toLowerCase().includes(trimmedKeyword) || r.targetLabel.toLowerCase().includes(trimmedKeyword),
      )
    : byTab;
  const selected = reports.find((r) => r.id === selectedId) ?? filtered[0] ?? null;

  async function updateStatus(id: string, status: string) {
    setUpdating(true);
    const supabase = createClient();
    const { error } = await supabase.from("reports").update({ status }).eq("id", id);
    setUpdating(false);
    if (error) {
      window.alert("更新に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    router.refresh();
  }

  async function unpublishTarget(circleId: string) {
    const confirmed = window.confirm("対象のサークルを非公開にします。よろしいですか？");
    if (!confirmed) return;
    setUpdating(true);
    const supabase = createClient();
    const { error } = await supabase.from("circles").update({ status: "unpublished" }).eq("id", circleId);
    setUpdating(false);
    if (error) {
      window.alert("更新に失敗しました。時間をおいて再度お試しください。");
      return;
    }
    router.refresh();
  }

  if (reports.length === 0) {
    return (
      <div>
        <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-2xl">通報管理</h1>
        <p className="mt-6 rounded-xl border border-cb-border bg-cb-surface px-4 py-8 text-center text-[12.5px] text-cb-muted">
          現在、通報はありません。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-2xl">通報管理</h1>
        <p className="mt-2 text-[11.5px] leading-[1.7] text-cb-muted-2 lg:mt-[9px] lg:text-xs">
          ユーザーからの通報を確認し、適切に対応してください。
        </p>

        <div className="mt-3.5 flex gap-4 overflow-x-auto border-b border-cb-border lg:mt-[18px] lg:gap-5">
          {tabs.map((tab) => {
            const active = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 pb-[11px] text-[12.5px] ${
                  active ? "border-cb-accent font-bold text-cb-accent-dark" : "border-transparent text-cb-ink-soft"
                }`}
              >
                {tab.label}
                <span className="font-bold">{tab.count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-3.5">
          <MaterialSymbol
            name="search"
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="理由・対象名で検索"
            className="w-full rounded-md border border-cb-border bg-white py-2 pl-9 pr-3 text-[12px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none focus:ring-1 focus:ring-cb-accent"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="mt-6 text-center text-[12px] text-cb-muted">該当する通報が見つかりませんでした。</p>
        ) : null}

        <div className="mt-3.5 flex flex-col lg:mt-4">
          {filtered.map((r) => {
            const active = r.id === selected?.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedId(r.id)}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#F5EFE5] px-1.5 py-[13px] text-left hover:bg-[#FDF7EE]"
                style={{ background: active ? "#FDF6EA" : "transparent" }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#2F2B24]">
                    <MaterialSymbol name="flag" size={14} className="text-[#D9534F]" />
                    <span className="truncate">{r.targetLabel}</span>
                    <span className="shrink-0 text-[10px] font-normal text-cb-muted-3">
                      （{r.targetType === "user" ? "ユーザー" : "サークル"}）
                    </span>
                  </div>
                  <div className="mt-1 truncate text-[10.5px] text-cb-muted-2">{r.reason}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <StatusBadge status={r.status} />
                  <span className="whitespace-nowrap text-[10px] text-cb-placeholder">{formatDateJa(r.createdAt.slice(0, 10))}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 通報詳細パネル */}
      {selected ? (
        <div className="rounded-xl border border-cb-border bg-cb-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-[15px] font-bold text-cb-ink">通報詳細</h2>
            <StatusBadge status={selected.status} />
          </div>

          <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
            <div className="text-[10.5px] text-cb-placeholder">通報日時</div>
            <div className="mt-1.5 text-xs font-bold text-[#2F2B24]">{formatDateJa(selected.createdAt.slice(0, 10))}</div>
          </div>

          <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
            <div className="text-[10.5px] text-cb-placeholder">通報理由</div>
            <div className="mt-2 whitespace-pre-line text-[11.5px] leading-[1.85] text-cb-ink-soft">{selected.reason}</div>
          </div>

          <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
            <div className="text-[10.5px] text-cb-placeholder">対象</div>
            <div className="mt-2.5 grid grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-2.5">
              <div className="h-[34px] w-[34px] overflow-hidden rounded-full">
                <CircleImage path={null} alt={selected.targetLabel} iconSize={14} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[12.5px] font-bold text-[#2F2B24]">{selected.targetLabel}</div>
                <div className="mt-[3px] text-[10px] text-cb-placeholder">
                  {selected.targetType === "user" ? "ユーザー" : "サークル"}
                </div>
              </div>
              {selected.targetHref ? (
                <Link
                  href={selected.targetHref}
                  target="_blank"
                  className="shrink-0 whitespace-nowrap rounded-md border border-cb-accent px-3 py-2 text-[11px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
                >
                  詳細を見る
                </Link>
              ) : null}
            </div>
            {selected.targetType === "circle" && selected.targetCircleId && selected.targetCircleStatus === "published" ? (
              <button
                type="button"
                onClick={() => unpublishTarget(selected.targetCircleId!)}
                disabled={updating}
                className="mt-3 flex w-full items-center justify-center rounded-md border border-[#E7B3AA] bg-white py-2.5 text-[11.5px] font-bold text-[#D9534F] hover:bg-[#FDECEA] disabled:opacity-60"
              >
                対象のサークルを非公開にする
              </button>
            ) : null}
          </div>

          <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
            <div className="text-[10.5px] text-cb-placeholder">通報者</div>
            <div className="mt-2.5 text-[12.5px] font-bold text-[#2F2B24]">{selected.reporterDisplayName}</div>
          </div>

          <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
            <div className="text-[10.5px] text-cb-placeholder">対応ステータス</div>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {statusOrder.map((s) => {
                const active = selected.status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateStatus(selected.id, s)}
                    disabled={updating || active}
                    className="whitespace-nowrap rounded-[7px] border px-1 py-2.5 text-center text-[11px] disabled:cursor-default"
                    style={{
                      borderColor: active ? "#E5911B" : "#E6DCCB",
                      background: active ? "#FDF3E4" : "#FFFFFF",
                      color: active ? "#C97C10" : "#5A5348",
                      fontWeight: active ? 700 : 400,
                    }}
                  >
                    {reportStatusLabel[s]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
