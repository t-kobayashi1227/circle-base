import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { ComingSoonNote } from "@/components/mypage/coming-soon-note";
import { coverImagePath, getJoinedCirclesPreview } from "@/lib/circles";

export async function JoinedCirclesSection() {
  const circles = await getJoinedCirclesPreview(3);

  return (
    <div>
      <div className="flex items-center justify-between px-3.5 lg:mb-3 lg:px-0">
        <h2 className="font-heading text-base font-bold text-cb-ink">参加中のサークル</h2>
        <Link
          href="/mypage/circles/joined"
          className="flex items-center gap-0.5 text-xs text-cb-muted-2 hover:text-cb-accent"
        >
          すべて見る
          <MaterialSymbol name="chevron_right" size={15} />
        </Link>
      </div>

      {circles.length === 0 ? (
        <div className="mt-3 px-3.5 lg:px-0">
          <ComingSoonNote label="参加中のサークル" />
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-2.5 px-3.5 lg:px-0">
          {circles.map((circle) => (
            <Link
              key={circle.id}
              href={`/circle/${circle.slug}`}
              className="grid grid-cols-[52px_minmax(0,1fr)_16px] items-center gap-3 rounded-xl border border-cb-border bg-cb-surface p-2.5 hover:border-cb-accent"
            >
              <div className="relative h-[46px] overflow-hidden rounded-lg">
                <CircleImage path={coverImagePath(circle)} alt={`${circle.name}の写真`} iconSize={10} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[12.5px] font-bold text-cb-ink">{circle.name}</div>
                <div className="truncate text-[10.5px] text-cb-muted-3">{circle.area?.name ?? ""}</div>
              </div>
              <MaterialSymbol name="chevron_right" size={16} className="text-cb-placeholder" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
