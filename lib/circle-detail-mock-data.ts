// サークル詳細ページの静的な表示設定（タブ構成・バッジの配色）。
// 実データは lib/circles.ts の getCircleBySlug() から取得する。

interface DetailTab {
  key: string;
  label: string;
  mobileLabel: string | null;
  icon: string;
  mobileIcon?: string;
  href: string | null;
  count?: number;
}

// updates / messages タブはどちらも circle_updates を情報源として表示する（前者は写真グリッド、後者は一覧）ため、
// 件数バッジも同じ updatesCount を共有する。
export function buildDetailTabs(updatesCount: number): DetailTab[] {
  return [
    { key: "basic", label: "基本情報", mobileLabel: "基本情報", icon: "article", href: null },
    { key: "updates", label: "活動の様子", mobileLabel: "活動の様子", icon: "photo_camera", href: "updates", count: updatesCount || undefined },
    { key: "recruit", label: "メンバー募集内容", mobileLabel: "募集内容", icon: "diversity_3", href: "recruit" },
    { key: "messages", label: "メッセージ", mobileLabel: "メッセージ", icon: "chat_bubble", href: "messages", count: updatesCount || undefined },
    { key: "owner", label: "主催者情報", mobileLabel: null, icon: "person", href: "owner" },
  ];
}

export type BadgeTone = "primary" | "green" | "purple";

const badgeTone: Record<BadgeTone, string> = {
  primary: "bg-cb-accent text-white",
  green: "bg-[#EEF7F1] border border-[#C9E3D4] text-[#3E8E68]",
  purple: "bg-[#F2F0FA] border border-[#D6D0EE] text-[#6E5FC0]",
};

export function badgeClassName(tone: BadgeTone) {
  return badgeTone[tone];
}
