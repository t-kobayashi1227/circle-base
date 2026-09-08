import { redirect } from "next/navigation";
import { MessagesHeader } from "@/components/messages/messages-header";
import { ThreadList } from "@/components/messages/thread-list";
import { MessagesDesktopPanels } from "@/components/messages/messages-desktop-panels";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getConversations, getMessages } from "@/lib/messages";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "メッセージ" };

export default async function MessagesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const conversations = await getConversations(user.id);
  const active = conversations[0] ?? null;
  const messages = active ? await getMessages(active.id) : [];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <MessagesHeader />

      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <ThreadList conversations={conversations} />
      </div>

      <MessagesDesktopPanels
        conversations={conversations}
        activeConversation={active}
        messages={messages}
        currentUserId={user.id}
      />

      <MobileBottomNav activeHref="/mypage/messages" />
    </div>
  );
}
