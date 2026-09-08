import { CircleImage } from "@/components/circle-image";
import type { MessageRow } from "@/lib/messages";

function formatDateLabel(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("ja-JP", { month: "long", day: "numeric", weekday: "short" }).format(date);
}

function formatTimeLabel(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

export function ChatMessages({
  messages,
  currentUserId,
  otherDisplayName,
  otherAvatarPath,
}: {
  messages: MessageRow[];
  currentUserId: string;
  otherDisplayName: string;
  otherAvatarPath: string | null;
}) {
  const items = messages.map((m, i) => {
    const dateLabel = formatDateLabel(m.created_at);
    const prevDateLabel = i > 0 ? formatDateLabel(messages[i - 1].created_at) : null;
    return { message: m, dateLabel, showDate: dateLabel !== prevDateLabel };
  });

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-cb-surface px-4 py-4 lg:gap-4 lg:px-[22px] lg:py-5">
      {messages.length === 0 ? (
        <p className="self-center text-[12px] text-cb-muted">まだメッセージはありません。最初のメッセージを送ってみましょう。</p>
      ) : null}

      {items.map(({ message: m, dateLabel, showDate }) => {
        const isMe = m.sender_id === currentUserId;

        return (
          <div key={m.id} className="contents">
            {showDate ? (
              <span className="self-center rounded-[14px] bg-[#F3EDE2] px-3.5 py-1.5 text-[11px] text-cb-muted-2">
                {dateLabel}
              </span>
            ) : null}
            <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`grid max-w-[82%] gap-2.5 lg:max-w-[75%] ${
                  isMe ? "grid-cols-[minmax(0,1fr)]" : "grid-cols-[32px_minmax(0,1fr)]"
                }`}
              >
                {!isMe ? (
                  <div className="mt-5 h-8 w-8 overflow-hidden rounded-full">
                    <CircleImage path={otherAvatarPath} alt={otherDisplayName} iconSize={10} />
                  </div>
                ) : null}
                <div className="min-w-0">
                  {!isMe ? <div className="mb-[7px] text-[11px] text-cb-muted-2">{otherDisplayName}さん</div> : null}
                  <div
                    className={`whitespace-pre-line px-4 py-3.5 text-[12.5px] leading-[1.85] text-[#3B352C] ${
                      isMe
                        ? "rounded-[12px_4px_12px_12px] border border-[#F5DCBC] bg-[#FBE9D2]"
                        : "rounded-[4px_12px_12px_12px] border border-[#EFE7DA] bg-white"
                    }`}
                  >
                    {m.content}
                  </div>
                  <div className={`mt-[7px] flex items-center gap-2.5 text-[10px] text-cb-placeholder ${isMe ? "justify-end" : "justify-start"}`}>
                    <span>{formatTimeLabel(m.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
