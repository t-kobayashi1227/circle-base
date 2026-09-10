import { ComingSoonNote } from "@/components/mypage/coming-soon-note";

export function ActivitiesCard() {
  return (
    <div className="hidden rounded-xl border border-cb-border bg-cb-surface px-5 pb-3.5 pt-[18px] lg:block">
      <h2 className="mb-3.5 font-heading text-[15px] font-bold text-cb-ink">最近のアクティビティ</h2>
      <ComingSoonNote label="アクティビティ" />
    </div>
  );
}
