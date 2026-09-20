import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { formatShortDate, splitUpdateContent } from "@/lib/circles-format";
import type { CircleUpdateRow } from "@/lib/circles";

function resolveTitle(post: CircleUpdateRow): string {
  if (post.title) return post.title;
  // 旧データ互換: title カラムがない場合は content の1行目をタイトルとして使う
  return splitUpdateContent(post.content).title;
}

// 「メッセージ」タブは、写真投稿（活動の様子）とは別に circle_updates.kind = "message" のみを一覧形式で見せる。
export function MessageList({ updates, slug }: { updates: CircleUpdateRow[]; slug: string }) {
  return (
    <section className="px-4 pb-8 pt-[18px] lg:px-8 lg:pb-10 lg:pt-[26px]">
      <h2 className="flex items-center gap-2 font-heading text-[17px] font-bold text-cb-ink lg:gap-[9px] lg:text-[19px]">
        <MaterialSymbol name="chat_bubble" filled size={20} className="text-cb-accent lg:text-[21px]" />
        メッセージ
      </h2>
      <p className="mt-2 text-[11.5px] leading-[1.7] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px]">
        主催者からのお知らせや、次回の予定、注意事項などを掲載しています。
      </p>

      {updates.length === 0 ? (
        <p className="mt-8 text-center text-[12.5px] text-cb-muted">まだメッセージが投稿されていません。</p>
      ) : (
        <div className="mt-3.5 flex flex-col overflow-hidden rounded-xl border border-cb-border bg-cb-surface lg:mt-[18px]">
          {updates.map((post) => {
            const title = resolveTitle(post);
            const href = `/circle/${slug}/messages/${post.id}`;

            return (
              <Link key={post.id} href={href} className="block border-b border-[#F5EFE5] last:border-b-0 hover:bg-cb-accent-soft/40 transition-colors">
                {/* デスクトップ */}
                <div className="hidden items-center gap-4 px-5 py-4 lg:grid lg:grid-cols-[44px_minmax(0,1fr)_auto_18px]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cb-accent-soft">
                    <MaterialSymbol name="chat_bubble" filled size={19} className="text-cb-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[13.5px] font-bold text-[#2F2B24]">{title}</div>
                  </div>
                  <span className="whitespace-nowrap text-[11.5px] text-cb-muted-3">
                    {formatShortDate(post.created_at)}
                  </span>
                  <MaterialSymbol name="chevron_right" size={18} className="text-[#B3A996]" />
                </div>

                {/* モバイル */}
                <div className="grid grid-cols-[40px_minmax(0,1fr)_16px] items-center gap-3 px-3.5 py-3.5 lg:hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cb-accent-soft">
                    <MaterialSymbol name="chat_bubble" filled size={17} className="text-cb-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="min-w-0 truncate text-[13px] font-bold text-[#2F2B24]">{title}</span>
                      <span className="shrink-0 whitespace-nowrap text-[10.5px] text-cb-muted-3">
                        {formatShortDate(post.created_at)}
                      </span>
                    </div>
                  </div>
                  <MaterialSymbol name="chevron_right" size={16} className="text-[#B3A996]" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
