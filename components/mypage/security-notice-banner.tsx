import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

// デザインではモバイル表示に含まれないため、デスクトップのみ表示する。
export function SecurityNoticeBanner() {
  return (
    <div className="hidden grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-[11px] border border-[#F2E6D2] bg-[#FDF6EA] px-[22px] py-4 lg:grid">
      <div className="flex min-w-0 items-center gap-3">
        <MaterialSymbol name="verified_user" filled size={20} className="shrink-0 text-cb-accent" />
        <div className="min-w-0">
          <div className="text-[12.5px] font-bold text-[#3B352C]">セキュリティについて</div>
          <div className="mt-1.5 text-[11px] text-cb-muted-2">
            不審なログインや身に覚えのない操作があった場合は、お問い合わせよりご連絡ください。
          </div>
        </div>
      </div>
      <Link
        href="/mypage/contact"
        className="shrink-0 whitespace-nowrap rounded-lg border border-[#E0D6C6] bg-white px-5 py-[11px] text-xs font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        お問い合わせへ
      </Link>
    </div>
  );
}
