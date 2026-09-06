import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { tagStyle, type UpdatePost } from "@/lib/circle-updates-mock-data";

function AvatarStack() {
  return (
    <div className="flex">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-[22px] w-[22px] overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3]"
          style={{ marginLeft: i === 0 ? 0 : -7 }}
        />
      ))}
    </div>
  );
}

export function PostCard({ post }: { post: UpdatePost }) {
  const tag = tagStyle[post.tag];
  const dowColor = post.isSunday ? "#D9534F" : "#4A87C4";

  return (
    <>
      {/* デスクトップ: 横並びカード */}
      <div className="hidden grid-cols-[88px_172px_minmax(0,1fr)_36px] items-stretch overflow-hidden rounded-xl border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.06)] hover:shadow-[0_8px_20px_rgba(120,95,50,.14)] lg:grid">
        <div className="flex flex-col items-center justify-center gap-1 px-1.5">
          <span className="text-[10.5px] text-cb-muted-3">{post.year}</span>
          <span className="font-heading text-2xl font-bold leading-[1.1] text-[#2F2B24]">{post.md}</span>
          <span className="text-[10.5px]" style={{ color: dowColor }}>
            {post.dow}
          </span>
        </div>
        <div className="my-3 h-[114px] overflow-hidden rounded-lg">
          <PhotoPlaceholder caption={post.photoCaption} />
        </div>
        <div className="flex flex-col px-[18px] py-4">
          <span
            className="self-start rounded px-2.5 py-1 text-[10px] font-medium"
            style={{ background: tag.bg, border: `1px solid ${tag.border}`, color: tag.color }}
          >
            {tag.label}
          </span>
          <div className="mt-2.5 font-heading text-[15px] font-bold text-[#2F2B24]">{post.title}</div>
          <div className="mt-2 text-[11.5px] leading-[1.8] text-cb-muted">{post.body}</div>
          <div className="flex-1" />
          <div className="mt-3 flex items-center gap-4 text-[10.5px] text-cb-muted-3">
            <span className="flex items-center gap-1.5">
              <MaterialSymbol name="favorite_border" size={15} className="text-[#C99A3E]" />
              いいね {post.likes}
            </span>
            <span className="flex items-center gap-1.5">
              <MaterialSymbol name="chat_bubble_outline" size={15} className="text-cb-placeholder" />
              コメント {post.comments}
            </span>
            <span className="flex items-center gap-1.5">
              <MaterialSymbol name="group" size={15} className="text-cb-placeholder" />
              メンバー限定
            </span>
            <div className="flex-1" />
            <AvatarStack />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <MaterialSymbol name="chevron_right" size={20} className="text-cb-placeholder" />
        </div>
      </div>

      {/* モバイル: コンパクトな横並びカード */}
      <div className="grid grid-cols-[56px_104px_minmax(0,1fr)] items-stretch gap-2.5 overflow-hidden rounded-xl border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.06)] lg:hidden">
        <div className="flex flex-col items-center justify-center gap-1 py-3.5">
          <span className="text-[9.5px] text-cb-muted-3">{post.year}</span>
          <span className="font-heading text-[21px] font-bold leading-[1.1] text-[#2F2B24]">{post.md}</span>
          <span className="text-[9.5px]" style={{ color: dowColor }}>
            {post.dow}
          </span>
        </div>
        <div className="my-3 min-w-0 self-stretch overflow-hidden rounded-lg">
          <PhotoPlaceholder caption={post.photoCaption} iconSize={16} />
        </div>
        <div className="flex min-w-0 flex-col py-3 pr-3">
          <span
            className="self-start rounded px-2.5 py-1 text-[9.5px] font-medium"
            style={{ background: tag.bg, border: `1px solid ${tag.border}`, color: tag.color }}
          >
            {tag.label}
          </span>
          <div className="mt-2 line-clamp-2 font-heading text-[13.5px] font-bold leading-[1.5] text-[#2F2B24]">
            {post.title}
          </div>
          <div className="min-h-2 flex-1" />
          <div className="flex items-center gap-2.5 text-[10px] text-cb-muted-3">
            <span className="flex items-center gap-1">
              <MaterialSymbol name="favorite_border" size={14} className="text-[#C99A3E]" />
              {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <MaterialSymbol name="chat_bubble_outline" size={14} className="text-cb-placeholder" />
              {post.comments}
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <MaterialSymbol name="group" size={14} className="text-cb-placeholder" />
              メンバー限定
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
