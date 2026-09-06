import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LoggedInHeaderNav } from "@/components/logged-in-header-nav";

// マイページ内のウィザード系フォーム（サークル作成・活動の様子投稿など）で共通のヘッダー。
export function WizardHeader({
  title,
  backHref,
  closeHref,
}: {
  title: string;
  backHref: string;
  closeHref: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-cb-border bg-cb-header">
      <LoggedInHeaderNav ctaLabel="マイページ" ctaHref="/mypage" />

      {/* モバイル */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-[18px] py-2 lg:hidden">
        <Link href={backHref} aria-label="戻る">
          <MaterialSymbol name="arrow_back_ios_new" size={24} className="text-[#3B352C]" />
        </Link>
        <span className="text-center font-heading text-base font-bold text-cb-ink">{title}</span>
        <Link href={closeHref} aria-label="閉じる">
          <MaterialSymbol name="close" size={24} className="text-[#3B352C]" />
        </Link>
      </div>
    </header>
  );
}
