"use client";

import { useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { LegalArticle } from "@/lib/legal-mock-data";

export function LegalArticles({
  articles,
  mobileAccordion = false,
}: {
  articles: LegalArticle[];
  mobileAccordion?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {articles.map((a, i) => {
        const open = openIndex === i;
        return (
          <div
            key={a.n}
            className="rounded-[10px] bg-[#FDF7EC] p-4 lg:grid lg:grid-cols-[36px_150px_minmax(0,1fr)] lg:items-start lg:gap-4 lg:p-4"
          >
            {mobileAccordion ? (
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-[11px] lg:hidden"
              >
                <span className="flex items-center gap-[11px]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cb-accent font-heading text-[13px] font-bold text-white">
                    {a.n}
                  </span>
                  <span className="font-heading text-sm font-bold text-[#2F2B24]">{a.title}</span>
                </span>
                <MaterialSymbol
                  name="expand_more"
                  size={20}
                  className={`shrink-0 text-cb-placeholder transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
            ) : (
              <div className="flex items-center gap-[11px] lg:hidden">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cb-accent font-heading text-[13px] font-bold text-white">
                  {a.n}
                </span>
                <span className="font-heading text-sm font-bold text-[#2F2B24]">{a.title}</span>
              </div>
            )}

            {/* デスクトップ: 常に展開表示 */}
            <div className="hidden items-center gap-[11px] lg:contents">
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-cb-accent font-heading text-sm font-bold text-white">
                {a.n}
              </span>
              <span className="whitespace-nowrap pt-[5px] font-heading text-sm font-bold text-[#2F2B24]">
                {a.title}
              </span>
            </div>

            <div
              className={`whitespace-pre-line text-[11.5px] leading-[1.85] text-[#5A5348] lg:mt-0 lg:block lg:min-w-0 lg:pt-[5px] lg:text-xs ${
                mobileAccordion ? (open ? "mt-2.5 block" : "hidden") : "mt-2.5 block"
              }`}
            >
              {a.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}
