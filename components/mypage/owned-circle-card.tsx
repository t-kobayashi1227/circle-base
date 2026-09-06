import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { OwnedCircle } from "@/lib/owned-circles-mock-data";

export function OwnedCircleCard({ circle }: { circle: OwnedCircle }) {
  const managePath = `/mypage/circles/${circle.id}/updates`;

  return (
    <div className="overflow-hidden rounded-xl border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.05)]">
      {/* デスクトップ */}
      <div className="hidden grid-cols-[152px_minmax(0,1fr)_88px_78px_200px] items-start gap-[18px] p-[18px] lg:grid">
        <div className="h-[118px] overflow-hidden rounded-[9px]">
          <PhotoPlaceholder caption={circle.photoCaption} iconSize={16} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded-[5px] border border-[#F2E0C0] bg-cb-accent-soft px-2.5 py-1 text-[10.5px] font-bold text-[#C07E1B]">
              公開中
            </span>
            <span className="font-heading text-lg font-bold text-[#2F2B24]">{circle.name}</span>
          </div>
          <div className="mt-[9px] pl-0.5 text-[11.5px] text-cb-muted-2">{circle.category}</div>
          <div className="mt-[13px] whitespace-pre-line text-xs leading-[1.85] text-cb-ink-soft">{circle.desc}</div>
        </div>
        <div className="flex flex-col items-center gap-2.5 pt-1.5">
          <span className="text-[11px] text-cb-muted-2">メンバー</span>
          <span className="text-[15px] font-bold text-[#2F2B24]">{circle.members}</span>
        </div>
        <div className="flex flex-col items-center gap-2.5 pt-1.5">
          <span className="text-[11px] text-cb-muted-2">活動</span>
          <span className="text-[15px] font-bold text-[#2F2B24]">{circle.posts}</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <Link
            href={managePath}
            className="rounded-lg border border-cb-accent bg-white py-2.5 text-center text-[12.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
          >
            詳細・管理
          </Link>
          <Link
            href={`${managePath}/new`}
            className="rounded-lg border border-[#E6DCCB] bg-white py-2.5 text-center text-xs font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
          >
            活動の様子を投稿
          </Link>
          <Link
            href="/mypage/messages"
            className="relative flex items-center justify-center gap-[7px] rounded-lg border border-[#E6DCCB] bg-white py-2.5 text-xs font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
          >
            <MaterialSymbol name="chat_bubble" size={16} className="text-cb-muted-3" />
            メッセージ
            {circle.unread ? (
              <span className="absolute right-[9px] top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E04B3C] px-1 text-[9.5px] font-bold text-white">
                {circle.unread}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
      <div className="hidden items-center gap-5 border-t border-[#F5EFE5] bg-[#FEFCF8] px-[18px] py-3 text-[11.5px] text-cb-muted-2 lg:flex">
        <span className="whitespace-nowrap">次回活動：{circle.next}</span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <MaterialSymbol name="person" size={15} className="text-cb-placeholder" />
          {circle.area}
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <MaterialSymbol name="public" size={15} className="text-cb-placeholder" />
          公開中
        </span>
        <span className="h-3.5 w-px bg-[#EFE7DA]" />
        <span className="whitespace-nowrap">更新日：{circle.updated}</span>
        <div className="flex-1" />
        <button type="button" aria-label="その他のメニュー">
          <MaterialSymbol name="more_horiz" filled size={19} className="text-cb-muted-3" />
        </button>
      </div>

      {/* モバイル */}
      <div className="p-3 lg:hidden">
        <Link href={managePath} className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-3">
          <div className="h-[72px] overflow-hidden rounded-lg">
            <PhotoPlaceholder caption={circle.photoCaption} iconSize={12} />
          </div>
          <div className="min-w-0">
            <span className="inline-block rounded border border-[#F2E0C0] bg-cb-accent-soft px-2 py-[3px] text-[9.5px] font-bold text-[#C07E1B]">
              公開中
            </span>
            <div className="mt-[7px] font-heading text-[14.5px] font-bold leading-[1.4] text-[#2F2B24]">
              {circle.name}
            </div>
            <div className="mt-[7px] flex gap-3 text-[10.5px] text-cb-muted-2">
              <span className="whitespace-nowrap">メンバー {circle.members}</span>
              <span className="whitespace-nowrap">活動 {circle.posts}</span>
            </div>
          </div>
          <MaterialSymbol name="chevron_right" size={20} className="text-cb-placeholder" />
        </Link>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <Link
            href={`${managePath}/new`}
            className="flex min-h-11 items-center justify-center rounded-lg border border-[#F0D9AF] bg-cb-accent-soft text-[11.5px] font-bold text-cb-accent-dark"
          >
            活動の様子を投稿
          </Link>
          <Link
            href="/mypage/messages"
            className="relative flex min-h-11 items-center justify-center gap-[7px] rounded-lg border border-[#E6DCCB] bg-white text-[11.5px] font-medium text-cb-ink-soft"
          >
            <MaterialSymbol name="chat_bubble" size={15} className="text-cb-muted-3" />
            メッセージ
            {circle.unread ? (
              <span className="absolute right-2 top-[7px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E04B3C] px-1 text-[9.5px] font-bold text-white">
                {circle.unread}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </div>
  );
}
