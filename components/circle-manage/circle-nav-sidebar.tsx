import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { HelpBox } from "@/components/help-box";
import { manageNav } from "@/lib/circle-updates-mock-data";
import { circleTypeLabel } from "@/lib/circles";

export function CircleNavSidebar({
  circleId,
  circleName,
  tagline,
  type,
  status,
  imagePath,
  activeKey,
}: {
  circleId: string;
  circleName: string;
  tagline: string;
  type: string;
  status: string;
  imagePath: string | null;
  activeKey: (typeof manageNav)[number]["key"];
}) {
  const basePath = `/mypage/circles/${circleId}`;
  const published = status === "published";

  return (
    <aside className="hidden flex-col gap-5 lg:flex">
      <div className="overflow-hidden rounded-xl border border-cb-border bg-cb-surface">
        <div className="h-[132px]">
          <CircleImage path={imagePath} alt={`${circleName}の写真`} iconSize={22} />
        </div>
        <div className="px-4 pb-2 pt-3.5">
          <div className="flex gap-1.5">
            <span className="rounded border border-[#D3E2EF] bg-[#EDF3F9] px-[9px] py-1 text-[10px] font-medium text-[#4D6B8A]">
              {circleTypeLabel(type)}
            </span>
            <span
              className={`rounded border px-[9px] py-1 text-[10px] font-medium ${
                published ? "border-[#C9E3D4] bg-[#EEF7F1] text-[#3E8E68]" : "border-[#DDD5C6] bg-[#F3EFE6] text-cb-muted-2"
              }`}
            >
              {published ? "公開中" : "非公開"}
            </span>
          </div>
          <div className="mt-[11px] font-heading text-[16.5px] font-bold text-[#2F2B24]">
            {circleName}
          </div>
          <div className="mt-1.5 text-[11px] leading-[1.75] text-cb-muted-2">{tagline}</div>
        </div>
        <div className="mt-2 border-t border-[#F3ECE0] py-2 pb-3.5">
          {manageNav.map((item) => {
            const active = item.key === activeKey;
            return (
              <Link
                key={item.key}
                href={`${basePath}${item.href}`}
                className={`flex items-center gap-2.5 py-3 pr-5 text-[12.5px] ${
                  active
                    ? "border-l-[3px] border-cb-accent bg-cb-accent-soft pl-[13px] font-bold text-cb-accent-dark"
                    : "pl-4 text-cb-ink-soft hover:bg-[#FDF7EE]"
                }`}
              >
                <MaterialSymbol name={item.icon} size={18} className={active ? "text-cb-accent" : "text-cb-muted-3"} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <HelpBox />
    </aside>
  );
}
