"use client";

import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { buildListHref, type ListParams } from "@/lib/url-params";

const sortOptions: { value: "new" | "updated"; label: string }[] = [
  { value: "new", label: "新着順" },
  { value: "updated", label: "更新日順" },
];

// /circles 用の並び替え。デザインはマイページ「主催中のサークル」の並び替え（OwnedCirclesToolbar）に合わせている。
export function SortSelect({
  current,
  sort,
  basePath = "/circles",
}: {
  current: ListParams;
  sort: "new" | "updated";
  basePath?: string;
}) {
  const router = useRouter();

  return (
    <div className="mt-4 flex items-center justify-end gap-3.5">
      <span className="whitespace-nowrap text-[11.5px] text-cb-ink lg:text-xs">並び替え</span>
      <div className="relative">
        <select
          value={sort}
          onChange={(e) => {
            const value = e.target.value;
            router.push(buildListHref(basePath, current, { sort: value === "new" ? null : value, page: null }));
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
  );
}
