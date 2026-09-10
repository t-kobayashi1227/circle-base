"use client";

import { useState } from "react";
import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { Notice } from "@/lib/notices-mock-data";

const MOBILE_INITIAL_COUNT = 5;
const decorativePages = ["2", "3", "4", "5"];

export function NoticesList({ notices }: { notices: Notice[] }) {
  const [expanded, setExpanded] = useState(false);
  const mobileNotices = expanded ? notices : notices.slice(0, MOBILE_INITIAL_COUNT);

  return (
    <div className="min-w-0 rounded-xl border border-cb-border bg-white px-3.5 py-5 lg:px-6">
      <h2 className="flex items-center gap-2.5 font-heading text-[15.5px] font-bold text-cb-ink lg:text-base">
        <span className="h-4 w-1 shrink-0 rounded-sm bg-cb-accent lg:h-[17px]" />
        お知らせ一覧
      </h2>

      {/* モバイル */}
      <div className="mt-2.5 flex flex-col lg:hidden">
        {mobileNotices.map((n) => (
          <Link
            key={n.slug}
            href={`/notices/${n.slug}`}
            className="grid grid-cols-[minmax(0,1fr)_18px] items-start gap-2 border-b border-[#F5EFE5] py-[13px]"
          >
            <div className="min-w-0">
              <div className="text-[11px] text-cb-muted-3">{n.date}</div>
              <div className="mt-[5px] text-[12.5px] leading-[1.6] text-[#3B352C]">{n.title}</div>
            </div>
            <MaterialSymbol name="chevron_right" size={18} className="mt-0.5 text-[#B3A996]" />
          </Link>
        ))}
      </div>
      {!expanded && notices.length > MOBILE_INITIAL_COUNT ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border border-cb-accent py-3 text-[13px] font-bold text-cb-accent-dark lg:hidden"
        >
          もっと見る
          <MaterialSymbol name="chevron_right" size={16} />
        </button>
      ) : null}

      {/* デスクトップ */}
      <div className="mt-3 hidden flex-col lg:flex">
        {notices.map((n) => (
          <Link
            key={n.slug}
            href={`/notices/${n.slug}`}
            className="grid grid-cols-[100px_minmax(0,1fr)_18px] items-center gap-[18px] border-b border-[#F5EFE5] px-1 py-[15px] hover:bg-[#FDF9F3]"
          >
            <span className="whitespace-nowrap text-xs text-cb-muted-3">{n.date}</span>
            <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#3B352C]">
              {n.title}
            </span>
            <MaterialSymbol name="chevron_right" size={18} className="text-[#B3A996]" />
          </Link>
        ))}
      </div>

      <div className="mt-[22px] hidden items-center justify-center gap-2.5 lg:flex">
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-cb-accent text-[12.5px] font-bold text-white">
          1
        </div>
        {decorativePages.map((p) => (
          <div
            key={p}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#E6DCCB] text-[12.5px] text-cb-muted hover:border-cb-accent hover:text-cb-accent-dark"
          >
            {p}
          </div>
        ))}
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#E6DCCB] hover:border-cb-accent">
          <MaterialSymbol name="chevron_right" size={18} className="text-cb-muted-2" />
        </div>
      </div>
    </div>
  );
}
