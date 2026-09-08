"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function ChatInput({ conversationId }: { conversationId: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    const trimmed = content.trim();
    if (!trimmed || sending) return;

    setSending(true);
    setError(null);

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, content: trimmed }),
    });

    setSending(false);

    if (!res.ok) {
      setError("送信に失敗しました。時間をおいて再度お試しください。");
      return;
    }

    setContent("");
    router.refresh();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="border-t border-cb-border bg-white px-4 py-3 lg:px-5 lg:py-3.5">
      {error ? <p className="mb-2 text-[11px] text-[#D1453B]">{error}</p> : null}

      {/* デスクトップ */}
      <div className="hidden grid-cols-[minmax(0,1fr)_auto] items-end gap-3 lg:grid">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="メッセージを入力…"
          className="min-w-0 resize-none rounded-lg border border-cb-input-border bg-cb-surface px-3.5 py-3.5 text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none"
        />
        <button
          type="button"
          onClick={send}
          disabled={sending || !content.trim()}
          aria-label="送信"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-cb-accent shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover disabled:opacity-60"
        >
          <MaterialSymbol name="send" filled size={20} className="text-white" />
        </button>
      </div>
      <div className="mt-2 hidden text-[10.5px] text-cb-placeholder lg:block">Enterで送信 / Shift＋Enterで改行</div>

      {/* モバイル */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:hidden">
        <div className="flex min-w-0 items-center gap-2.5 rounded-full border border-cb-input-border bg-cb-surface px-3.5 py-3.5">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
            placeholder="メッセージを入力…"
            className="min-w-0 flex-1 bg-transparent text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={send}
          disabled={sending || !content.trim()}
          aria-label="送信"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-cb-accent shadow-[0_2px_0_rgba(150,90,10,.25)] disabled:opacity-60"
        >
          <MaterialSymbol name="send" filled size={21} className="text-white" />
        </button>
      </div>
    </div>
  );
}
