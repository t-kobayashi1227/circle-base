import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function ListBreadcrumb({
  items,
  current,
}: {
  items: { label: string; href: string }[];
  current: string;
}) {
  return (
    <div className="flex items-center gap-1.5 px-[18px] pt-1 text-[11px] text-cb-muted-3 lg:gap-2 lg:px-7 lg:py-3.5 lg:text-[11.5px]">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5 lg:gap-2">
          <Link href={item.href} className="text-cb-muted-3 hover:text-cb-accent">
            {item.label}
          </Link>
          <MaterialSymbol name="chevron_right" size={13} className="lg:hidden" />
          <MaterialSymbol name="chevron_right" size={14} className="hidden lg:inline-block" />
        </span>
      ))}
      <span className="font-medium text-cb-ink-soft">{current}</span>
    </div>
  );
}
