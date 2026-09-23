import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { ComingSoonNote } from "@/components/mypage/coming-soon-note";
import { formatShortDate, splitUpdateContent } from "@/lib/circles-format";
import { getMypageNotices, type MypageNotice } from "@/lib/mypage";
import { getCurrentUser } from "@/lib/auth";

function resolveTitle(notice: MypageNotice): string {
  if (notice.title) return notice.title;
  // 旧データ互換: title カラムがない場合は content の1行目をタイトルとして使う
  return splitUpdateContent(notice.content).title;
}

export async function NoticesCard() {
  const user = await getCurrentUser();
  const notices = user ? await getMypageNotices(user.id, 5) : [];

  return (
    <div className="hidden rounded-xl border border-cb-border bg-cb-surface px-5 pb-3.5 pt-[18px] lg:block">
      <h2 className="mb-3.5 font-heading text-[15px] font-bold text-cb-ink">お知らせ</h2>

      {notices.length === 0 ? (
        <ComingSoonNote label="お知らせ" />
      ) : (
        <div className="flex flex-col divide-y divide-[#F5EFE5]">
          {notices.map((notice) => (
            <Link
              key={notice.id}
              href={`/circle/${notice.circle?.slug}/messages/${notice.id}`}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 transition-colors hover:bg-cb-accent-soft/40"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cb-accent-soft">
                <MaterialSymbol name="chat_bubble" filled size={16} className="text-cb-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[10.5px] text-cb-muted-3">{notice.circle?.name}</div>
                <div className="truncate text-[12.5px] font-bold text-cb-ink">{resolveTitle(notice)}</div>
              </div>
              <span className="shrink-0 whitespace-nowrap text-[10.5px] text-cb-muted-3">
                {formatShortDate(notice.created_at)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
