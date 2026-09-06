import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { chatMessages } from "@/lib/messages-mock-data";

export function ChatMessages() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-cb-surface px-4 py-4 lg:gap-4 lg:px-[22px] lg:py-5">
      {chatMessages.map((m) => {
        if (m.kind === "date") {
          return (
            <span
              key={m.id}
              className="self-center rounded-[14px] bg-[#F3EDE2] px-3.5 py-1.5 text-[11px] text-cb-muted-2"
            >
              {m.date}
            </span>
          );
        }

        const isMe = m.kind === "me";

        return (
          <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`grid max-w-[82%] gap-2.5 lg:max-w-[75%] ${
                isMe ? "grid-cols-[minmax(0,1fr)]" : "grid-cols-[32px_minmax(0,1fr)]"
              }`}
            >
              {!isMe ? (
                <div className="mt-5 h-8 w-8 overflow-hidden rounded-full">
                  <PhotoPlaceholder caption="山田さん" iconSize={10} />
                </div>
              ) : null}
              <div className="min-w-0">
                {!isMe ? <div className="mb-[7px] text-[11px] text-cb-muted-2">山田さん</div> : null}
                <div
                  className={`whitespace-pre-line px-4 py-3.5 text-[12.5px] leading-[1.85] text-[#3B352C] ${
                    isMe
                      ? "rounded-[12px_4px_12px_12px] border border-[#F5DCBC] bg-[#FBE9D2]"
                      : "rounded-[4px_12px_12px_12px] border border-[#EFE7DA] bg-white"
                  }`}
                >
                  {m.text}
                </div>
                <div className={`mt-[7px] flex items-center gap-2.5 text-[10px] text-cb-placeholder ${isMe ? "justify-end" : "justify-start"}`}>
                  {isMe ? <span>既読</span> : null}
                  <span>{m.time}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
