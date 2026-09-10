import { ComingSoonNote } from "@/components/mypage/coming-soon-note";

export function UpcomingEventsSection() {
  return (
    <div className="rounded-xl border border-cb-border bg-cb-surface px-4 py-4 lg:px-[18px] lg:py-4">
      <h2 className="whitespace-nowrap font-heading text-sm font-bold text-cb-ink lg:text-[14px]">
        参加予定のイベント
      </h2>
      <div className="mt-3.5">
        <ComingSoonNote label="参加予定のイベント" />
      </div>
    </div>
  );
}
