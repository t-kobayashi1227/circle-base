import { Fragment } from "react";
import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { badgeClassName } from "@/lib/circle-detail-mock-data";
import { MessageOwnerButton } from "./message-owner-button";
import type { CircleDetailView } from "@/lib/circles";

export function CircleSummary({
  circle,
  isLoggedIn = false,
  isOwner = false,
}: {
  circle: CircleDetailView;
  isLoggedIn?: boolean;
  isOwner?: boolean;
}) {
  return (
    <div className="flex flex-col px-4 pt-4 lg:px-0 lg:pt-0">
      <div className="flex flex-wrap gap-1.5 lg:gap-2">
        {circle.badges.map((badge) => (
          <span
            key={badge.label}
            className={`rounded px-2.5 py-1 text-[10.5px] font-bold lg:px-[11px] lg:text-[11px] ${badgeClassName(badge.tone)}`}
          >
            {badge.label}
          </span>
        ))}
      </div>

      <h1 className="mt-3 font-heading text-[23px] font-bold text-[#2F2B24] lg:mt-3.5 lg:text-[30px]">
        {circle.name}
      </h1>
      <p className="mt-2 text-xs text-cb-muted lg:mt-2.5 lg:text-[13px]">{circle.tagline}</p>

      <div className="mt-3.5 flex gap-4 border-b border-[#EFE7DA] pb-3.5 text-[11.5px] text-cb-ink-soft lg:mt-4 lg:gap-7 lg:pb-4 lg:text-[12.5px]">
        <span className="flex items-center gap-1.5 lg:gap-[7px]">
          <MaterialSymbol name="landscape" size={16} className="text-cb-accent lg:hidden" />
          <MaterialSymbol name="landscape" size={17} className="hidden text-cb-accent lg:inline-block" />
          {circle.category}
        </span>
        <span className="flex items-center gap-1.5 lg:gap-[7px]">
          <MaterialSymbol name="location_on" filled size={16} className="text-cb-accent lg:hidden" />
          <MaterialSymbol name="location_on" filled size={17} className="hidden text-cb-accent lg:inline-block" />
          {circle.area}
        </span>
      </div>

      {/* デスクトップ: 4列グリッド */}
      <div className="hidden grid-cols-4 gap-3.5 py-4 lg:grid">
        {circle.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-[7px]">
            <span className="flex items-center gap-1.5 text-[10.5px] text-cb-muted-3">
              <MaterialSymbol name={stat.icon} size={15} className="text-[#C9A15E]" />
              {stat.label}
            </span>
            <span className="text-[12.5px] font-medium text-[#3B352C]">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* モバイル: 縦積みリスト */}
      <div className="grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-2.5 py-3.5 text-xs lg:hidden">
        {circle.stats.map((stat) => (
          <Fragment key={stat.label}>
            <span className="flex items-center gap-1.5 text-cb-muted-2">
              <MaterialSymbol name={stat.icon} size={16} className="text-[#C9A15E]" />
              {stat.label}
            </span>
            <span className="text-right font-medium text-[#3B352C]">{stat.value}</span>
          </Fragment>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-2.5 lg:mt-1 lg:gap-3.5">
        {isOwner ? (
          <Link
            href={`/mypage/circles/${circle.id}/edit`}
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-[9px] bg-cb-accent text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover lg:min-h-0 lg:gap-2.5 lg:px-4 lg:py-4 lg:text-[14.5px]"
          >
            <MaterialSymbol name="edit" size={18} className="lg:text-[19px]" />
            自分のサークルを管理する
          </Link>
        ) : isLoggedIn ? (
          <MessageOwnerButton circleId={circle.id} ownerId={circle.ownerId} />
        ) : (
          <Link
            href="/login"
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-[9px] bg-cb-accent text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover lg:min-h-0 lg:gap-2.5 lg:px-4 lg:py-4 lg:text-[14.5px]"
          >
            <MaterialSymbol name="mail" size={18} className="lg:text-[19px]" />
            メッセージを送る（無料）
          </Link>
        )}
        <button
          type="button"
          aria-label="お気に入りに追加"
          className="flex min-h-[52px] w-[52px] items-center justify-center rounded-[9px] border border-[#E0D6C6] bg-white hover:border-cb-accent hover:text-cb-accent-dark lg:w-auto lg:gap-2 lg:px-[26px] lg:py-4"
        >
          <MaterialSymbol name="bookmark_border" size={20} className="text-cb-ink-soft lg:hidden" />
          <MaterialSymbol name="bookmark_border" size={18} className="hidden text-cb-ink-soft lg:inline-block" />
          <span className="hidden text-[13.5px] font-medium text-cb-ink-soft lg:inline">お気に入り</span>
        </button>
      </div>

      {/* 安心バナー（デスクトップのみ） */}
      <div className="mt-4 hidden gap-3 rounded-[9px] border border-[#F2E4CB] bg-[#FDF6EA] px-4 py-3.5 lg:flex">
        <MaterialSymbol name="verified_user" size={20} className="shrink-0 text-[#3E9E7A]" />
        <div>
          <div className="text-[12.5px] font-bold text-[#3B352C]">安心してご利用いただけます</div>
          <div className="mt-1 text-[11px] leading-relaxed text-cb-muted-2">
            通報・ブロック機能を完備。運営が不適切な投稿や行為を監視しています。
          </div>
        </div>
      </div>
    </div>
  );
}
