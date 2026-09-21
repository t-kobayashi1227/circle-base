import { CircleImage } from "@/components/circle-image";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

// 画像が保存されていないマスは表示せず、実際にアップロードされている枚数（最大5枚）
// に応じてレイアウトを組み替える。

function Cell({ path, alt, className = "", iconSize }: { path: string; alt: string; className?: string; iconSize?: number }) {
  return (
    <div className={`min-h-0 min-w-0 overflow-hidden ${className}`}>
      <CircleImage path={path} alt={alt} iconSize={iconSize} />
    </div>
  );
}

function DesktopMosaic({ paths, caption }: { paths: string[]; caption: string }) {
  const n = paths.length;

  if (n === 0) {
    return <PhotoPlaceholder caption={caption} className="h-full w-full rounded-lg" />;
  }

  if (n === 1) {
    return <Cell path={paths[0]} alt={caption} className="h-full w-full rounded-lg" iconSize={28} />;
  }

  if (n === 2) {
    return (
      <div className="grid h-full grid-cols-2 gap-2">
        <Cell path={paths[0]} alt={caption} className="rounded-lg" iconSize={28} />
        <Cell path={paths[1]} alt={caption} className="rounded-lg" />
      </div>
    );
  }

  if (n === 3) {
    return (
      <div className="grid h-full grid-cols-[1.72fr_1fr] grid-rows-2 gap-2">
        <Cell path={paths[0]} alt={caption} className="row-span-2 rounded-lg" iconSize={28} />
        <Cell path={paths[1]} alt={caption} className="rounded-lg" />
        <Cell path={paths[2]} alt={caption} className="rounded-lg" />
      </div>
    );
  }

  if (n === 4) {
    return (
      <div className="grid h-full grid-cols-[1.72fr_1fr_1fr] grid-rows-2 gap-2">
        <Cell path={paths[0]} alt={caption} className="row-span-2 rounded-lg" iconSize={28} />
        <Cell path={paths[1]} alt={caption} className="rounded-lg" />
        <Cell path={paths[2]} alt={caption} className="row-span-2 rounded-lg" />
        <Cell path={paths[3]} alt={caption} className="rounded-lg" />
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-[1.72fr_1fr_1fr] grid-rows-2 gap-2">
      <Cell path={paths[0]} alt={caption} className="row-span-2 rounded-lg" iconSize={28} />
      <Cell path={paths[1]} alt={caption} className="rounded-lg" />
      <Cell path={paths[2]} alt={caption} className="rounded-lg" />
      <Cell path={paths[3]} alt={caption} className="rounded-lg" />
      <Cell path={paths[4]} alt={caption} className="rounded-lg" />
    </div>
  );
}

function MobileMosaic({ paths, caption }: { paths: string[]; caption: string }) {
  const n = paths.length;

  if (n === 0) {
    return <PhotoPlaceholder caption={caption} className="h-full w-full" />;
  }

  if (n === 1) {
    return <Cell path={paths[0]} alt={caption} className="h-full w-full" />;
  }

  if (n === 2) {
    return (
      <div className="grid h-full grid-cols-2 gap-[3px]">
        <Cell path={paths[0]} alt={caption} iconSize={16} />
        <Cell path={paths[1]} alt={caption} iconSize={16} />
      </div>
    );
  }

  if (n === 3) {
    return (
      <div className="grid h-full grid-cols-[1.55fr_1fr] grid-rows-2 gap-[3px]">
        <Cell path={paths[0]} alt={caption} className="row-span-2" />
        <Cell path={paths[1]} alt={caption} iconSize={16} />
        <Cell path={paths[2]} alt={caption} iconSize={16} />
      </div>
    );
  }

  if (n === 4) {
    return (
      <div className="grid h-full grid-cols-[1.55fr_1fr_1fr] grid-rows-2 gap-[3px]">
        <Cell path={paths[0]} alt={caption} className="row-span-2" />
        <Cell path={paths[1]} alt={caption} iconSize={16} />
        <Cell path={paths[2]} alt={caption} className="row-span-2" iconSize={16} />
        <Cell path={paths[3]} alt={caption} iconSize={16} />
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-[1.55fr_1fr_1fr] grid-rows-3 gap-[3px]">
      <Cell path={paths[0]} alt={caption} className="row-span-3" />
      <Cell path={paths[1]} alt={caption} iconSize={16} />
      <Cell path={paths[2]} alt={caption} iconSize={16} />
      <Cell path={paths[3]} alt={caption} className="col-span-2" iconSize={16} />
      <Cell path={paths[4]} alt={caption} className="col-span-2" iconSize={16} />
    </div>
  );
}

export function PhotoGallery({ circleName, imagePaths }: { circleName: string; imagePaths: string[] }) {
  const caption = `${circleName}の写真`;
  const paths = imagePaths.slice(0, 5);

  return (
    <>
      {/* デスクトップ: 枚数に応じたグリッド */}
      <div className="hidden h-[274px] max-w-[568px] overflow-hidden lg:block">
        <DesktopMosaic paths={paths} caption={caption} />
      </div>

      {/* モバイル: 枚数に応じたグリッド */}
      <div className="h-[186px] max-w-full overflow-hidden lg:hidden">
        <MobileMosaic paths={paths} caption={caption} />
      </div>
    </>
  );
}
