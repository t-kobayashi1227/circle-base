import { notFound, redirect } from "next/navigation";
import { MessagesHeader } from "@/components/messages/messages-header";
import { ChatHeader } from "@/components/messages/chat-header";
import { ChatMessages } from "@/components/messages/chat-messages";
import { ChatInput } from "@/components/messages/chat-input";
import { MobileThreadActions } from "@/components/messages/mobile-thread-actions";
import { MessagesDesktopPanels } from "@/components/messages/messages-desktop-panels";
import { getConversations, getMessages } from "@/lib/messages";
import { getCurrentUser } from "@/lib/auth";

// デスクトップは常に3カラム表示、モバイルはこの個別チャット画面のみを表示する
// （下部ナビは表示せず、戻るボタンで /mypage/messages に戻る）。
export default async function MessageThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const conversations = await getConversations(user.id);
  const active = conversations.find((c) => c.id === id) ?? null;
  if (!active) notFound();

  const messages = await getMessages(id);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <MessagesHeader showMobileBar={false} />

      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <ChatHeader conversation={active} />
        <MobileThreadActions conversation={active} />
        <ChatMessages
          messages={messages}
          currentUserId={user.id}
          otherDisplayName={active.otherDisplayName}
          otherAvatarPath={active.otherAvatarPath}
        />
        <ChatInput conversationId={active.id} />
      </div>

      <MessagesDesktopPanels
        conversations={conversations}
        activeConversation={active}
        messages={messages}
        currentUserId={user.id}
      />
    </div>
  );
}
