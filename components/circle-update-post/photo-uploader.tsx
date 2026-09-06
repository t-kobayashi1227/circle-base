"use client";

import { useRef, useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function PhotoUploader({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const accepted = Array.from(list).filter(
      (f) => f.type.startsWith("image/") || f.type.startsWith("video/"),
    );
    if (accepted.length) onChange([...files, ...accepted]);
  }

  function removeAt(index: number) {
    onChange(files.filter((_, i) => i !== index));
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
        className={`flex min-h-[124px] w-full flex-col items-center justify-center gap-2 rounded-[9px] border-[1.5px] border-dashed bg-cb-surface px-4 text-center ${
          dragOver ? "border-cb-accent bg-cb-accent-soft" : "border-[#DFD4C2]"
        }`}
      >
        <div className="flex items-center gap-2 text-[13px] font-bold text-cb-muted">
          <MaterialSymbol name="add_photo_alternate" size={24} className="text-[#D9B98A]" />
          写真や動画を追加
        </div>
        <div className="text-[11px] text-cb-muted-3 lg:text-[11.5px]">
          <span className="lg:hidden">タップしてアップロード</span>
          <span className="hidden lg:inline">クリックまたはドラッグ＆ドロップでアップロード</span>
        </div>
        <div className="text-[10.5px] text-cb-placeholder">JPG / PNG / MP4（最大100MB）</div>
        <div className="hidden text-[10.5px] text-cb-placeholder lg:block">※ 複数枚選択できます</div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      {files.length ? (
        <div className="mt-3.5 grid grid-cols-3 gap-2.5 lg:grid-cols-5">
          {files.map((file, i) => (
            <div key={`${file.name}-${i}`} className="relative h-[88px] min-w-0 overflow-hidden rounded-lg bg-cb-surface">
              <div className="flex h-full w-full items-center justify-center px-1 text-center text-[9.5px] leading-snug text-[#8E6A2E]">
                {file.name}
              </div>
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="削除"
                className="absolute -right-1.5 -top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#2F2B24] text-white"
              >
                <MaterialSymbol name="close" size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-[88px] min-w-0 flex-col items-center justify-center gap-1 rounded-lg border-[1.5px] border-dashed border-[#DFD4C2] bg-cb-surface text-cb-muted-3 hover:border-cb-accent hover:text-cb-accent-dark"
          >
            <MaterialSymbol name="add" size={22} />
            <span className="text-[11px]">追加</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
