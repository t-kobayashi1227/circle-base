import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { MessageOwnerButton } from "./message-owner-button";
import type { CircleDetailView } from "@/lib/circles";

type RecruitRow =
  | { key: string; icon: string; label: string; type: "text"; value: string }
  | { key: string; icon: string; label: string; type: "list"; items: string[] };

const recruitInfoRows = (circle: CircleDetailView): RecruitRow[] => {
  const rows: RecruitRow[] = [
    { key: "target", icon: "groups", label: "募集対象", type: "text", value: circle.recruitTarget },
    { key: "capacity", icon: "group_add", label: "募集人数", type: "text", value: circle.recruitCapacity },
    { key: "requirements", icon: "person_search", label: "求める方", type: "list", items: circle.requirements },
    { key: "cost", icon: "payments", label: "参加費", type: "text", value: circle.recruitCost },
    { key: "payment", icon: "credit_card", label: "支払い方法", type: "text", value: circle.paymentMethod },
    { key: "apply", icon: "assignment", label: "申し込み方法", type: "text", value: circle.recruitHowToApply },
  ];
  return rows.filter((row) => (row.type === "text" ? row.value.length > 0 : row.items.length > 0));
};

export function RecruitContent({
  circle,
  isLoggedIn = false,
  isOwner = false,
}: {
  circle: CircleDetailView;
  isLoggedIn?: boolean;
  isOwner?: boolean;
}) {
  const infoRows = recruitInfoRows(circle);

  return (
    <section className="px-4 pb-8 pt-[18px] lg:px-8 lg:pb-10 lg:pt-[26px]">
      <div className="max-w-[620px]">
        <h2 className="flex items-center gap-2 font-heading text-[17px] font-bold text-cb-ink lg:gap-[9px] lg:text-[19px]">
          <MaterialSymbol name="diversity_3" filled size={20} className="text-cb-accent lg:text-[21px]" />
          メンバー募集内容
        </h2>
        <p className="mt-2.5 text-xs leading-[1.85] text-cb-ink-soft lg:mt-3 lg:text-[12.5px]">
          {circle.recruitTagline || circle.tagline}
        </p>

        {/* 表形式 */}
        <div className="mt-4 overflow-hidden rounded-xl border border-cb-border lg:mt-5">
          {infoRows.map((row, index) => (
            <div
              key={row.key}
              className={`grid grid-cols-[92px_minmax(0,1fr)] lg:grid-cols-[150px_minmax(0,1fr)] ${
                index === 0 ? "" : "border-t border-cb-border"
              }`}
            >
              <div className="flex items-start gap-1.5 border-r border-cb-border bg-cb-chip px-2.5 py-3 lg:items-center lg:gap-2 lg:px-4 lg:py-4">
                <MaterialSymbol
                  name={row.icon}
                  size={15}
                  className="mt-[1px] shrink-0 text-cb-accent lg:mt-0 lg:text-base"
                />
                <span className="text-[11.5px] font-bold leading-[1.4] text-[#3B352C] lg:text-[12.5px]">
                  {row.label}
                </span>
              </div>
              {row.type === "text" ? (
                <div className="bg-white px-3 py-3 text-[11.5px] leading-[1.75] text-[#4B453C] whitespace-pre-line lg:px-4 lg:py-4 lg:text-xs">
                  {row.value}
                </div>
              ) : (
                <div className="flex flex-col gap-[7px] bg-white px-3 py-3 lg:px-4 lg:py-4">
                  {row.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-[7px] text-[11.5px] leading-[1.75] text-[#4B453C] lg:text-xs"
                    >
                      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-cb-accent" />
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5">
          {isOwner ? null : isLoggedIn ? (
            <MessageOwnerButton circleId={circle.id} ownerId={circle.ownerId} />
          ) : (
            <Link
              href="/login"
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-[9px] bg-cb-accent text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover lg:gap-2.5 lg:py-4 lg:text-[14.5px]"
            >
              <MaterialSymbol name="mail" size={18} className="lg:text-[19px]" />
              メッセージを送る（無料）
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
