import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { CircleDetail } from "@/lib/circle-detail-mock-data";

export function Breadcrumb({ circle }: { circle: CircleDetail }) {
  return (
    <div className="hidden items-center gap-2 bg-cb-surface px-8 py-3.5 text-[11.5px] text-cb-muted-3 lg:flex">
      {circle.categoryPath.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <Link href={item.href} className="text-cb-muted-3 hover:text-cb-accent">
            {item.label}
          </Link>
          <MaterialSymbol name="chevron_right" size={14} />
        </span>
      ))}
      <span className="font-medium text-cb-ink-soft">{circle.name}</span>
    </div>
  );
}
