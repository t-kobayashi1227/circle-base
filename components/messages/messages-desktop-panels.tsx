import { ThreadList } from "./thread-list";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { CircleInfoSidebar } from "./circle-info-sidebar";

// デスクトップは常にスレッド一覧・チャット・サークル情報の3カラムを表示する
// （モバイルは一覧画面／個別チャット画面の2画面に分かれるが、デスクトップは分割しない）。
export function MessagesDesktopPanels({ activeId }: { activeId: string }) {
  return (
    <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[288px_minmax(0,1fr)_246px] lg:bg-white">
      <ThreadList activeId={activeId} />
      <div className="flex min-w-0 flex-col">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
      <CircleInfoSidebar />
    </div>
  );
}
