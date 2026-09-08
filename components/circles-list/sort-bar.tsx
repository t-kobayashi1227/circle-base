import Link from "next/link";
import { buildListHref, type ListParams } from "@/lib/url-params";

const sortOptions: { value: "new" | "updated"; label: string }[] = [
  { value: "new", label: "新着順" },
  { value: "updated", label: "更新日順" },
];

export function SortBar({
  current,
  sort,
  basePath = "/circles",
}: {
  current: ListParams;
  sort: "new" | "updated";
  basePath?: string;
}) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-[10px] border border-cb-border bg-cb-surface px-4 py-3">
      <span className="whitespace-nowrap text-xs text-cb-muted-2">並び替え：</span>
      <div className="flex gap-2">
        {sortOptions.map((opt) => {
          const active = opt.value === sort;
          return (
            <Link
              key={opt.value}
              href={buildListHref(basePath, current, { sort: opt.value === "new" ? null : opt.value, page: null })}
              className={`whitespace-nowrap rounded-md px-3.5 py-[7px] text-xs hover:text-cb-accent-dark ${
                active ? "bg-cb-accent font-bold text-white" : "text-cb-ink-soft"
              }`}
            >
              {opt.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
