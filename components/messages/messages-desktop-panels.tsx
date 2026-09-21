import { ThreadList } from "./thread-list";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { CircleInfoSidebar } from "./circle-info-sidebar";
import type { ConversationSummary, MessageRow } from "@/lib/messages";

// デスクトップは常にスレッド一覧・チャット・サークル情報の3カラムを表示する
// （モバイルは一覧画面／個別チャット画面の2画面に分かれるが、デスクトップは分割しない）。
export function MessagesDesktopPanels({
  conversations,
  activeConversation,
  messages,
  currentUserId,
  isMember,
}: {
  conversations: ConversationSummary[];
  activeConversation: ConversationSummary | null;
  messages: MessageRow[];
  currentUserId: string;
  isMember: boolean;
}) {
  return (
    <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[288px_minmax(0,1fr)_246px] lg:bg-white">
      <ThreadList conversations={conversations} activeId={activeConversation?.id} />
      {activeConversation ? (
        <>
          <div className="flex min-w-0 flex-col">
            <ChatHeader conversation={activeConversation} />
            <ChatMessages
              messages={messages}
              currentUserId={currentUserId}
              otherDisplayName={activeConversation.otherDisplayName}
              otherAvatarPath={activeConversation.otherAvatarPath}
            />
            <ChatInput conversationId={activeConversation.id} />
          </div>
          <CircleInfoSidebar conversation={activeConversation} isMember={isMember} />
        </>
      ) : (
        <div className="col-span-2 flex items-center justify-center text-[12.5px] text-cb-muted">
          左のスレッドを選択するとメッセージが表示されます。
        </div>
      )}
    </div>
  );
}
