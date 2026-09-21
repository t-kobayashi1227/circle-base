"use client";

import { useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { FaqItem } from "@/lib/legal-mock-data";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-cb-border bg-white px-6 py-10 text-center text-xs text-cb-muted-2 lg:mt-[22px] lg:text-[12.5px]">
        該当するご質問が見つかりませんでした。
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col rounded-xl border border-cb-border bg-white lg:mt-[22px]">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="border-b border-[#F5EFE5] last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center gap-3 px-4 py-[15px] text-left hover:bg-[#FDF9F3] lg:gap-4 lg:px-[22px] lg:py-[18px]"
            >
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-cb-accent text-[11px] font-bold text-white lg:h-[26px] lg:w-[26px] lg:text-[13px]">
                Q
              </span>
              <span className="min-w-0 flex-1 text-[12.5px] leading-[1.5] text-[#3B352C] lg:text-[13.5px] lg:leading-normal">
                {item.question}
              </span>
              <MaterialSymbol
                name="expand_more"
                size={18}
                className={`shrink-0 text-[#B3A996] transition-transform lg:hidden ${open ? "rotate-180" : ""}`}
              />
              <MaterialSymbol
                name="expand_more"
                size={20}
                className={`hidden shrink-0 text-[#B3A996] transition-transform lg:inline-block ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && (
              <div className="flex items-start gap-3 px-4 pb-[15px] lg:gap-4 lg:px-[22px] lg:pb-[18px]">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#F5EFE5] text-[11px] font-bold text-cb-muted-2 lg:h-[26px] lg:w-[26px] lg:text-[13px]">
                  A
                </span>
                <p className="m-0 min-w-0 flex-1 whitespace-pre-line text-[11.5px] leading-[1.8] text-cb-muted-2 lg:text-xs lg:leading-[1.9]">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
