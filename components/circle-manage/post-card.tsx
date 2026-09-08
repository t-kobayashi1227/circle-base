import { CircleImage } from "@/components/circle-image";
import { sortedUpdateImagePaths, type CircleUpdateRow } from "@/lib/circles";

const dowLabels = ["日", "月", "火", "水", "木", "金", "土"];

function PhotoCountBadge({ count }: { count: number }) {
  if (count <= 1) return null;
  return (
    <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[9.5px] font-bold text-white">
      +{count - 1}
    </span>
  );
}

export function PostCard({ post }: { post: CircleUpdateRow }) {
  const created = new Date(post.created_at);
  const year = `${created.getFullYear()}年`;
  const md = `${created.getMonth() + 1}/${created.getDate()}`;
  const dow = `${dowLabels[created.getDay()]}曜日`;
  const isSunday = created.getDay() === 0;
  const dowColor = isSunday ? "#D9534F" : "#4A87C4";
  const imagePaths = sortedUpdateImagePaths(post);

  return (
    <>
      {/* デスクトップ: 横並びカード */}
      <div className="hidden grid-cols-[88px_172px_minmax(0,1fr)] items-stretch overflow-hidden rounded-xl border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.06)] lg:grid">
        <div className="flex flex-col items-center justify-center gap-1 px-1.5">
          <span className="text-[10.5px] text-cb-muted-3">{year}</span>
          <span className="font-heading text-2xl font-bold leading-[1.1] text-[#2F2B24]">{md}</span>
          <span className="text-[10.5px]" style={{ color: dowColor }}>
            {dow}
          </span>
        </div>
        <div className="relative my-3 h-[114px] overflow-hidden rounded-lg">
          <CircleImage path={imagePaths[0] ?? null} alt="活動の様子" />
          <PhotoCountBadge count={imagePaths.length} />
        </div>
        <div className="flex flex-col justify-center px-[18px] py-4">
          <div className="whitespace-pre-line text-[12.5px] leading-[1.8] text-cb-ink-soft">{post.content}</div>
        </div>
      </div>

      {/* モバイル: コンパクトな横並びカード */}
      <div className="grid grid-cols-[56px_104px_minmax(0,1fr)] items-stretch gap-2.5 overflow-hidden rounded-xl border border-cb-border bg-cb-surface shadow-[0_2px_8px_rgba(120,95,50,.06)] lg:hidden">
        <div className="flex flex-col items-center justify-center gap-1 py-3.5">
          <span className="text-[9.5px] text-cb-muted-3">{year}</span>
          <span className="font-heading text-[21px] font-bold leading-[1.1] text-[#2F2B24]">{md}</span>
          <span className="text-[9.5px]" style={{ color: dowColor }}>
            {dow}
          </span>
        </div>
        <div className="relative my-3 min-w-0 self-stretch overflow-hidden rounded-lg">
          <CircleImage path={imagePaths[0] ?? null} alt="活動の様子" iconSize={16} />
          <PhotoCountBadge count={imagePaths.length} />
        </div>
        <div className="flex min-w-0 flex-col justify-center py-3 pr-3">
          <div className="line-clamp-4 text-[11.5px] leading-[1.7] text-cb-ink-soft">{post.content}</div>
        </div>
      </div>
    </>
  );
}
