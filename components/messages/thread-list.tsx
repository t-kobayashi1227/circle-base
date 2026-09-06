import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { threads } from "@/lib/messages-mock-data";

function ThreadListItem({ thread, activeId }: { thread: (typeof threads)[number]; activeId: string }) {
  const active = thread.id === activeId;

  return (
    <Link
      href={`/mypage/messages/${thread.id}`}
      className={`grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-b border-[#F5EFE5] border-l-[3px] px-4 py-3.5 hover:bg-[#FDF9F2] lg:grid-cols-[42px_minmax(0,1fr)] lg:gap-[11px] lg:px-[18px] lg:py-3.5 ${
        active ? "border-l-cb-accent bg-[#FDF6EA]" : "border-l-transparent"
      }`}
    >
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full lg:h-[42px] lg:w-[42px]">
        <PhotoPlaceholder caption={thread.photoCaption} iconSize={12} />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="min-w-0 flex-1 truncate text-[13px] font-bold text-[#2F2B24] lg:text-[12.5px]">
            {thread.name}
          </span>
          <span className="shrink-0 text-[10.5px] text-cb-placeholder lg:text-[10px]">{thread.time}</span>
        </div>
        <div className="mt-[7px] flex items-end gap-2">
          <div className="min-w-0 flex-1 whitespace-pre-line text-[11.5px] leading-[1.7] text-cb-muted lg:text-[11px] lg:leading-[1.65]">
            {thread.preview}
          </div>
          {thread.unread ? (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-cb-accent px-[5px] text-[10.5px] font-bold text-white lg:h-[18px] lg:min-w-[18px] lg:text-[10px]">
              {thread.unread}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function ThreadList({ activeId }: { activeId: string }) {
  return (
    <div className="flex min-w-0 flex-col bg-white lg:border-r lg:border-cb-border">
      {/* デスクトップのみのタイトル行（新規作成ボタン付き） */}
      <div className="hidden items-center justify-between px-[18px] pb-3.5 pt-5 lg:flex">
        <h1 className="font-heading text-[19px] font-bold text-[#2F2B24]">メッセージ一覧</h1>
        <button
          type="button"
          aria-label="新規メッセージ"
          className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-[#F0D9AF] bg-cb-accent-soft hover:border-cb-accent"
        >
          <MaterialSymbol name="edit_square" size={19} className="text-cb-accent" />
        </button>
      </div>

      {/* モバイルのみのタイトル行 */}
      <div className="flex items-center justify-between bg-cb-header px-[18px] pb-3 pt-3.5 lg:hidden">
        <h1 className="font-heading text-xl font-bold text-[#2F2B24]">メッセージ</h1>
        <button
          type="button"
          aria-label="新規メッセージ"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-[#F0D9AF] bg-cb-accent-soft"
        >
          <MaterialSymbol name="edit_square" size={20} className="text-cb-accent" />
        </button>
      </div>

      <div className="mx-4 flex items-center gap-2.5 rounded-lg border border-cb-input-border bg-white px-3 py-3 text-xs text-cb-placeholder lg:mx-[18px] lg:py-[11px]">
        <MaterialSymbol name="search" size={18} className="text-cb-placeholder" />
        メッセージを検索
      </div>

      <div className="mx-4 mt-4 flex gap-[22px] border-b border-cb-border lg:mx-[18px] lg:mt-4">
        <button type="button" className="flex items-center gap-1.5 border-b-2 border-cb-accent pb-[11px] text-[13px] font-bold text-cb-accent-dark lg:text-[12.5px]">
          すべて
          <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E04B3C] px-1 text-[9.5px] text-white">3</span>
        </button>
        <button type="button" className="flex items-center gap-1.5 pb-[11px] text-[13px] text-cb-ink-soft lg:text-[12.5px]">
          未読
          <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E04B3C] px-1 text-[9.5px] text-white">3</span>
        </button>
        <button type="button" className="pb-[11px] text-[13px] text-cb-ink-soft lg:text-[12.5px]">
          お気に入り
        </button>
      </div>

      <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {threads.map((thread) => (
          <ThreadListItem key={thread.id} thread={thread} activeId={activeId} />
        ))}
      </div>

      {/* 安心バナー（デスクトップのみ） */}
      <div className="mx-3.5 mb-[18px] mt-3.5 hidden rounded-[10px] border border-[#F2E6D2] bg-[#FDF8F0] px-[15px] py-3.5 lg:block">
        <div className="flex items-start gap-2">
          <MaterialSymbol name="verified_user" size={17} className="text-[#3E9E7A]" />
          <div className="text-[11.5px] font-bold text-[#3B352C]">安心してメッセージをやり取りしよう</div>
        </div>
        <div className="mt-2 text-[10.5px] leading-[1.8] text-cb-muted-2">
          迷惑行為を見つけた場合は、通報・ブロックができます。
        </div>
        <a href="#" className="mt-2.5 inline-flex items-center gap-0.5 text-[11px] font-bold text-cb-accent-dark hover:text-[#8E5606]">
          通報・ブロックについて
          <MaterialSymbol name="chevron_right" size={14} />
        </a>
      </div>
    </div>
  );
}
