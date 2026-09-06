import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { activeThread, upcomingEvent, memberCount, memberOverflow } from "@/lib/messages-mock-data";

export function CircleInfoSidebar() {
  return (
    <div className="hidden flex-col overflow-hidden border-l border-cb-border bg-cb-bg px-[18px] py-5 lg:flex">
      <div className="whitespace-nowrap font-heading text-[14.5px] font-bold text-cb-ink">サークル情報</div>

      <div className="mt-3.5 flex flex-col items-center">
        <div className="h-24 w-24 overflow-hidden rounded-full">
          <PhotoPlaceholder caption="サークルの写真" iconSize={18} />
        </div>
        <div className="mt-3 font-heading text-sm font-bold text-[#2F2B24]">{activeThread.circleName}</div>
        <div className="mt-[7px] text-[10.5px] text-cb-muted-3">{activeThread.meta}</div>
        <Link
          href="/circle/niigata-yamaaruki"
          className="mt-[13px] flex w-full items-center justify-center rounded-lg border border-[#E0D6C6] bg-white py-2.5 text-[11.5px] font-medium text-cb-ink-soft hover:border-cb-accent hover:text-cb-accent-dark"
        >
          サークル詳細を見る
        </Link>
      </div>

      <div className="mt-5 border-t border-[#EFE7DA] pt-[18px]">
        <div className="font-heading text-[13.5px] font-bold text-cb-ink">メンバー</div>
        <div className="mt-3 flex items-center">
          {Array.from({ length: memberCount }).map((_, i) => (
            <div
              key={i}
              className="h-[30px] w-[30px] overflow-hidden rounded-full border-2 border-cb-bg bg-gradient-to-br from-[#F4E4C4] to-[#EAD3A3]"
              style={{ marginLeft: i === 0 ? 0 : -9 }}
            />
          ))}
          <span className="ml-2 text-[11px] text-cb-muted-2">+{memberOverflow}</span>
        </div>
      </div>

      <div className="mt-5 border-t border-[#EFE7DA] pt-[18px]">
        <div className="font-heading text-[13.5px] font-bold text-cb-ink">直近の予定</div>
        <div className="mt-3 grid grid-cols-[44px_minmax(0,1fr)] gap-[11px] rounded-[9px] border border-cb-border bg-white p-3">
          <div className="flex flex-col items-center gap-1">
            <span className="font-heading text-[15px] font-bold text-[#2F2B24]">{upcomingEvent.date}</span>
            <span className="text-[9.5px] text-[#D9534F]">{upcomingEvent.dow}</span>
          </div>
          <div className="min-w-0">
            <div className="text-[11.5px] font-bold text-[#2F2B24]">{upcomingEvent.title}</div>
            <div className="mt-1.5 text-[10.5px] text-cb-muted-3">{upcomingEvent.time}</div>
            <div className="mt-1 text-[10.5px] text-cb-muted-3">{upcomingEvent.place}</div>
          </div>
        </div>
        <div className="mt-[11px] text-center">
          <a href="#" className="text-[11px] font-medium text-cb-accent-dark hover:text-[#8E5606]">
            予定をもっと見る
          </a>
        </div>
      </div>

      <div className="mt-5 border-t border-[#EFE7DA] pt-[18px]">
        <div className="font-heading text-[13.5px] font-bold text-cb-ink">その他</div>
        <div className="mt-[13px] flex flex-col gap-3.5">
          <button type="button" className="flex items-center gap-2.5 text-left text-[11.5px] text-cb-ink-soft">
            <MaterialSymbol name="image" size={17} className="text-cb-muted-3" />
            ファイル・写真
          </button>
          <button type="button" className="flex items-center gap-2.5 text-left text-[11.5px] text-cb-ink-soft">
            <MaterialSymbol name="link" size={17} className="text-cb-muted-3" />
            リンク
          </button>
          <button type="button" className="flex items-center gap-2.5 text-left text-[11.5px] text-cb-ink-soft">
            <MaterialSymbol name="search" size={17} className="text-cb-muted-3" />
            検索
          </button>
          <label className="flex items-center gap-2.5 text-[11.5px] text-cb-ink-soft">
            <MaterialSymbol name="notifications_off" size={17} className="text-cb-muted-3" />
            通知をミュート
            <div className="flex-1" />
            <input type="checkbox" className="peer sr-only" />
            <span className="relative h-[18px] w-[34px] shrink-0 rounded-full bg-[#E4DACA] transition-colors peer-checked:bg-cb-accent">
              <span className="absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
            </span>
          </label>
          <button type="button" className="flex items-center gap-2.5 text-left text-[11.5px] text-[#D9534F]">
            <MaterialSymbol name="block" size={17} />
            ブロックする
          </button>
        </div>
      </div>
    </div>
  );
}
