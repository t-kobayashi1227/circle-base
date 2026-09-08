import Link from "next/link";
import { CircleImage } from "@/components/circle-image";
import type { ConversationSummary } from "@/lib/messages";

function formatThreadTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  if (sameDay) {
    return new Intl.DateTimeFormat("ja-JP", { hour: "2-digit", minute: "2-digit" }).format(date);
  }
  return new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric" }).format(date);
}

function ThreadListItem({ thread, activeId }: { thread: ConversationSummary; activeId?: string }) {
  const active = thread.id === activeId;
  const title = thread.circleName ? `${thread.circleName}（${thread.otherDisplayName}さん）` : `${thread.otherDisplayName}さん`;

  return (
    <Link
      href={`/mypage/messages/${thread.id}`}
      className={`grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-b border-[#F5EFE5] border-l-[3px] px-4 py-3.5 hover:bg-[#FDF9F2] lg:grid-cols-[42px_minmax(0,1fr)] lg:gap-[11px] lg:px-[18px] lg:py-3.5 ${
        active ? "border-l-cb-accent bg-[#FDF6EA]" : "border-l-transparent"
      }`}
    >
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full lg:h-[42px] lg:w-[42px]">
        <CircleImage path={thread.otherAvatarPath} alt={thread.otherDisplayName} iconSize={12} />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="min-w-0 flex-1 truncate text-[13px] font-bold text-[#2F2B24] lg:text-[12.5px]">{title}</span>
          <span className="shrink-0 text-[10.5px] text-cb-placeholder lg:text-[10px]">
            {formatThreadTime(thread.lastMessageAt)}
          </span>
        </div>
        <div className="mt-[7px] truncate text-[11.5px] leading-[1.7] text-cb-muted lg:text-[11px] lg:leading-[1.65]">
          {thread.lastMessage ?? "まだメッセージはありません"}
        </div>
      </div>
    </Link>
  );
}

export function ThreadList({ conversations, activeId }: { conversations: ConversationSummary[]; activeId?: string }) {
  return (
    <div className="flex min-w-0 flex-col bg-white lg:border-r lg:border-cb-border">
      <div className="hidden items-center px-[18px] pb-3.5 pt-5 lg:flex">
        <h1 className="font-heading text-[19px] font-bold text-[#2F2B24]">メッセージ一覧</h1>
      </div>
      <div className="flex items-center bg-cb-header px-[18px] pb-3 pt-3.5 lg:hidden">
        <h1 className="font-heading text-xl font-bold text-[#2F2B24]">メッセージ</h1>
      </div>

      <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {conversations.length === 0 ? (
          <p className="px-[18px] py-8 text-center text-[12.5px] text-cb-muted">
            まだメッセージはありません。サークル詳細ページから主催者にメッセージを送ってみましょう。
          </p>
        ) : (
          conversations.map((thread) => <ThreadListItem key={thread.id} thread={thread} activeId={activeId} />)
        )}
      </div>

      {/* 安心バナー（デスクトップのみ） */}
      <div className="mx-3.5 mb-[18px] mt-3.5 hidden rounded-[10px] border border-[#F2E6D2] bg-[#FDF8F0] px-[15px] py-3.5 lg:block">
        <div className="flex items-start gap-2">
          <span className="text-[11.5px] font-bold text-[#3B352C]">安心してメッセージをやり取りしよう</span>
        </div>
        <div className="mt-2 text-[10.5px] leading-[1.8] text-cb-muted-2">
          迷惑行為を見つけた場合は、通報・ブロックができます。
        </div>
      </div>
    </div>
  );
}
