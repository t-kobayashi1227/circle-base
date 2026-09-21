"use client";

import { useState } from "react";
import Image from "next/image";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { publicMediaUrl } from "@/lib/storage";

export function ActivityDetailGallery({
  circleName,
  imagePaths,
}: {
  circleName: string;
  imagePaths: string[];
}) {
  const [index, setIndex] = useState(0);
  const alt = `${circleName}の活動写真`;

  if (imagePaths.length === 0) {
    return (
      <div>
        <div className="h-[236px] overflow-hidden rounded-[10px] lg:h-[380px]">
          <PhotoPlaceholder caption={alt} iconSize={28} />
        </div>
      </div>
    );
  }

  const current = imagePaths[index];
  const showControls = imagePaths.length > 1;

  return (
    <div className="min-w-0">
      <div className="relative h-[236px] overflow-hidden rounded-[10px] lg:h-[380px]">
        <Image
          src={publicMediaUrl(current)}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 558px, 100vw"
          className="object-cover"
          priority
        />
        {showControls ? (
          <>
            <button
              type="button"
              aria-label="前の写真"
              onClick={() => setIndex((i) => (i - 1 + imagePaths.length) % imagePaths.length)}
              className="absolute left-2.5 top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full bg-white/90 lg:left-3.5 lg:h-[34px] lg:w-[34px]"
            >
              <MaterialSymbol name="chevron_left" size={18} className="text-[#4B453C]" />
            </button>
            <button
              type="button"
              aria-label="次の写真"
              onClick={() => setIndex((i) => (i + 1) % imagePaths.length)}
              className="absolute right-2.5 top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full bg-white/90 lg:right-3.5 lg:h-[34px] lg:w-[34px]"
            >
              <MaterialSymbol name="chevron_right" size={18} className="text-[#4B453C]" />
            </button>
            <span className="absolute bottom-2.5 right-2.5 rounded-xl bg-black/55 px-2.5 py-1 text-[10px] font-medium text-white lg:bottom-3 lg:right-3.5 lg:text-[10.5px]">
              {index + 1} / {imagePaths.length}
            </span>
          </>
        ) : null}
      </div>

      {showControls ? (
        <div className="mt-[9px] grid grid-cols-5 gap-1.5 lg:mt-2.5 lg:grid-cols-6 lg:gap-2">
          {imagePaths.map((path, i) => (
            <button
              key={path}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}枚目の写真を表示`}
              className={`relative h-[56px] overflow-hidden rounded-lg lg:h-16 ${
                i === index ? "border-2 border-cb-accent" : "border border-cb-border"
              }`}
            >
              <Image src={publicMediaUrl(path)} alt={alt} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
