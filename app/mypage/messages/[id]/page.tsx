import { MessagesHeader } from "@/components/messages/messages-header";
import { ChatHeader } from "@/components/messages/chat-header";
import { ChatMessages } from "@/components/messages/chat-messages";
import { ChatInput } from "@/components/messages/chat-input";
import { MessagesDesktopPanels } from "@/components/messages/messages-desktop-panels";

// 実データ接続まではidに関わらずモックの会話を表示する。
// デスクトップは常に3カラム表示、モバイルはこの個別チャット画面のみを表示する
// （下部ナビは表示せず、戻るボタンで /mypage/messages に戻る）。
export default async function MessageThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <MessagesHeader showMobileBar={false} />

      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>

      <MessagesDesktopPanels activeId={id} />
    </div>
  );
}
