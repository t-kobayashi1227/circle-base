"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { FavoritesSort } from "@/lib/circle-favorites";
import { favoritesHref, type FavoritesFilter } from "@/components/favorites/favorites-href";

const sortOptions: { value: FavoritesSort; label: string }[] = [
  { value: "new", label: "登録が新しい順" },
  { value: "old", label: "登録が古い順" },
];

export function FavoritesToolbar({
  filter,
  sort,
  counts,
}: {
  filter: FavoritesFilter;
  sort: FavoritesSort;
  counts: Record<FavoritesFilter, number>;
}) {
  const router = useRouter();
  const tabs: { value: FavoritesFilter; icon: string; label: string }[] = [
    { value: "all", icon: "diversity_3", label: "すべて" },
    { value: "circle", icon: "group", label: "サークル" },
    { value: "event", icon: "calendar_month", label: "イベント" },
  ];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-2.5">
      <div className="flex items-center gap-2 lg:gap-2.5">
        {tabs.map((tab) => {
          const active = tab.value === filter;
          return (
            <Link
              key={tab.value}
              href={favoritesHref(tab.value, sort)}
              aria-current={active ? "page" : undefined}
              className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-1.5 py-[11px] text-[11.5px] lg:flex-none lg:gap-[7px] lg:px-5 lg:text-[12.5px] ${
                active
                  ? "bg-cb-accent font-bold text-white"
                  : "border border-cb-input-border bg-white font-medium text-[#3B352C] hover:border-cb-accent hover:text-cb-accent-dark"
              }`}
            >
              <MaterialSymbol name={tab.icon} size={15} className="lg:text-base" />
              {tab.label}（{counts[tab.value]}）
            </Link>
          );
        })}
      </div>
      <div className="relative lg:ml-auto">
        <select
          value={sort}
          aria-label="並び替え"
          onChange={(e) => router.push(favoritesHref(filter, e.target.value as FavoritesSort))}
          className="w-full appearance-none rounded-lg border border-cb-input-border bg-white py-3 pl-[15px] pr-10 text-xs text-[#3B352C] lg:py-[11px] lg:pl-4"
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
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
        />
      </div>
    </div>
  );
}
