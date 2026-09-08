import Image from "next/image";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { publicMediaUrl } from "@/lib/storage";

// circle_images / circle_updates にアップロード済みの画像があればそれを表示し、
// なければプレースホルダーにフォールバックする。
export function CircleImage({
  path,
  alt,
  className = "",
  iconSize,
}: {
  path: string | null | undefined;
  alt: string;
  className?: string;
  iconSize?: number;
}) {
  if (!path) {
    return <PhotoPlaceholder caption={alt} className={className} iconSize={iconSize} />;
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image src={publicMediaUrl(path)} alt={alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
    </div>
  );
}
