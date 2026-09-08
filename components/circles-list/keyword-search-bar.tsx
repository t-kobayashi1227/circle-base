import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { ListParams } from "@/lib/url-params";

// エリア別・カテゴリ別ランディングページ用の簡易キーワード検索フォーム。
// エリア／カテゴリ自体はURLで固定されているため、キーワードのみ受け付ける。
export function KeywordSearchBar({ basePath, current }: { basePath: string; current: ListParams }) {
  return (
    <form method="get" action={basePath} className="flex items-center gap-3 rounded-xl border border-cb-border bg-cb-surface p-[18px]">
      {current.sort ? <input type="hidden" name="sort" value={current.sort} /> : null}
      <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-cb-input-border px-[13px] py-3">
        <MaterialSymbol name="search" size={18} className="text-cb-placeholder" />
        <input
          type="text"
          name="q"
          defaultValue={current.q ?? ""}
          placeholder="キーワード（サークル名・活動内容など）"
          className="w-full min-w-0 truncate text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-[7px] whitespace-nowrap rounded-lg bg-cb-accent px-5 py-3 text-[13px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover"
      >
        <MaterialSymbol name="search" size={17} />
        検索
      </button>
    </form>
  );
}
