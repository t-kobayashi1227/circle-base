import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { joinedCircles } from "@/lib/mypage-mock-data";

export function JoinedCirclesSection() {
  return (
    <div>
      <div className="flex items-center justify-between px-3.5 lg:mb-3 lg:px-0">
        <h2 className="font-heading text-base font-bold text-cb-ink">参加中のサークル</h2>
        <Link href="/mypage/circles/joined" className="flex items-center gap-0.5 text-[11.5px] text-cb-muted-2 hover:text-cb-accent-dark lg:text-[11.5px]">
          すべて見る
          <MaterialSymbol name="chevron_right" size={15} />
        </Link>
      </div>

      {/* デスクトップ: 3列グリッド */}
      <div className="mt-3 hidden grid-cols-3 gap-3.5 lg:grid">
        {joinedCircles.slice(0, 3).map((circle) => (
          <div
            key={circle.id}
            className="min-w-0 overflow-hidden rounded-[11px] border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.06)] hover:shadow-[0_8px_20px_rgba(120,95,50,.15)]"
          >
            <div className="relative h-[104px]">
              <PhotoPlaceholder caption={circle.photoCaption} iconSize={16} />
              <span className="pointer-events-none absolute left-[9px] top-[9px] rounded bg-[rgba(35,28,18,.72)] px-[9px] py-1 text-[9.5px] text-white">
                メンバー
              </span>
            </div>
            <div className="px-[13px] pb-[14px] pt-[13px]">
              <div className="font-heading text-[13.5px] font-bold leading-[1.4] text-[#2F2B24]">{circle.name}</div>
              <div className="mt-2 text-[10.5px] text-cb-muted-2">次回活動：{circle.next}</div>
              <div className="mt-2.5 flex items-center gap-3 text-[10px] text-cb-muted-3">
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <MaterialSymbol name="group" size={13} className="text-cb-placeholder" />
                  メンバー限定
                </span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <MaterialSymbol name="calendar_month" size={13} className="text-cb-placeholder" />
                  {circle.freq}
                </span>
              </div>
              <Link
                href={`/circle/${circle.id}`}
                className="mt-3 flex items-center justify-center rounded-[7px] border border-[#E0D6C6] py-2 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
              >
                サークル詳細へ
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* モバイル: 横スクロール */}
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-3.5 pb-1.5 lg:hidden">
        {joinedCircles.map((circle) => (
          <div
            key={circle.id}
            className="w-[148px] shrink-0 overflow-hidden rounded-[11px] border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.06)]"
          >
            <div className="relative h-[98px]">
              <PhotoPlaceholder caption={circle.photoCaption} iconSize={14} />
              <span className="pointer-events-none absolute bottom-2 left-2 rounded bg-[rgba(35,28,18,.72)] px-2 py-[3px] text-[9.5px] text-white">
                メンバー
              </span>
            </div>
            <div className="px-[11px] pb-[13px] pt-[11px]">
              <div className="font-heading text-[13px] font-bold leading-[1.45] text-[#2F2B24]">{circle.name}</div>
              <div className="mt-2 text-[10.5px] text-cb-muted-2">{circle.nextShort}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
