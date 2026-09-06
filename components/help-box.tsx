import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

// マイページ系サイドバーで繰り返し使われる「困ったときは？」ヘルプ導線。
export function HelpBox({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[11px] border border-[#F2E6D2] bg-[#FDF7EE] px-4 py-[18px] ${className}`}>
      <div className="text-[12.5px] font-bold text-[#3B352C]">困ったときは？</div>
      <div className="mt-2 text-[10.5px] leading-[1.8] text-cb-muted-2">
        ご不明点やお困りごとはヘルプページをご覧ください。
      </div>
      <Link
        href="/contact"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-[#E0D6C6] bg-white py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
      >
        ヘルプページを見る
        <MaterialSymbol name="chevron_right" size={15} />
      </Link>
    </div>
  );
}
