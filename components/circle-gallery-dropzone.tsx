"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { publicMediaUrl } from "@/lib/storage";

export type GalleryItem = { kind: "existing"; id: string; path: string } | { kind: "new"; file: File };

const MAX_SIZE = 5 * 1024 * 1024;

// サークル詳細ページのタイトル画像（PhotoGallery）と同じ配置（1枚目を大きく、残り4枚を右側に配置）で
// プレビューすることで、保存後にどこへ表示されるかその場でわかるようにしたアップローダー。
export function CircleGalleryDropzone({
  items,
  onChange,
  maxFiles = 5,
  hint,
}: {
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
  maxFiles?: number;
  hint?: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const newFiles = useMemo(
    () => items.filter((item): item is Extract<GalleryItem, { kind: "new" }> => item.kind === "new"),
    [items],
  );
  const previewUrls = useMemo(() => newFiles.map((item) => URL.createObjectURL(item.file)), [newFiles]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  function addFiles(selected: FileList | null) {
    if (!selected || selected.length === 0) return;
    const next = [...items];
    for (const file of Array.from(selected)) {
      if (next.length >= maxFiles) {
        setError(`画像は最大${maxFiles}枚までです`);
        break;
      }
      if (!file.type.startsWith("image/")) {
        setError("画像ファイルを選択してください");
        continue;
      }
      if (file.size > MAX_SIZE) {
        setError("ファイルサイズは5MB以内にしてください");
        continue;
      }
      setError(null);
      next.push({ kind: "new", file });
    }
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="mb-2 text-[10.5px] leading-[1.6] text-cb-muted-3">
        保存すると、下記の配置でタイトル画像として表示されます。<span className="font-bold text-cb-accent-dark">①</span>
        が一番大きく表示されるメイン画像です。
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`grid aspect-[568/274] grid-cols-[1.72fr_1fr_1fr] grid-rows-2 gap-2 rounded-lg p-1.5 ${
          dragOver ? "bg-cb-accent-soft" : ""
        }`}
      >
        {Array.from({ length: maxFiles }, (_, i) => i).map((i) => {
          const item = items[i];
          const isFirst = i === 0;

          if (item) {
            const src =
              item.kind === "existing" ? publicMediaUrl(item.path) : previewUrls[newFiles.indexOf(item)];
            return (
              <div
                key={item.kind === "existing" ? item.id : `${item.file.name}-${i}`}
                className={`relative min-h-0 min-w-0 overflow-hidden rounded-lg border border-cb-border ${isFirst ? "row-span-2" : ""}`}
              >
                <span className="absolute left-1.5 top-1.5 z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-black/65 px-1 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label="削除"
                  className="absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/65 text-white hover:bg-black/80"
                >
                  <MaterialSymbol name="close" size={13} />
                </button>
              </div>
            );
          }

          const isNext = i === items.length;
          return (
            <button
              type="button"
              key={`empty-${i}`}
              onClick={() => isNext && inputRef.current?.click()}
              disabled={!isNext}
              className={`flex min-h-0 min-w-0 flex-col items-center justify-center gap-1 rounded-lg border-[1.5px] border-dashed text-[10.5px] font-medium ${isFirst ? "row-span-2" : ""} ${
                isNext
                  ? "cursor-pointer border-cb-accent bg-cb-accent-soft text-cb-accent-dark hover:bg-[#FBEFD9]"
                  : "cursor-default border-[#E6DCCB] bg-cb-surface text-cb-muted-3"
              }`}
            >
              <MaterialSymbol
                name={isNext ? "add_photo_alternate" : "image"}
                size={isFirst ? 26 : 18}
              />
              {i + 1}
            </button>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      {error ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{error}</p> : null}
      <div className="mt-1.5 text-[10.5px] text-cb-placeholder">
        {hint ?? `JPG / PNG形式（1枚最大5MB・最大${maxFiles}枚）・点線の枠をクリックまたはドラッグ＆ドロップで追加`}
      </div>
    </div>
  );
}
