"use client";

import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { JoinedCirclesSort } from "@/lib/circle-members";

const sortOptions: { value: JoinedCirclesSort; label: string }[] = [
  { value: "new", label: "新しい順" },
  { value: "name", label: "名前順" },
];

export function JoinedCirclesToolbar({ sort }: { sort: JoinedCirclesSort }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="whitespace-nowrap font-heading text-sm font-bold text-cb-ink lg:text-[17px]">
        参加中のサークル一覧
      </h2>
      <div className="flex shrink-0 items-center gap-3.5">
        <span className="whitespace-nowrap text-[11.5px] text-cb-ink lg:text-xs">並び替え</span>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => {
              const value = e.target.value as JoinedCirclesSort;
              router.push(value === "name" ? "/mypage/circles/joined?sort=name" : "/mypage/circles/joined");
            }}
            className="appearance-none rounded-md border-2 border-cb-accent bg-white py-2.5 pl-3 pr-9 text-[11.5px] font-bold text-cb-ink lg:py-[11px] lg:pl-[15px] lg:text-xs"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <MaterialSymbol
            name="expand_more"
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-ink lg:text-[18px]"
          />
        </div>
      </div>
    </div>
  );
}
