"use client";

import { useRef, useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function ProfilePhotoCard() {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-xl border border-cb-border bg-cb-surface px-[18px] pb-5 pt-[18px] text-center lg:px-[18px] lg:pb-[22px] lg:pt-5">
      <div className="font-heading text-sm font-bold text-cb-ink">プロフィール写真</div>
      <div className="relative mx-auto mt-4 h-28 w-28">
        <div className="h-28 w-28 overflow-hidden rounded-full">
          <PhotoPlaceholder caption={fileName ?? "プロフィール写真"} iconSize={18} />
        </div>
        <div className="pointer-events-none absolute -right-0.5 bottom-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(60,45,20,.2)] lg:h-8 lg:w-8">
          <MaterialSymbol name="photo_camera" size={17} className="text-cb-ink-soft" />
        </div>
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 w-full rounded-lg border border-[#F0D9AF] bg-cb-accent-soft py-2.5 text-xs font-bold text-cb-accent-dark hover:bg-[#FBEFDD]"
      >
        写真を変更
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
      <div className="mt-3 text-[10.5px] text-cb-placeholder">JPG / PNG（5MB以内）</div>
    </div>
  );
}
