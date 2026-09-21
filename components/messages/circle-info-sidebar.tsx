import Link from "next/link";
import { CircleImage } from "@/components/circle-image";
import { ReportDialog } from "@/components/report-dialog";
import { BlockUserButton } from "./block-user-button";
import { InviteToCircleButton } from "./invite-to-circle-button";
import type { ConversationSummary } from "@/lib/messages";

export function CircleInfoSidebar({
  conversation,
  isMember,
}: {
  conversation: ConversationSummary;
  isMember: boolean;
}) {
  return (
    <div className="hidden flex-col overflow-hidden border-l border-cb-border bg-cb-bg px-[18px] py-5 lg:flex">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 overflow-hidden rounded-full">
          <CircleImage path={conversation.otherAvatarPath} alt={conversation.otherDisplayName} iconSize={18} />
        </div>
        <div className="mt-3 font-heading text-sm font-bold text-[#2F2B24]">{conversation.otherDisplayName}さん</div>

        {conversation.circleName && conversation.circleSlug ? (
          <>
            <div className="mt-[7px] text-[10.5px] text-cb-muted-3">{conversation.circleName}</div>
            <Link
              href={`/circle/${conversation.circleSlug}`}
              className="mt-[13px] flex w-full items-center justify-center rounded-lg border border-[#E0D6C6] bg-white py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
            >
              サークル詳細を見る
            </Link>
          </>
        ) : null}

        {conversation.isCircleOwner && conversation.circleId ? (
          <div className="mt-3">
            <InviteToCircleButton
              circleId={conversation.circleId}
              userId={conversation.otherUserId}
              initialIsMember={isMember}
            />
          </div>
        ) : null}
      </div>

      <div className="mt-5 border-t border-[#EFE7DA] pt-[18px]">
        <div className="font-heading text-[13.5px] font-bold text-cb-ink">その他</div>
        <div className="mt-[13px] flex flex-col gap-3.5">
          <ReportDialog
            targetType="user"
            targetId={conversation.otherUserId}
            triggerLabel="通報する"
            triggerIcon="flag"
            triggerClassName="flex items-center gap-2.5 text-left text-[11.5px] text-cb-ink-soft"
          />
          <BlockUserButton userId={conversation.otherUserId} />
        </div>
      </div>

      <div className="mt-5 rounded-[10px] border border-[#F2E6D2] bg-[#FDF8F0] px-[15px] py-3.5">
        <div className="text-[11.5px] font-bold text-[#3B352C]">安心してメッセージをやり取りしよう</div>
        <div className="mt-2 text-[10.5px] leading-[1.8] text-cb-muted-2">
          迷惑行為を見つけた場合は、通報・ブロックができます。
        </div>
      </div>
    </div>
  );
}
