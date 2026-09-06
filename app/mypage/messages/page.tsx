import { MessagesHeader } from "@/components/messages/messages-header";
import { ThreadList } from "@/components/messages/thread-list";
import { MessagesDesktopPanels } from "@/components/messages/messages-desktop-panels";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { threads } from "@/lib/messages-mock-data";

// デスクトップは常に3カラム表示（先頭スレッドを選択中として表示）。
// モバイルはスレッド一覧のみを表示し、選択すると /mypage/messages/[id] に遷移する。
export default function MessagesPage() {
  const defaultActiveId = threads[0].id;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <MessagesHeader />

      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <ThreadList activeId={defaultActiveId} />
      </div>

      <MessagesDesktopPanels activeId={defaultActiveId} />

      <MobileBottomNav activeHref="/mypage/messages" messageBadge={3} />
    </div>
  );
}
