import { CircleImage } from "@/components/circle-image";

// circle_images の枚数に応じて、足りない分はサークル名のプレースホルダーで補う。
export function PhotoGallery({ circleName, imagePaths }: { circleName: string; imagePaths: string[] }) {
  const caption = `${circleName}の写真`;
  const slots = Array.from({ length: 5 }, (_, i) => imagePaths[i] ?? null);

  return (
    <>
      {/* デスクトップ: 1.72fr + 1fr + 1fr の2行グリッド */}
      <div className="hidden h-[274px] max-w-[568px] grid-cols-[1.72fr_1fr_1fr] grid-rows-2 gap-2 lg:grid">
        <div className="relative row-span-2 min-h-0 min-w-0 overflow-hidden rounded-lg">
          <CircleImage path={slots[0]} alt={caption} iconSize={28} />
        </div>
        {slots.slice(1).map((path, i) => (
          <div key={i} className="min-h-0 min-w-0 overflow-hidden rounded-lg">
            <CircleImage path={path} alt={caption} />
          </div>
        ))}
      </div>

      {/* モバイル: 1.55fr + 1fr + 1fr の3行グリッド */}
      <div className="grid h-[186px] max-w-full grid-cols-[1.55fr_1fr_1fr] grid-rows-3 gap-[3px] overflow-hidden lg:hidden">
        <div className="row-span-3 min-h-0 min-w-0">
          <CircleImage path={slots[0]} alt={caption} />
        </div>
        <div className="min-h-0 min-w-0">
          <CircleImage path={slots[1]} alt={caption} iconSize={16} />
        </div>
        <div className="min-h-0 min-w-0">
          <CircleImage path={slots[2]} alt={caption} iconSize={16} />
        </div>
        <div className="col-span-2 min-h-0 min-w-0">
          <CircleImage path={slots[3]} alt={caption} iconSize={16} />
        </div>
        <div className="relative col-span-2 min-h-0 min-w-0">
          <CircleImage path={slots[4]} alt={caption} iconSize={16} />
        </div>
      </div>
    </>
  );
}
