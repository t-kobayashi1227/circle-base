import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function PostsToolbar({
  activityPostHref,
  messagePostHref,
}: {
  activityPostHref: string;
  messagePostHref: string;
}) {
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
        <div className="mb-2.5 flex gap-2.5">
          <Link
            href={messagePostHref}
            className="flex items-center gap-2 rounded-lg border border-[#E0D6C6] bg-white px-[18px] py-3 text-[13px] font-bold text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
          >
            <MaterialSymbol name="chat_bubble" size={17} />
            メッセージを投稿
          </Link>
          <Link
            href={activityPostHref}
            className="flex items-center gap-2 rounded-lg bg-cb-accent px-[22px] py-3 text-[13px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover"
          >
            <MaterialSymbol name="photo_camera" size={17} />
            活動の様子を投稿
          </Link>
        </div>
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
        <div className="mb-[7px] flex gap-1.5">
          <Link
            href={messagePostHref}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-[7px] border border-[#E0D6C6] bg-white px-[13px] py-[9px] text-[12.5px] font-bold text-cb-ink-soft"
          >
            <MaterialSymbol name="chat_bubble" size={15} />
            メッセージ
          </Link>
          <Link
            href={activityPostHref}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-[7px] bg-cb-accent px-[15px] py-[9px] text-[12.5px] font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)]"
          >
            <MaterialSymbol name="add" size={16} />
            活動の様子
          </Link>
        </div>
      </div>
    </>
  );
}
