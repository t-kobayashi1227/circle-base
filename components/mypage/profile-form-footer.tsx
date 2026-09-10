import Link from "next/link";

// フォーム本体（profile-edit-form）の外側に置かれるアクションバー。
// ボタンは form="profile-edit-form" 属性でフォームに紐付ける。
export function ProfileFormFooter({ submitting }: { submitting: boolean }) {
  return (
    <>
      {/* デスクトップ */}
      <div className="mt-[18px] hidden grid-cols-[196px_minmax(0,1fr)] gap-5 lg:grid">
        <div />
        <div className="grid grid-cols-[1fr_1.6fr] gap-5">
          <Link
            href="/mypage"
            className="flex items-center justify-center rounded-[9px] border border-[#E0D6C6] bg-white py-4 text-[13.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            form="profile-edit-form"
            disabled={submitting}
            className="flex items-center justify-center rounded-[9px] bg-cb-accent py-4 text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] hover:bg-cb-accent-hover disabled:opacity-60"
          >
            {submitting ? "保存中..." : "変更を保存"}
          </button>
        </div>
      </div>

      {/* モバイル */}
      <div className="mt-[22px] grid grid-cols-[auto_minmax(0,1fr)] gap-3 border-t border-cb-border bg-cb-header p-3 lg:hidden">
        <Link
          href="/mypage"
          className="flex min-h-[52px] items-center justify-center rounded-[9px] border border-[#E0D6C6] px-6 text-[13.5px] font-medium text-cb-ink-soft"
        >
          キャンセル
        </Link>
        <button
          type="submit"
          form="profile-edit-form"
          disabled={submitting}
          className="flex min-h-[52px] items-center justify-center rounded-[9px] bg-cb-accent text-sm font-bold text-white shadow-[0_3px_0_rgba(150,90,10,.22)] disabled:opacity-60"
        >
          {submitting ? "保存中..." : "変更を保存"}
        </button>
      </div>
    </>
  );
}
