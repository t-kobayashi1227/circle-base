import { ReportDialog } from "@/components/report-dialog";
import { BlockUserButton } from "./block-user-button";
import type { ConversationSummary } from "@/lib/messages";

// モバイルのチャット画面用。デスクトップは CircleInfoSidebar に同等の操作がある。
export function MobileThreadActions({ conversation }: { conversation: ConversationSummary }) {
  return (
    <div className="flex items-center gap-4 border-b border-cb-border bg-white px-4 py-2 lg:hidden">
      <ReportDialog
        targetType="user"
        targetId={conversation.otherUserId}
        triggerLabel="通報する"
        triggerIcon="flag"
        triggerClassName="flex items-center gap-1.5 text-[11px] text-cb-muted-2"
      />
      <BlockUserButton userId={conversation.otherUserId} className="text-[11px]" />
    </div>
  );
}
