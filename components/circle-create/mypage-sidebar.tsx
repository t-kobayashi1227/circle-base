import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { HelpBox } from "@/components/help-box";

const navGroups: {
  title: string | null;
  items: { label: string; icon: string; href: string; active?: boolean }[];
}[] = [
  {
    title: null,
    items: [{ label: "ダッシュボード", icon: "dashboard", href: "/mypage" }],
  },
  {
    title: "サークル管理",
    items: [
      { label: "サークル一覧", icon: "view_list", href: "/mypage" },
      { label: "サークルを作成", icon: "add", href: "/mypage/circles/new", active: true },
      { label: "応募メッセージ", icon: "mark_email_unread", href: "/mypage/messages" },
      { label: "活動の様子", icon: "photo_camera", href: "/mypage" },
      { label: "下書き一覧", icon: "description", href: "/mypage" },
    ],
  },
  {
    title: "メッセージ",
    items: [
      { label: "受信メッセージ", icon: "chat_bubble", href: "/mypage/messages" },
      { label: "送信メッセージ", icon: "send", href: "/mypage/messages" },
    ],
  },
  {
    title: "設定",
    items: [
      { label: "プロフィール編集", icon: "person", href: "/mypage" },
      { label: "通知設定", icon: "notifications", href: "/mypage" },
      { label: "ブロックしたユーザー", icon: "block", href: "/mypage/blocked-users" },
    ],
  },
];

export function MypageSidebar() {
  return (
    <aside className="hidden border-r border-cb-border bg-cb-header py-[22px] lg:block">
      <div className="px-5 pb-3.5 font-heading text-[14.5px] font-bold text-cb-ink">
        マイページ
      </div>
      {navGroups.map((group, i) => (
        <div key={group.title ?? `group-${i}`}>
          {group.title ? (
            <div className="px-5 pb-2 pt-[18px] text-[10.5px] tracking-wide text-cb-placeholder">
              {group.title}
            </div>
          ) : null}
          {group.items.map((item) =>
            item.active ? (
              <div
                key={item.label}
                className="flex items-center gap-2.5 border-l-[3px] border-cb-accent bg-cb-accent-soft py-[11px] pl-[17px] pr-5 text-[12.5px] font-bold text-cb-accent-dark"
              >
                <MaterialSymbol name={item.icon} size={18} />
                {item.label}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2.5 px-5 py-[11px] text-[12.5px] text-cb-ink-soft hover:bg-[#FDF7EE]"
              >
                <MaterialSymbol name={item.icon} size={18} className="text-cb-muted-3" />
                {item.label}
              </Link>
            ),
          )}
        </div>
      ))}

      <HelpBox className="mx-4 mt-[26px]" />
    </aside>
  );
}
