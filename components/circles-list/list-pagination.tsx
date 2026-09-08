import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { buildListHref, type ListParams } from "@/lib/url-params";

export function ListPagination({
  current,
  page,
  pageCount,
  basePath = "/circles",
}: {
  current: ListParams;
  page: number;
  pageCount: number;
  basePath?: string;
}) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 2,
  );
  const hrefFor = (p: number) => buildListHref(basePath, current, { page: p === 1 ? null : String(p) });

  return (
    <div className="mt-[26px] flex flex-wrap items-center justify-center gap-[9px]">
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1)}
          aria-label="前のページ"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white hover:border-cb-accent"
        >
          <MaterialSymbol name="chevron_left" size={18} className="text-cb-placeholder" />
        </Link>
      ) : null}
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-[9px]">
          {i > 0 && pages[i - 1] !== p - 1 ? (
            <span className="w-[22px] text-center text-[12.5px] text-cb-placeholder">…</span>
          ) : null}
          {p === page ? (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cb-accent text-[12.5px] font-bold text-white">
              {p}
            </span>
          ) : (
            <Link
              href={hrefFor(p)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white text-[12.5px] text-cb-muted hover:border-cb-accent hover:text-cb-accent-dark"
            >
              {p}
            </Link>
          )}
        </span>
      ))}
      {page < pageCount ? (
        <Link
          href={hrefFor(page + 1)}
          aria-label="次のページ"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DCCB] bg-white hover:border-cb-accent"
        >
          <MaterialSymbol name="chevron_right" size={18} className="text-cb-muted-2" />
        </Link>
      ) : null}
    </div>
  );
}
