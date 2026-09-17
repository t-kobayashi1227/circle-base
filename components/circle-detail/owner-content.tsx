import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import type { CircleDetailView } from "@/lib/circles";

export function OwnerContent({ circle }: { circle: CircleDetailView }) {
  const bio = circle.owner.bio || "自己紹介はまだ登録されていません。";
  const ownerMessageLines = circle.ownerMessage
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section className="px-4 pb-8 pt-[18px] lg:px-8 lg:pb-10 lg:pt-[26px]">
      <h2 className="flex items-center gap-2 font-heading text-[17px] font-bold text-cb-ink lg:gap-[9px] lg:text-[19px]">
        <MaterialSymbol name="person" filled size={20} className="text-cb-accent lg:text-[21px]" />
        主催者情報
      </h2>
      <p className="mt-2 text-[11.5px] leading-[1.8] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px]">
        このサークルを運営している主催者の情報です。
      </p>

      <div className="mt-4 flex flex-col gap-6 lg:mt-5 lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3.5 lg:gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full lg:h-16 lg:w-16">
              <CircleImage path={circle.owner.avatarPath} alt={`${circle.owner.name}さんの顔写真`} iconSize={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="truncate font-heading text-[15.5px] font-bold text-[#2F2B24] lg:text-[17px]">
                  {circle.owner.name}
                </span>
                <span className="shrink-0 rounded-[5px] border border-[#F0D9AF] bg-cb-accent-soft px-2.5 py-[3px] text-[10px] font-bold text-cb-accent-dark lg:text-[10.5px]">
                  主催者
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-cb-muted-2 lg:mt-2 lg:text-xs">
                <MaterialSymbol name="location_on" filled size={15} className="text-cb-accent lg:text-base" />
                {circle.owner.area}
              </div>
            </div>
          </div>

          <div className="mt-3.5 text-xs leading-[1.95] text-[#4B453C] lg:mt-[18px] lg:text-[12.5px]">{bio}</div>

          {circle.owner.interests.length > 0 ? (
            <div className="mt-[18px] lg:mt-[22px]">
              <div className="flex items-center gap-2 text-[12.5px] font-bold text-cb-ink">
                <span className="h-3.5 w-[3px] rounded-sm bg-cb-accent" />
                好きなこと・得意なこと
              </div>
              <div className="mt-[11px] flex flex-wrap gap-2 lg:mt-3 lg:gap-[9px]">
                {circle.owner.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-2xl border border-[#D3E2EF] bg-[#EDF3F9] px-3 py-1.5 text-[11px] font-medium text-[#4D6B8A] lg:px-[13px] lg:text-[11.5px]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-xl border border-cb-border bg-cb-surface px-4 py-4 lg:px-[22px] lg:py-5">
            <div className="flex items-center gap-2">
              <MaterialSymbol name="chat_bubble" filled size={18} className="text-cb-accent lg:text-[19px]" />
              <h3 className="font-heading text-[14px] font-bold text-cb-ink lg:text-[15px]">主催者からのメッセージ</h3>
            </div>
            {ownerMessageLines.length > 0 ? (
              <>
                <div className="mt-3 flex flex-col gap-2.5 text-xs leading-[1.9] text-[#4B453C] lg:mt-3.5 lg:text-[12.5px]">
                  {ownerMessageLines.map((paragraph, index) => (
                    <p key={index} className="m-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-2.5 text-right text-xs font-bold text-[#3B352C] lg:mt-4 lg:text-[12.5px]">
                  {circle.owner.name}
                </div>
              </>
            ) : (
              <p className="mt-3 text-xs text-cb-muted lg:mt-3.5 lg:text-[12.5px]">メッセージはまだ登録されていません。</p>
            )}
          </div>

          <div className="rounded-xl border border-cb-border bg-cb-surface px-4 py-4 lg:px-[22px] lg:py-5">
            <div className="flex items-center gap-2">
              <MaterialSymbol name="link" size={18} className="text-[#4D6B8A] lg:text-[19px]" />
              <h3 className="font-heading text-[14px] font-bold text-cb-ink lg:text-[15px]">主催者のSNS・連絡先</h3>
            </div>
            {circle.owner.contactEmail ? (
              <a
                href={`mailto:${circle.owner.contactEmail}`}
                className="mt-3 flex items-center gap-2 text-xs font-medium text-[#4D6B8A] hover:underline lg:text-[12.5px]"
              >
                <MaterialSymbol name="mail" size={16} className="text-[#4D6B8A]" />
                {circle.owner.contactEmail}
              </a>
            ) : null}
            <div className="mt-2.5 text-[10.5px] leading-[1.7] text-cb-muted-3 lg:mt-2.5 lg:text-[11px]">
              ※ サークル内でのやり取りは、サイトのメッセージ機能をご利用ください。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
