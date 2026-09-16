import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { MessageOwnerButton } from "./message-owner-button";
import type { CircleDetailView } from "@/lib/circles";

const recruitInfoRows = (circle: CircleDetailView) =>
  [
    { key: "target", icon: "groups", label: "募集対象", value: circle.recruitTarget },
    { key: "capacity", icon: "group_add", label: "募集人数", value: circle.recruitCapacity },
    { key: "cost", icon: "payments", label: "参加費", value: circle.recruitCost },
    { key: "apply", icon: "assignment", label: "申し込み方法", value: circle.recruitHowToApply },
  ].filter((row) => row.value);

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

        {/* デスクトップ */}
        <div className="hidden lg:block lg:border-t lg:border-cb-border">
          {infoRows.map((row) => (
            <div
              key={row.key}
              className="lg:grid lg:grid-cols-[36px_100px_minmax(0,1fr)] lg:items-start lg:gap-3.5 lg:border-b lg:border-cb-border lg:py-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cb-accent-soft">
                <MaterialSymbol name={row.icon} size={17} className="text-cb-accent" />
              </span>
              <span className="pt-1.5 text-[12.5px] font-bold text-[#3B352C]">{row.label}</span>
              <div className="pt-[5px] text-xs leading-[1.75] text-[#4B453C] whitespace-pre-line">{row.value}</div>
            </div>
          ))}
          <div className="lg:grid lg:grid-cols-[36px_100px_minmax(0,1fr)] lg:items-start lg:gap-3.5 lg:py-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cb-accent-soft">
              <MaterialSymbol name="person_search" size={17} className="text-cb-accent" />
            </span>
            <span className="pt-1.5 text-[12.5px] font-bold text-[#3B352C]">求める方</span>
            <div className="flex flex-col gap-[7px] pt-[5px]">
              {circle.requirements.map((req) => (
                <div key={req} className="flex items-start gap-[7px] text-xs leading-[1.75] text-[#4B453C]">
                  <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-cb-accent" />
                  {req}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* モバイル */}
        <div className="mt-4 flex flex-col gap-3 lg:hidden">
          {infoRows.map((row) => (
            <div key={row.key} className="rounded-xl border border-cb-border bg-cb-surface p-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cb-accent-soft">
                  <MaterialSymbol name={row.icon} size={15} className="text-cb-accent" />
                </span>
                <span className="text-xs font-bold text-[#3B352C]">{row.label}</span>
              </div>
              <div className="mt-2.5 pl-[38px] text-[11.5px] leading-[1.75] text-[#4B453C] whitespace-pre-line">
                {row.value}
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-cb-border bg-cb-surface p-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cb-accent-soft">
                <MaterialSymbol name="person_search" size={15} className="text-cb-accent" />
              </span>
              <span className="text-xs font-bold text-[#3B352C]">求める方</span>
            </div>
            <div className="mt-2.5 flex flex-col gap-[7px] pl-[38px]">
              {circle.requirements.map((req) => (
                <div key={req} className="flex items-start gap-[7px] text-[11.5px] leading-[1.75] text-[#4B453C]">
                  <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-cb-accent" />
                  {req}
                </div>
              ))}
            </div>
          </div>
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
