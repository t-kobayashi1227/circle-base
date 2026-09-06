import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { CircleDetail } from "@/lib/circle-detail-mock-data";

export function PhotoGallery({ photos }: { photos: CircleDetail["photos"] }) {
  const [main, sub1, sub2, sub3, sub4] = photos;

  return (
    <>
      {/* デスクトップ: 1.72fr + 1fr + 1fr の2行グリッド */}
      <div className="hidden h-[274px] max-w-[568px] grid-cols-[1.72fr_1fr_1fr] grid-rows-2 gap-2 lg:grid">
        <div className="relative row-span-2 min-h-0 min-w-0 overflow-hidden rounded-lg">
          <PhotoPlaceholder caption={main.caption} iconSize={28} />
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-xl bg-[rgba(30,25,18,.55)] px-2.5 py-1 text-[10.5px] font-medium text-white">
            1 / 8
          </span>
        </div>
        <div className="min-h-0 min-w-0 overflow-hidden rounded-lg">
          <PhotoPlaceholder caption={sub1.caption} />
        </div>
        <div className="min-h-0 min-w-0 overflow-hidden rounded-lg">
          <PhotoPlaceholder caption={sub2.caption} />
        </div>
        <div className="min-h-0 min-w-0 overflow-hidden rounded-lg">
          <PhotoPlaceholder caption={sub3.caption} />
        </div>
        <div className="min-h-0 min-w-0 overflow-hidden rounded-lg">
          <PhotoPlaceholder caption={sub4.caption} />
        </div>
      </div>

      {/* モバイル: 1.55fr + 1fr + 1fr の3行グリッド */}
      <div className="grid h-[186px] max-w-full grid-cols-[1.55fr_1fr_1fr] grid-rows-3 gap-[3px] overflow-hidden lg:hidden">
        <div className="row-span-3 min-h-0 min-w-0">
          <PhotoPlaceholder caption={main.caption} />
        </div>
        <div className="min-h-0 min-w-0">
          <PhotoPlaceholder caption={sub1.caption} iconSize={16} />
        </div>
        <div className="min-h-0 min-w-0">
          <PhotoPlaceholder caption={sub2.caption} iconSize={16} />
        </div>
        <div className="col-span-2 min-h-0 min-w-0">
          <PhotoPlaceholder caption={sub3.caption} iconSize={16} />
        </div>
        <div className="relative col-span-2 min-h-0 min-w-0">
          <PhotoPlaceholder caption={sub4.caption} iconSize={16} />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-[rgba(30,25,18,.6)] px-2.5 py-0.5 text-[10px] text-white">
            1 / 8
          </span>
        </div>
      </div>
    </>
  );
}
