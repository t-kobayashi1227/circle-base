import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function PostCircleBar({ circleName }: { circleName: string }) {
  return (
    <div className="flex items-center gap-[11px] border-b border-cb-border bg-cb-surface px-4 py-3.5 lg:hidden">
      <div className="h-[38px] w-[38px] shrink-0 overflow-hidden rounded-[9px]">
        <PhotoPlaceholder caption="カバー写真" iconSize={12} />
      </div>
      <div className="min-w-0">
        <div className="text-[10.5px] text-cb-muted-3">投稿するサークル</div>
        <div className="mt-0.5 truncate font-heading text-[13.5px] font-bold text-[#2F2B24]">
          {circleName}
        </div>
      </div>
    </div>
  );
}
