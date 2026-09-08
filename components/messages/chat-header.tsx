import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import type { ConversationSummary } from "@/lib/messages";

export function ChatHeader({ conversation }: { conversation: ConversationSummary }) {
  const title = conversation.circleName
    ? `${conversation.circleName}（${conversation.otherDisplayName}さん）`
    : `${conversation.otherDisplayName}さん`;

  return (
    <div className="border-b border-cb-border bg-white">
      {/* デスクトップ */}
      <div className="hidden items-center gap-3.5 px-5 py-3.5 lg:flex">
        <div className="h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full">
          <CircleImage path={conversation.otherAvatarPath} alt={conversation.otherDisplayName} iconSize={14} />
        </div>
        <div className="min-w-0">
          <div className="whitespace-nowrap font-heading text-base font-bold text-[#2F2B24]">{title}</div>
        </div>
      </div>

      {/* モバイル */}
      <div className="grid grid-cols-[auto_42px_minmax(0,1fr)] items-center gap-[11px] px-4 py-2 lg:hidden">
        <Link href="/mypage/messages" aria-label="戻る">
          <MaterialSymbol name="arrow_back_ios_new" size={24} className="text-[#3B352C]" />
        </Link>
        <div className="h-[42px] w-[42px] overflow-hidden rounded-full">
          <CircleImage path={conversation.otherAvatarPath} alt={conversation.otherDisplayName} iconSize={12} />
        </div>
        <div className="min-w-0 truncate font-heading text-[14.5px] font-bold leading-[1.45] text-[#2F2B24]">{title}</div>
      </div>
    </div>
  );
}
