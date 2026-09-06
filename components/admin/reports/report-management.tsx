"use client";

import { useMemo, useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import {
  reports,
  reportTabs,
  reportStatusStyle,
  reportStatusOrder,
  type ReportStatus,
} from "@/lib/admin-reports-mock-data";

function StatusBadge({ status, className = "" }: { status: ReportStatus; className?: string }) {
  const style = reportStatusStyle[status];
  return (
    <span
      className={`whitespace-nowrap rounded-[5px] px-2.5 py-1 text-[10.5px] font-bold ${className}`}
      style={{ background: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  );
}

export function ReportManagement() {
  const [activeTab, setActiveTab] = useState<(typeof reportTabs)[number]["key"]>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(reports[0].id);
  const [draftStatus, setDraftStatus] = useState<ReportStatus>(reports[0].status);
  const [memo, setMemo] = useState("");

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (activeTab !== "all" && r.status !== activeTab) return false;
      if (search.trim() && !r.reason.includes(search.trim()) && !r.targetName.includes(search.trim())) {
        return false;
      }
      return true;
    });
  }, [activeTab, search]);

  const selected = reports.find((r) => r.id === selectedId) ?? reports[0];

  function selectReport(id: string) {
    setSelectedId(id);
    const report = reports.find((r) => r.id === id);
    if (report) setDraftStatus(report.status);
  }

  function handleUpdate() {
    // TODO: Supabase接続後、reports テーブルの update() に置き換える。
    console.info("report status update submitted", { id: selected.id, status: draftStatus, memo });
  }

  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0">
        <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-2xl">通報管理</h1>
        <p className="mt-2 text-[11.5px] leading-[1.7] text-cb-muted-2 lg:mt-[9px] lg:text-xs">
          ユーザーからの通報を確認し、適切に対応してください。
        </p>

        {/* タブ */}
        <div className="mt-3.5 flex gap-4 overflow-x-auto border-b border-cb-border lg:mt-[18px] lg:gap-5">
          {reportTabs.map((tab) => {
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

        {/* 検索・絞り込み */}
        <div className="mt-4 flex flex-col gap-2.5 lg:mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_150px_150px_auto] lg:items-center lg:gap-[11px]">
          <div className="flex items-center gap-2.5 rounded-lg border border-cb-input-border bg-white px-3.5 py-3 lg:py-3">
            <MaterialSymbol name="search" size={18} className="shrink-0 text-cb-placeholder" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="通報内容・対象で検索"
              className="w-full min-w-0 text-xs text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
            />
          </div>

          <div className="hidden items-center justify-between rounded-lg border border-cb-input-border bg-white px-3 py-3 text-[11.5px] text-cb-ink lg:flex">
            通報理由（すべて）
            <MaterialSymbol name="expand_more" size={17} className="text-cb-placeholder" />
          </div>
          <div className="hidden items-center justify-between rounded-lg border border-cb-input-border bg-white px-3 py-3 text-[11.5px] text-cb-ink lg:flex">
            ステータス（すべて）
            <MaterialSymbol name="expand_more" size={17} className="text-cb-placeholder" />
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-cb-input-border bg-white px-4 py-3 text-xs text-cb-ink-soft"
          >
            <MaterialSymbol name="tune" size={17} className="text-cb-muted-3" />
            絞り込み
          </button>
        </div>

        {/* デスクトップ: テーブルヘッダー */}
        <div className="mt-3.5 hidden grid-cols-[150px_minmax(0,1fr)_96px_96px_74px_auto] gap-3 border-b border-cb-border px-1.5 pb-3 text-[10.5px] text-cb-placeholder lg:grid">
          <span>通報ID / 通報理由</span>
          <span>対象</span>
          <span>通報者</span>
          <span>通報日時</span>
          <span>ステータス</span>
          <span />
        </div>

        {/* デスクトップ: 行一覧 */}
        <div className="hidden flex-col lg:flex">
          {filteredReports.map((r) => {
            const active = r.id === selectedId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => selectReport(r.id)}
                className="grid grid-cols-[150px_minmax(0,1fr)_96px_96px_74px_auto] items-center gap-3 border-b border-[#F5EFE5] px-1.5 py-[13px] text-left hover:bg-[#FDF7EE]"
                style={{ background: active ? "#FDF6EA" : "transparent" }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 whitespace-nowrap text-[11.5px] font-bold text-[#2F2B24]">
                    <MaterialSymbol name="flag" size={14} className="text-[#D9534F]" />
                    {r.id}
                  </div>
                  <div className="mt-1 truncate text-[10.5px] text-cb-muted-2">{r.reason}</div>
                </div>
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="h-[30px] w-[30px] shrink-0 overflow-hidden rounded-full">
                    <PhotoPlaceholder caption="" iconSize={13} />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[11.5px] font-medium text-[#2F2B24]">{r.targetName}</div>
                    <div className="mt-[3px] text-[10px] text-cb-placeholder">
                      {r.targetType === "user" ? "ユーザー" : "サークル"}
                    </div>
                  </div>
                </div>
                <div className="whitespace-nowrap text-[11px] text-cb-ink-soft">{r.reporterName}</div>
                <div className="whitespace-nowrap text-[10.5px] text-cb-muted-3">{r.reportedAt}</div>
                <StatusBadge status={r.status} className="text-center" />
                <MaterialSymbol name="chevron_right" size={18} className="text-cb-placeholder" />
              </button>
            );
          })}
        </div>

        {/* モバイル: カード一覧 */}
        <div className="mt-4 flex flex-col gap-3 lg:hidden">
          {filteredReports.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => selectReport(r.id)}
              className="rounded-xl border border-cb-border bg-cb-surface p-3.5 text-left shadow-[0_2px_8px_rgba(120,95,50,.05)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F2B24]">
                  <MaterialSymbol name="flag" size={15} className="text-[#D9534F]" />
                  {r.id}
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div className="mt-2.5 text-[13px] font-bold text-[#2F2B24]">{r.reason}</div>
              <div className="mt-[11px] grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-2.5">
                <div className="h-[26px] w-[26px] overflow-hidden rounded-full">
                  <PhotoPlaceholder caption="" iconSize={12} />
                </div>
                <div className="min-w-0 truncate text-[11.5px] text-cb-ink-soft">
                  {r.targetName}（{r.targetType === "user" ? "ユーザー" : "サークル"}）
                </div>
                <MaterialSymbol name="chevron_right" size={18} className="text-cb-placeholder" />
              </div>
              <div className="mt-2.5 flex items-center gap-2.5 whitespace-nowrap border-t border-[#F5EFE5] pt-2.5 text-[10.5px] text-cb-muted-3">
                通報理由：{r.reporterName}
                <div className="flex-1" />
                {r.reportedAt}
              </div>
            </button>
          ))}
          {filteredReports.length === 0 ? (
            <div className="rounded-xl border border-cb-border bg-cb-surface p-6 text-center text-xs text-cb-muted-3">
              該当する通報はありません
            </div>
          ) : null}
        </div>

        {/* デスクトップ: ページネーション */}
        <div className="mt-5 hidden items-center justify-center gap-2.5 lg:flex">
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-cb-accent text-[12.5px] font-bold text-white">
            1
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white text-[12.5px] text-cb-ink-soft hover:border-cb-accent">
            2
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white text-[12.5px] text-cb-ink-soft hover:border-cb-accent">
            3
          </button>
          <button type="button" aria-label="次のページ" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white">
            <MaterialSymbol name="chevron_right" size={18} className="text-cb-muted-2" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-cb-input-border bg-white px-3.5 py-2.5 text-[11.5px] text-[#3B352C]">
            10件表示
            <MaterialSymbol name="expand_more" size={16} className="text-cb-placeholder" />
          </div>
        </div>
      </div>

      {/* デスクトップ: 通報詳細パネル */}
      <div className="hidden self-start rounded-xl border border-cb-border bg-cb-surface p-5 lg:block">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-[15px] font-bold text-cb-ink">通報詳細</h2>
          <StatusBadge status={selected.status} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3.5">
          <div>
            <div className="text-[10.5px] text-cb-placeholder">通報ID</div>
            <div className="mt-1.5 text-xs font-bold text-[#2F2B24]">{selected.id}</div>
          </div>
          <div>
            <div className="text-[10.5px] text-cb-placeholder">通報日時</div>
            <div className="mt-1.5 text-xs font-bold text-[#2F2B24]">{selected.reportedAt}</div>
          </div>
        </div>

        <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
          <div className="text-[10.5px] text-cb-placeholder">通報理由</div>
          <div className="mt-2 inline-block rounded-[5px] bg-[#FDECEA] px-2.5 py-1 text-[11px] font-bold text-[#C5453A]">
            {selected.reason}
          </div>
        </div>

        <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
          <div className="text-[10.5px] text-cb-placeholder">通報内容</div>
          <div className="mt-2 text-[11.5px] leading-[1.85] text-cb-ink-soft">{selected.content}</div>
        </div>

        <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
          <div className="text-[10.5px] text-cb-placeholder">対象</div>
          <div className="mt-2.5 grid grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-2.5">
            <div className="h-[34px] w-[34px] overflow-hidden rounded-full">
              <PhotoPlaceholder caption="" iconSize={14} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-bold text-[#2F2B24]">{selected.targetName}</div>
              <div className="mt-[3px] text-[10px] text-cb-placeholder">
                {selected.targetType === "user" ? "ユーザー" : "サークル"}
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 whitespace-nowrap rounded-md border border-cb-accent px-3 py-2 text-[11px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
            >
              {selected.targetType === "user" ? "ユーザー詳細を見る" : "サークル詳細を見る"}
            </button>
          </div>
        </div>

        <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
          <div className="text-[10.5px] text-cb-placeholder">該当の投稿・メッセージ</div>
          <div className="mt-2.5 rounded-lg bg-cb-bg px-3.5 py-3 text-[11.5px] leading-[1.8] text-cb-ink-soft">
            {selected.reportedMessage}
          </div>
          <button
            type="button"
            className="mt-2.5 flex w-full items-center justify-center rounded-md border border-[#E0D6C6] py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent"
          >
            投稿・メッセージを確認
          </button>
        </div>

        <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
          <div className="text-[10.5px] text-cb-placeholder">通報者</div>
          <div className="mt-2.5 grid grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-2.5">
            <div className="h-[34px] w-[34px] overflow-hidden rounded-full">
              <PhotoPlaceholder caption="" iconSize={14} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-bold text-[#2F2B24]">{selected.reporterName}</div>
              <div className="mt-[3px] text-[10px] text-cb-placeholder">ユーザー</div>
            </div>
            <button
              type="button"
              className="shrink-0 whitespace-nowrap rounded-md border border-cb-accent px-3 py-2 text-[11px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
            >
              通報者プロフィールを見る
            </button>
          </div>
        </div>

        <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
          <div className="text-[10.5px] text-cb-placeholder">対応ステータス</div>
          <div className="mt-2.5 grid grid-cols-4 gap-2">
            {reportStatusOrder.map((s) => {
              const style = reportStatusStyle[s];
              const active = draftStatus === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setDraftStatus(s)}
                  className="whitespace-nowrap rounded-[7px] border px-1 py-2.5 text-center text-[11px]"
                  style={{
                    borderColor: active ? "#E5911B" : "#E6DCCB",
                    background: active ? "#FDF3E4" : "#FFFFFF",
                    color: active ? "#C97C10" : s === "done" ? "#3E8E68" : "#5A5348",
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {style.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 border-t border-[#F3ECE0] pt-3.5">
          <div className="text-[10.5px] text-cb-placeholder">管理者メモ（任意）</div>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={3}
            placeholder="対応内容やメモを入力してください（他の管理者にも共有されます）"
            className="mt-2.5 h-[70px] w-full resize-none rounded-lg border border-cb-input-border px-3 py-2.5 text-[11px] leading-[1.7] text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none"
          />
        </div>

        <div className="mt-4 grid grid-cols-[1fr_1.3fr] gap-2.5">
          <button
            type="button"
            onClick={() => {
              setDraftStatus(selected.status);
              setMemo("");
            }}
            className="rounded-lg border border-[#E0D6C6] bg-white py-3 text-xs font-medium text-cb-ink-soft"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="rounded-lg bg-cb-accent py-3 text-[12.5px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover"
          >
            更新する
          </button>
        </div>
      </div>
    </div>
  );
}
