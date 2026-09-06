"use client";

import { useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { sortOptions } from "@/lib/circles-list-mock-data";

export function SortBar() {
  const [selected, setSelected] = useState(sortOptions[0]);

  return (
    <>
      {/* デスクトップ */}
      <div className="mt-4 hidden items-center gap-3 rounded-[10px] border border-cb-border bg-cb-surface px-4 py-3 lg:flex">
        <span className="whitespace-nowrap text-xs text-cb-muted-2">並び替え：</span>
        <div className="flex gap-2">
          {sortOptions.map((label) => {
            const active = label === selected;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setSelected(label)}
                className={`whitespace-nowrap rounded-md px-3.5 py-[7px] text-xs hover:text-cb-accent-dark ${
                  active ? "bg-cb-accent font-bold text-white" : "text-cb-ink-soft"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex-1" />
        <button
          type="button"
          className="flex items-center gap-1.5 whitespace-nowrap rounded-[7px] border border-cb-accent bg-cb-accent-soft px-3.5 py-2 text-xs font-bold text-cb-accent-dark"
        >
          <MaterialSymbol name="grid_view" size={16} />
          カード表示
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 whitespace-nowrap rounded-[7px] border border-[#E6DCCB] bg-white px-3.5 py-2 text-xs text-cb-muted hover:border-cb-accent hover:text-cb-accent-dark"
        >
          <MaterialSymbol name="view_list" size={16} />
          リスト表示
        </button>
      </div>

      {/* モバイル */}
      <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 lg:hidden">
        <span className="text-xs text-cb-muted-2">並び替え：</span>
        <div className="relative">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full appearance-none rounded-lg border border-cb-input-border bg-white px-[14px] py-3.5 text-xs text-cb-ink focus:border-cb-accent focus:outline-none"
          >
            {sortOptions.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
          <MaterialSymbol
            name="expand_more"
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
          />
        </div>
      </div>
    </>
  );
}
