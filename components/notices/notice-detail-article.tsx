import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { Notice } from "@/lib/notices-mock-data";

export function NoticeDetailArticle({ notice }: { notice: Notice }) {
  return (
    <article className="min-w-0 rounded-xl border border-cb-border bg-white px-4 py-5 lg:px-7 lg:py-[26px]">
      <div className="flex items-center gap-2.5 lg:gap-3">
        <span
          className="whitespace-nowrap rounded px-2.5 py-1 text-[10.5px] font-bold"
          style={{ background: notice.tagBg, color: notice.tagColor }}
        >
          {notice.tag}
        </span>
        <span className="text-xs text-cb-muted-3">{notice.date}</span>
      </div>

      <h2 className="mt-3.5 font-heading text-[19px] font-bold leading-[1.5] text-[#2F2B24] lg:mt-4 lg:text-2xl">
        {notice.title}
      </h2>
      <div className="mt-3 h-1 w-11 rounded-sm bg-cb-accent lg:mt-[14px] lg:w-[52px]" />

      <div className="mt-[18px] h-40 overflow-hidden rounded-[10px] lg:mt-[22px] lg:h-[230px]">
        <PhotoPlaceholder caption="ノートPCとコーヒー、観葉植物の写真（デスク）" iconSize={20} />
      </div>

      <div className="mt-[18px] flex flex-col gap-4 text-[12.5px] leading-[1.95] text-[#4B453C] lg:mt-[22px] lg:text-[13px] lg:leading-[2.05]">
        {notice.body.split("\n").map((paragraph, i) => (
          <p key={i} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>

      {notice.schedule ? (
        <div className="mt-[18px] flex gap-3 rounded-[10px] bg-[#FDF7EC] p-4 lg:mt-[22px] lg:gap-[14px] lg:px-5 lg:py-[18px]">
          <MaterialSymbol name="schedule" size={20} className="shrink-0 text-cb-accent lg:text-[22px]" />
          <div className="min-w-0">
            <div className="text-xs font-bold text-cb-accent-dark lg:text-[12.5px]">{notice.schedule.label}</div>
            <div className="mt-[7px] text-[12.5px] font-bold leading-[1.5] text-[#2F2B24] lg:text-sm">
              {notice.schedule.datetime}
            </div>
            {notice.schedule.note ? (
              <div className="mt-[7px] text-[10.5px] leading-[1.8] text-cb-muted-3 lg:text-[11px]">
                {notice.schedule.note}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mt-[18px] text-[12.5px] text-cb-muted lg:mt-5 lg:text-[13px]">
        今後とも にいがたサークルベース をよろしくお願いいたします。
      </div>

      <div className="mt-[22px] flex flex-col items-center gap-4 border-t border-[#F3ECE0] pt-5 lg:mt-[26px] lg:flex-row lg:justify-between lg:pt-5">
        <Link
          href="/notices"
          className="flex items-center gap-1.5 rounded-full border border-cb-accent px-[22px] py-[11px] text-[12.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
        >
          <MaterialSymbol name="chevron_left" size={16} />
          一覧に戻る
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-cb-muted-3">この記事をシェアする</span>
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black text-[13px] font-bold text-white">
            X
          </span>
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#06C755] text-[6px] font-bold text-white">
            LINE
          </span>
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#F3EDE2] text-cb-muted">
            <MaterialSymbol name="link" size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
