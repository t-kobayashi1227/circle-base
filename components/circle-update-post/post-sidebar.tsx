import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoNotice } from "./photo-notice";
import { postingTips } from "@/lib/circle-post-form-options";

export function PostSidebar({
  circleName,
  circleMeta,
  tips = postingTips,
  showPhotoNotice = true,
}: {
  circleName: string;
  circleMeta: string;
  tips?: string[];
  showPhotoNotice?: boolean;
}) {
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      <div className="rounded-xl border border-cb-border bg-cb-surface px-[22px] py-5">
        <h3 className="mb-3 font-heading text-[14.5px] font-bold text-cb-ink">投稿するサークル</h3>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[10px]">
            <PhotoPlaceholder caption="カバー写真" iconSize={16} />
          </div>
          <div className="min-w-0">
            <div className="font-heading text-sm font-bold text-[#2F2B24]">{circleName}</div>
            <div className="mt-1 text-[10.5px] text-cb-muted-3">{circleMeta}</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-cb-border bg-cb-surface px-[22px] py-5">
        <h3 className="mb-3 font-heading text-[14.5px] font-bold text-cb-ink">投稿のコツ</h3>
        <div className="flex flex-col gap-[11px]">
          {tips.map((tip) => (
            <div key={tip} className="flex items-start gap-2.5 text-[11.5px] leading-[1.75] text-cb-ink-soft">
              <MaterialSymbol name="check" size={15} className="mt-px shrink-0 text-cb-accent" />
              {tip}
            </div>
          ))}
        </div>
      </div>

      {showPhotoNotice ? <PhotoNotice /> : null}

      <div className="flex items-center gap-2 text-[11.5px] text-cb-muted-2">
        <MaterialSymbol name="check_circle" filled size={16} className="text-[#3E9E7A]" />
        下書きが自動保存されています
      </div>
    </div>
  );
}
