import { MaterialSymbol } from "@/components/icons/material-symbol";

export function ChatInput() {
  return (
    <div className="border-t border-cb-border bg-white px-4 py-3 lg:px-5 lg:py-3.5">
      {/* デスクトップ */}
      <div className="hidden grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 lg:grid">
        <button type="button" aria-label="ファイルを添付">
          <MaterialSymbol name="attach_file" size={21} className="text-cb-muted-3" />
        </button>
        <button type="button" aria-label="絵文字">
          <MaterialSymbol name="mood" size={21} className="text-cb-muted-3" />
        </button>
        <input
          type="text"
          placeholder="メッセージを入力…"
          className="min-w-0 rounded-lg border border-cb-input-border bg-cb-surface px-3.5 py-3.5 text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none"
        />
        <button
          type="button"
          aria-label="送信"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-cb-accent shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover"
        >
          <MaterialSymbol name="send" filled size={20} className="text-white" />
        </button>
      </div>
      <div className="mt-2 hidden pl-[66px] text-[10.5px] text-cb-placeholder lg:block">
        Enterで送信 / Shift＋Enterで改行
      </div>

      {/* モバイル */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 lg:hidden">
        <button type="button" aria-label="ファイルを添付">
          <MaterialSymbol name="attach_file" size={23} className="text-cb-muted-3" />
        </button>
        <div className="flex min-w-0 items-center gap-2.5 rounded-full border border-cb-input-border bg-cb-surface px-3.5 py-3.5">
          <input
            type="text"
            placeholder="メッセージを入力…"
            className="min-w-0 flex-1 bg-transparent text-[12.5px] text-cb-ink placeholder:text-cb-placeholder focus:outline-none"
          />
          <button type="button" aria-label="絵文字">
            <MaterialSymbol name="mood" size={20} className="text-cb-placeholder" />
          </button>
        </div>
        <button
          type="button"
          aria-label="送信"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-cb-accent shadow-[0_2px_0_rgba(150,90,10,.25)]"
        >
          <MaterialSymbol name="send" filled size={21} className="text-white" />
        </button>
      </div>
    </div>
  );
}
