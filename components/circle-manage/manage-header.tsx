import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { LoggedInHeaderNav } from "@/components/logged-in-header-nav";

export function ManageHeader({ mobileTitle, backHref }: { mobileTitle: string; backHref: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-cb-border bg-cb-header">
      <LoggedInHeaderNav ctaLabel="マイページ" ctaHref="/mypage" />

      {/* モバイル */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-[#F3ECE0] px-4 py-2.5 lg:hidden">
        <Link href={backHref} aria-label="戻る">
          <MaterialSymbol name="arrow_back_ios_new" size={24} className="text-[#3B352C]" />
        </Link>
        <span className="text-center font-heading text-[15.5px] font-bold text-cb-ink">
          {mobileTitle}
        </span>
        <button type="button" aria-label="その他のメニュー">
          <MaterialSymbol name="more_horiz" filled size={22} className="text-[#3B352C]" />
        </button>
      </div>
    </header>
  );
}
