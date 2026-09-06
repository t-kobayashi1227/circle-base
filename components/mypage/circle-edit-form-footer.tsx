import Link from "next/link";

// フォーム本体（circle-edit-form）の外側、モバイルのみ表示する下部アクションバー。
// デスクトップはフォームカード内右下にボタンが収まる。
export function CircleEditFormFooter() {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 border-t border-cb-border bg-cb-surface p-3 lg:hidden">
      <Link
        href="/mypage/circles/owned"
        className="flex min-h-[52px] items-center justify-center rounded-[9px] border border-[#E0D6C6] px-6 text-[13.5px] font-medium text-cb-ink-soft"
      >
        キャンセル
      </Link>
      <button
        type="submit"
        form="circle-edit-form"
        className="flex min-h-[52px] items-center justify-center rounded-[9px] bg-cb-accent text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)]"
      >
        変更を保存
      </button>
    </div>
  );
}
