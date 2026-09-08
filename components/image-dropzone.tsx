"use client";

import { useRef, useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";

// サークルのメイン画像・活動の様子画像で共用する単一ファイルのドラッグ＆ドロップアップローダー。
export function ImageDropzone({
  file,
  onChange,
  existingLabel,
  hint = "JPG / PNG形式（最大5MB）",
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  existingLabel?: string | null;
  hint?: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(selected: File | undefined) {
    if (!selected) return;
    if (!selected.type.startsWith("image/")) {
      setError("画像ファイルを選択してください");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError("ファイルサイズは5MB以内にしてください");
      return;
    }
    setError(null);
    onChange(selected);
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
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`flex min-h-[126px] w-full flex-col items-center justify-center gap-2.5 rounded-[9px] border-[1.5px] border-dashed bg-cb-surface px-4 text-center ${
          dragOver ? "border-cb-accent bg-cb-accent-soft" : "border-[#DFD4C2]"
        }`}
      >
        {file ? (
          <div className="flex items-center gap-2.5 text-[12.5px] text-cb-ink-soft">
            <MaterialSymbol name="check_circle" filled size={22} className="text-[#3E9E7A]" />
            {file.name}
          </div>
        ) : existingLabel ? (
          <div className="flex items-center gap-2.5 text-[12.5px] text-cb-ink-soft">
            <MaterialSymbol name="image" size={22} className="text-cb-muted-3" />
            {existingLabel}（クリックで変更）
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <MaterialSymbol name="cloud_upload" size={30} className="text-[#D9B98A]" />
            <div className="text-left">
              <div className="text-[12.5px] text-cb-muted">クリックまたはドラッグ＆ドロップで画像をアップロード</div>
              <div className="mt-1.5 text-[10.5px] text-cb-placeholder">{hint}</div>
            </div>
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error ? <p className="mt-1.5 text-[11px] text-[#D1453B]">{error}</p> : null}
    </div>
  );
}
