import type { ReactNode } from "react";
import Link from "next/link";

const links = [
  { label: "サイト概要", href: "/about" },
  { label: "利用規約", href: "/terms" },
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "お問い合わせ", href: "/contact" },
];

export function SiteFooter({ extra }: { extra?: ReactNode }) {
  return (
    <footer className="hidden items-center justify-between border-t border-cb-border bg-cb-header px-[46px] py-[18px] text-[11px] text-cb-muted-3 lg:flex">
      <div className="flex gap-[18px]">
        {links.map((link) => (
          <Link key={link.label} href={link.href} className="text-cb-muted-3 hover:text-cb-accent">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {extra}
        <span>© にいがたサークルベース</span>
      </div>
    </footer>
  );
}
