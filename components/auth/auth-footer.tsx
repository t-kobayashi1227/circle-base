import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

const links = [
  { label: "サイト概要", href: "/about" },
  { label: "利用規約", href: "/terms" },
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "よくある質問", href: "/faq" },
  { label: "お問い合わせ", href: "/contact" },
];

export function AuthFooter() {
  return (
    <footer className="hidden border-t border-cb-border bg-[#FBF7F0] px-[30px] py-[22px] pb-6 lg:block">
      <div className="flex items-center justify-between">
        <div className="flex gap-[22px] text-[11.5px]">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="text-[#5A5348] hover:text-cb-accent">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-[18px] text-[#4B453C]">
          <div className="text-[11px] text-cb-muted-3">© 2024 にいがたサークルベース</div>
          <MaterialSymbol name="photo_camera" size={21} />
          <span className="text-[17px] font-bold">X</span>
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#2F2B24] text-[8px] font-bold text-white">
            LINE
          </span>
        </div>
      </div>
    </footer>
  );
}
