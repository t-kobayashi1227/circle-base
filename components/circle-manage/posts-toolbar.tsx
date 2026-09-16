import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function PostsToolbar({ postHref }: { postHref: string }) {
  return (
    <>
      {/* デスクトップ */}
      <div className="hidden items-end justify-between border-b border-[#EFE7DA] lg:flex">
        <div className="flex gap-1.5">
          <button
            type="button"
            className="border-b-2 border-cb-accent px-[18px] py-[11px] text-[13px] font-bold text-cb-accent-dark"
          >
            一覧表示
          </button>
          <button type="button" className="px-[18px] py-[11px] text-[13px] text-cb-muted-2 hover:text-cb-accent-dark">
            カレンダー表示
          </button>
        </div>
        <Link
          href={postHref}
          className="mb-2.5 flex items-center gap-2 rounded-lg bg-cb-accent px-[22px] py-3 text-[13px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover"
        >
          <MaterialSymbol name="add" size={17} />
          投稿する
        </Link>
      </div>

      {/* モバイル */}
      <div className="flex items-center justify-between gap-3 bg-cb-header px-4 pt-1.5 lg:hidden">
        <div className="flex gap-3.5">
          <button
            type="button"
            className="border-b-2 border-cb-accent px-0.5 pt-2.5 pb-[11px] text-[13px] font-bold text-cb-accent-dark"
          >
            一覧表示
          </button>
          <button type="button" className="px-0.5 pt-2.5 pb-[11px] text-[13px] text-cb-muted-2">
            カレンダー表示
          </button>
        </div>
        <Link
          href={postHref}
          className="mb-[7px] flex items-center gap-1.5 whitespace-nowrap rounded-[7px] bg-cb-accent px-[15px] py-[9px] text-[12.5px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)]"
        >
          <MaterialSymbol name="add" size={16} />
          投稿する
        </Link>
      </div>
    </>
  );
}
