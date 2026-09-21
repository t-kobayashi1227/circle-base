"use client";

import { useState } from "react";
import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { formatShortDate, sortedUpdateImagePaths, splitUpdateContent } from "@/lib/circles-format";
import type { CircleUpdateRow } from "@/lib/circles";

const INITIAL_COUNT = 8;

export function ActivityGallery({
  circleName,
  slug,
  updates,
}: {
  circleName: string;
  slug: string;
  updates: CircleUpdateRow[];
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? updates : updates.slice(0, INITIAL_COUNT);

  return (
    <section className="px-4 pb-8 pt-[18px] lg:px-8 lg:pb-10 lg:pt-[26px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 font-heading text-[17px] font-bold text-cb-ink lg:gap-[9px] lg:text-[19px]">
            <MaterialSymbol name="photo_camera" filled size={20} className="text-cb-accent lg:text-[21px]" />
            活動の様子
          </h2>
          <p className="mt-2 text-[11.5px] leading-[1.8] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px]">
            これまでの活動の様子を写真で紹介します。自然の中での楽しい時間や、仲間との思い出をご覧ください。
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-[7px] whitespace-nowrap rounded-lg border border-[#E4DACA] bg-white px-4 py-[11px] text-[12.5px] text-[#3B352C] lg:flex">
          新しい順
          <MaterialSymbol name="expand_more" size={17} className="text-cb-muted-3" />
        </div>
      </div>

      <div className="mt-3.5 flex justify-end lg:hidden">
        <div className="flex items-center gap-1.5 rounded-lg border border-[#E4DACA] bg-white px-3.5 py-2.5 text-xs text-[#3B352C]">
          新しい順
          <MaterialSymbol name="expand_more" size={16} className="text-cb-muted-3" />
        </div>
      </div>

      {updates.length === 0 ? (
        <p className="mt-8 text-center text-[12.5px] text-cb-muted">
          まだ活動の様子が投稿されていません。
        </p>
      ) : (
        <>
          <div className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-4 lg:mt-5 lg:grid-cols-4 lg:gap-4">
            {visible.map((post) => {
              const imagePaths = sortedUpdateImagePaths(post);
              const { title, desc } = splitUpdateContent(post.content);

              return (
                <Link key={post.id} href={`/circle/${slug}/updates/${post.id}`} className="min-w-0">
                  <div className="relative h-[120px] overflow-hidden rounded-[9px] lg:h-[150px] lg:rounded-[10px]">
                    <CircleImage path={imagePaths[0] ?? null} alt={`${circleName}の活動写真`} iconSize={18} />
                    {imagePaths.length > 1 ? (
                      <span className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[9.5px] font-bold text-white">
                        +{imagePaths.length - 1}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-2 text-[10.5px] text-cb-muted-3 lg:mt-2.5 lg:text-[11px]">
                    {formatShortDate(post.created_at)}
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs font-bold leading-[1.4] text-[#2F2B24] lg:text-[13px]">
                    {title}
                  </div>
                  {desc ? (
                    <div className="mt-1.5 line-clamp-2 text-[11px] leading-[1.7] text-[#6E6558]">{desc}</div>
                  ) : null}
                </Link>
              );
            })}
          </div>

          {!expanded && updates.length > INITIAL_COUNT ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="mt-[18px] flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#E6DCCB] bg-white py-3.5 text-[13px] font-medium text-[#4B453C] hover:border-cb-accent hover:text-cb-accent-dark lg:mt-[26px]"
            >
              もっと見る
              <MaterialSymbol name="chevron_right" size={17} className="text-cb-accent" />
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}
