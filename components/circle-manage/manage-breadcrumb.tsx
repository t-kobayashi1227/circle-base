import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

export function ManageBreadcrumb({
  items,
  current,
}: {
  items: { label: string; href: string }[];
  current: string;
}) {
  return (
    <div className="hidden items-center gap-2 px-7 py-3.5 text-[11.5px] text-cb-muted-3 lg:flex">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <Link href={item.href} className="text-cb-muted-3 hover:text-cb-accent">
            {item.label}
          </Link>
          <MaterialSymbol name="chevron_right" size={14} />
        </span>
      ))}
      <span className="font-medium text-cb-ink-soft">{current}</span>
    </div>
  );
}
