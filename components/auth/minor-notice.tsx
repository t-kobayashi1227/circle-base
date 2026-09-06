import { MaterialSymbol } from "@/components/icons/material-symbol";

// display（flex/hidden等）は呼び出し側のclassNameで指定する
// （コンポーネント側に含めるとブレークポイント切り替えでdisplayユーティリティ同士が競合するため）。
export function MinorNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`gap-3.5 rounded-[10px] border border-[#F2E6D2] bg-[#FDF8F0] p-4 lg:gap-4 lg:p-[18px_20px] ${className}`}>
      <MaterialSymbol name="supervisor_account" size={30} className="shrink-0 text-[#E0A759] lg:text-[32px]" />
      <div>
        <div className="text-[13px] font-bold text-[#3B352C]">18歳未満の方へ</div>
        <div className="mt-[7px] text-[11.5px] leading-[1.85] text-cb-muted-2 lg:mt-2">
          18歳未満の方は、保護者の同意が必要です。
          <span className="lg:hidden">会員登録の際に「保護者の同意」チェックをお願いします。</span>
          <span className="hidden lg:inline">
            <br />
            会員登録の際に「保護者の同意」チェックをお願いします。
          </span>
        </div>
      </div>
    </div>
  );
}
