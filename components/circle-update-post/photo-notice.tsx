import { MaterialSymbol } from "@/components/icons/material-symbol";

export function PhotoNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-[11px] rounded-[10px] border border-[#F2E6D2] bg-[#FDF7EE] px-4 py-3.5 lg:rounded-[11px] lg:px-[18px] lg:py-4 ${className}`}>
      <MaterialSymbol name="verified_user" size={19} className="shrink-0 text-[#3E9E7A]" />
      <div>
        <div className="text-xs font-bold text-[#3B352C]">写真の掲載について</div>
        <div className="mt-1.5 text-[10.5px] leading-[1.8] text-cb-muted-2">
          人物が写る写真は、必ず本人の同意を得てから投稿してください。
        </div>
      </div>
    </div>
  );
}
