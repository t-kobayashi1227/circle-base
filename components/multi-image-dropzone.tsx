"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { publicMediaUrl } from "@/lib/storage";

export type UpdateImageItem = { kind: "existing"; id: string; path: string } | { kind: "new"; file: File };

const MAX_FILES = 6;
const MAX_SIZE = 5 * 1024 * 1024;

// 活動報告など、複数枚の写真をまとめてアップロードする用途向けのドラッグ＆ドロップアップローダー。
// 編集時は投稿済み（existing）と新規追加（new）の画像を同じ並びで扱う。
export function MultiImageDropzone({
  items,
  onChange,
  maxFiles = MAX_FILES,
  hint = `JPG / PNG形式（1枚最大5MB・最大${maxFiles}枚）`,
}: {
  items: UpdateImageItem[];
  onChange: (items: UpdateImageItem[]) => void;
  maxFiles?: number;
  hint?: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const newItems = useMemo(
    () => items.filter((item): item is Extract<UpdateImageItem, { kind: "new" }> => item.kind === "new"),
    [items],
  );
  const previewUrls = useMemo(() => newItems.map((item) => URL.createObjectURL(item.file)), [newItems]);

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
        setError(`写真は最大${maxFiles}枚までです`);
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
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
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
        className={`flex min-h-[126px] w-full flex-col items-center justify-center gap-2.5 rounded-[9px] border-[1.5px] border-dashed bg-cb-surface px-4 text-center ${
          dragOver ? "border-cb-accent bg-cb-accent-soft" : "border-[#DFD4C2]"
        }`}
      >
        <div className="flex items-center gap-3">
          <MaterialSymbol name="cloud_upload" size={30} className="text-[#D9B98A]" />
          <div className="text-left">
            <div className="text-[12.5px] text-cb-muted">クリックまたはドラッグ＆ドロップで画像を追加</div>
            <div className="mt-1.5 text-[10.5px] text-cb-placeholder">{hint}</div>
          </div>
        </div>
      </button>
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

      {items.length > 0 ? (
        <div className="mt-2.5 grid grid-cols-3 gap-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const src = item.kind === "existing" ? publicMediaUrl(item.path) : previewUrls[newItems.indexOf(item)];
            return (
              <div
                key={item.kind === "existing" ? item.id : `${item.file.name}-${index}`}
                className="relative aspect-square overflow-hidden rounded-lg border border-cb-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  aria-label="削除"
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  <MaterialSymbol name="close" size={13} />
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
