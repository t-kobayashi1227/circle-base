import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { CirclePublishToggle } from "@/components/mypage/circle-publish-toggle";
import { circleTypeLabel, coverImagePath, formatDateJa, type CircleWithRelations } from "@/lib/circles";

export function OwnedCircleCard({ circle }: { circle: CircleWithRelations }) {
  const editPath = `/mypage/circles/${circle.id}/edit`;
  const updatesPath = `/mypage/circles/${circle.id}/updates`;
  const meta = [circle.area?.name, circle.category?.name].filter(Boolean).join("・");
  const imagePath = coverImagePath(circle);

  return (
    <div className="overflow-hidden rounded-xl border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.05)]">
      {/* デスクトップ */}
      <div className="hidden grid-cols-[152px_minmax(0,1fr)_120px_200px] items-start gap-[18px] p-[18px] lg:grid">
        <div className="h-[118px] overflow-hidden rounded-[9px]">
          <CircleImage path={imagePath} alt={`${circle.name}の写真`} iconSize={16} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <CirclePublishToggle circleId={circle.id} status={circle.status} />
            <span className="font-heading text-lg font-bold text-[#2F2B24]">{circle.name}</span>
          </div>
          <div className="mt-[9px] pl-0.5 text-[11.5px] text-cb-muted-2">{meta}</div>
          <div className="mt-[13px] line-clamp-2 text-xs leading-[1.85] text-cb-ink-soft">{circle.description}</div>
        </div>
        <div className="flex flex-col items-center gap-2.5 pt-1.5">
          <span className="text-[11px] text-cb-muted-2">種別</span>
          <span className="text-[13px] font-bold text-[#2F2B24]">{circleTypeLabel(circle.type)}</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <Link
            href={editPath}
            className="rounded-lg border border-cb-accent bg-white py-2.5 text-center text-[12.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
          >
            編集・管理
          </Link>
          <Link
            href={`${updatesPath}/new`}
            className="rounded-lg border border-[#E6DCCB] bg-white py-2.5 text-center text-xs font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
          >
            活動の様子を投稿
          </Link>
        </div>
      </div>
      <div className="hidden items-center gap-5 border-t border-[#F5EFE5] bg-[#FEFCF8] px-[18px] py-3 text-[11.5px] text-cb-muted-2 lg:flex">
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <MaterialSymbol name="calendar_month" size={15} className="text-cb-placeholder" />
          作成日：{formatDateJa(circle.created_at.slice(0, 10))}
        </span>
        <span className="h-3.5 w-px bg-[#EFE7DA]" />
        <span className="whitespace-nowrap">更新日：{formatDateJa(circle.updated_at.slice(0, 10))}</span>
      </div>

      {/* モバイル */}
      <div className="p-3 lg:hidden">
        <Link href={editPath} className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-3">
          <div className="h-[72px] overflow-hidden rounded-lg">
            <CircleImage path={imagePath} alt={`${circle.name}の写真`} iconSize={12} />
          </div>
          <div className="min-w-0">
            <div className="font-heading text-[14.5px] font-bold leading-[1.4] text-[#2F2B24]">{circle.name}</div>
            <div className="mt-[7px] text-[10.5px] text-cb-muted-2">{meta}</div>
          </div>
          <MaterialSymbol name="chevron_right" size={20} className="text-cb-placeholder" />
        </Link>
        <div className="mt-3">
          <CirclePublishToggle circleId={circle.id} status={circle.status} />
        </div>
        <div className="mt-2.5">
          <Link
            href={`${updatesPath}/new`}
            className="flex min-h-11 items-center justify-center rounded-lg border border-[#F0D9AF] bg-cb-accent-soft text-[11.5px] font-bold text-cb-accent-dark"
          >
            活動の様子を投稿
          </Link>
        </div>
      </div>
    </div>
  );
}
