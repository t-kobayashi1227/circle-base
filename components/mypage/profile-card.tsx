import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { CircleImage } from "@/components/circle-image";
import type { MypageProfile } from "@/lib/mypage";

function StatItem({
  icon,
  iconColor,
  label,
  value,
}: {
  icon: string;
  iconColor: string;
  label: string;
  value: number | string;
}) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <MaterialSymbol name={icon} size={17} style={{ color: iconColor }} />
      {label}
      <strong className="text-[13px] font-bold text-[#2F2B24]">{value}</strong>
    </span>
  );
}

export function ProfileCard({ profile }: { profile: MypageProfile }) {
  const bio = profile.bio || "自己紹介はまだ登録されていません。";

  return (
    <div className="overflow-hidden rounded-xl border border-cb-border bg-cb-surface lg:min-w-0">
      {/* デスクトップ: カバー写真の上に名前・自己紹介を重ねる */}
      <div className="relative hidden h-[132px] lg:block">
        <PhotoPlaceholder caption="カバー写真" iconSize={20} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(35,28,18,.55)_0%,rgba(35,28,18,.18)_58%,transparent_100%)]" />
        <div className="pointer-events-none absolute bottom-4 left-[150px] right-5">
          <span className="font-heading text-xl font-bold text-white">{profile.displayName}</span>
          <div className="mt-1.5 text-[11px] text-white/90">{bio}</div>
        </div>
      </div>

      {/* デスクトップ: アバターとステータス行 */}
      <div className="relative hidden py-3.5 pl-[142px] pr-5 lg:block">
        <div className="absolute left-[22px] top-[-58px] h-[112px] w-[112px] overflow-hidden rounded-full border-4 border-white shadow-[0_4px_14px_rgba(60,45,20,.18)]">
          <CircleImage path={profile.avatarPath} alt="プロフィール写真" iconSize={18} />
        </div>
        <div className="flex items-center gap-[15px] text-[11.5px] text-cb-muted">
          <StatItem icon="group" iconColor="#A79D8E" label="参加サークル" value="―" />
          <span className="h-4 w-px bg-[#EFE7DA]" />
          <StatItem icon="groups" iconColor="#A79D8E" label="主催サークル" value={profile.ownedCircleCount} />
          <span className="h-4 w-px bg-[#EFE7DA]" />
          <StatItem icon="thumb_up" iconColor="#C99A3E" label="もらったいいね" value="―" />
        </div>
      </div>

      {/* モバイル */}
      <div className="lg:hidden">
        <div className="relative h-[104px]">
          <PhotoPlaceholder caption="カバー写真" iconSize={16} />
        </div>
        <div className="relative pl-32 pr-4 pt-2.5">
          <div className="absolute left-4 top-[-50px] h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-[0_4px_14px_rgba(60,45,20,.16)]">
            <CircleImage path={profile.avatarPath} alt="プロフィール写真" iconSize={14} />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-heading text-lg font-bold text-[#2F2B24]">{profile.displayName}</span>
          </div>
        </div>
        <div className="pl-32 pr-4 pt-3">
          <div className="text-[11.5px] leading-[1.7] text-cb-ink-soft">{bio}</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#F3ECE0] px-3 pb-4 pt-3.5">
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex items-center gap-1 text-[10.5px] text-cb-muted-2">
              <MaterialSymbol name="group" size={15} className="text-cb-placeholder" />
              参加中
            </span>
            <span className="font-heading text-lg font-bold text-[#2F2B24]">―</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex items-center gap-1 text-[10.5px] text-cb-muted-2">
              <MaterialSymbol name="groups" size={15} className="text-cb-accent" />
              主催中
            </span>
            <span className="font-heading text-lg font-bold text-[#2F2B24]">{profile.ownedCircleCount}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex items-center gap-1 text-[10.5px] text-cb-muted-2">
              <MaterialSymbol name="thumb_up" size={15} className="text-[#C99A3E]" />
              いいね
            </span>
            <span className="font-heading text-lg font-bold text-[#2F2B24]">―</span>
          </div>
        </div>
      </div>
    </div>
  );
}
